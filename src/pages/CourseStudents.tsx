"use client"

import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { folderApi } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import { Users, ArrowLeft } from "lucide-react"
import { title } from "process"

interface Student {
  id: number
  userName: string
  email: string
}

const CourseStudents: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>()
  const { title } = useParams<{ title: string }>()
  // const { course } = useAuth()
  const { user } = useAuth()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!folderId) return

    const loadStudents = async () => {
      setLoading(true)
      setError(null)

      try {
        const fetchedStudents = await folderApi.getCourseStudents(Number(folderId))
        setStudents(fetchedStudents)
      } catch (e) {
        setError("אירעה שגיאה בטעינת רשימת התלמידים")
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [folderId])

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
        <span>תלמידים בקורס {folderId}</span>
      </h1>

      {students.length === 0 ? (
        <p>עדיין אין תלמידים רשומים לקורס זה.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {students.map((student) => (
            <li key={student.id} className="py-3 flex justify-between">
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
// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { useParams, Link } from "react-router-dom"
// import { folderApi } from "../services/api"
// import { useAuth } from "../contexts/AuthContext"
// import { Users, ArrowLeft, User, Mail } from "lucide-react"

// interface Student {
//   id: number
//   userName: string
//   email: string
// }

// const CourseStudents: React.FC = () => {
//   const { folderId } = useParams<{ folderId: string }>()
//   const { user } = useAuth()
//   const [students, setStudents] = useState<Student[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     if (!folderId) return

//     const loadStudents = async () => {
//       setLoading(true)
//       setError(null)

//       try {
//         const fetchedStudents = await folderApi.getCourseStudents(Number(folderId))
//         setStudents(fetchedStudents)
//       } catch (e) {
//         setError("אירעה שגיאה בטעינת רשימת התלמידים")
//         console.error(e)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadStudents()
//   }, [folderId])

//   if (!user || user.role !== "Teacher") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Users className="h-8 w-8 text-red-600" />
//           </div>
//           <h2 className="text-xl font-bold text-gray-900 mb-2">אין הרשאות</h2>
//           <p className="text-gray-600 mb-6">אין לך הרשאות לצפות בדף זה.</p>
//           <Link
//             to="/my-courses"
//             className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
//           >
//             <ArrowLeft className="h-4 w-4 ml-2" />
//             חזור לקורסים שלי
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Users className="h-8 w-8 text-red-600" />
//           </div>
//           <h2 className="text-xl font-bold text-gray-900 mb-2">שגיאה</h2>
//           <p className="text-red-600 mb-6">{error}</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-6">
//         <Link
//           to="/my-courses"
//           className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
//         >
//           <ArrowLeft className="h-4 w-4 ml-2" />
//           חזרה לקורסים שלי
//         </Link>
//       </div>

//       <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
//         <div className="flex items-center space-x-4 space-x-reverse mb-8">
//           <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
//             <Users className="h-6 w-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">תלמידים בקורס #{folderId}</h1>
//             <p className="text-gray-600">רשימת התלמידים הרשומים לקורס</p>
//           </div>
//         </div>

//         {students.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="h-8 w-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">אין תלמידים רשומים</h3>
//             <p className="text-gray-600">עדיין אין תלמידים רשומים לקורס זה.</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {students.map((student) => (
//               <div
//                 key={student.id}
//                 className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
//               >
//                 <div className="flex items-center space-x-3 space-x-reverse">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
//                     <User className="h-5 w-5 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{student.userName}</h3>
//                     <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600">
//                       <Mail className="h-3 w-3" />
//                       <span>{student.email}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CourseStudents
