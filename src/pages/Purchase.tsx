// // // "use client"

// // // import type React from "react"
// // // import { useState, useEffect } from "react"
// // // import { useParams, useNavigate } from "react-router-dom"
// // // import { folderApi } from "../services/api"
// // // import { CreditCard, Check, ArrowRight } from "lucide-react"

// // // interface Course {
// // //   folderId: number
// // //   courseId: number
// // //   teacherId: number
// // //   teacherName: string
// // //   title: string
// // //   description: string
// // //   numberOfLessons: number
// // //   price?: number
// // // }

// // // const Purchase: React.FC = () => {
// // //   const { courseId } = useParams<{ courseId: string }>()
// // //   const navigate = useNavigate()
// // //   const [course, setCourse] = useState<Course | null>(null)
// // //   const [loading, setLoading] = useState(true)
// // //   const [purchasing, setPurchasing] = useState(false)
// // //   const [purchased, setPurchased] = useState(false)

// // //   useEffect(() => {
// // //     loadCourse()
// // //   }, [courseId])

// // //   const loadCourse = async () => {
// // //     try {
// // //       const folders = await folderApi.getAllFolders()
// // //       const foundCourse = folders.find((folder: Course) => folder.courseId === Number.parseInt(courseId || "0"))
// // //       if (foundCourse) {
// // //         setCourse({
// // //           ...foundCourse
// // //         })
// // //       }
// // //     } catch (error) {
// // //       console.error("Error loading course:", error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const handlePurchase = async () => {
// // //     setPurchasing(true)

// // //     // Simulate purchase process
// // //     setTimeout(() => {
// // //       setPurchasing(false)
// // //       setPurchased(true)

// // //       // Redirect to course after 2 seconds
// // //       setTimeout(() => {
// // //         navigate(`/course/${courseId}`)
// // //       }, 2000)
// // //     }, 2000)
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-64">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // //       </div>
// // //     )
// // //   }

// // //   if (!course) {
// // //     return (
// // //       <div className="text-center py-12">
// // //         <h3 className="text-lg font-medium text-gray-900 mb-2">קורס לא נמצא</h3>
// // //         <p className="text-gray-600">הקורס המבוקש אינו קיים במערכת</p>
// // //       </div>
// // //     )
// // //   }

// // //   if (purchased) {
// // //     return (
// // //       <div className="max-w-md mx-auto">
// // //         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
// // //           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //             <Check className="h-8 w-8 text-green-600" />
// // //           </div>
// // //           <h2 className="text-2xl font-bold text-gray-900 mb-2">רכישה הושלמה!</h2>
// // //           <p className="text-gray-600 mb-4">הקורס "{course.title}" נרכש בהצלחה</p>
// // //           <p className="text-sm text-gray-500">מעביר אותך לקורס בעוד כמה שניות...</p>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="max-w-2xl mx-auto">
// // //       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
// // //         {/* Course Info */}
// // //         <div className="p-6 border-b">
// // //           <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
// // //           <p className="text-gray-600 mb-4">{course.description}</p>
// // //           <div className="flex items-center justify-between text-sm text-gray-500">
// // //             <span>מורה: {course.teacherName}</span>
// // //             <span>{course.numberOfLessons} שיעורים</span>
// // //           </div>
// // //         </div>

// // //         {/* Purchase Details */}
// // //         <div className="p-6">
// // //           <h2 className="text-xl font-semibold text-gray-900 mb-4">פרטי הרכישה</h2>

// // //           <div className="bg-gray-50 rounded-lg p-4 mb-6">
// // //             <div className="flex justify-between items-center mb-2">
// // //               <span className="text-gray-600">מחיר הקורס:</span>
// // //               <span className="text-2xl font-bold text-gray-900">₪{course.price}</span>
// // //             </div>
// // //             <div className="flex justify-between items-center text-sm text-gray-500">
// // //               <span>כולל גישה לכל השיעורים</span>
// // //               <span>תשלום חד פעמי</span>
// // //             </div>
// // //           </div>

// // //           {/* Mock Payment Form */}
// // //           <div className="space-y-4 mb-6">
// // //             <h3 className="text-lg font-medium text-gray-900">פרטי תשלום</h3>
// // //             <div className="grid grid-cols-1 gap-4">
// // //               <div>
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
// // //                 <input
// // //                   type="text"
// // //                   placeholder="1234 5678 9012 3456"
// // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // //                 />
// // //               </div>
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">תוקף</label>
// // //                   <input
// // //                     type="text"
// // //                     placeholder="MM/YY"
// // //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
// // //                   <input
// // //                     type="text"
// // //                     placeholder="123"
// // //                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // //                   />
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <button
// // //             onClick={handlePurchase}
// // //             disabled={purchasing}
// // //             className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
// // //           >
// // //             {purchasing ? (
// // //               <>
// // //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
// // //                 <span>מעבד תשלום...</span>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <CreditCard className="h-5 w-5" />
// // //                 <span>אישור רכישה - ₪{course.price}</span>
// // //                 <ArrowRight className="h-5 w-5" />
// // //               </>
// // //             )}
// // //           </button>

// // //           <p className="text-xs text-gray-500 text-center mt-4">זוהי רכישה פיקטיבית למטרות הדגמה בלבד</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default Purchase
// // "use client"

// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { CreditCard, Check, ArrowRight } from "lucide-react"

// // interface Course {
// //   folderId: number
// //   courseId: number
// //   categoryId: number
// //   teacherId: number
// //   teacherName: string
// //   title: string
// //   description: string
// //   numberOfLessons: number
// //   price?: number,
// //   isPurched?:boolean
// // }

// // const Purchase: React.FC = () => {
// //   const { courseId } = useParams<{ courseId: string }>()
// //   const navigate = useNavigate()
// //   const [course, setCourse] = useState<Course | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [purchasing, setPurchasing] = useState(false)
// //   const [purchased, setPurchased] = useState(false)

// //   useEffect(() => {
// //     loadCourse()
// //   }, [courseId])

// //   const loadCourse = async () => {
// //     try {
// //       const folders = await folderApi.getAllFolders()

// //       // תנאי מדויק: רק קורס אמיתי
// //       const foundCourse = folders.find((folder: any) =>
// //         folder.courseId === Number.parseInt(courseId || "0") &&
// //         folder.lessonId == null && // לא שיעור
// //         folder.title &&
// //         folder.description &&
// //         folder.teacherId != null &&
// //         folder.price != null
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
          
// //         })
// //       }
// //     } catch (error) {
// //       console.error("Error loading course:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handlePurchase = async () => {
// //     setPurchasing(true)

// //     // סימולציית רכישה
// //     setTimeout(() => {
// //       setPurchasing(false)
// //       setPurchased(true)

// //       setTimeout(() => {
// //         navigate(`/course/${courseId}`)
// //       }, 2000)
// //     }, 2000)
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
// //         {/* מידע על הקורס */}
// //         <div className="p-6 border-b">
// //           <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
// //           <p className="text-gray-600 mb-4">{course.description}</p>
// //           <div className="flex items-center justify-between text-sm text-gray-500">
// //             <span>מורה: {course.teacherName}</span>
// //             <span>{course.numberOfLessons} שיעורים</span>
// //           </div>
// //         </div>

// //         {/* פרטי רכישה */}
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

// //           {/* טופס תשלום מדומה */}
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

// ////////////////////////////////
// // "use client"

// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import { folderApi, authApi } from "../services/api"
// // import { CreditCard, Check, ArrowRight } from "lucide-react"

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

// //   useEffect(() => {
// //     loadCourse()
// //   }, [courseId])

// //   const loadCourse = async () => {
// //     try {
// //       const user = await authApi.getProfile()

// //       const folders = await folderApi.getAllFolders()
// //       const foundCourse = folders.find((folder: any) =>
// //         folder.courseId === Number(courseId) &&
// //         folder.lessonId == null &&
// //         folder.title &&
// //         folder.description &&
// //         folder.teacherId != null &&
// //         folder.price != null
// //       )

// //       if (foundCourse) {
// //         // const isPurched = foundCourse.teacherId === user.id
// //         //   ? true // מורה
// //         //   : localStorage.getItem(`purchased_course_${foundCourse.courseId}`) === "true"
// //         const isOwnerTeacher = user.role === "Teacher" && foundCourse.teacherId === user.id
// //         const isPurched = isOwnerTeacher || localStorage.getItem(`purchased_course_${foundCourse.courseId}`) === "true"
        
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
// //           isPurched
// //         })

