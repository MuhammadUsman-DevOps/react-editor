import React, { useState } from "react"
import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import InfiniteScrolling from "~/components/InfiniteScrolling"
import { IStaticImage } from "@layerhub-io/types"
import Search from "~/components/Icons/Search"
import { Input } from "baseui/input"
import LazyLoadImage from "~/components/LazyLoadImage"
import { SIZE, Spinner } from "baseui/spinner"
import api from "~/services/api"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"

const Pixabay = () => {
  const editor = useEditor()
  const [hasMore, setHasMore] = React.useState(true)
  const [images, setImages] = useState<IStaticImage[]>([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [isloading, setIsloading] = React.useState(true)
  const [category, setCategory] = useState<string>("")
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )

  const fetchData = React.useCallback(
    async (reset?: boolean) => {
      setIsloading(true)

      const newImages = await api.getPixabayImages({
        query: category || "nature",
        perPage: 12,
        page: pageNumber,
      })

      if (newImages.length === 0) {
        setHasMore(false)
        setIsloading(false)
        return
      }

      let all = [...images, ...newImages]
      // Set only new images if reset = true. It should be useful for new queries
      if (reset) {
        all = newImages
      }
      // @ts-ignore
      setImages(all)
      setPageNumber(pageNumber + 1)
      setIsloading(false)
    },
    [pageNumber, hasMore, category, images]
  )

  const makeSearch = () => {
    setImages([])
    setPageNumber(1)
    setIsloading(true)
    fetchData(true)
  }
  return (
    <Block flex={1} flexDirection="column" display={"flex"}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem 1.5rem 0",
        }}
      >
        <Block>Pixabay images</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>

      <Block $style={{ padding: "1.5rem 1.5rem 1rem" }}>
        <Input
          overrides={{
            Root: {
              style: {
                paddingLeft: "8px",
              },
            },
          }}
          onKeyDown={(key) => key.code === "Enter" && makeSearch()}
          onBlur={makeSearch}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search"
          size={"compact"}
          startEnhancer={<Search size={16} />}
        />
      </Block>
      <Scrollable>
        <Block padding={"0 1.5rem"}>
          <InfiniteScrolling fetchData={fetchData} hasMore={hasMore}>
            <Block
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.5rem",
              }}
            >
              {images.map((image) => {
                return (
                  <Block
                    $style={{ cursor: "pointer", borderRadius: "10px", overflow: "hidden" }}
                    onClick={() => addObject(image.src)}
                    key={image.id}
                  >
                    <LazyLoadImage url={image.src} />
                  </Block>
                )
              })}
            </Block>
            <Block
              $style={{
                display: "flex",
                justifyContent: "center",
                paddingY: "2rem",
              }}
            >
              {isloading && <Spinner $size={SIZE.small} />}
            </Block>
          </InfiniteScrolling>
        </Block>
      </Scrollable>
    </Block>
  )
}

export default Pixabay



// import React from "react"
// import { useEditor } from "@layerhub-io/react"
// import { useStyletron } from "baseui"
// import { Block } from "baseui/block"
// import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
// import Scrollable from "~/components/Scrollable" 
// import { useSelector } from "react-redux"
// import { selectPixabayResources } from "~/store/slices/resources/selectors"
// import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"

// const Pixabay = () => {
//   const editor = useEditor()
//   const setIsSidebarOpen = useSetIsSidebarOpen()

//   const pixabayResources = useSelector(selectPixabayResources) 
//   const addObject = React.useCallback(
//     (url: string) => {
//       if (editor) {
//         const options = {
//           type: "StaticImage",
//           src: url,
//         }
//         editor.objects.add(options)
//       }
//     },
//     [editor]
//   )

//   return (
//     <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//       <Block
//         $style={{
//           display: "flex",
//           alignItems: "center",
//           fontWeight: 500,
//           justifyContent: "space-between",
//           padding: "1.5rem",
//         }}
//       >
//         <Block>Pixabay</Block>

//         <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
//           <AngleDoubleLeft size={18} />
//         </Block>
//       </Block>
//       <Scrollable>
//         <Block padding="0 1.5rem">
//           <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "1fr 1fr" }}>
//             {pixabayResources?.map((image, index) => {
//               return <ImageItem key={index} onClick={() => addObject(image.src)} preview={image.preview} />
//             })}
//           </div>
//         </Block>
//       </Scrollable>
//     </Block>
//   )
// }

// const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
//   const [css] = useStyletron()
//   return (
//     <div
//       onClick={onClick}
//       className={css({
//         position: "relative",
//         background: "#f8f8fb",
//         cursor: "pointer",
//         borderRadius: "8px",
//         overflow: "hidden",
//         "::before:hover": {
//           opacity: 1,
//         },
//       })}
//     >
//       <div
//         className={css({
//           backgroundImage: `linear-gradient(to bottom,
//           rgba(0, 0, 0, 0) 0,
//           rgba(0, 0, 0, 0.006) 8.1%,
//           rgba(0, 0, 0, 0.022) 15.5%,
//           rgba(0, 0, 0, 0.047) 22.5%,
//           rgba(0, 0, 0, 0.079) 29%,
//           rgba(0, 0, 0, 0.117) 35.3%,
//           rgba(0, 0, 0, 0.158) 41.2%,
//           rgba(0, 0, 0, 0.203) 47.1%,
//           rgba(0, 0, 0, 0.247) 52.9%,
//           rgba(0, 0, 0, 0.292) 58.8%,
//           rgba(0, 0, 0, 0.333) 64.7%,
//           rgba(0, 0, 0, 0.371) 71%,
//           rgba(0, 0, 0, 0.403) 77.5%,
//           rgba(0, 0, 0, 0.428) 84.5%,
//           rgba(0, 0, 0, 0.444) 91.9%,
//           rgba(0, 0, 0, 0.45) 100%)`,
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           opacity: 0,
//           transition: "opacity 0.3s ease-in-out",
//           height: "100%",
//           width: "100%",
//           ":hover": {
//             opacity: 1,
//           },
//         })}
//       />
//       <img
//         src={preview}
//         className={css({
//           width: "100%",
//           height: "100%",
//           objectFit: "contain",
//           pointerEvents: "none",
//           verticalAlign: "middle",
//         })}
//       />
//     </div>
//   )
// }

// export default Pixabay
