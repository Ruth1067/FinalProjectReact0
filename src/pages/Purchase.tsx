"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { folderApi } from "../services/api"
import { CreditCard, Check, ArrowRight } from "lucide-react"

interface Course {
  folderId: number
  courseId: number
  teacherId: number
  teacherName: string
  title: string
  description: string
  numberOfLessons: number
  price?: number
}

const Purchase: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [purchased, setPurchased] = useState(false)

  useEffect(() => {
    loadCourse()
  }, [courseId])

  const loadCourse = async () => {
    try {
      const folders = await folderApi.getAllFolders()
      const foundCourse = folders.find((folder: Course) => folder.courseId === Number.parseInt(courseId || "0"))
      if (foundCourse) {
        setCourse({
          ...foundCourse,
          price: Math.floor(Math.random() * 500) + 100, // Mock price
        })
      }
    } catch (error) {
      console.error("Error loading course:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    setPurchasing(true)

    // Simulate purchase process
    setTimeout(() => {
      setPurchasing(false)
      setPurchased(true)

      // Redirect to course after 2 seconds
      setTimeout(() => {
        navigate(`/course/${courseId}`)
      }, 2000)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">קורס לא נמצא</h3>
        <p className="text-gray-600">הקורס המבוקש אינו קיים במערכת</p>
      </div>
    )
  }

  if (purchased) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">רכישה הושלמה!</h2>
          <p className="text-gray-600 mb-4">הקורס "{course.title}" נרכש בהצלחה</p>
          <p className="text-sm text-gray-500">מעביר אותך לקורס בעוד כמה שניות...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Course Info */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>מורה: {course.teacherName}</span>
            <span>{course.numberOfLessons} שיעורים</span>
          </div>
        </div>

        {/* Purchase Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">פרטי הרכישה</h2>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">מחיר הקורס:</span>
              <span className="text-2xl font-bold text-gray-900">₪{course.price}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>כולל גישה לכל השיעורים</span>
              <span>תשלום חד פעמי</span>
            </div>
          </div>

          {/* Mock Payment Form */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900">פרטי תשלום</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">תוקף</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            disabled={purchasing}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
          >
            {purchasing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>מעבד תשלום...</span>
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5" />
                <span>אישור רכישה - ₪{course.price}</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">זוהי רכישה פיקטיבית למטרות הדגמה בלבד</p>
        </div>
      </div>
    </div>
  )
}

export default Purchase
