// "use client"

// import React, { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { folderApi } from "../services/api"
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
//   isPurchased?: boolean
//   price: number
// }

// const MyCourses: React.FC = () => {
//   const { user } = useAuth()
//   if (!user) return null
  
//   const [courses, setCourses] = useState<Course[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (user) {
//       loadMyCourses()
//     }
//   }, [user])

//   // const loadMyCourses = async () => {
//   //   setLoading(true)
//   //   try {
//   //     const folders = await folderApi.getAllFolders()

//   //     const allCourses = folders.filter((folder: any) =>
//   //       folder.courseId != null &&
//   //       // folder.lessonId == null &&
//   //       folder.teacherId != null &&
//   //       folder.title 
//   //       // folder.price != null
//   //     )

//   //     let filteredCourses: Course[] = []

//   //     if (user.role === "Teacher") {
//   //       filteredCourses = allCourses.filter(
//   //         (course: { teacherId: number }) => course.teacherId === user.userId
//   //       )
//   //     } else {
//   //       filteredCourses = allCourses.filter(
//   //         (course: { courseId: number }) =>
//   //           localStorage.getItem(`purchased_course_${course.courseId}`) === "true"
//   //       )
//   //     }

//   //     setCourses(filteredCourses)
//   //   } catch (error) {
//   //     console.error("Error loading courses:", error)
//   //     setCourses([])
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // }
//   const loadMyCourses = async () => {
//     setLoading(true)
//     try {
//       const folders = await folderApi.getAllFolders()
  
//       const allCourses = folders.filter((folder: any) =>
//         folder.courseId != null &&
//         folder.teacherId != null &&
//         folder.title && 
//         folder.lessonId == null
//       )
  
//       let filteredCourses: Course[] = []
  
//       if (user.role === "Teacher") {
//         filteredCourses = allCourses.filter(
//           (course: { teacherId: number }) => course.teacherId === user.userId
//         )
//       } else {
//         // כאן נבדוק אם כל קורס נרכש על ידי התלמיד
//         const purchasedCourses = await Promise.all(allCourses.map(async (course: { folderId: number }) => {
//           const isPurchased = await folderApi.checkIfCoursePurchased(course.folderId);
//           return isPurchased ? course : null;
//         }));
  
//         // מסננים את הקורסים שנרכשו
//         filteredCourses = purchasedCourses.filter(course => course !== null);
//       }
  
//       setCourses(filteredCourses)
//     } catch (error) {
//       console.error("Error loading courses:", error)
//       setCourses([])
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
//           {user?.role === "Teacher"
//             ? "נהל את הקורסים שיצרת וצפה בתלמידים הרשומים"
//             : "הקורסים שרכשת וזמינים לצפייה"}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map((course) => (
//           <div
//             key={course.folderId}
//             className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
//           >
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
//                 {/* <span>{course.numberOfLessons} שיעורים</span> */}
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
//                   <Link
//                     to={`/course/${course.folderId}/students`}
//                     className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1 space-x-reverse"
//                   >
//                     <Users className="h-4 w-4" />
//                     <span>תלמידים</span>
//                   </Link>
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
// // "use client"

// // import React, { useState, useEffect } from "react"
// // import { Link } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { useAuth } from "../contexts/AuthContext"
// // import { BookOpen, Users, Play } from "lucide-react"

// // interface Course {
// //   folderId: number
// //   courseId: number
// //   teacherId: number
// //   teacherName: string
// //   title: string
// //   description: string
// //   numberOfLessons: number
// //   categoryId: number
// //   isPurchased?: boolean
// //   price: number
// // }

// // const MyCourses: React.FC = () => {
// //   const { user } = useAuth()
// //   if (!user) return null
  
// //   const [courses, setCourses] = useState<Course[]>([])
// //   const [loading, setLoading] = useState(true)
// //   // const [sendingEmailId, setSendingEmailId] = useState<number | null>(null)

// //   useEffect(() => {
// //     if (user) {
// //       loadMyCourses()
// //     }
// //   }, [user])

