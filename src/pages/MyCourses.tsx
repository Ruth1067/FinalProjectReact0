// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { folderApi, userApi } from "../services/api"
// import { useAuth } from "../contexts/AuthContext"
// import { BookOpen, Users, Play } from "lucide-react"

// interface Course {
//   folderId: number
//   courseId: number
//   teacherId: number
//   teacherName: string
//   title: string
//   description: string
//   numberOfLessons: number
//   categoryId: number
// }

// const MyCourses: React.FC = () => {
//   const { user } = useAuth()
//   const [courses, setCourses] = useState<Course[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     loadMyCourses()
//   }, [user])

//   const loadMyCourses = async () => {
//     try {
//       if (user?.role === "Teacher") {
//         // Load courses created by teacher
//         const userCourses = await userApi.getUserCourses(user.userId)
//         setCourses(userCourses)
//       } else {
//         // Load purchased courses for student (mock data for now)
//         const allFolders = await folderApi.getAllFolders()
//         // Mock: show first 2 courses as purchased
//         setCourses(allFolders.slice(0, 2))
//       }
//     } catch (error) {
//       console.error("Error loading my courses:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">
//           {user?.role === "Teacher" ? "הקורסים שיצרתי" : "הקורסים שלי"}
//         </h1>
//         <p className="mt-2 text-gray-600">
//           {user?.role === "Teacher" ? "נהל את הקורסים שיצרת וצפה בתלמידים הרשומים" : "הקורסים שרכשת וזמינים לצפייה"}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map((course) => (
//           <div key={course.folderId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//             <div className="p-6">
//               <div className="flex items-center space-x-2 space-x-reverse mb-3">
//                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                   <BookOpen className="h-5 w-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
//                   <p className="text-sm text-gray-600">{course.teacherName}</p>
//                 </div>
//               </div>

//               <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

//               <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mb-4">
//                 <span>{course.numberOfLessons} שיעורים</span>
//                 <span>קטגוריה {course.categoryId}</span>
//               </div>

//               <div className="flex space-x-2 space-x-reverse">
//                 <Link
//                   to={`/course/${course.courseId}`}
//                   className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
//                 >
//                   <Play className="h-4 w-4" />
//                   <span>צפה בקורס</span>
//                 </Link>

//                 {user?.role === "Teacher" && (
//                   <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1 space-x-reverse">
//                     <Users className="h-4 w-4" />
//                     <span>תלמידים</span>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {courses.length === 0 && (
//         <div className="text-center py-12">
//           <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             {user?.role === "Teacher" ? "עדיין לא יצרת קורסים" : "עדיין לא רכשת קורסים"}
//           </h3>
//           <p className="text-gray-600 mb-4">
//             {user?.role === "Teacher"
//               ? "התחל ליצור קורסים ולשתף את הידע שלך"
//               : "עיין בקטגוריות השונות ורכוש קורסים מעניינים"}
//           </p>
//           <Link
//             to={user?.role === "Teacher" ? "/add-course" : "/categories"}
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//           >
//             {user?.role === "Teacher" ? "צור קורס חדש" : "עיין בקורסים"}
//           </Link>
//         </div>
//       )}
//     </div>
//   )
// }

// export default MyCourses
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { folderApi, userApi } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import { BookOpen, Users, Play } from "lucide-react"

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

const MyCourses: React.FC = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMyCourses()
  }, [user])

  const loadMyCourses = async () => {
    try {
      if (user?.role === "Teacher") {
        const userCourses = await userApi.getUserCourses(user.userId)
        if (Array.isArray(userCourses)) {
          const validCourses = userCourses.filter(course => course && typeof course === "object")
          setCourses(validCourses)
        } else {
          console.warn("Expected array from getUserCourses, got:", userCourses)
          setCourses([])
        }
      } else {
        const allFolders = await folderApi.getAllFolders()
        if (Array.isArray(allFolders)) {
          const validFolders = allFolders.filter(folder => folder && typeof folder === "object").slice(0, 2)
          setCourses(validFolders)
        } else {
          console.warn("Expected array from getAllFolders, got:", allFolders)
          setCourses([])
        }
      }
    } catch (error) {
      console.error("Error loading my courses:", error)
      setCourses([])
    } finally {
      setLoading(false)
    }
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
        <h1 className="text-3xl font-bold text-gray-900">
          {user?.role === "Teacher" ? "הקורסים שיצרתי" : "הקורסים שלי"}
        </h1>
        <p className="mt-2 text-gray-600">
          {user?.role === "Teacher" ? "נהל את הקורסים שיצרת וצפה בתלמידים הרשומים" : "הקורסים שרכשת וזמינים לצפייה"}
        </p>
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
                  <p className="text-sm text-gray-600">{course.teacherName}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

              <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mb-4">
                <span>{course.numberOfLessons} שיעורים</span>
                <span>קטגוריה {course.categoryId}</span>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                <Link
                  to={`/course/${course.courseId}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
                >
                  <Play className="h-4 w-4" />
                  <span>צפה בקורס</span>
                </Link>

                {user?.role === "Teacher" && (
                  <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1 space-x-reverse">
                    <Users className="h-4 w-4" />
                    <span>תלמידים</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {user?.role === "Teacher" ? "עדיין לא יצרת קורסים" : "עדיין לא רכשת קורסים"}
          </h3>
          <p className="text-gray-600 mb-4">
            {user?.role === "Teacher"
              ? "התחל ליצור קורסים ולשתף את הידע שלך"
              : "עיין בקטגוריות השונות ורכוש קורסים מעניינים"}
          </p>
          <Link
            to={user?.role === "Teacher" ? "/add-course" : "/categories"}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {user?.role === "Teacher" ? "צור קורס חדש" : "עיין בקורסים"}
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyCourses
