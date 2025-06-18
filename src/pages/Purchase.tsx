"use client"

import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { folderApi } from "../services/api"
import { CreditCard, Check, ArrowRight } from "lucide-react"

interface Course {
  folderId: number
  courseId: number
  categoryId: number
  teacherId: number
  teacherName: string
  title: string
  description: string
  numberOfLessons: number
  price?: number
  isPurched?: boolean
}

const Purchase: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [purchased, setPurchased] = useState(false)

  // שדות עבור פרטי האשראי
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  useEffect(() => {
    loadCourse()
  }, [courseId])

  const loadCourse = async () => {
    setLoading(true)
    try {
      const folders = await folderApi.getAllFolders()

      const foundCourse = folders.find(
        (folder: any) =>
          folder.courseId === Number(courseId || "0") &&
          folder.lessonId == null &&
          folder.title &&
          folder.description &&
          folder.teacherId != null &&
          folder.price != null
      )

      if (foundCourse) {
        setCourse({
          folderId: foundCourse.folderId,
          courseId: foundCourse.courseId,
          categoryId: foundCourse.categoryId,
          teacherId: foundCourse.teacherId,
          teacherName: foundCourse.teacherName,
          title: foundCourse.title,
          description: foundCourse.description,
          numberOfLessons: foundCourse.numberOfLessons,
          price: foundCourse.price,
          isPurched: false,
        })
      } else {
        setCourse(null)
      }
    } catch (error) {
      console.error("Error loading course:", error)
      setCourse(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (course?.isPurched) {
      navigate(`/course/${courseId}`)
    }
  }, [course, courseId, navigate])

  const handlePurchase = async () => {
    if (!course) return

    setPurchasing(true)
    try {
      await folderApi.purchaseFolder(course.folderId.toString())

      setPurchased(true)
      setTimeout(() => {
        navigate(`/course/${courseId}`)
      }, 2000)
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert("כבר רכשת את הקורס הזה.")
        navigate(`/course/${courseId}`)
      } else {
        alert("שגיאה בביצוע רכישה.")
      }
    } finally {
      setPurchasing(false)
    }
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
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>מורה: {course.teacherName}</span>
            <span>{course.numberOfLessons} שיעורים</span>
          </div>
        </div>

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
              {/* שדות קלט עבור פרטי האשראי */}
              <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">תוקף</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* <button
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
          </button> */}

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

          {/* <p className="text-xs text-gray-500 text-center mt-4">זוהי רכישה פיקטיבית למטרות הדגמה בלבד</p> */}
        </div>
      </div>
    </div>
  )
}

export default Purchase

// "use client"

// import React, { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { folderApi } from "../services/api"
// import { CreditCard, Check, ArrowRight } from "lucide-react"

// interface Course {
//   folderId: number
//   courseId: number
//   categoryId: number
//   teacherId: number
//   teacherName: string
//   title: string
//   description: string
//   numberOfLessons: number
//   price?: number
//   isPurched?: boolean
// }

// const Purchase: React.FC = () => {
//   const { courseId } = useParams<{ courseId: string }>()
//   const navigate = useNavigate()

//   const [course, setCourse] = useState<Course | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [purchasing, setPurchasing] = useState(false)
//   const [purchased, setPurchased] = useState(false)

//   // שדות עבור פרטי האשראי
//   const [creditCardNumber, setCreditCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');

//   useEffect(() => {
//     loadCourse()
//   }, [courseId])

//   const loadCourse = async () => {
//     setLoading(true)
//     try {
//       const folders = await folderApi.getAllFolders()

//       const foundCourse = folders.find(
//         (folder: any) =>
//           folder.courseId === Number(courseId || "0") &&
//           folder.lessonId == null &&
//           folder.title &&
//           folder.description &&
//           folder.teacherId != null &&
//           folder.price != null
//       )

//       if (foundCourse) {
//         setCourse({
//           folderId: foundCourse.folderId,
//           courseId: foundCourse.courseId,
//           categoryId: foundCourse.categoryId,
//           teacherId: foundCourse.teacherId,
//           teacherName: foundCourse.teacherName,
//           title: foundCourse.title,
//           description: foundCourse.description,
//           numberOfLessons: foundCourse.numberOfLessons,
//           price: foundCourse.price,
//           isPurched: false,
//         })
//       } else {
//         setCourse(null)
//       }
//     } catch (error) {
//       console.error("Error loading course:", error)
//       setCourse(null)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (course?.isPurched) {
//       navigate(`/course/${courseId}`)
//     }
//   }, [course, courseId, navigate])

//   const handlePurchase = async () => {
//     if (!course) return

