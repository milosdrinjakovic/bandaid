import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TText } from "../../app/models/text"
import { TUserData } from "../../app/models/userData"

type TextsState = {
    texts: TText[]
    userData: TUserData | null
    selectedText: TText
}

const initialState: TextsState = {
    texts: [],
    userData: null,
    selectedText: {
        _id: undefined,
        userId: "",
        dateCreated: undefined,
        dateModified: undefined,
        order: 0,
        title: "",
        content: "",
        scrollSpeed: 10
      }
    
}

const textsSlice = createSlice({
    name: 'texts',
    initialState,
    reducers: {
        setTexts: (state, action: PayloadAction<TText[]>) => {
            state.texts = action.payload
        },
        setUserData: (state, action: PayloadAction<TUserData>) => {
            state.userData = action.payload
        },
        setSelectedText: (state, action: PayloadAction<Partial<TText>>) => {
            state.selectedText = { ...state.selectedText, ...action.payload }
        },
    },
})

export const { setTexts, setUserData, setSelectedText } = textsSlice.actions
export default textsSlice.reducer