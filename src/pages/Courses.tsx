"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { folderApi } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import { BookOpen, User, Clock, ShoppingCart } from "lucide-react"

interface Course {
  folderId: number
  courseId: number
  teacherId: number
  teacherName: string
  title: string
  description: string
  numberOfLessons: number
  categoryId: number
}

const Courses: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourses()
  }, [categoryId])

  const loadCourses = async () => {
    try {
      const folders = await folderApi.getAllFolders()
      const filteredCourses = folders.filter(
        (folder: Course) => folder.categoryId === Number.parseInt(categoryId || "0") && folder.courseId,
      )
      setCourses(filteredCourses)
    } catch (error) {
      console.error("Error loading courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const canAccessCourse = (course: Course) => {
    return user?.role === "Teacher" && course.teacherId === user.userId
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">קורסים בקטגוריה {categoryId}</h1>
        <p className="mt-2 text-gray-600">בחר קורס כדי לצפות בפרטים או לרכוש</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.folderId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-2 space-x-reverse mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{course.teacherName}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

              <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Clock className="h-4 w-4" />
                  <span>{course.numberOfLessons} שיעורים</span>
                </div>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                {canAccessCourse(course) ? (
                  <Link
                    to={`/course/${course.courseId}`}
                    className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    כניסה לקורס
                  </Link>
                ) : (
                  <Link
                    to={`/purchase/${course.courseId}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>לרכישה</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">אין קורסים זמינים</h3>
          <p className="text-gray-600">בקרוב יתווספו קורסים חדשים לקטגוריה זו</p>
        </div>
      )}
    </div>
  )
}

export default Courses
