import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Post {
  id: number
  title: string
  description: string
  posted_by: string
  date_posted: string
  category: string
  post_id: number
  likes: number
}

interface Reply {
  id: number
  reply: string
  replied_by: string
  date_replied: string
  post_id: number
}

interface ForumState {
  posts: Post[]
  replies: Reply[]
  categories: string[]
  selectedCategory: string
}

const initialState: ForumState = {
  posts: [], // initially empty, will be filled from API
  replies: [], // initially empty, will be filled from API
  categories: [
    "Career",
    "Learning",
    "Entrepreneurship",
    "Technology",
    "Networking",
    "General",
  ],
  selectedCategory: "",
}

const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload
    },
    setReplies(state, action: PayloadAction<Reply[]>) {
      state.replies = action.payload
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload)
    },
    addReply(state, action: PayloadAction<Reply>) {
      state.replies.push(action.payload)
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload
    },
  },
})

export const { setPosts, setReplies, addPost, addReply, setSelectedCategory } = forumSlice.actions

export default forumSlice.reducer
