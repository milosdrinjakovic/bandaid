export type Lyric = {
    _id: string
    number: string
    title: string
    content: string
    dateCreated: string
    dateModified: string
}

export type Error = {
    code: Number
    message: string
  }
  
export type NewLyricObject = {
    number?: string
    title: string
    content: string
}