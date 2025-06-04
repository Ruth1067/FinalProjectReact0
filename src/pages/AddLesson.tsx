"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { folderApi, uploadApi, userApi } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import { Upload, Save, AlertCircle, CheckCircle, FileAudio } from "lucide-react"
import axios from "axios"

interface Course {
  folderId: number
  courseId: number
  title: string
}

const AddLesson: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [myCourses, setMyCourses] = useState<Course[]>([])
  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    description: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadMyCourses()
  }, [user])

  const loadMyCourses = async () => {
    try {
      if (user?.userId) {
        const courses = await userApi.getUserCourses(user.userId)
        console.log("courses from server:", courses)
        setMyCourses(courses)
      }
    } catch (error) {
      console.error("Error loading my courses:", error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check if file is audio
      if (file.type.startsWith("audio/")) {
        setSelectedFile(file)
        setError("")
      } else {
        setError("אנא בחר קובץ אודיו בלבד")
        setSelectedFile(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!selectedFile) {
      setError("אנא בחר קובץ אודיו")
      setLoading(false)
      return
    }

    try {
      // Upload file to AWS
      setUploading(true)
      await uploadApi.uploadFile(selectedFile)
      setUploading(false)

      // Create lesson record
      const lessonData = {
        categoryId: 1, // Will be determined by course
        courseId: Number.parseInt(formData.courseId),
        lessonId: Date.now(), // Generate unique lesson ID
        teacherId: user?.userId,
        teacherName: user?.userName,
        title: formData.title,
        description: formData.description,
      }
      
      console.log(lessonData)    
      await folderApi.addLesson(lessonData)
      setSuccess(true)

      setTimeout(() => {
        navigate("/my-courses")
      }, 2000)
    } 
    // catch (err: any) {
    //   setError("שגיאה בהוספת השיעור. אנא נסה שוב.")
    // } 
    catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.log(err.response.data?.message || `שגיאה: ${err.response.status} ${err.response.statusText}`);
         
        } else if (err.request) {
          console.log("לא התקבלה תגובה מהשרת. אנא בדוק את החיבור שלך.");
        } else {
          console.log("שגיאה לא ידועה: " + err.message);
        }
      } else {
        console.log("שגיאה לא צפויה: " + err);
      }
    }
    
    finally {
      setLoading(false)
      setUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">השיעור נוסף בהצלחה!</h2>
          <p className="text-gray-600 mb-4">השיעור "{formData.title}" הועלה ונשמר במערכת</p>
          <p className="text-sm text-gray-500">מעביר אותך לרשימת הקורסים שלך...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center space-x-3 space-x-reverse mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Upload className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">הוספת שיעור חדש</h1>
            <p className="text-gray-600">הוסף שיעור חדש לאחד הקורסים שלך</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center space-x-2 space-x-reverse text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-2">
              בחר קורס
            </label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleInputChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">בחר קורס...</option>
              {myCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              שם השיעור
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="הכנס שם לשיעור"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              תיאור השיעור
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="תאר את תוכן השיעור"
            />
          </div>

          <div>
            <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700 mb-2">
              קובץ הקלטה
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <FileAudio className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="audioFile"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>העלה קובץ אודיו</span>
                    <input
                      id="audioFile"
                      name="audioFile"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pr-1">או גרור ושחרר</p>
                </div>
                <p className="text-xs text-gray-500">MP3, WAV, M4A עד 100MB</p>
                {selectedFile && <p className="text-sm text-green-600 font-medium">נבחר: {selectedFile.name}</p>}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-sm text-blue-800">
              <strong>שים לב:</strong> הקובץ יועלה ל-AWS S3 ויתבצע תמלול אוטומטי של התוכן.
            </p>
          </div>

          <div className="flex space-x-3 space-x-reverse">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>מעלה קובץ...</span>
                </>
              ) : loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>שומר שיעור...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>הוסף שיעור</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/my-courses")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLesson