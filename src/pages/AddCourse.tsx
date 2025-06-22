// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { folderApi } from "../services/api"
// import { useAuth } from "../contexts/AuthContext"
// import { BookOpen, Save, AlertCircle, CheckCircle } from "lucide-react"

// const AddCourse: React.FC = () => {
//   const { user } = useAuth()
//   const navigate = useNavigate()

//   const [formData, setFormData] = useState({
//     categoryId: 1,
//     courseId: 0, // יתעדכן אוטומטית
//     title: "",
//     description: "",
//     price: 0,
//   })

//   const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState(false)

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const allFolders = await folderApi.getAllFolders()
//         const cat = allFolders.filter((f: any) => f.categoryId && !f.courseId)
//         const formatted = cat.map((c: any) => ({
//           id: c.categoryId,
//           name: c.title,
//         }))
//         setCategories(formatted)
//         if (formatted.length > 0) {
//           setFormData((prev) => ({
//             ...prev,
//             categoryId: formatted[0].id,
//           }))
//         }
//       } catch (err) {
//         console.error("שגיאה בשליפת קטגוריות", err)
//         setError("לא ניתן לטעון קטגוריות")
//       }
//     }

//     fetchCategories()
//   }, [])

//   useEffect(() => {
//     const fetchNextCourseId = async () => {
//       try {
//         const allFolders = await folderApi.getAllFolders()
//         const courses = allFolders.filter(
//           (f: any) => f.categoryId && f.courseId && f.teacherId && !f.lessonId
//         )
//         const maxCourseId = courses.reduce((max: number, course: any) => {
//           return course.courseId > max ? course.courseId : max
//         }, 0)
//         setFormData((prev) => ({
//           ...prev,
//           courseId: maxCourseId + 1,
//         }))
//       } catch (err) {
//         console.error("שגיאה בחישוב מזהה הקורס", err)
//         setError("לא ניתן לחשב מזהה קורס חדש")
//       }
//     }

//     fetchNextCourseId()
//   }, [])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       const courseData = {
//         categoryId: Number(formData.categoryId),
//         courseId: formData.courseId,
//         teacherId: user?.userId,
//         teacherName: user?.userName,
//         title: formData.title,
//         description: formData.description,
//         numberOfLessons: 0,
//         price: Number(formData.price), // כולל מחיר בקורס
//       }

//       console.log("courseData:", courseData)
//       await folderApi.addCourse(courseData)
//       setSuccess(true)

//       setTimeout(() => {
//         navigate("/my-courses")
//       }, 2000)
//     } catch (err: any) {
//       setError("שגיאה ביצירת הקורס. אנא נסה שוב.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: name === "price" ? Number(value) : value,
//     })
//   }

//   if (success) {
//     return (
//       <div className="max-w-md mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//           <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">הקורס נוצר בהצלחה!</h2>
//           <p className="text-gray-600 mb-4">הקורס "{formData.title}" נוצר ונשמר במערכת</p>
//           <p className="text-sm text-gray-500">מעביר אותך לרשימת הקורסים שלך...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white rounded-lg shadow-sm p-8">
//         <div className="flex items-center space-x-3 space-x-reverse mb-6">
//           <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//             <BookOpen className="h-6 w-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">הוספת קורס חדש</h1>
//             <p className="text-gray-600">צור קורס חדש ותתחיל ללמד</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <div className="flex items-center space-x-2 space-x-reverse text-red-600 bg-red-50 p-3 rounded-md">
//               <AlertCircle className="h-5 w-5" />
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           <div>
//             <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
//               קטגוריה
//             </label>
//             <select
//               id="categoryId"
//               name="categoryId"
//               value={formData.categoryId}
//               onChange={handleInputChange}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//             >
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//               שם הקורס
//             </label>
//             <input
//               id="title"
//               name="title"
//               type="text"
//               required
//               value={formData.title}
//               onChange={handleInputChange}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="הכנס שם לקורס"
//             />
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//               תיאור הקורס
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               rows={4}
//               required
//               value={formData.description}
//               onChange={handleInputChange}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="תאר את הקורס ומה התלמידים ילמדו בו"
//             />
//           </div>