//     setPurchasing(true)
//     try {
//       // כאן אנו מדמים רכישה ללא שליחת נתונים לשרת
//       setPurchased(true);
//       setTimeout(() => {
//         navigate(`/course/${courseId}`);
//       }, 2000);
//     } catch (error: any) {
//       alert("שגיאה בביצוע רכישה.")
//     } finally {
//       setPurchasing(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (!course) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium text-gray-900 mb-2">קורס לא נמצא</h3>
//         <p className="text-gray-600">הקורס המבוקש אינו קיים במערכת</p>
//       </div>
//     )
//   }

//   if (purchased) {
//     return (
//       <div className="max-w-md mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Check className="h-8 w-8 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">רכישה הושלמה!</h2>
//           <p className="text-gray-600 mb-4">הקורס "{course.title}" נרכש בהצלחה</p>
//           <p className="text-sm text-gray-500">מעביר אותך לקורס בעוד כמה שניות...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-6 border-b">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
//           <p className="text-gray-600 mb-4">{course.description}</p>
//           <div className="flex items-center justify-between text-sm text-gray-500">
//             <span>מורה: {course.teacherName}</span>
//             <span>{course.numberOfLessons} שיעורים</span>
//           </div>
//         </div>

//         <div className="p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">פרטי הרכישה</h2>

//           <div className="bg-gray-50 rounded-lg p-4 mb-6">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600">מחיר הקורס:</span>
//               <span className="text-2xl font-bold text-gray-900">₪{course.price}</span>
//             </div>
//             <div className="flex justify-between items-center text-sm text-gray-500">
//               <span>כולל גישה לכל השיעורים</span>
//               <span>תשלום חד פעמי</span>
//             </div>
//           </div>

//           {/* שדות קלט עבור פרטי האשראי */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
//             <input
//               type="text"
//               placeholder="1234 5678 9012 3456"
//               value={creditCardNumber}
//               onChange={(e) => setCreditCardNumber(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">תוקף</label>
//               <input
//                 type="text"
//                 placeholder="MM/YY"
//                 value={expiryDate}
//                 onChange={(e) => setExpiryDate(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
//               <input
//                 type="text"
//                 placeholder="123"
//                 value={cvv}
//                 onChange={(e) => setCvv(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>

//           <button
//             onClick={handlePurchase}
//             disabled={purchasing}
//             className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
//           >
//             {purchasing ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                 <span>מעבד תשלום...</span>
//               </>
//             ) : (
//               <>
//                 <CreditCard className="h-5 w-5" />
//                 <span>אישור רכישה - ₪{course.price}</span>
//                 <ArrowRight className="h-5 w-5" />
//               </>
//             )}
//           </button>

//           {/* <p className="text-xs text-gray-500 text-center mt-4">זוהי רכישה פיקטיבית למטרות הדגמה בלבד</p> */}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Purchase

// "use client"

// import React, { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { folderApi } from "../services/api"
// import { CreditCard, Check, ArrowRight } from "lucide-react"
// import * as jwt_decode from "jwt-decode"

// // interface DecodedToken {
// //   UserId?: string
// //   sub?: string
// //   nameid?: string
// // }

// interface Course {
//   folderId: number
//   courseId: number
//   categoryId: number
//   teacherId: number
//   teacherName: string
//   title: string
//   description: string
//   numberOfLessons: number
//   price?: number
//   isPurched?: boolean
// }

// const Purchase: React.FC = () => {
//   const { courseId } = useParams<{ courseId: string }>()
//   const navigate = useNavigate()

//   const [course, setCourse] = useState<Course | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [purchasing, setPurchasing] = useState(false)
//   const [purchased, setPurchased] = useState(false)


//   // const token = localStorage.getItem("token")
//   // let userId: string | null = null
//   // if (token) {
//   //   try {
//   //     const decoded = (jwt_decode as any).default(token);
//   //     userId = decoded.UserId || decoded.sub || decoded.nameid || null
//   //   } catch {
//   //     userId = null
//   //   }
//   // }
//   const token = localStorage.getItem("token");
//   let id: string | null = null;
//   if (token) {
//     try {
//       const decoded = (jwt_decode as any).default(token);
//       id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
//     } catch {
//       id = null;
//     }
//   }
  
//   useEffect(() => {
//     loadCourse()
//   }, [courseId])

//   const loadCourse = async () => {
//     setLoading(true)
//     try {
//       const folders = await folderApi.getAllFolders()

//       const foundCourse = folders.find(
//         (folder: any) =>
//           folder.courseId === Number(courseId || "0") &&
//           folder.lessonId == null &&
//           folder.title &&
//           folder.description &&
//           folder.teacherId != null &&
//           folder.price != null
//       )

