import { useActiveObject, useContextMenuRequest, useEditor } from "~/react"
import { useStyletron } from "baseui"
import BringToFront from "~/components/Icons/BringToFront"
import Delete from "~/components/Icons/Delete"
import Duplicate from "~/components/Icons/Duplicate"
import Elements from "~/components/Icons/Elements"
import Locked from "~/components/Icons/Locked"
import Paste from "~/components/Icons/Paste"
import SendToBack from "~/components/Icons/SendToBack"
import Unlocked from "~/components/Icons/Unlocked"

const ContextMenu = () => {
  const contextMenuRequest = useContextMenuRequest()
  const editor = useEditor()
  const activeObject: any = useActiveObject()
  const handleAsComponentHandler = async () => {
    if (editor) {
      const component: any = await editor.scene.exportAsComponent()
      if (component) {
        console.log({ component })
      }
    }
  }
  if (!contextMenuRequest || !contextMenuRequest.target) {
    return <></>
  }

  if (contextMenuRequest.target.type === "Background") {
    return (
      <div // @ts-ignore
        onContextMenu={(e: Event) => e.preventDefault()}
        style={{
          position: "absolute",
          top: `${contextMenuRequest.top}px`,
          left: `${contextMenuRequest.left}px`,
          zIndex: 129,
          width: "240px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
          padding: "0.5rem 0",
        }}
      >
        <ContextMenuItem
          disabled={true}
          onClick={() => {
            // @ts-ignore
            editor.objects.copy()
            // @ts-ignore
            editor.cancelContextMenuRequest()
          }}
          icon="Duplicate"
          label="copy"
        >
          <Duplicate size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            // @ts-ignore
            editor.objects.paste()
            // @ts-ignore
            editor.cancelContextMenuRequest()
          }}
          icon="Paste"
          label="paste"
        >
          <Paste size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          disabled={true}
          onClick={() => {
            // @ts-ignore
            editor.objects.remove()
            // @ts-ignore
            editor.cancelContextMenuRequest()
          }}
          icon="Delete"
          label="delete"
        >
          <Delete size={24} />
        </ContextMenuItem>
      </div>
    )
  }
  return (
    <>
      {!contextMenuRequest.target.locked ? (
        <div // @ts-ignore
          onContextMenu={(e: Event) => e.preventDefault()}
          style={{
            position: "absolute",
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: "240px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
            padding: "0.5rem 0",
          }}
        >
          <ContextMenuItem
            onClick={() => {
              // @ts-ignore
              editor.objects.copy()
              // @ts-ignore
              editor.cancelContextMenuRequest()
            }}
            icon="Duplicate"
            label="copy"
          >
            <Duplicate size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              // @ts-ignore
              editor.objects.paste()
              // @ts-ignore
              editor.cancelContextMenuRequest()
            }}
            icon="Paste"
            label="paste"
          >
            <Paste size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              // @ts-ignore
              editor.objects.remove()
              // @ts-ignore
              editor.cancelContextMenuRequest()
            }}
            icon="Delete"
            label="delete"
          >
            <Delete size={24} />
          </ContextMenuItem>
          <div style={{ margin: "0.5rem 0" }} />
          <ContextMenuItem
            onClick={() => {
              // @ts-ignore
              editor.objects.bringForward()
              // @ts-ignore
              editor.cancelContextMenuRequest()
            }}
            icon="Forward"
            label="bring forward"
          >
            <BringToFront size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              // @ts-ignore
              editor.objects.sendBackwards()
              // @ts-ignore
              editor.cancelContextMenuRequest()
            }}
            icon="Backward"
            label="send backward"
          >
            <SendToBack size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              handleAsComponentHandler()
              // @ts-ignore
              editor.cancelContextMenuRequest()
            }}
            icon="Elements"
            label="Save as component"
          >
            <Elements size={24} />
          </ContextMenuItem>
          <div style={{ margin: "0.5rem 0" }} />
          <ContextMenuItem
            onClick={() => {
              // @ts-ignore
              editor.objects.lock()
              // @ts-ignore
              editor.cancelContextMenuRequest()
            }}
            icon="Locked"
            label="lock"
          >
            <Locked size={24} />
          </ContextMenuItem>
          {activeObject?.type === "StaticImage" && (
            <ContextMenuItem
              onClick={() => {
                // handleAsComponentHandler()
                // @ts-ignore
                editor.objects.setAsBackgroundImage()
                // @ts-ignore
                editor.cancelContextMenuRequest()
              }}
              icon="Images"
              label="Set as background image"
            >
              <Elements size={24} />
            </ContextMenuItem>
          )}
        </div>
      ) : (
        <div // @ts-ignore
          onContextMenu={(e: Event) => e.preventDefault()}
          style={{
            position: "absolute",
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: "240px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
            padding: "0.5rem 0",
          }}
        >
          <ContextMenuItem
            onClick={() => {
              // @ts-ignore
              editor.objects.unlock()
              // @ts-ignore
              editor.cancelContextMenuRequest()
            }}
            icon="Unlocked"
            label="unlock"
          >
            <Unlocked size={24} />
          </ContextMenuItem>
        </div>
      )}
    </>
  )
}

const ContextMenuItem = ({
  label,
  onClick,
  children,
  disabled = false,
}: {
  icon: string
  label: string
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) => {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      className={css({
        display: "flex",
        height: "32px",
        fontSize: "14px",
        alignItems: "center",
        padding: "0 1rem",
        gap: "1rem",
        cursor: "pointer",
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.4 : 1,
        ":hover": {
          backgroundColor: "rgba(0,0,0,0.075)",
        },
      })}
    >
      {children} {label}
    </div>
  )
}

export default ContextMenu
