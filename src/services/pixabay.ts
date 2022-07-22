import axios from "axios"

const pixabayClient = axios.create({
  baseURL: "https://pixabay.com/api/",
})

//  `https://pixabay.com/api/videos/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${searchCategory}&page=${1}&per_page=${DEFAULT_VIDEO_PER_PAGE}`

const PIXABAY_KEY = import.meta.env.VITE_APP_PIXABAY_KEY

export interface PixabayImage {
  id: string
  webformatURL: string
  previewURL: string
}

export function getPixabayImages(query: string): Promise<PixabayImage[]> {
  let encodedWord = query.replace(/\s+/g, "+").toLowerCase()
  return new Promise((resolve, reject) => {
    pixabayClient
      .get(`?key=${PIXABAY_KEY}&q=${encodedWord}&image_type=photo`)
      .then((response) => {
        resolve(response.data.hits)
      })
      .catch((err) => reject(err))
  })
}

export function getPixabayVideos(query: string): Promise<PixabayImage[]> {
  let encodedWord = query.replace(/\s+/g, "+").toLowerCase()
  return new Promise((resolve, reject) => {
    pixabayClient
      .get(`/videos?key=${PIXABAY_KEY}&q=${encodedWord}&per_page=10`)
      .then((response) => {
        const hits = response.data.hits
        const videos = hits.map((hit: any) => ({
          id: hit.id,
          type: "StaticVideo",
          src: hit.videos.medium.url,
          preview: hit.videos.tiny.url,
          duration: hit.duration,
        }))
        resolve(videos)
      })
      .catch((err) => reject(err))
  })
}
