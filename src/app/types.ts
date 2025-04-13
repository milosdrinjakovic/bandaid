export type Playlist = {
    name: string
    textIds: string[]
}

export type Text = {
    _id?: string
    userId: string
    title: string
    content: string
    scrollSpeed?: number
    dateCreated?: Date
    dateModified?: Date
    order?: number
}

export type UserData = {
    userId: string
    playlists: Playlist[]
    dateCreated?: Date
    dateModified?: Date
}

export type Error = {
    code: number
    message: string
}

export type NewTextObject = {
    title: string
    content: string
    scrollSpeed: number
}