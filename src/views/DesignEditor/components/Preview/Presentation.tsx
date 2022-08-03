import React from "react"
import { Block } from "baseui/block"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import useDesignEditorPages from "~/hooks/useDesignEditorPages"
import { Carousel } from "react-responsive-carousel"

export default function () {
  const pages = useDesignEditorPages()

  return (
    <Block
      $style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        position: "relative",
      }}
    >
      <Block $style={{ position: "absolute", maxWidth: "840px" }}>
        <Carousel showIndicators={false} showThumbs={false} useKeyboardArrows={true} showStatus={false}>
          {pages.map((page, index) => (
            <img width={"auto"} height={"100%"} key={index} src={page.preview} />
          ))}
        </Carousel>
      </Block>
    </Block>
  )
}
