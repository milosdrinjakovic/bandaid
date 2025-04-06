export type Lyric = {
    _id: string
    title: string
    content: string
    scrollSpeed: number
    dateCreated: string
    dateModified: string
    order: number
}

export type Error = {
    code: Number
    message: string
  }
  
export type NewLyricObject = {
    title: string
    content: string
    scrollSpeed: number
}