//           {/* שדה מחיר */}
//           <div>
//             <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
//               מחיר הקורס (בשקלים)
//             </label>
//             <input
//               id="price"
//               name="price"
//               type="number"
//               min={0}
//               required
//               value={formData.price}
//               onChange={handleInputChange}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="הכנס מחיר בקורס"
//             />
//           </div>

//           <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
//             <p className="text-sm text-blue-800">
//               <strong>שים לב:</strong> מספר השיעורים יתעדכן אוטומטית כאשר תוסיף שיעורים לקורס.
//             </p>
//           </div>

//           <div className="flex space-x-3 space-x-reverse">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
//             >
//               {loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   <span>יוצר קורס...</span>
//                 </>
//               ) : (
//                 <>
//                   <Save className="h-4 w-4" />
//                   <span>צור קורס</span>
//                 </>
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate("/my-courses")}
//               className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
//             >
//               ביטול
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddCourse
// // "use client"

// // import type React from "react"
// // import { useEffect, useState } from "react"
// // import { useNavigate } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { useAuth } from "../contexts/AuthContext"
// // import { BookOpen, Save, AlertCircle, CheckCircle, DollarSign, FileText } from "lucide-react"

// // const AddCourse: React.FC = () => {
// //   const { user } = useAuth()
// //   const navigate = useNavigate()

// //   const [formData, setFormData] = useState({
// //     categoryId: 1,
// //     courseId: 0,
// //     title: "",
// //     description: "",
// //     price: 0,
// //   })

// //   const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState("")
// //   const [success, setSuccess] = useState(false)

// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const allFolders = await folderApi.getAllFolders()
// //         const cat = allFolders.filter((f: any) => f.categoryId && !f.courseId)
// //         const formatted = cat.map((c: any) => ({
// //           id: c.categoryId,
// //           name: c.title,
// //         }))
// //         setCategories(formatted)
// //         if (formatted.length > 0) {
// //           setFormData((prev) => ({
// //             ...prev,
// //             categoryId: formatted[0].id,
// //           }))
// //         }
// //       } catch (err) {
// //         console.error("שגיאה בשליפת קטגוריות", err)
// //         setError("לא ניתן לטעון קטגוריות")
// //       }
// //     }

// //     fetchCategories()
// //   }, [])

// //   useEffect(() => {
// //     const fetchNextCourseId = async () => {
// //       try {
// //         const allFolders = await folderApi.getAllFolders()
// //         const courses = allFolders.filter((f: any) => f.categoryId && f.courseId && f.teacherId && !f.lessonId)
// //         const maxCourseId = courses.reduce((max: number, course: any) => {
// //           return course.courseId > max ? course.courseId : max
// //         }, 0)
// //         setFormData((prev) => ({
// //           ...prev,
// //           courseId: maxCourseId + 1,
// //         }))
// //       } catch (err) {
// //         console.error("שגיאה בחישוב מזהה הקורס", err)
// //         setError("לא ניתן לחשב מזהה קורס חדש")
// //       }
// //     }

// //     fetchNextCourseId()
// //   }, [])

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setError("")
// //     setLoading(true)

// //     try {
// //       const courseData = {
// //         categoryId: Number(formData.categoryId),
// //         courseId: formData.courseId,
// //         teacherId: user?.userId,
// //         teacherName: user?.userName,
// //         title: formData.title,
// //         description: formData.description,
// //         numberOfLessons: 0,
// //         price: Number(formData.price),
// //       }

// //       console.log("courseData:", courseData)
// //       await folderApi.addCourse(courseData)
// //       setSuccess(true)

// //       setTimeout(() => {
// //         navigate("/my-courses")
// //       }, 2000)
// //     } catch (err: any) {
// //       setError("שגיאה ביצירת הקורס. אנא נסה שוב.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target
// //     setFormData({
// //       ...formData,
// //       [name]: name === "price" ? Number(value) : value,
// //     })
// //   }

