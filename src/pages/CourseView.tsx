"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { folderApi, uploadApi, userApi } from "../services/api"
import { Play, FileText, Mail, Download } from "lucide-react"

interface Course {
  folderId: number
  courseId: number
  teacherId: number
  teacherName: string
  teacherEmail: string
  title: string
  description: string
  numberOfLessons: number
}

interface Lesson {
  folderId: number
  lessonId: number
  courseId: number
  title: string
  description: string
  audioUrl?: string
  transcriptUrl?: string
}

const CourseView: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [transcript, setTranscript] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [loadingTranscript, setLoadingTranscript] = useState(false)

  useEffect(() => {
    loadCourseAndLessons()
  }, [courseId])

  const loadCourseAndLessons = async () => {
    try {
      const folders = await folderApi.getAllFolders()

      if (!Array.isArray(folders)) {
        console.warn("לא הוחזרו תקיות תקינות מהשרת", folders)
        return
      }

      const foundCourse = folders.find((folder: any) =>
        folder.courseId === Number(courseId) &&
        folder.lessonId == null &&
        folder.teacherId != null &&
        folder.title &&
        folder.numberOfLessons != null
      )

      if (!foundCourse) {
        console.warn(`לא נמצא קורס תקני עם courseId=${courseId}`)
        setCourse(null)
        return
      }

      const teacher = await userApi.getUserById(foundCourse.teacherId)
      const teacherEmail = teacher?.email || ""

      setCourse({
        folderId: foundCourse.folderId,
        courseId: foundCourse.courseId,
        teacherId: foundCourse.teacherId,
        teacherName: foundCourse.teacherName,
        teacherEmail,
        title: foundCourse.title,
        description: foundCourse.description,
        numberOfLessons: foundCourse.numberOfLessons,
      })

      const relatedLessons = folders
        .filter((folder: any) =>
          folder.lessonId != null &&
          folder.courseId === Number(courseId)
        )
        .map((folder: any) => ({
          folderId: folder.folderId,
          lessonId: folder.lessonId,
          courseId: folder.courseId,
          title: folder.title,
          description: folder.description,
          audioUrl: folder.audioUrl,
          transcriptUrl: folder.transcriptUrl,
        }))

      setLessons(relatedLessons)
    } catch (error) {
      console.error("שגיאה בטעינת הקורס או השיעורים:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadTranscript = async (lesson: Lesson) => {
    if (!lesson.transcriptUrl) return
    setLoadingTranscript(true)
    try {
      const transcriptText = await uploadApi.getTranscript(lesson.transcriptUrl)
      setTranscript(transcriptText)
    } catch (error) {
      console.error("שגיאה בטעינת תמלול:", error)
      setTranscript("תמלול לא זמין עבור שיעור זה")
    } finally {
      setLoadingTranscript(false)
    }
  }

  const selectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    setTranscript("")
    loadTranscript(lesson)
  }


  const sendEmailToTeacher = () => {
    const email = course?.teacherEmail || "teacher@example.com"
    const subject = encodeURIComponent(`שאלה לגבי הקורס: ${course?.title || ""}`)
    const body = encodeURIComponent(
      `שלום ${course?.teacherName || "המורה"},\n\nיש לי שאלה לגבי הקורס "${course?.title || ""}".\n\nתודה,`
    )
    window.location.href = (`mailto:${email}?subject=${subject}&body=${body}`)
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <p className="text-sm text-gray-500">מורה: {course.teacherName}</p>
          </div>
          <button
            onClick={sendEmailToTeacher}
            className="flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>שלח מייל למורה</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">רשימת שיעורים</h2>
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.lessonId}
                  onClick={() => selectLesson(lesson)}
                  className={`w-full text-right p-3 rounded-md transition-colors ${
                    selectedLesson?.lessonId === lesson.lessonId
                      ? "bg-blue-100 text-blue-900 border border-blue-200"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Play className="h-4 w-4" />
                    <span className="font-medium">{lesson.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 text-right">{lesson.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedLesson ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedLesson.title}</h3>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">נגן אודיו יוצג כאן</p>
                  <p className="text-sm text-gray-500 mt-2">(הקלטה תורד מ-AWS S3)</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2 space-x-reverse">
                    <FileText className="h-5 w-5" />
                    <span>תמלול אוטומטי</span>
                  </h3>
                  {transcript && (
                    <button className="flex items-center space-x-1 space-x-reverse text-blue-600 hover:text-blue-700">
                      <Download className="h-4 w-4" />
                      <span>הורד תמלול</span>
                    </button>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  {loadingTranscript ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="mr-2 text-gray-600">טוען תמלול...</span>
                    </div>
                  ) : transcript ? (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{transcript}</p>
                  ) : (
                    <p className="text-gray-500 text-center py-8">בחר שיעור כדי לצפות בתמלול</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center py-12">
                <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">בחר שיעור</h3>
                <p className="text-gray-600">בחר שיעור מהרשימה כדי להתחיל לצפות</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseView
