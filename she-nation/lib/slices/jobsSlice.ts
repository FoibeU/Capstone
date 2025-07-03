import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  category: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline: string;
  featured: boolean;
  applicationsCount: number;
  viewsCount: number;
  status: "active" | "paused" | "closed";
}

interface Application {
  id: string;
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  resume: string;
  coverLetter: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  appliedDate: string;
}

interface JobsState {
  jobs: Job[];
  applications: Application[];
  searchQuery: string;
  filters: {
    type: string;
    location: string;
    category: string;
    salaryRange: [number, number];
    experience: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  applications: [],
  searchQuery: "",
  filters: {
    type: "",
    location: "",
    category: "",
    salaryRange: [0, 300000],
    experience: "",
  },
  loading: false,
  error: null,
};

// Async thunk to fetch jobs from API
export const fetchJobs = createAsyncThunk<Job[]>(
  "jobs/fetchJobs",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8082/api/jobs");
      if (!response.ok) {
        return thunkAPI.rejectWithValue("Failed to fetch jobs");
      }
      const data: Job[] = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch jobs");
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<Omit<Job, "id">>) => {
      const newJob: Job = {
        ...action.payload,
        id: Date.now().toString(),
        applicationsCount: 0,
        viewsCount: 0,
        status: "active",
      };
      state.jobs.push(newJob);
    },
    updateJob: (state, action: PayloadAction<{ id: string; updates: Partial<Job> }>) => {
      const { id, updates } = action.payload;
      const jobIndex = state.jobs.findIndex((job) => job.id === id);
      if (jobIndex !== -1) {
        state.jobs[jobIndex] = { ...state.jobs[jobIndex], ...updates };
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
    applyToJob: (state, action: PayloadAction<Omit<Application, "id" | "appliedDate">>) => {
      const newApplication: Application = {
        ...action.payload,
        id: Date.now().toString(),
        status: "pending",
        appliedDate: new Date().toISOString(),
      };
      state.applications.push(newApplication);

      const jobIndex = state.jobs.findIndex((job) => job.id === action.payload.jobId);
      if (jobIndex !== -1) {
        state.jobs[jobIndex].applicationsCount += 1;
      }
    },
    updateApplication: (state, action: PayloadAction<{ id: string; updates: Partial<Application> }>) => {
      const { id, updates } = action.payload;
      const applicationIndex = state.applications.findIndex((app) => app.id === id);
      if (applicationIndex !== -1) {
        state.applications[applicationIndex] = { ...state.applications[applicationIndex], ...updates };
      }
    },
    incrementJobViews: (state, action: PayloadAction<string>) => {
      const jobIndex = state.jobs.findIndex((job) => job.id === action.payload);
      if (jobIndex !== -1) {
        state.jobs[jobIndex].viewsCount += 1;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<JobsState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to load jobs";
      });
  },
});

export const {
  addJob,
  updateJob,
  deleteJob,
  applyToJob,
  updateApplication,
  incrementJobViews,
  setSearchQuery,
  setFilters,
  clearFilters,
} = jobsSlice.actions;

export default jobsSlice.reducer;