// //   if (success) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
// //         <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
// //           <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
// //             <CheckCircle className="h-8 w-8 text-white" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-900 mb-2">הקורס נוצר בהצלחה!</h2>
// //           <p className="text-gray-600 mb-4">הקורס "{formData.title}" נוצר ונשמר במערכת</p>
// //           <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-500">
// //             <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
// //             <span>מעביר אותך לרשימת הקורסים שלך...</span>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="max-w-2xl mx-auto">
// //       <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
// //         <div className="text-center mb-8">
// //           <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
// //             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
// //               <BookOpen className="h-6 w-6 text-white" />
// //             </div>
// //             <div className="w-8 h-8 rounded-full overflow-hidden">
// //               <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
// //             </div>
// //           </div>
// //           <h1 className="text-3xl font-bold text-gray-900 mb-2">הוספת קורס חדש</h1>
// //           <p className="text-gray-600">צור קורס חדש ותתחיל ללמד תלמידים ברחבי העולם</p>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {error && (
// //             <div className="flex items-center space-x-3 space-x-reverse text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
// //               <AlertCircle className="h-5 w-5 flex-shrink-0" />
// //               <span className="text-sm">{error}</span>
// //             </div>
// //           )}

// //           <div>
// //             <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700 mb-3">
// //               קטגוריה
// //             </label>
// //             <select
// //               id="categoryId"
// //               name="categoryId"
// //               value={formData.categoryId}
// //               onChange={handleInputChange}
// //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //             >
// //               {categories.map((category) => (
// //                 <option key={category.id} value={category.id}>
// //                   {category.name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// //               <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
// //               שם הקורס
// //             </label>
// //             <input
// //               id="title"
// //               name="title"
// //               type="text"
// //               required
// //               value={formData.title}
// //               onChange={handleInputChange}
// //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //               placeholder="הכנס שם מעניין וברור לקורס"
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// //               <FileText className="h-4 w-4 ml-1 text-blue-600" />
// //               תיאור הקורס
// //             </label>
// //             <textarea
// //               id="description"
// //               name="description"
// //               rows={4}
// //               required
// //               value={formData.description}
// //               onChange={handleInputChange}
// //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
// //               placeholder="תאר את הקורס, מה התלמידים ילמדו ומה יוכלו להשיג"
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="price" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// //               <DollarSign className="h-4 w-4 ml-1 text-blue-600" />
// //               מחיר הקורס (בשקלים)
// //             </label>
// //             <input
// //               id="price"
// //               name="price"
// //               type="number"
// //               min={0}
// //               required
// //               value={formData.price}
// //               onChange={handleInputChange}
// //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //               placeholder="הכנס מחיר הוגן לקורס"
// //             />
// //           </div>

// //           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
// //             <p className="text-sm text-blue-800">
// //               <strong>💡 טיפ:</strong> מספר השיעורים יתעדכן אוטומטי כאשר תוסיף שיעורים לקורס.
// //             </p>
// //           </div>

// //           <div className="flex space-x-4 space-x-reverse pt-4">
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse font-semibold shadow-lg hover:shadow-xl"
// //             >
// //               {loading ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
// //                   <span>יוצר קורס...</span>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Save className="h-5 w-5" />
// //                   <span>צור קורס</span>
// //                 </>
// //               )}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={() => navigate("/my-courses")}
// //               className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
// //             >
// //               ביטול
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }

// // export default AddCourse
"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  FileVideo,
  FileText,
  BookOpen,
  DollarSign,
  Clock,
  Tag,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Play,
  Eye,
  Send,
  AlertCircle,
  CheckCircle,
  Loader,
  Plus,
  Trash2,
  Camera,
  Sparkles,
  Target,
} from "lucide-react"

interface CourseData {
  title: string
  description: string
  category: string
  price: number
  level: "beginner" | "intermediate" | "advanced"
  duration: string
  thumbnail: File | null
  videoFiles: File[]
  materials: File[]
  tags: string[]
  objectives: string[]
  requirements: string[]
}