//       if (foundCourse) {
//         setCourse({
//           folderId: foundCourse.folderId,
//           courseId: foundCourse.courseId,
//           categoryId: foundCourse.categoryId,
//           teacherId: foundCourse.teacherId,
//           teacherName: foundCourse.teacherName,
//           title: foundCourse.title,
//           description: foundCourse.description,
//           numberOfLessons: foundCourse.numberOfLessons,
//           price: foundCourse.price,
//           isPurched: false,
//         })
//       } else {
//         setCourse(null)
//       }
//     } catch (error) {
//       console.error("Error loading course:", error)
//       setCourse(null)
//     } finally {
//       setLoading(false)
//     }
//   }


//   useEffect(() => {
//     if (course?.isPurched) {
//       navigate(`/course/${courseId}`)
//     }
//   }, [course, courseId, navigate])

//   const handlePurchase = async () => {
//     console.log("JWT Token:", token);
//     if (!course) return
    
//     if (!id) {
//       alert("משתמש לא מזוהה, יש להתחבר מחדש")
//       return
//     }

//     setPurchasing(true)
//     try {
//       await folderApi.purchaseFolder(id, course.folderId.toString())

//       setPurchased(true)
//       setTimeout(() => {
//         navigate(`/course/${courseId}`)
//       }, 2000)
//     } catch (error: any) {
//       if (error.response?.status === 409) {
//         alert("כבר רכשת את הקורס הזה.")
//         navigate(`/course/${courseId}`)
//       } else {
//         alert("שגיאה בביצוע רכישה.")
//       }
//     } finally {
//       setPurchasing(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (!course) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium text-gray-900 mb-2">קורס לא נמצא</h3>
//         <p className="text-gray-600">הקורס המבוקש אינו קיים במערכת</p>
//       </div>
//     )
//   }

//   if (purchased) {
//     return (
//       <div className="max-w-md mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Check className="h-8 w-8 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">רכישה הושלמה!</h2>
//           <p className="text-gray-600 mb-4">הקורס "{course.title}" נרכש בהצלחה</p>
//           <p className="text-sm text-gray-500">מעביר אותך לקורס בעוד כמה שניות...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-6 border-b">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
//           <p className="text-gray-600 mb-4">{course.description}</p>
//           <div className="flex items-center justify-between text-sm text-gray-500">
//             <span>מורה: {course.teacherName}</span>
//             <span>{course.numberOfLessons} שיעורים</span>
//           </div>
//         </div>

//         <div className="p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">פרטי הרכישה</h2>

//           <div className="bg-gray-50 rounded-lg p-4 mb-6">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600">מחיר הקורס:</span>
//               <span className="text-2xl font-bold text-gray-900">₪{course.price}</span>
//             </div>
//             <div className="flex justify-between items-center text-sm text-gray-500">
//               <span>כולל גישה לכל השיעורים</span>
//               <span>תשלום חד פעמי</span>
//             </div>
//           </div>

//           <div className="space-y-4 mb-6">
//             <h3 className="text-lg font-medium text-gray-900">פרטי תשלום</h3>
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
//                 <input
//                   type="text"
//                   placeholder="1234 5678 9012 3456"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">תוקף</label>
//                   <input
//                     type="text"
//                     placeholder="MM/YY"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
//                   <input
//                     type="text"
//                     placeholder="123"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={handlePurchase}
//             disabled={purchasing}
//             className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
//           >
//             {purchasing ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                 <span>מעבד תשלום...</span>
//               </>
//             ) : (
//               <>
//                 <CreditCard className="h-5 w-5" />
//                 <span>אישור רכישה - ₪{course.price}</span>
//                 <ArrowRight className="h-5 w-5" />
//               </>
//             )}
//           </button>

//           <p className="text-xs text-gray-500 text-center mt-4">זוהי רכישה פיקטיבית למטרות הדגמה בלבד</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Purchase
// "use client"

// // import React, { useState, useEffect } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { CreditCard, Check, ArrowRight } from "lucide-react"
// // import jwt_decode from "jwt-decode"

// // interface Course {
// //   folderId: number
// //   courseId: number
// //   categoryId: number
// //   teacherId: number
// //   teacherName: string
// //   title: string
// //   description: string
// //   numberOfLessons: number
// //   price?: number
// //   isPurched?: boolean
// // }

// // interface DecodedToken {
// //   [claim: string]: any
// // }

// // const Purchase: React.FC = () => {
// //   const { courseId } = useParams<{ courseId: string }>()
// //   const navigate = useNavigate()

// //   const [course, setCourse] = useState<Course | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [purchasing, setPurchasing] = useState(false)
// //   const [purchased, setPurchased] = useState(false)

// //   const token = localStorage.getItem("token")
// //   let id: string | null = null
// //   if (token) {
// //     try {
// //       const decoded = jwt_decode<DecodedToken>(token)
// //       id =
// //         decoded[
// //           "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
// //         ] || null
// //     } catch {
// //       id = null
// //     }
// //   }

// //   useEffect(() => {
// //     loadCourse()
// //   }, [courseId])