// //         if (isPurched) {
// //           setPurchased(true)
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error loading course:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handlePurchase = async () => {
// //     setPurchasing(true)

// //     setTimeout(() => {
// //       setPurchasing(false)
// //       setPurchased(true)
// //       if (course) {
// //         localStorage.setItem(`purchased_course_${course.courseId}`, "true")
// //         setCourse({ ...course, isPurched: true })
// //       }

// //       setTimeout(() => {
// //         navigate(`/course/${courseId}`)
// //       }, 2000)
// //     }, 2000)
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
// //         {/* מידע על הקורס */}
// //         <div className="p-6 border-b">
// //           <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
// //           <p className="text-gray-600 mb-4">{course.description}</p>
// //           <div className="flex items-center justify-between text-sm text-gray-500">
// //             <span>מורה: {course.teacherName}</span>
// //             <span>{course.numberOfLessons} שיעורים</span>
// //           </div>
// //         </div>

// //         {/* פרטי רכישה */}
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

// //           {/* טופס תשלום מדומה */}
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

// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { CreditCard, Check, ArrowRight } from "lucide-react"

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

// //   useEffect(() => {
// //     loadCourse()
// //   }, [courseId])

// //   const loadCourse = async () => {
// //     try {
// //       const folders = await folderApi.getAllFolders()

// //       const foundCourse = folders.find((folder: any) =>
// //         folder.courseId === Number(courseId || "0") &&
// //         folder.lessonId == null &&
// //         folder.title &&
// //         folder.description &&
// //         folder.teacherId != null &&
// //         folder.price != null
// //       )

// //       if (foundCourse) {
// //         const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses") || "[]")
// //         const isPurched = purchasedCourses.includes(foundCourse.courseId)

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
// //           isPurched,
// //         })
// //       }
// //     } catch (error) {
// //       console.error("Error loading course:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // אם כבר נרכש – העבר לעמוד הקורס
// //   useEffect(() => {
// //     if (course?.isPurched) {
// //       navigate(`/course/${courseId}`)
// //     }
// //   }, [course])

// //   const handlePurchase = () => {
// //     setPurchasing(true)

// //     setTimeout(() => {
// //       const purchases = JSON.parse(localStorage.getItem("purchasedCourses") || "[]")
// //       const updatedPurchases = [...new Set([...purchases, course!.courseId])]
// //       localStorage.setItem("purchasedCourses", JSON.stringify(updatedPurchases))

// //       setPurchasing(false)
// //       setPurchased(true)

// //       setTimeout(() => {
// //         navigate(`/course/${courseId}`)
// //       }, 2000)
// //     }, 2000)
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

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { folderApi } from "../services/api";
// import { CreditCard, Check, ArrowRight } from "lucide-react"
// import jwt_decode from "jwt-decode";

// const token = localStorage.getItem('token');
// let userId = null;

// // if (token) {
// //   const decoded = jwt_decode(token);
// //   userId = decoded.UserId || decoded.sub || decoded.nameid; // תלוי איך השרת מגדיר את הטוקן
// // }
// if (token) {
//   const decoded: any = jwt_decode(token);
//   userId = decoded.UserId || decoded.sub || decoded.nameid;
// }


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

//   useEffect(() => {
//     loadCourse()
//   }, [courseId])

//   const loadCourse = async () => {
//     try {
//       const folders = await folderApi.getAllFolders()

//       const foundCourse = folders.find((folder: any) =>
//         folder.courseId === Number(courseId || "0") &&
//         folder.lessonId == null &&
//         folder.title &&
//         folder.description &&
//         folder.teacherId != null &&
//         folder.price != null
//       )

//       if (foundCourse) {
//         // כאן אפשר להוסיף בדיקה אם הקורס נרכש לפי API או סטייט - אם יש לך API מתאים, עדיף לשאול מהשרת
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
//           isPurched: false, // נשאר false עד הרכישה
//         })
//       }
//     } catch (error) {
//       console.error("Error loading course:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // אם כבר נרכש – העבר לעמוד הקורס
//   useEffect(() => {
//     if (course?.isPurched) {
//       navigate(`/course/${courseId}`)
//     }
//   }, [course])

//   const handlePurchase = async () => {
//     if (!course) return

//     setPurchasing(true)
//     try {
//       // הנח שיש לך מזהה משתמש מחובר ב-JWT או בקונטקסט, לדוגמה:
//       // const userId = "some-user-id" // החלף לפי המערכת שלך
//       const userId = decoded.UserId; // או שדה מזהה אחר כפי שמופיע בטוקן

//       await folderApi.purchaseFolder(userId.toString(), course.folderId.toString());

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
"use client"

import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { folderApi } from "../services/api"
import { CreditCard, Check, ArrowRight } from "lucide-react"
import * as jwt_decode from "jwt-decode"

// interface DecodedToken {
//   UserId?: string
//   sub?: string
//   nameid?: string
// }

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

  // פענוח הטוקן ופירוק מזהה המשתמש
  const token = localStorage.getItem("token")
  let userId: string | null = null
  if (token) {
    try {
      const decoded = (jwt_decode as any).default(token);
      userId = decoded.UserId || decoded.sub || decoded.nameid || null
    } catch {
      userId = null
    }
  }

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

  // אם הקורס כבר נרכש, הפניה לעמוד הקורס
  useEffect(() => {
    if (course?.isPurched) {
      navigate(`/course/${courseId}`)
    }
  }, [course, courseId, navigate])

  const handlePurchase = async () => {
    if (!course) return
    if (!userId) {
      alert("משתמש לא מזוהה, יש להתחבר מחדש")
      return
    }

    setPurchasing(true)
    try {
      await folderApi.purchaseFolder(userId, course.folderId.toString())

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
