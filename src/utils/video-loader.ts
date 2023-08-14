export const createVideoElement = async (id: string, src: string): Promise<HTMLVideoElement> => {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement("video")
    videoElement.setAttribute("id", id)
    videoElement.setAttribute("src", src)
    videoElement.crossOrigin = "anonymous"
    videoElement.style.display = "none"
    videoElement.style.zIndex = "1000"
    videoElement.style.position = "absolute"
    videoElement.setAttribute("controls", "true")
    videoElement.addEventListener("loadedmetadata", (e) => {
      videoElement.currentTime = 0
    })
    videoElement.addEventListener("seeked", function () {
      resolve(videoElement)
    })

    videoElement.addEventListener("error", function (error) {
      reject(error)
    })
  })
}
