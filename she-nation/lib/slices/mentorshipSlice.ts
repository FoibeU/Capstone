import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

interface Mentor {
  id: string
  name: string
  avatar: string
  experience: string
  rating: number
  price: number
  expertise: string[]
  availability: string[]
  bio: string
  location: string
  languages: string[]
  responseTime: string
}

interface Session {
  id: string
  mentorId: string
  mentorName: string
  mentorAvatar: string
  topic: string
  date: string
  time: string
  duration: number
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  notes?: string
  meetingLink?: string
}

interface MentorshipState {
  mentors: Mentor[]
  sessions: Session[]
  selectedMentor: Mentor | null
  filters: {
    expertise: string[]
    priceRange: [number, number]
    rating: number
    availability: string
    location: string
  }
  searchQuery: string
  loading: boolean
  error: string | null
}

const initialState: MentorshipState = {
  mentors: [],
  sessions: [],
  selectedMentor: null,
  filters: {
    expertise: [],
    priceRange: [0, 500],
    rating: 0,
    availability: "",
    location: "",
  },
  searchQuery: "",
  loading: false,
  error: null,
}

export const fetchMentors = createAsyncThunk("mentorship/fetchMentors", async () => {
  const res = await fetch("http://localhost:8082/api/mentors")
  if (!res.ok) throw new Error("Failed to fetch mentors")
  return await res.json()
})

export const fetchSessions = createAsyncThunk("mentorship/fetchSessions", async () => {
  const res = await fetch("http://localhost:8082/api/sessions")
  if (!res.ok) throw new Error("Failed to fetch sessions")
  return await res.json()
})

const mentorshipSlice = createSlice({
  name: "mentorship",
  initialState,
  reducers: {
    selectMentor: (state, action: PayloadAction<Mentor>) => {
      state.selectedMentor = action.payload
    },
    bookSession: (state, action: PayloadAction<Omit<Session, "id">>) => {
      const newSession: Session = {
        ...action.payload,
        id: Date.now().toString(),
        status: "scheduled",
      }
      state.sessions.push(newSession)
    },
    updateSession: (state, action: PayloadAction<{ id: string; updates: Partial<Session> }>) => {
      const { id, updates } = action.payload
      const sessionIndex = state.sessions.findIndex((session) => session.id === id)
      if (sessionIndex !== -1) {
        state.sessions[sessionIndex] = { ...state.sessions[sessionIndex], ...updates }
      }
    },
    cancelSession: (state, action: PayloadAction<string>) => {
      const sessionIndex = state.sessions.findIndex((session) => session.id === action.payload)
      if (sessionIndex !== -1) {
        state.sessions[sessionIndex].status = "cancelled"
      }
    },
    rescheduleSession: (state, action: PayloadAction<{ id: string; date: string; time: string }>) => {
      const { id, date, time } = action.payload
      const sessionIndex = state.sessions.findIndex((session) => session.id === id)
      if (sessionIndex !== -1) {
        state.sessions[sessionIndex] = {
          ...state.sessions[sessionIndex],
          date,
          time,
          status: "rescheduled",
        }
      }
    },
    setFilters: (state, action: PayloadAction<Partial<MentorshipState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
      state.searchQuery = ""
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentors.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMentors.fulfilled, (state, action) => {
        state.loading = false
        state.mentors = action.payload
      })
      .addCase(fetchMentors.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error fetching mentors"
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.sessions = action.payload
      })
  },
})

export const {
  selectMentor,
  bookSession,
  updateSession,
  cancelSession,
  rescheduleSession,
  setFilters,
  setSearchQuery,
  clearFilters,
  setLoading,
  setError,
} = mentorshipSlice.actions

export default mentorshipSlice.reducer
