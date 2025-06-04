// "use client"

// import React, { useEffect, useState } from "react"
// import { useParams, Link } from "react-router-dom"
// import { folderApi, userApi } from "../services/api"
// import { useAuth } from "../contexts/AuthContext"
// import { Users, ArrowLeft } from "lucide-react"

// interface Student {
//   userId: number
//   userName: string
//   email: string
// }

// const CourseStudents: React.FC = () => {
//   const { courseId } = useParams<{ courseId: string }>()
//   const { user } = useAuth()
//   const [students, setStudents] = useState<Student[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     if (!courseId) return

//     const loadStudents = async () => {
//       try {
//         // כאן קוראים לפונקציה של ה-API שמחזירה את רשימת התלמידים שרכשו את הקורס
//         const allStudents = await userApi.getCourseStudents(Number(courseId))

//         // ניתן להוסיף סינון לפי הצורך, למשל רק תלמידים שרכשו
//         setStudents(allStudents)
//       } catch (err) {
//         setError("אירעה שגיאה בטעינת רשימת התלמידים")
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadStudents()
//   }, [courseId])

//   if (!user || user.role !== "Teacher") {
//     return (
//       <div className="p-6 text-center">
//         <p>אין לך הרשאות לצפות בדף זה.</p>
//         <Link to="/my-courses" className="text-blue-600 underline mt-4 inline-block">
//           חזור לקורסים שלי
//         </Link>
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-600">
//         <p>{error}</p>
//       </div>
//     )
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <Link to="/my-courses" className="flex items-center text-blue-600 mb-6">
//         <ArrowLeft className="mr-2" />
//         חזרה לקורסים שלי
//       </Link>

//       <h1 className="text-2xl font-bold mb-4 flex items-center space-x-2 space-x-reverse">
//         <Users className="h-6 w-6" />
//         <span>תלמידים בקורס #{courseId}</span>
//       </h1>

//       {students.length === 0 ? (
//         <p>עדיין אין תלמידים רשומים לקורס זה.</p>
//       ) : (
//         <ul className="divide-y divide-gray-200">
//           {students.map((student) => (
//             <li key={student.userId} className="py-3 flex justify-between">
//               <span>{student.userName}</span>
//               <span className="text-gray-500 text-sm">{student.email}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }

// export default CourseStudents
"use client"

import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { userApi } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import { Users, ArrowLeft } from "lucide-react"

interface Student {
  userId: number
  userName: string
  email: string
}

const CourseStudents: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const { user } = useAuth()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) return

    const loadStudents = async () => {
      setLoading(true)
      setError(null)

      try {
        const fetchedStudents = await userApi.getCourseStudents(Number(courseId))
        setStudents(fetchedStudents)
      } catch (e) {
        setError("אירעה שגיאה בטעינת רשימת התלמידים")
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [courseId])

  if (!user || user.role !== "Teacher") {
    return (
      <div className="p-6 text-center">
        <p>אין לך הרשאות לצפות בדף זה.</p>
        <Link to="/my-courses" className="text-blue-600 underline mt-4 inline-block">
          חזור לקורסים שלי
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/my-courses" className="flex items-center text-blue-600 mb-6">
        <ArrowLeft className="mr-2" />
        חזרה לקורסים שלי
      </Link>

      <h1 className="text-2xl font-bold mb-4 flex items-center space-x-2 space-x-reverse">
        <Users className="h-6 w-6" />
        <span>תלמידים בקורס #{courseId}</span>
      </h1>

      {students.length === 0 ? (
        <p>עדיין אין תלמידים רשומים לקורס זה.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {students.map((student) => (
            <li key={student.userId} className="py-3 flex justify-between">
              <span>{student.userName}</span>
              <span className="text-gray-500 text-sm">{student.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CourseStudents