// //   const loadCourse = async () => {
// //     setLoading(true)
// //     try {
// //       const folders = await folderApi.getAllFolders()

// //       const foundCourse = folders.find(
// //         (folder: any) =>
// //           folder.courseId === Number(courseId || "0") &&
// //           folder.lessonId == null &&
// //           folder.title &&
// //           folder.description &&
// //           folder.teacherId != null &&
// //           folder.price != null
// //       )

// //       if (foundCourse) {
// //         setCourse({
// //           folderId: foundCourse.folderId,
// //           courseId: foundCourse.courseId,
// //           categoryId: foundCourse.categoryId,
// //           teacherId: foundCourse.teacherId,
// //           teacherName: foundCourse.teacherName,
// //           title: foundCourse.title,
// //           description: foundCourse.description,
// //           numberOfLessons: foundCourse.numberOfLessons,
// //           price: foundCourse.price,
// //           isPurched: false,
// //         })
// //       } else {
// //         setCourse(null)
// //       }
// //     } catch (error) {
// //       console.error("Error loading course:", error)
// //       setCourse(null)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     if (course?.isPurched) {
// //       navigate(`/course/${courseId}`)
// //     }
// //   }, [course, courseId, navigate])

// //   const handlePurchase = async () => {
// //     if (!course) return

// //     if (!id) {
// //       alert("משתמש לא מזוהה, יש להתחבר מחדש")
// //       return
// //     }

// //     setPurchasing(true)
// //     try {
// //       await folderApi.purchaseFolder(id, course.folderId.toString())

// //       setPurchased(true)
// //       setTimeout(() => {
// //         navigate(`/course/${courseId}`)
// //       }, 2000)
// //     } catch (error: any) {
// //       if (error.response?.status === 409) {
// //         alert("כבר רכשת את הקורס הזה.")
// //         navigate(`/course/${courseId}`)
// //       } else {
// //         alert("שגיאה בביצוע רכישה.")
// //       }
// //     } finally {
// //       setPurchasing(false)
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     )
// //   }

// //   if (!course) {
// //     return (
// //       <div className="text-center py-12">
// //         <h3 className="text-lg font-medium text-gray-900 mb-2">קורס לא נמצא</h3>
// //         <p className="text-gray-600">הקורס המבוקש אינו קיים במערכת</p>
// //       </div>
// //     )
// //   }

// //   if (purchased) {
// //     return (
// //       <div className="max-w-md mx-auto">
// //         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
// //           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <Check className="h-8 w-8 text-green-600" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-900 mb-2">רכישה הושלמה!</h2>
// //           <p className="text-gray-600 mb-4">הקורס "{course.title}" נרכש בהצלחה</p>
// //           <p className="text-sm text-gray-500">מעביר אותך לקורס בעוד כמה שניות...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="max-w-2xl mx-auto">
// //       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
// //         <div className="p-6 border-b">
// //           <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
// //           <p className="text-gray-600 mb-4">{course.description}</p>
// //           <div className="flex items-center justify-between text-sm text-gray-500">
// //             <span>מורה: {course.teacherName}</span>
// //             <span>{course.numberOfLessons} שיעורים</span>
// //           </div>
// //         </div>

// //         <div className="p-6">
// //           <h2 className="text-xl font-semibold text-gray-900 mb-4">פרטי הרכישה</h2>

// //           <div className="bg-gray-50 rounded-lg p-4 mb-6">
// //             <div className="flex justify-between items-center mb-2">
// //               <span className="text-gray-600">מחיר הקורס:</span>
// //               <span className="text-2xl font-bold text-gray-900">₪{course.price}</span>
// //             </div>
// //             <div className="flex justify-between items-center text-sm text-gray-500">
// //               <span>כולל גישה לכל השיעורים</span>
// //               <span>תשלום חד פעמי</span>
// //             </div>
// //           </div>

// //           <div className="space-y-4 mb-6">
// //             <h3 className="text-lg font-medium text-gray-900">פרטי תשלום</h3>
// //             <div className="grid grid-cols-1 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
// //                 <input
// //                   type="text"
// //                   placeholder="1234 5678 9012 3456"
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //               </div>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">תוקף</label>
// //                   <input
// //                     type="text"
// //                     placeholder="MM/YY"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
// //                   <input
// //                     type="text"
// //                     placeholder="123"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <button
// //             onClick={handlePurchase}
// //             disabled={purchasing}
// //             className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
// //           >
// //             {purchasing ? (
// //               <>
// //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// //                 <span>מעבד תשלום...</span>
// //               </>
// //             ) : (
// //               <>
// //                 <CreditCard className="h-5 w-5" />
// //                 <span>אישור רכישה - ₪{course.price}</span>
// //                 <ArrowRight className="h-5 w-5" />
// //               </>
// //             )}
// //           </button>

// //           <p className="text-xs text-gray-500 text-center mt-4">זוהי רכישה פיקטיבית למטרות הדגמה בלבד</p>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Purchase

// // "use client"

// // import React, { useState, useEffect } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { CreditCard, Check, ArrowRight } from "lucide-react"
// // // import jwt_decode from "jwt-decode"
// // // import * as jwt_decode from "jwt-decode"
// // // import jwt_decode from "jwt-decode"
// // // import * as jwt_decode_raw from 'jwt-decode';
// // // import jwt_decode from "jwt-decode"; // ✅ נכון
// // // import jwt_decode from "jwt-decode";
// // // import { default as jwt_decode } from "jwt-decode";
// // // import * as jwt_decode from "jwt-decode";
// // import * as jwt_decode from "jwt-decode"



// // interface Course {
// //   folderId: number
// //   courseId: number
// //   categoryId: number
// //   teacherId: number
// //   teacherName: string
// //   title: string
// //   description: string
// //   numberOfLessons: number
// //   price?: number
// //   isPurched?: boolean
// // }

// // const Purchase: React.FC = () => {
// //   const { courseId } = useParams<{ courseId: string }>()
// //   const navigate = useNavigate()

// //   const [course, setCourse] = useState<Course | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [purchasing, setPurchasing] = useState(false)
// //   const [purchased, setPurchased] = useState(false)

// //   const token = localStorage.getItem("token")
// //   let userId: string | null = null
// //   if (token) {
// //     try {
// //       const decoded = (jwt_decode as any).default(token);
// //       userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
// //     } catch (e) {
// //       console.error("Failed to decode token:", e);
// //       userId = null;
// //     }
// //   }
  
// //   useEffect(() => {
// //     loadCourse()
// //   }, [courseId])

// //   const loadCourse = async () => {
// //     setLoading(true)
// //     try {
// //       const folders = await folderApi.getAllFolders()

// //       const foundCourse = folders.find(
// //         (folder: any) =>
// //           folder.courseId === Number(courseId || "0") &&
// //           folder.lessonId == null &&
// //           folder.title &&
// //           folder.description &&
// //           folder.teacherId != null &&
// //           folder.price != null
// //       )

// //       if (foundCourse) {
// //         setCourse({
// //           folderId: foundCourse.folderId,
// //           courseId: foundCourse.courseId,
// //           categoryId: foundCourse.categoryId,
// //           teacherId: foundCourse.teacherId,
// //           teacherName: foundCourse.teacherName,
// //           title: foundCourse.title,
// //           description: foundCourse.description,
// //           numberOfLessons: foundCourse.numberOfLessons,
// //           price: foundCourse.price,
// //           isPurched: false,
// //         })
// //       } else {
// //         setCourse(null)
// //       }
// //     } catch (error) {
// //       console.error("Error loading course:", error)
// //       setCourse(null)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     if (course?.isPurched) {
// //       navigate(`/course/${courseId}`)
// //     }
// //   }, [course, courseId, navigate])

// //   const handlePurchase = async () => {
// //     if (!course) return
// //     if (!userId) {
// //       alert("משתמש לא מזוהה, יש להתחבר מחדש")
// //       return
// //     }

// //     setPurchasing(true)
// //     try {
// //       await folderApi.purchaseFolder(userId, course.folderId.toString())

// //       setPurchased(true)
// //       setTimeout(() => {
// //         navigate(`/course/${courseId}`)
// //       }, 2000)
// //     } catch (error: any) {
// //       if (error.response?.status === 409) {
// //         alert("כבר רכשת את הקורס הזה.")
// //         navigate(`/course/${courseId}`)
// //       } else {
// //         alert("שגיאה בביצוע רכישה.")
// //       }
// //     } finally {
// //       setPurchasing(false)
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     )
// //   }

// //   if (!course) {
// //     return (
// //       <div className="text-center py-12">
// //         <h3 className="text-lg font-medium text-gray-900 mb-2">קורס לא נמצא</h3>
// //         <p className="text-gray-600">הקורס המבוקש אינו קיים במערכת</p>
// //       </div>
// //     )
// //   }

// //   if (purchased) {
// //     return (
// //       <div className="max-w-md mx-auto">
// //         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
// //           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <Check className="h-8 w-8 text-green-600" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-900 mb-2">רכישה הושלמה!</h2>
// //           <p className="text-gray-600 mb-4">הקורס "{course.title}" נרכש בהצלחה</p>
// //           <p className="text-sm text-gray-500">מעביר אותך לקורס בעוד כמה שניות...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="max-w-2xl mx-auto">
// //       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
// //         <div className="p-6 border-b">
// //           <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
// //           <p className="text-gray-600 mb-4">{course.description}</p>
// //           <div className="flex items-center justify-between text-sm text-gray-500">
// //             <span>מורה: {course.teacherName}</span>
// //             <span>{course.numberOfLessons} שיעורים</span>
// //           </div>
// //         </div>

