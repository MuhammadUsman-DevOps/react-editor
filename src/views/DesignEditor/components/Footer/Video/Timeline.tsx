import React from "react"
import { styled, useStyletron } from "baseui"
import { Theme } from "baseui/theme"
import Add from "~/components/Icons/Add"
import { DesignEditorContext } from "~/contexts/DesignEditor"
import { nanoid } from "nanoid"
import { defaultTemplate } from "~/constants/design-editor"
import { useEditor, useFrame } from "@scenify/react"
import { Block } from "baseui/block"
import { useTimer } from "@layerhub-io/use-timer"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  background: $theme.colors.white,
}))
const scaleFactor = 1

export const getXfromDomElement = (domRef: HTMLElement) => {
  return Number(domRef?.style.left.split("px")[0])
}

export default function () {
  const { time, setTime, pause } = useTimer()
  const [maxTime, setMaxTime] = React.useState(5000)
  const { setPages, setCurrentPage, currentPage, pages } = React.useContext(DesignEditorContext)
  const { setDisplayPlayback } = useDesignEditorContext()

  const frame = useFrame()
  const editor = useEditor()
  const [css] = useStyletron()
  const [currentPreview, setCurrentPreview] = React.useState("")
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  })

  React.useEffect(() => {
    let watcher = async () => {
      const updatedTemplate = editor.design.exportToJSON()
      const updatedPreview = (await editor.renderer.render(updatedTemplate)) as any
      setCurrentPreview(updatedPreview)
    }
    if (editor) {
      editor.on("history:changed", watcher)
    }
    return () => {
      if (editor) {
        editor.off("history:changed", watcher)
      }
    }
  }, [editor])

  React.useEffect(() => {
    if (time * scaleFactor <= maxTime) {
      setPosition({ ...position, x: (time * scaleFactor) / 40, y: 0 })
    } else {
      pause()
      setDisplayPlayback(false)
    }
  }, [time])

  React.useEffect(() => {
    if (pages) {
      setMaxTime(pages.length * 5000)
    }
  }, [pages])

  React.useEffect(() => {
    if (editor) {
      if (currentPage) {
        editor.design.importFromJSON(currentPage).catch(() => {
          console.log("COULD NOT IMPORT TEMPLATE")
        })
      } else {
        editor.design
          .importFromJSON(defaultTemplate)
          .then(() => {
            const initialDesign = editor.design.exportToJSON() as any
            editor.renderer.render(initialDesign).then((data) => {
              setCurrentPage({ ...initialDesign, preview: data })
              setPages([{ ...initialDesign, preview: data }])
            })
          })
          .catch(console.log)
      }
    }
  }, [editor, currentPage])

  const addPage = React.useCallback(async () => {
    setCurrentPreview("")
    const updatedTemplate = editor.design.exportToJSON()
    const updatedPreview = await editor.renderer.render(updatedTemplate)

    const updatedPages = pages.map((p) => {
      if (p.id === updatedTemplate.id) {
        return { ...updatedTemplate, preview: updatedPreview }
      }
      return p
    })
    const newPreview = await editor.renderer.render(defaultTemplate)
    const newPage = { ...defaultTemplate, id: nanoid(), preview: newPreview } as any
    const newPages = [...updatedPages, newPage] as any[]
    setPages(newPages)
    setCurrentPage(newPage)
  }, [pages])

  const changePage = React.useCallback(
    async (page: any) => {
      setCurrentPreview("")
      if (editor) {
        const updatedTemplate = editor.design.exportToJSON()
        const updatedPreview = await editor.renderer.render(updatedTemplate)

        const updatedPages = pages.map((p) => {
          if (p.id === updatedTemplate.id) {
            return { ...updatedTemplate, preview: updatedPreview }
          }
          return p
        }) as any[]

        setPages(updatedPages)
        setCurrentPage(page)
      }
    },
    [editor, pages, currentPage]
  )

  const onStart = () => {
    const playHeadDomRef = document.getElementById("EditorPlayHead") as HTMLDivElement
    const initialX = playHeadDomRef.offsetLeft
    const panelsListRef = document.getElementById("EditorPanelList") as HTMLDivElement
    const panelItemRef = document.getElementById("EditorPanelItem") as HTMLDivElement
    const playControlRef = document.getElementById("EditorPlayControl") as HTMLDivElement

    const panelItemsWidth =
      panelsListRef.getBoundingClientRect().width +
      panelItemRef.getBoundingClientRect().width +
      playControlRef.getBoundingClientRect().width

    const onDrag = (ev: MouseEvent) => {
      let x = ev.clientX - initialX - panelItemsWidth
      let newX = initialX + x * 40
      if (newX + 2 <= 0 || newX >= maxTime) return
      setTime(newX)
    }

    const onStop = () => {
      window.removeEventListener("mousemove", onDrag)
      window.removeEventListener("mouseup", onStop)
    }

    window.addEventListener("mousemove", onDrag)
    window.addEventListener("mouseup", onStop)
  }

  return (
    <Container>
      <div className={css({ display: "flex", alignItems: "center" })}>
        <Block $style={{ display: "flex", alignItems: "center", position: "relative", flex: 1 }}>
          <Block $style={{ display: "flex", alignItems: "center", position: "relative", padding: "1rem 0" }}>
            <Block
              onMouseDown={onStart}
              $style={{
                position: "absolute",
                zIndex: "4",
                left: `${position.x}px`,
                top: "-2px",
                width: "2px",
                bottom: "0px",
              }}
            >
              <Block
                id={"EditorPlayHead"}
                $style={{
                  width: 0,
                  height: 0,
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderTop: "11px solid #333333",
                  borderRadius: "5px",
                  transform: "translate(-8px, -1px)",
                }}
              />

              <Block
                id="markerLine"
                $style={{
                  height: "84px",
                  width: "2px",
                  backgroundColor: "#333333",
                  transform: "translate(0, -2px)",
                }}
              />
            </Block>
            {pages.map((page, index) => (
              <Block
                $style={{
                  background: page.id === currentPage?.id ? "rgb(243,244,246)" : "#ffffff",
                  width: "125px",
                }}
                key={index}
              >
                <Block
                  onClick={() => changePage(page)}
                  $style={{
                    cursor: "pointer",
                    position: "relative",
                    border: page.id === currentPage?.id ? "2px solid #7158e2" : "1px solid rgba(0,0,0,.15)",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <Block
                    $style={{
                      backgroundImage: `url(${
                        currentPreview && page.id === currentPage?.id ? currentPreview : page.preview
                      })`,
                      backgroundSize: `${frame ? (frame.width * 70) / frame.height : 70}px 70px`,
                      backgroundRepeat: "repeat",
                      height: "70px",
                    }}
                  ></Block>
                  <Block
                    $style={{
                      position: "absolute",
                      bottom: "4px",
                      right: "4px",
                      background: "rgba(0,0,0,0.4)",
                      color: "#fff",
                      fontSize: "10px",
                      borderRadius: "2px",
                      height: "16px",
                      width: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {index + 1}
                  </Block>
                </Block>
              </Block>
            ))}
          </Block>
        </Block>
        <div
          style={{
            background: "#ffffff",
          }}
        >
          <Block
            onClick={addPage}
            $style={{
              width: "100px",
              height: "56px",
              background: "rgb(243,244,246)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Add size={20} />
          </Block>
        </div>
      </div>
    </Container>
  )
}