// //   const loadMyCourses = async () => {
// //     setLoading(true)
// //     try {
// //       const folders = await folderApi.getAllFolders()

// //       const allCourses = folders.filter((folder: any) =>
// //         folder.courseId != null &&
// //         folder.teacherId != null &&
// //         folder.title 
// //       )

// //       let filteredCourses: Course[] = []

// //       if (user.role === "Teacher") {
// //         filteredCourses = allCourses.filter(
// //           (course: { teacherId: number }) => course.teacherId === user.userId
// //         )
// //       } else {
// //         filteredCourses = allCourses.filter(
// //           (course: { courseId: number }) =>
// //             localStorage.getItem(`purchased_course_${course.courseId}`) === "true"
// //         )
// //       }

// //       setCourses(filteredCourses)
// //     } catch (error) {
// //       console.error("Error loading courses:", error)
// //       setCourses([])
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // פונקציה לשליחת מייל למורה
// //   // const handleSendEmail = async (folderId: number) => {
// //   //   try {
// //   //     setSendingEmailId(folderId)
// //   //     await folderApi.sendTeacherEmail(folderId)
// //   //     alert("המייל נשלח בהצלחה למורה")
// //   //   } catch (error) {
// //   //     console.error("שגיאה בשליחת מייל למורה:", error)
// //   //     alert("אירעה שגיאה בשליחת המייל")
// //   //   } finally {
// //   //     setSendingEmailId(null)
// //   //   }
// //   // }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-8">
// //       <div>
// //         <h1 className="text-3xl font-bold text-gray-900">
// //           {user?.role === "Teacher" ? "הקורסים שיצרתי" : "הקורסים שלי"}
// //         </h1>
// //         <p className="mt-2 text-gray-600">
// //           {user?.role === "Teacher"
// //             ? "נהל את הקורסים שיצרת וצפה בתלמידים הרשומים"
// //             : "הקורסים שרכשת וזמינים לצפייה"}
// //         </p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {courses.map((course) => (
// //           <div
// //             key={course.folderId}
// //             className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
// //           >
// //             <div className="p-6">
// //               <div className="flex items-center space-x-2 space-x-reverse mb-3">
// //                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
// //                   <BookOpen className="h-5 w-5 text-blue-600" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
// //                   <p className="text-sm text-gray-600">{course.teacherName}</p>
// //                 </div>
// //               </div>

// //               <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

// //               <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mb-4">
// //                 <span>{course.numberOfLessons} שיעורים</span>
// //                 <span>קטגוריה {course.categoryId}</span>
// //               </div>

// //               <div className="flex space-x-2 space-x-reverse">
// //                 <Link
// //                   to={`/course/${course.courseId}`}
// //                   className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
// //                 >
// //                   <Play className="h-4 w-4" />
// //                   <span>צפה בקורס</span>
// //                 </Link>

// //                 {user?.role === "Teacher" && (
// //                   <Link
// //                     to={`/course/${course.folderId}/students`}
// //                     className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1 space-x-reverse"
// //                   >
// //                     <Users className="h-4 w-4" />
// //                     <span>תלמידים</span>
// //                   </Link>
// //                 )}

// //                 {/* כפתור לשליחת מייל למורה, מופיע רק למשתמשים שאינם מורים */}
// //                 {/* {user?.role !== "Teacher" && (
// //                   <button
// //                     disabled={sendingEmailId === course.folderId}
// //                     onClick={() => handleSendEmail(course.folderId)}
// //                     className={`${
// //                       sendingEmailId === course.folderId ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
// //                     } text-white py-2 px-4 rounded-md transition-colors`}
// //                   >
// //                     {sendingEmailId === course.folderId ? "שולח..." : "שלח מייל למורה"}
// //                   </button>
// //                 )} */}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {courses.length === 0 && (
// //         <div className="text-center py-12">
// //           <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //           <h3 className="text-lg font-medium text-gray-900 mb-2">
// //             {user?.role === "Teacher" ? "עדיין לא יצרת קורסים" : "עדיין לא רכשת קורסים"}
// //           </h3>
// //           <p className="text-gray-600 mb-4">
// //             {user?.role === "Teacher"
// //               ? "התחל ליצור קורסים ולשתף את הידע שלך"
// //               : "עיין בקטגוריות השונות ורכוש קורסים מעניינים"}
// //           </p>
// //           <Link
// //             to={user?.role === "Teacher" ? "/add-course" : "/categories"}
// //             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
// //           >
// //             {user?.role === "Teacher" ? "צור קורס חדש" : "עיין בקורסים"}
// //           </Link>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default MyCourses
"use client"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { folderApi } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import { BookOpen, Users, Play, Pencil, Trash } from "lucide-react"

