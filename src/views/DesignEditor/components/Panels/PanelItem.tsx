import React from "react"
import useAppContext from "~/hooks/useAppContext"
import { styled } from "baseui"
import { useActiveObject } from "@scenify/react"
import getSelectionType from "~/utils/get-selection-type"
import panelItems from "./panelItems"
import useIsSidebarOpen from "~/hooks/useIsSidebarOpen"
import { Block } from "baseui/block"

const Container = styled("div", ({ isOpen }: { isOpen: boolean }) => ({
  background: "#ffffff",
  width: isOpen ? "300px" : 0,
  flex: "none",
  borderRight: "1px solid #d7d8e3",
  display: "flex",
  transition: "ease width 1s",
}))

interface State {
  panel: string
}
function PanelsList() {
  const [state, setState] = React.useState<State>({ panel: "Text" })
  const isSidebarOpen = useIsSidebarOpen()
  const { activePanel, activeSubMenu } = useAppContext()
  // const activeObject = useActiveObject()

  React.useEffect(() => {
    setState({ panel: activePanel })
  }, [activePanel])

  // React.useEffect(() => {
  //   const selectionType = getSelectionType(activeObject)
  //   if (selectionType) {
  //     if (selectionType.length > 1) {
  //       setState({ panel: "Selection" })
  //     } else {
  //       setState({ panel: selectionType[0] })
  //     }
  //   } else {
  //     setState({ panel: activePanel })
  //   }
  // }, [activeObject])

  React.useEffect(() => {
    if (activeSubMenu) {
      setState({ panel: activeSubMenu })
    } else {
      setState({ panel: activePanel })
    }
  }, [activeSubMenu])

  // @ts-ignore
  const Component = panelItems[state.panel]

  return (
    <Block
      $style={{
        background: "#ffffff",
        width: isSidebarOpen ? "300px" : 0,
        flex: "none",
        borderRight: "1px solid #d7d8e3",
        display: "flex",
        transition: "ease width 0.1s",
        overflow: "hidden",
      }}
    >
      {Component && <Component />}
    </Block>
  )
}

export default PanelsList