interface ValidationErrors {
  [key: string]: string
}

const AddCourse: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const materialsInputRef = useRef<HTMLInputElement>(null)

  const [currentStep, setCurrentStep] = useState(0)
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    category: "",
    price: 0,
    level: "beginner",
    duration: "",
    thumbnail: null,
    videoFiles: [],
    materials: [],
    tags: [],
    objectives: [],
    requirements: [],
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewMode, setPreviewMode] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [newObjective, setNewObjective] = useState("")
  const [newRequirement, setNewRequirement] = useState("")

  const steps = [
    {
      title: "מידע בסיסי",
      description: "פרטי הקורס הכלליים",
      icon: BookOpen,
      fields: ["title", "description", "category"],
    },
    {
      title: "תמחור ורמה",
      description: "מחיר ורמת קושי",
      icon: DollarSign,
      fields: ["price", "level", "duration"],
    },
    {
      title: "תוכן הקורס",
      description: "וידאו וחומרי לימוד",
      icon: FileVideo,
      fields: ["thumbnail", "videoFiles", "materials"],
    },
    {
      title: "פרטים נוספים",
      description: "תגיות ויעדים",
      icon: Target,
      fields: ["tags", "objectives", "requirements"],
    },
    {
      title: "סיכום ופרסום",
      description: "בדיקה אחרונה",
      icon: Send,
      fields: [],
    },
  ]

  const categories = [
    "תכנות ופיתוח",
    "עיצוב גרפי",
    "שיווק דיגיטלי",
    "ניהול עסקים",
    "צילום ווידאו",
    "מוזיקה ואמנות",
    "בריאות וכושר",
    "שפות זרות",
  ]

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {}
    const stepFields = steps[step].fields

    stepFields.forEach((field) => {
      switch (field) {
        case "title":
          if (!courseData.title.trim()) {
            newErrors.title = "שם הקורס הוא שדה חובה"
          } else if (courseData.title.length < 5) {
            newErrors.title = "שם הקורס חייב להכיל לפחות 5 תווים"
          }
          break
        case "description":
          if (!courseData.description.trim()) {
            newErrors.description = "תיאור הקורס הוא שדה חובה"
          } else if (courseData.description.length < 20) {
            newErrors.description = "התיאור חייב להכיל לפחות 20 תווים"
          }
          break
        case "category":
          if (!courseData.category) {
            newErrors.category = "יש לבחור קטגוריה"
          }
          break
        case "price":
          if (courseData.price < 0) {
            newErrors.price = "המחיר לא יכול להיות שלילי"
          }
          break
        case "videoFiles":
          if (courseData.videoFiles.length === 0) {
            newErrors.videoFiles = "יש להעלות לפחות קובץ וידאו אחד"
          }
          break
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleInputChange = (field: keyof CourseData, value: any) => {
    setCourseData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const files = Array.from(e.dataTransfer.files)
      const videoFiles = files.filter((file) => file.type.startsWith("video/"))
      const imageFiles = files.filter((file) => file.type.startsWith("image/"))
      const documentFiles = files.filter(
        (file) => file.type.includes("pdf") || file.type.includes("document") || file.type.includes("text"),
      )

      if (videoFiles.length > 0) {
        setCourseData((prev) => ({
          ...prev,
          videoFiles: [...prev.videoFiles, ...videoFiles],
        }))
      }

      if (imageFiles.length > 0 && !courseData.thumbnail) {
        setCourseData((prev) => ({ ...prev, thumbnail: imageFiles[0] }))
      }

      if (documentFiles.length > 0) {
        setCourseData((prev) => ({
          ...prev,
          materials: [...prev.materials, ...documentFiles],
        }))
      }
    },
    [courseData.thumbnail],
  )

  const handleFileUpload = (type: "video" | "thumbnail" | "materials") => {
    const input = type === "video" ? fileInputRef : type === "thumbnail" ? thumbnailInputRef : materialsInputRef
    input.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "video" | "thumbnail" | "materials") => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    switch (type) {
      case "video":
        setCourseData((prev) => ({
          ...prev,
          videoFiles: [...prev.videoFiles, ...files],
        }))
        break
      case "thumbnail":
        setCourseData((prev) => ({ ...prev, thumbnail: files[0] }))
        break
      case "materials":
        setCourseData((prev) => ({
          ...prev,
          materials: [...prev.materials, ...files],
        }))
        break
    }
  }

  const removeFile = (type: "video" | "materials", index: number) => {
    if (type === "video") {
      setCourseData((prev) => ({
        ...prev,
        videoFiles: prev.videoFiles.filter((_, i) => i !== index),
      }))
    } else {
      setCourseData((prev) => ({
        ...prev,
        materials: prev.materials.filter((_, i) => i !== index),
      }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !courseData.tags.includes(newTag.trim())) {
      setCourseData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    setCourseData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))
  }

  const addObjective = () => {
    if (newObjective.trim()) {
      setCourseData((prev) => ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()],
      }))
      setNewObjective("")
    }
  }

  const removeObjective = (index: number) => {
    setCourseData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }))
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setCourseData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }))
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setCourseData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setLoading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 10
        })
      }, 200)

      // Create course data
      const formData = new FormData()
      formData.append("title", courseData.title)
      formData.append("description", courseData.description)
      formData.append("category", courseData.category)
      formData.append("price", courseData.price.toString())

      // Upload files (simulate)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setUploadProgress(100)

      // Show success message
      setTimeout(() => {
        navigate("/my-courses")
      }, 1500)
    } catch (error) {
      console.error("Error creating course:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-3 space-x-reverse mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <Sparkles className="h-8 w-8 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent animate-gradient-x">
            יצירת קורס חדש
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            צור קורס מקצועי ואיכותי עם הכלים המתקדמים שלנו
            <br />
            <span className="text-blue-600 font-semibold">נלווה אותך בכל שלב של הדרך</span>
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                שלב {currentStep + 1} מתוך {steps.length}
              </h2>
              <div className="text-sm text-gray-500">{Math.round(((currentStep + 1) / steps.length) * 100)}% הושלם</div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep
                const isAccessible = index <= currentStep

                return (
                  <div key={index} className="flex items-center flex-1">
                    <div
                      className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                          : isActive
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110"
                            : isAccessible
                              ? "bg-gray-200 text-gray-600"
                              : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isCompleted ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                      {isActive && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-50"></div>
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                          isCompleted ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{steps[currentStep].title}</h3>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 animate-fade-in-up animation-delay-400">
            {/* Step 0: Basic Info */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-slide-in-right">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">שם הקורס *</label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="הכנס שם מעניין ומושך לקורס שלך"
                    className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-lg ${
                      errors.title ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                    }`}
                  />
                  {errors.title && (
                    <div className="flex items-center space-x-2 space-x-reverse mt-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{errors.title}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">תיאור הקורס *</label>
                  <textarea
                    value={courseData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="תאר את הקורס שלך - מה התלמידים ילמדו ואיך זה יעזור להם"
                    rows={6}
                    className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-lg resize-none ${
                      errors.description ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                    }`}
                  />
                  {errors.description && (
                    <div className="flex items-center space-x-2 space-x-reverse mt-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{errors.description}</span>
                    </div>
                  )}
                  <div className="text-sm text-gray-500 mt-2">{courseData.description.length}/500 תווים</div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">קטגוריה *</label>
                  <select
                    value={courseData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-lg ${
                      errors.category ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                    }`}
                  >
                    <option value="">בחר קטגוריה</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="flex items-center space-x-2 space-x-reverse mt-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{errors.category}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 1: Pricing & Level */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-slide-in-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">מחיר הקורס (₪)</label>
                    <div className="relative">
                      <DollarSign className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                      <input
                        type="number"
                        value={courseData.price}
                        onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        className={`w-full pr-12 pl-6 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-lg ${
                          errors.price ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.price && (
                      <div className="flex items-center space-x-2 space-x-reverse mt-2 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{errors.price}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">משך הקורס המשוער</label>
                    <div className="relative">
                      <Clock className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                      <input
                        type="text"
                        value={courseData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        placeholder="לדוגמה: 5 שעות, 3 שבועות"
                        className="w-full pr-12 pl-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">רמת הקורס</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        value: "beginner",
                        label: "מתחיל",
                        color: "from-green-500 to-emerald-500",
                        description: "ללא ידע קודם",
                      },
                      {
                        value: "intermediate",
                        label: "בינוני",
                        color: "from-yellow-500 to-orange-500",
                        description: "ידע בסיסי נדרש",
                      },
                      {
                        value: "advanced",
                        label: "מתקדם",
                        color: "from-red-500 to-pink-500",
                        description: "ידע מקצועי נדרש",
                      },
                    ].map((level) => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => handleInputChange("level", level.value)}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                          courseData.level === level.value
                            ? `bg-gradient-to-r ${level.color} text-white border-transparent shadow-lg scale-105`
                            : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:scale-102"
                        }`}
                      >
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-2">{level.label}</h3>
                          <p
                            className={`text-sm ${courseData.level === level.value ? "text-white/80" : "text-gray-600"}`}
                          >
                            {level.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Content Upload */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-slide-in-right">
                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">תמונת קורס</label>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div
                      onClick={() => handleFileUpload("thumbnail")}
                      className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                    >
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4 group-hover:text-blue-500 transition-colors" />
                      <p className="text-gray-600 group-hover:text-blue-600">
                        {courseData.thumbnail ? "שנה תמונה" : "העלה תמונת קורס"}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">JPG, PNG עד 5MB</p>
                    </div>
                    {courseData.thumbnail && (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(courseData.thumbnail) || "/placeholder.svg"}
                          alt="Course thumbnail"
                          className="w-full h-48 object-cover rounded-2xl shadow-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setCourseData((prev) => ({ ...prev, thumbnail: null }))
                          }}
                          className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">קבצי וידאו *</label>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => handleFileUpload("video")}
                    className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                      dragActive
                        ? "border-blue-500 bg-blue-50"
                        : errors.videoFiles
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    <FileVideo className={`h-16 w-16 mx-auto mb-4 ${dragActive ? "text-blue-500" : "text-gray-400"}`} />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {dragActive ? "שחרר כדי להעלות" : "העלה קבצי וידאו"}
                    </h3>
                    <p className="text-gray-600 mb-2">גרור ושחרר או לחץ לבחירת קבצים</p>
                    <p className="text-sm text-gray-500">MP4, MOV, AVI עד 500MB לקובץ</p>
                  </div>

                  {errors.videoFiles && (
                    <div className="flex items-center space-x-2 space-x-reverse mt-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{errors.videoFiles}</span>
                    </div>
                  )}

                  {courseData.videoFiles.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h4 className="font-semibold text-gray-900">קבצי וידאו שהועלו:</h4>
                      {courseData.videoFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200"
                        >
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                              <Play className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile("video", index)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Materials Upload */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">חומרי לימוד נוספים</label>
                  <div
                    onClick={() => handleFileUpload("materials")}
                    className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                  >
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4 group-hover:text-blue-500 transition-colors" />
                    <p className="text-gray-600 group-hover:text-blue-600">העלה חומרי לימוד</p>
                    <p className="text-sm text-gray-500 mt-2">PDF, DOC, PPT עד 50MB לקובץ</p>
                  </div>

                  {courseData.materials.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h4 className="font-semibold text-gray-900">חומרי לימוד:</h4>
                      {courseData.materials.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200"
                        >
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                              <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile("materials", index)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Additional Details */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-slide-in-right">
                {/* Tags */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">תגיות</label>
                  <div className="flex space-x-3 space-x-reverse mb-4">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="הוסף תגית"
                      className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <button
                      onClick={addTag}
                      disabled={!newTag.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        <Tag className="h-4 w-4" />
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(index)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learning Objectives */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">יעדי הלמידה</label>
                  <div className="flex space-x-3 space-x-reverse mb-4">
                    <input
                      type="text"
                      value={newObjective}
                      onChange={(e) => setNewObjective(e.target.value)}
                      placeholder="מה התלמידים ילמדו?"
                      className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      onKeyPress={(e) => e.key === "Enter" && addObjective()}
                    />
                    <button
                      onClick={addObjective}
                      disabled={!newObjective.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {courseData.objectives.map((objective, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl"
                      >
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-gray-900">{objective}</span>
                        </div>
                        <button
                          onClick={() => removeObjective(index)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">דרישות מוקדמות</label>
                  <div className="flex space-x-3 space-x-reverse mb-4">
                    <input
                      type="text"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      placeholder="מה התלמידים צריכים לדעת מראש?"
                      className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      onKeyPress={(e) => e.key === "Enter" && addRequirement()}
                    />
                    <button
                      onClick={addRequirement}
                      disabled={!newRequirement.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {courseData.requirements.map((requirement, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-2xl"
                      >
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-900">{requirement}</span>
                        </div>
                        <button
                          onClick={() => removeRequirement(index)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Publish */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-slide-in-right">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">סיכום הקורס</h2>
                  <p className="text-gray-600">בדוק את הפרטים לפני הפרסום</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Course Preview */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">תצוגה מקדימה</h3>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      {courseData.thumbnail && (
                        <img
                          src={URL.createObjectURL(courseData.thumbnail) || "/placeholder.svg"}
                          alt="Course thumbnail"
                          className="w-full h-40 object-cover rounded-xl mb-4"
                        />
                      )}
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{courseData.title}</h4>
                      <p className="text-gray-600 mb-4 line-clamp-3">{courseData.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">₪{courseData.price}</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {courseData.level === "beginner"
                            ? "מתחיל"
                            : courseData.level === "intermediate"
                              ? "בינוני"
                              : "מתקדם"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <h4 className="font-bold text-gray-900 mb-3">פרטי הקורס</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">קטגוריה:</span>
                          <span className="font-medium">{courseData.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">משך:</span>
                          <span className="font-medium">{courseData.duration || "לא צוין"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">קבצי וידאו:</span>
                          <span className="font-medium">{courseData.videoFiles.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">חומרי לימוד:</span>
                          <span className="font-medium">{courseData.materials.length}</span>
                        </div>
                      </div>
                    </div>

                    {courseData.tags.length > 0 && (
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h4 className="font-bold text-gray-900 mb-3">תגיות</h4>
                        <div className="flex flex-wrap gap-2">
                          {courseData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {courseData.objectives.length > 0 && (
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h4 className="font-bold text-gray-900 mb-3">יעדי למידה</h4>
                        <ul className="space-y-2">
                          {courseData.objectives.slice(0, 3).map((objective, index) => (
                            <li key={index} className="flex items-center space-x-2 space-x-reverse text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>{objective}</span>
                            </li>
                          ))}
                          {courseData.objectives.length > 3 && (
                            <li className="text-sm text-gray-500">ועוד {courseData.objectives.length - 3}...</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Progress */}
                {loading && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900">מעלה קורס...</h4>
                      <span className="text-sm text-gray-600">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>מעבד קבצים ויוצר את הקורס...</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
                <span>קודם</span>
              </button>

              <div className="flex items-center space-x-3 space-x-reverse">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center space-x-2 space-x-reverse px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                >
                  <Eye className="h-5 w-5" />
                  <span>תצוגה מקדימה</span>
                </button>

                {currentStep === steps.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center space-x-2 space-x-reverse px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>מפרסם...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>פרסם קורס</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-2 space-x-reverse px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>הבא</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          multiple
          onChange={(e) => handleFileChange(e, "video")}
          className="hidden"
        />
        <input
          ref={thumbnailInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "thumbnail")}
          className="hidden"
        />
        <input
          ref={materialsInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
          multiple
          onChange={(e) => handleFileChange(e, "materials")}
          className="hidden"
        />
      </div>
    </div>
  )
}

export default AddCourse