// //         <div className="p-6">
// //           <h2 className="text-xl font-semibold text-gray-900 mb-4">פרטי הרכישה</h2>

// //           <div className="bg-gray-50 rounded-lg p-4 mb-6">
// //             <div className="flex justify-between items-center mb-2">
// //               <span className="text-gray-600">מחיר הקורס:</span>
// //               <span className="text-2xl font-bold text-gray-900">₪{course.price}</span>
// //             </div>
// //             <div className="flex justify-between items-center text-sm text-gray-500">
// //               <span>כולל גישה לכל השיעורים</span>
// //               <span>תשלום חד פעמי</span>
// //             </div>
// //           </div>

// //           <div className="space-y-4 mb-6">
// //             <h3 className="text-lg font-medium text-gray-900">פרטי תשלום</h3>
// //             <div className="grid grid-cols-1 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
// //                 <input
// //                   type="text"
// //                   placeholder="1234 5678 9012 3456"
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //               </div>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">תוקף</label>
// //                   <input
// //                     type="text"
// //                     placeholder="MM/YY"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
// //                   <input
// //                     type="text"
// //                     placeholder="123"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <button
// //             onClick={handlePurchase}
// //             disabled={purchasing}
// //             className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
// //           >
// //             {purchasing ? (
// //               <>
// //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// //                 <span>מעבד תשלום...</span>
// //               </>
// //             ) : (
// //               <>
// //                 <CreditCard className="h-5 w-5" />
// //                 <span>אישור רכישה - ₪{course.price}</span>
// //                 <ArrowRight className="h-5 w-5" />
// //               </>
// //             )}
// //           </button>

// //           <p className="text-xs text-gray-500 text-center mt-4">זוהי רכישה פיקטיבית למטרות הדגמה בלבד</p>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Purchase
// // "use client"

// // import React, { useState, useEffect } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { CreditCard, Check, ArrowRight } from "lucide-react"
// // // import * as jwt_decode from "jwt-decode"
// // import jwt_decode from "jwt-decode"


// // // interface DecodedToken {
// // //   UserId?: string
// // //   sub?: string
// // //   nameid?: string
// // // }

// // interface Course {
// //   folderId: number
// //   courseId: number
// //   categoryId: number
// //   teacherId: number
// //   teacherName: string
// //   title: string
// //   description: string
// //   numberOfLessons: number
// //   price?: number
// //   isPurched?: boolean
// // }

// // const Purchase: React.FC = () => {
// //   const { courseId } = useParams<{ courseId: string }>()
// //   const navigate = useNavigate()

// //   const [course, setCourse] = useState<Course | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [purchasing, setPurchasing] = useState(false)
// //   const [purchased, setPurchased] = useState(false)


// //   const token = localStorage.getItem("token")
// //   let id: string | null = null
// // //   if (token) {
// // //     try {
// // //       // const decoded = (jwt_decode as any).default(token);
// // //       // id = decoded.id || decoded.sub || decoded.nameid || null
// // //       // const decoded = (jwt_decode as any).default(token);
// // //       // id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
// // //       const decoded = (jwt_decode as any).default(token);
// // // console.log("Decoded Token:", decoded);
// // // id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
// // // console.log("Extracted ID:", id);

// // //     } catch {
// // //       id = null
// // //     }
// // //   }
// // if (token) {
// //   try {
// //     const decoded = jwt_decode(token)
// //     console.log("Decoded Token:", decoded)
// //     id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null
// //     console.log("Extracted ID:", id)
// //   } catch (err) {
// //     console.error("JWT Decode failed:", err)
// //     id = null
// //   }
// // }


// //   useEffect(() => {
// //     loadCourse()
// //   }, [courseId])

// //   const loadCourse = async () => {
// //     setLoading(true)
// //     try {
// //       const folders = await folderApi.getAllFolders()

// //       const foundCourse = folders.find(
// //         (folder: any) =>
// //           folder.courseId === Number(courseId || "0") &&
// //           folder.lessonId == null &&
// //           folder.title &&
// //           folder.description &&
// //           folder.teacherId != null &&
// //           folder.price != null
// //       )

// //       if (foundCourse) {
// //         setCourse({
// //           folderId: foundCourse.folderId,
// //           courseId: foundCourse.courseId,
// //           categoryId: foundCourse.categoryId,
// //           teacherId: foundCourse.teacherId,
// //           teacherName: foundCourse.teacherName,
// //           title: foundCourse.title,
// //           description: foundCourse.description,
// //           numberOfLessons: foundCourse.numberOfLessons,
// //           price: foundCourse.price,
// //           isPurched: false,
// //         })
// //       } else {
// //         setCourse(null)
// //       }
// //     } catch (error) {
// //       console.error("Error loading course:", error)
// //       setCourse(null)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }


// //   useEffect(() => {
// //     if (course?.isPurched) {
// //       navigate(`/course/${courseId}`)
// //     }
// //   }, [course, courseId, navigate])

// //   const handlePurchase = async () => {
// //     if (!course) return
// //     console.log("JWT Token:", token);
// //     if (!id) {
// //       alert("משתמש לא מזוהה, יש להתחבר מחדש")
// //       return
// //     }

// //     setPurchasing(true)
// //     try {
// //       await folderApi.purchaseFolder(id, course.folderId.toString())

// //       setPurchased(true)
// //       setTimeout(() => {
// //         console.log("Calling purchase with:", courseId);

// //         navigate(`/course/${courseId}`)
// //       }, 2000)
// //     } catch (error: any) {
// //       if (error.response?.status === 409) {
// //         alert("כבר רכשת את הקורס הזה.")
// //         navigate(`/course/${courseId}`)
// //       } else {
// //         alert("שגיאה בביצוע רכישה.")
// //       }
// //     } finally {
// //       setPurchasing(false)
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     )
// //   }

// //   if (!course) {
// //     return (
// //       <div className="text-center py-12">
// //         <h3 className="text-lg font-medium text-gray-900 mb-2">קורס לא נמצא</h3>
// //         <p className="text-gray-600">הקורס המבוקש אינו קיים במערכת</p>
// //       </div>
// //     )
// //   }

// //   if (purchased) {
// //     return (
// //       <div className="max-w-md mx-auto">
// //         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
// //           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <Check className="h-8 w-8 text-green-600" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-900 mb-2">רכישה הושלמה!</h2>
// //           <p className="text-gray-600 mb-4">הקורס "{course.title}" נרכש בהצלחה</p>
// //           <p className="text-sm text-gray-500">מעביר אותך לקורס בעוד כמה שניות...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="max-w-2xl mx-auto">
// //       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
// //         <div className="p-6 border-b">
// //           <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
// //           <p className="text-gray-600 mb-4">{course.description}</p>
// //           <div className="flex items-center justify-between text-sm text-gray-500">
// //             <span>מורה: {course.teacherName}</span>
// //             <span>{course.numberOfLessons} שיעורים</span>
// //           </div>
// //         </div>

// //         <div className="p-6">
// //           <h2 className="text-xl font-semibold text-gray-900 mb-4">פרטי הרכישה</h2>

// //           <div className="bg-gray-50 rounded-lg p-4 mb-6">
// //             <div className="flex justify-between items-center mb-2">
// //               <span className="text-gray-600">מחיר הקורס:</span>
// //               <span className="text-2xl font-bold text-gray-900">₪{course.price}</span>
// //             </div>
// //             <div className="flex justify-between items-center text-sm text-gray-500">
// //               <span>כולל גישה לכל השיעורים</span>
// //               <span>תשלום חד פעמי</span>
// //             </div>
// //           </div>

// //           <div className="space-y-4 mb-6">
// //             <h3 className="text-lg font-medium text-gray-900">פרטי תשלום</h3>
// //             <div className="grid grid-cols-1 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
// //                 <input
// //                   type="text"
// //                   placeholder="1234 5678 9012 3456"
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //               </div>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">תוקף</label>
// //                   <input
// //                     type="text"
// //                     placeholder="MM/YY"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
// //                   <input
// //                     type="text"
// //                     placeholder="123"
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <button
// //             onClick={handlePurchase}
// //             disabled={purchasing}
// //             className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
// //           >
// //             {purchasing ? (
// //               <>
// //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// //                 <span>מעבד תשלום...</span>
// //               </>
// //             ) : (
// //               <>
// //                 <CreditCard className="h-5 w-5" />
// //                 <span>אישור רכישה - ₪{course.price}</span>
// //                 <ArrowRight className="h-5 w-5" />
// //               </>
// //             )}
// //           </button>

// //           <p className="text-xs text-gray-500 text-center mt-4">זוהי רכישה פיקטיבית למטרות הדגמה בלבד</p>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Purchase
// "use client"

// import React, { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { folderApi } from "../services/api"
// import { CreditCard, Check, ArrowRight } from "lucide-react"
// // import * as jwt_decode from "jwt-decode"

// // interface DecodedToken {
// //   UserId?: string
// //   sub?: string
// //   nameid?: string
// // }

// interface Course {
//   folderId: number
//   courseId: number
//   categoryId: number
//   teacherId: number
//   teacherName: string
//   title: string
//   description: string
//   numberOfLessons: number
//   price?: number
//   isPurched?: boolean
// }

// const Purchase: React.FC = () => {
//   const { courseId } = useParams<{ courseId: string }>()
//   const navigate = useNavigate()

//   const [course, setCourse] = useState<Course | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [purchasing, setPurchasing] = useState(false)
//   const [purchased, setPurchased] = useState(false)


//   const token = localStorage.getItem("token")
//   let userId: string | null = null
//   if (token) {
//     try {
//       // const decoded = (jwt_decode as any).default(token);
//       // userId = decoded.UserId || decoded.sub || decoded.nameid || null
//     } catch {
//       userId = null
//     }
//   }

//   useEffect(() => {
//     loadCourse()
//   }, [courseId])

//   const loadCourse = async () => {
//     setLoading(true)
//     try {
//       const folders = await folderApi.getAllFolders()

//       const foundCourse = folders.find(
//         (folder: any) =>
//           folder.courseId === Number(courseId || "0") &&
//           folder.lessonId == null &&
//           folder.title &&
//           folder.description &&
//           folder.teacherId != null &&
//           folder.price != null
//       )

//       if (foundCourse) {
//         setCourse({
//           folderId: foundCourse.folderId,
//           courseId: foundCourse.courseId,
//           categoryId: foundCourse.categoryId,
//           teacherId: foundCourse.teacherId,
//           teacherName: foundCourse.teacherName,
//           title: foundCourse.title,
//           description: foundCourse.description,
//           numberOfLessons: foundCourse.numberOfLessons,
//           price: foundCourse.price,
//           isPurched: false,
//         })
//       } else {
//         setCourse(null)
//       }
//     } catch (error) {
//       console.error("Error loading course:", error)
//       setCourse(null)
//     } finally {
//       setLoading(false)
//     }
//   }


//   useEffect(() => {
//     if (course?.isPurched) {
//       navigate(`/course/${courseId}`)
//     }
//   }, [course, courseId, navigate])

//   const handlePurchase = async () => {
//     if (!course) return
//     if (!userId) {
//       alert("משתמש לא מזוהה, יש להתחבר מחדש")
//       return
//     }

//     setPurchasing(true)
//     try {
//       await folderApi.purchaseFolder(userId, course.folderId.toString())

//       setPurchased(true)
//       setTimeout(() => {
//         navigate(`/course/${courseId}`)
//       }, 2000)
//     } catch (error: any) {
//       if (error.response?.status === 409) {
//         alert("כבר רכשת את הקורס הזה.")
//         navigate(`/course/${courseId}`)
//       } else {
//         alert("שגיאה בביצוע רכישה.")
//       }
//     } finally {
//       setPurchasing(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (!course) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-lg font-medium text-gray-900 mb-2">קורס לא נמצא</h3>
//         <p className="text-gray-600">הקורס המבוקש אינו קיים במערכת</p>
//       </div>
//     )
//   }

//   if (purchased) {
//     return (
//       <div className="max-w-md mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Check className="h-8 w-8 text-green-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">רכישה הושלמה!</h2>
//           <p className="text-gray-600 mb-4">הקורס "{course.title}" נרכש בהצלחה</p>
//           <p className="text-sm text-gray-500">מעביר אותך לקורס בעוד כמה שניות...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-6 border-b">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
//           <p className="text-gray-600 mb-4">{course.description}</p>
//           <div className="flex items-center justify-between text-sm text-gray-500">
//             <span>מורה: {course.teacherName}</span>
//             <span>{course.numberOfLessons} שיעורים</span>
//           </div>
//         </div>

//         <div className="p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">פרטי הרכישה</h2>

//           <div className="bg-gray-50 rounded-lg p-4 mb-6">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600">מחיר הקורס:</span>
//               <span className="text-2xl font-bold text-gray-900">₪{course.price}</span>
//             </div>
//             <div className="flex justify-between items-center text-sm text-gray-500">
//               <span>כולל גישה לכל השיעורים</span>
//               <span>תשלום חד פעמי</span>
//             </div>
//           </div>

//           <div className="space-y-4 mb-6">
//             <h3 className="text-lg font-medium text-gray-900">פרטי תשלום</h3>
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
//                 <input
//                   type="text"
//                   placeholder="1234 5678 9012 3456"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">תוקף</label>
//                   <input
//                     type="text"
//                     placeholder="MM/YY"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
//                   <input
//                     type="text"
//                     placeholder="123"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={handlePurchase}
//             disabled={purchasing}
//             className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
//           >
//             {purchasing ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                 <span>מעבד תשלום...</span>
//               </>
//             ) : (
//               <>
//                 <CreditCard className="h-5 w-5" />
//                 <span>אישור רכישה - ₪{course.price}</span>
//                 <ArrowRight className="h-5 w-5" />
//               </>
//             )}
//           </button>

//           <p className="text-xs text-gray-500 text-center mt-4">זוהי רכישה פיקטיבית למטרות הדגמה בלבד</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Purchase