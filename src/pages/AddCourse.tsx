"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { folderApi } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import { BookOpen, Save, AlertCircle, CheckCircle } from "lucide-react"

const AddCourse: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    categoryId: 1,
    courseId: 0, // יתעדכן אוטומטית
    title: "",
    description: "",
    price: 0,
  })

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allFolders = await folderApi.getAllFolders()
        const cat = allFolders.filter((f: any) => f.categoryId && !f.courseId)
        const formatted = cat.map((c: any) => ({
          id: c.categoryId,
          name: c.title,
        }))
        setCategories(formatted)
        if (formatted.length > 0) {
          setFormData((prev) => ({
            ...prev,
            categoryId: formatted[0].id,
          }))
        }
      } catch (err) {
        console.error("שגיאה בשליפת קטגוריות", err)
        setError("לא ניתן לטעון קטגוריות")
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchNextCourseId = async () => {
      try {
        const allFolders = await folderApi.getAllFolders()
        const courses = allFolders.filter(
          (f: any) => f.categoryId && f.courseId && f.teacherId && !f.lessonId
        )
        const maxCourseId = courses.reduce((max: number, course: any) => {
          return course.courseId > max ? course.courseId : max
        }, 0)
        setFormData((prev) => ({
          ...prev,
          courseId: maxCourseId + 1,
        }))
      } catch (err) {
        console.error("שגיאה בחישוב מזהה הקורס", err)
        setError("לא ניתן לחשב מזהה קורס חדש")
      }
    }

    fetchNextCourseId()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const courseData = {
        categoryId: Number(formData.categoryId),
        courseId: formData.courseId,
        teacherId: user?.userId,
        teacherName: user?.userName,
        title: formData.title,
        description: formData.description,
        numberOfLessons: 0,
        // price: Number(formData.price), // כולל מחיר בקורס
      }

      console.log("courseData:", courseData)
      await folderApi.addCourse(courseData)
      setSuccess(true)

      setTimeout(() => {
        navigate("/my-courses")
      }, 2000)
    } catch (err: any) {
      setError("שגיאה ביצירת הקורס. אנא נסה שוב.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    })
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">הקורס נוצר בהצלחה!</h2>
          <p className="text-gray-600 mb-4">הקורס "{formData.title}" נוצר ונשמר במערכת</p>
          <p className="text-sm text-gray-500">מעביר אותך לרשימת הקורסים שלך...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center space-x-3 space-x-reverse mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">הוספת קורס חדש</h1>
            <p className="text-gray-600">צור קורס חדש ותתחיל ללמד</p>
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
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              קטגוריה
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              שם הקורס
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="הכנס שם לקורס"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              תיאור הקורס
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="תאר את הקורס ומה התלמידים ילמדו בו"
            />
          </div>

          {/* שדה מחיר */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              מחיר הקורס (בשקלים)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              required
              value={formData.price}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="הכנס מחיר בקורס"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-sm text-blue-800">
              <strong>שים לב:</strong> מספר השיעורים יתעדכן אוטומטית כאשר תוסיף שיעורים לקורס.
            </p>
          </div>

          <div className="flex space-x-3 space-x-reverse">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>יוצר קורס...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>צור קורס</span>
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

export default AddCourse