interface Course {
  folderId: number
  courseId: number
  teacherId: number
  teacherName: string
  title: string
  description: string
  numberOfLessons: number
  categoryId: number
  isPurchased?: boolean
  price: number
}

const MyCourses: React.FC = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) loadMyCourses()
  }, [user])

  const loadMyCourses = async () => {
    setLoading(true)
    try {
      const folders = await folderApi.getAllFolders()

      const allCourses = folders.filter((folder: any) =>
        folder.courseId != null &&
        folder.teacherId != null &&
        folder.title &&
        folder.lessonId == null
      )

      let filteredCourses: Course[] = []

      if (user!.role === "Teacher") {
        filteredCourses = allCourses.filter(
          (course: { teacherId: number }) => course.teacherId === user!.userId
        )
      } else {
        const purchasedCourses = await Promise.all(
          allCourses.map(async (course: { folderId: number }) => {
            const isPurchased = await folderApi.checkIfCoursePurchased(course.folderId)
            return isPurchased ? course : null
          })
        )
        filteredCourses = purchasedCourses.filter(Boolean) as Course[]
      }

      setCourses(filteredCourses)
    } catch (error) {
      console.error("Error loading courses:", error)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (course: Course) => {
    // כאן אפשר לפתוח מודל או לנווט לדף עריכה
    alert(`עריכת הקורס "${course.title}" (כדאי לממש /edit-course/${course.folderId})`)
  }

  const handleDelete = async (course: Course) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את הקורס "${course.title}"?`)) return

    try {
      await folderApi.deleteCourse(course.folderId)
      setCourses(prev => prev.filter(c => c.folderId !== course.folderId))
    } catch (error) {
      console.error("שגיאה במחיקת הקורס:", error)
      alert("אירעה שגיאה במחיקת הקורס")
    }
  }

  if (!user) return null

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">
          {user.role === "Teacher" ? "הקורסים שיצרתי" : "הקורסים שלי"}
        </h1>
        <p className="mt-2 text-gray-600">
          {user.role === "Teacher"
            ? "נהל את הקורסים שיצרת וצפה בתלמידים הרשומים"
            : "הקורסים שרכשת וזמינים לצפייה"}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.folderId}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
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

                {user.role === "Teacher" && (
                  <Link
                    to={`/course/${course.folderId}/students`}
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1 space-x-reverse"
                  >
                    <Users className="h-4 w-4" />
                    <span>תלמידים</span>
                  </Link>
                )}
              </div>

              {user.role === "Teacher" && (
                <div className="flex space-x-2 space-x-reverse mt-3">
                  <button
                    onClick={() => handleEdit(course)}
                    className="flex-1 bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
                  >
                    <Pencil className="h-4 w-4" />
                    <span>ערוך</span>
                  </button>

                  <button
                    onClick={() => handleDelete(course)}
                    className="flex-1 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
                  >
                    <Trash className="h-4 w-4" />
                    <span>מחק</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {user.role === "Teacher" ? "עדיין לא יצרת קורסים" : "עדיין לא רכשת קורסים"}
          </h3>
          <p className="text-gray-600 mb-4">
            {user.role === "Teacher"
              ? "התחל ליצור קורסים ולשתף את הידע שלך"
              : "עיין בקטגוריות השונות ורכוש קורסים מעניינים"}
          </p>
          <Link
            to={user.role === "Teacher" ? "/add-course" : "/categories"}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {user.role === "Teacher" ? "צור קורס חדש" : "עיין בקורסים"}
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyCourses
