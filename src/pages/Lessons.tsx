import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { folderApi } from "../services/api"
import { BookOpen, Video } from "lucide-react"

interface Folder {
  folderId: number
  courseId: number
  teacherId: number
  teacherName: string
  title: string
  description: string
  numberOfLessons: number
  categoryId: number
  lessonId: number | null
  price: number | null
}

const Lessons: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const [lessons, setLessons] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!courseId) return

    const loadLessons = async () => {
      try {
        const folders = await folderApi.getAllFolders()
        const filtered = folders.filter((folder: Folder) =>
          folder.courseId === Number(courseId) &&
          folder.lessonId !== null &&
          folder.price !== null
        )
        setLessons(filtered)
      } catch (err) {
        console.error("Error loading lessons:", err)
      } finally {
        setLoading(false)
      }
    }

    loadLessons()
  }, [courseId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">שיעורים בקורס {courseId}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.folderId} className="bg-white border shadow-sm rounded-lg p-6">
            <div className="flex items-center space-x-2 space-x-reverse mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                <p className="text-sm text-gray-600">{lesson.teacherName}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4">{lesson.description}</p>

            {lesson.lessonId ? (
              <Link
                to={`/lesson/${lesson.folderId}`}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex justify-center items-center space-x-1 space-x-reverse"
              >
                <Video className="h-4 w-4" />
                <span>צפייה בהקלטה</span>
              </Link>
            ) : (
              <p className="text-sm text-gray-400 text-center">שיעור לא זמין</p>
            )}
          </div>
        ))}
      </div>

      {lessons.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-medium">אין שיעורים זמינים לקורס זה</h3>
        </div>
      )}
    </div>
  )
}

export default Lessons
