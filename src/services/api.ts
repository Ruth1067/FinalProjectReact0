import axios from "axios"

const API_BASE_URL = "https://localhost:7183"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post("/api/auth/login", credentials)
    return response.data
  },
  register: async (userData: any) => {
    const response = await api.post("/api/auth/register", userData)
    return response.data
  },
  getProfile: async () => {
    const response = await api.get("/api/auth/profile")
    return response.data
  },
}

export const folderApi = {
  getAllFolders: async () => {
    const response = await api.get("/api/folder")
    return response.data
  },
  addCourse: async (courseData: any) => {
    const response = await api.post("/api/folder/add-folder", courseData)
    return response.data
  },
  addLesson: async (lessonData: any) => {
    const response = await api.post("/api/folder/add-lesson", lessonData)
    return response.data
  },
  getFolderById: async (id: number) => {
    const response = await api.get(`/api/folder/${id}`)
    return response.data
  },
}

export const uploadApi = {
  uploadFile: async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    const response = await api.post("/upload/upload-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data.data
  },
  getTranscript: async (fileName: string) => {
    const response = await api.get(`/upload/transcript?fileName=${fileName}`)
    return response.data
  },
}

export const userApi = {
  getUserCourses: async (userId: number) => {
    const response = await api.get(`/api/user/${userId}/folders`)
    return response.data.data
  },
  getCourseStudents: async (courseId: number) => {
    const response = await api.get(`/api/user/${courseId}/usersFolders`)
    return response.data
  },
}

export default api
