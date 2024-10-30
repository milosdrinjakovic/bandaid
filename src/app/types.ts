export type Lyric = {
    _id: String
    number: String
    title: String
    content: String
    dateCreated: String
    dateModified: String
}

export type Error = {
    code: Number
    message: String
  }
  
export type NewLyricObject = {
    number?: String
    title: String
    content: String
}