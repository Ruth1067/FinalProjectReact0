// // // // "use client"

// // // // import type React from "react"
// // // // import { useState, useEffect } from "react"
// // // // import { useNavigate } from "react-router-dom"
// // // // import { folderApi, uploadApi, userApi } from "../services/api"
// // // // import { useAuth } from "../contexts/AuthContext"
// // // // import { Upload, Save, AlertCircle, CheckCircle, FileAudio } from "lucide-react"
// // // // import axios from "axios"

// // // // interface Course {
// // // //   folderId: number
// // // //   courseId: number
// // // //   title: string
// // // // }

// // // // const AddLesson: React.FC = () => {
// // // //   const { user } = useAuth()
// // // //   const navigate = useNavigate()
// // // //   const [myCourses, setMyCourses] = useState<Course[]>([])
// // // //   const [formData, setFormData] = useState({
// // // //     courseId: "",
// // // //     title: "",
// // // //     description: "",
// // // //   })
// // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null)
// // // //   const [loading, setLoading] = useState(false)
// // // //   const [uploading, setUploading] = useState(false)
// // // //   const [error, setError] = useState("")
// // // //   const [success, setSuccess] = useState(false)

// // // //   useEffect(() => {
// // // //     loadMyCourses()
// // // //   }, [user])

// // // //   const loadMyCourses = async () => {
// // // //     try {
// // // //       if (user?.userId) {
// // // //         const courses = await userApi.getUserCourses(user.userId)
// // // //         console.log("courses from server:", courses)
// // // //         setMyCourses(courses)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error loading my courses:", error)
// // // //     }
// // // //   }

// // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const file = e.target.files?.[0]
// // // //     if (file) {
// // // //       // Check if file is audio
// // // //       if (file.type.startsWith("audio/")) {
// // // //         setSelectedFile(file)
// // // //         setError("")
// // // //       } else {
// // // //         setError("אנא בחר קובץ אודיו בלבד")
// // // //         setSelectedFile(null)
// // // //       }
// // // //     }
// // // //   }

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     setError("")
// // // //     setLoading(true)

// // // //     if (!selectedFile) {
// // // //       setError("אנא בחר קובץ אודיו")
// // // //       setLoading(false)
// // // //       return
// // // //     }

// // // //     try {
// // // //       // Upload file to AWS
// // // //       setUploading(true)
// // // //       await uploadApi.uploadFile(selectedFile)
// // // //       setUploading(false)

// // // //       // Create lesson record
// // // //       const lessonData = {
// // // //         categoryId: 1, // Will be determined by course
// // // //         courseId: Number.parseInt(formData.courseId),
// // // //         lessonId: Date.now(), // Generate unique lesson ID
// // // //         teacherId: user?.userId,
// // // //         teacherName: user?.userName,
// // // //         title: formData.title,
// // // //         description: formData.description,
// // // //       }
      
// // // //       console.log(lessonData)    
// // // //       await folderApi.addLesson(lessonData)
// // // //       setSuccess(true)

// // // //       setTimeout(() => {
// // // //         navigate("/my-courses")
// // // //       }, 2000)
// // // //     } 
// // // //     // catch (err: any) {
// // // //     //   setError("שגיאה בהוספת השיעור. אנא נסה שוב.")
// // // //     // } 
// // // //     catch (err: any) {
// // // //       if (axios.isAxiosError(err)) {
// // // //         if (err.response) {
// // // //           console.log(err.response.data?.message || `שגיאה: ${err.response.status} ${err.response.statusText}`);
         
// // // //         } else if (err.request) {
// // // //           console.log("לא התקבלה תגובה מהשרת. אנא בדוק את החיבור שלך.");
// // // //         } else {
// // // //           console.log("שגיאה לא ידועה: " + err.message);
// // // //         }
// // // //       } else {
// // // //         console.log("שגיאה לא צפויה: " + err);
// // // //       }
// // // //     }
    
// // // //     finally {
// // // //       setLoading(false)
// // // //       setUploading(false)
// // // //     }
// // // //   }

// // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       [e.target.name]: e.target.value,
// // // //     })
// // // //   }

// // // //   if (success) {
// // // //     return (
// // // //       <div className="max-w-md mx-auto">
// // // //         <div className="bg-white rounded-lg shadow-lg p-8 text-center">
// // // //           <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
// // // //           <h2 className="text-2xl font-bold text-gray-900 mb-2">השיעור נוסף בהצלחה!</h2>
// // // //           <p className="text-gray-600 mb-4">השיעור "{formData.title}" הועלה ונשמר במערכת</p>
// // // //           <p className="text-sm text-gray-500">מעביר אותך לרשימת הקורסים שלך...</p>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="max-w-2xl mx-auto">
// // // //       <div className="bg-white rounded-lg shadow-sm p-8">
// // // //         <div className="flex items-center space-x-3 space-x-reverse mb-6">
// // // //           <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
// // // //             <Upload className="h-6 w-6 text-green-600" />
// // // //           </div>
// // // //           <div>
// // // //             <h1 className="text-2xl font-bold text-gray-900">הוספת שיעור חדש</h1>
// // // //             <p className="text-gray-600">הוסף שיעור חדש לאחד הקורסים שלך</p>
// // // //           </div>
// // // //         </div>

// // // //         <form onSubmit={handleSubmit} className="space-y-6">
// // // //           {error && (
// // // //             <div className="flex items-center space-x-2 space-x-reverse text-red-600 bg-red-50 p-3 rounded-md">
// // // //               <AlertCircle className="h-5 w-5" />
// // // //               <span className="text-sm">{error}</span>
// // // //             </div>
// // // //           )}

// // // //           <div>
// // // //             <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-2">
// // // //               בחר קורס
// // // //             </label>
// // // //             <select
// // // //               id="courseId"
// // // //               name="courseId"
// // // //               value={formData.courseId}
// // // //               onChange={handleInputChange}
// // // //               required
// // // //               className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // //             >
// // // //               <option value="">בחר קורס...</option>
// // // //               {myCourses.map((course) => (
// // // //                 <option key={course.courseId} value={course.courseId}>
// // // //                   {course.title}
// // // //                 </option>
// // // //               ))}
// // // //             </select>
// // // //           </div>

// // // //           <div>
// // // //             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
// // // //               שם השיעור
// // // //             </label>
// // // //             <input
// // // //               id="title"
// // // //               name="title"
// // // //               type="text"
// // // //               required
// // // //               value={formData.title}
// // // //               onChange={handleInputChange}
// // // //               className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // //               placeholder="הכנס שם לשיעור"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
// // // //               תיאור השיעור
// // // //             </label>
// // // //             <textarea
// // // //               id="description"
// // // //               name="description"
// // // //               rows={3}
// // // //               required
// // // //               value={formData.description}
// // // //               onChange={handleInputChange}
// // // //               className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // //               placeholder="תאר את תוכן השיעור"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700 mb-2">
// // // //               קובץ הקלטה
// // // //             </label>
// // // //             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
// // // //               <div className="space-y-1 text-center">
// // // //                 <FileAudio className="mx-auto h-12 w-12 text-gray-400" />
// // // //                 <div className="flex text-sm text-gray-600">
// // // //                   <label
// // // //                     htmlFor="audioFile"
// // // //                     className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
// // // //                   >
// // // //                     <span>העלה קובץ אודיו</span>
// // // //                     <input
// // // //                       id="audioFile"
// // // //                       name="audioFile"
// // // //                       type="file"
// // // //                       accept="audio/*"
// // // //                       onChange={handleFileChange}
// // // //                       className="sr-only"
// // // //                     />
// // // //                   </label>
// // // //                   <p className="pr-1">או גרור ושחרר</p>
// // // //                 </div>
// // // //                 <p className="text-xs text-gray-500">MP3, WAV, M4A עד 100MB</p>
// // // //                 {selectedFile && <p className="text-sm text-green-600 font-medium">נבחר: {selectedFile.name}</p>}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
// // // //             <p className="text-sm text-blue-800">
// // // //               <strong>שים לב:</strong> הקובץ יועלה ל-AWS S3 ויתבצע תמלול אוטומטי של התוכן.
// // // //             </p>
// // // //           </div>

// // // //           <div className="flex space-x-3 space-x-reverse">
// // // //             <button
// // // //               type="submit"
// // // //               disabled={loading || uploading}
// // // //               className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse"
// // // //             >
// // // //               {uploading ? (
// // // //                 <>
// // // //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// // // //                   <span>מעלה קובץ...</span>
// // // //                 </>
// // // //               ) : loading ? (
// // // //                 <>
// // // //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// // // //                   <span>שומר שיעור...</span>
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <Save className="h-4 w-4" />
// // // //                   <span>הוסף שיעור</span>
// // // //                 </>
// // // //               )}
// // // //             </button>
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => navigate("/my-courses")}
// // // //               className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
// // // //             >
// // // //               ביטול
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default AddLesson
// // // // "use client"

// // // // import type React from "react"
// // // // import { useState, useEffect } from "react"
// // // // import { useNavigate } from "react-router-dom"
// // // // import { folderApi, uploadApi, userApi } from "../services/api"
// // // // import { useAuth } from "../contexts/AuthContext"
// // // // import { Upload, Save, AlertCircle, CheckCircle, FileAudio, BookOpen, FileText } from "lucide-react"
// // // // import axios from "axios"

// // // // interface Course {
// // // //   folderId: number
// // // //   courseId: number
// // // //   title: string
// // // // }

// // // // const AddLesson: React.FC = () => {
// // // //   const { user } = useAuth()
// // // //   const navigate = useNavigate()
// // // //   const [myCourses, setMyCourses] = useState<Course[]>([])
// // // //   const [formData, setFormData] = useState({
// // // //     courseId: "",
// // // //     title: "",
// // // //     description: "",
// // // //   })
// // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null)
// // // //   const [lessonsCount, setLessonsCount] = useState(0);
// // // //   const [loading, setLoading] = useState(false)
// // // //   const [uploading, setUploading] = useState(false)
// // // //   const [error, setError] = useState("")
// // // //   const [success, setSuccess] = useState(false)

// // // //   useEffect(() => {
// // // //     loadMyCourses()
// // // //   }, [user])

// // // //   const loadMyCourses = async () => {
// // // //     try {
// // // //       if (user?.userId) {
// // // //         const courses = await userApi.getUserCourses(user.userId)
// // // //         console.log("courses from server:", courses)
// // // //         setMyCourses(courses)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error loading my courses:", error)
// // // //     }
// // // //   }

// // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const file = e.target.files?.[0]
// // // //     if (file) {
// // // //       if (file.type.startsWith("audio/")) {
// // // //         setSelectedFile(file)
// // // //         setError("")
// // // //       } else {
// // // //         setError("אנא בחר קובץ אודיו בלבד")
// // // //         setSelectedFile(null)
// // // //       }
// // // //     }
// // // //   }

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     setError("")
// // // //     setLoading(true)

// // // //     if (!selectedFile) {
// // // //       setError("אנא בחר קובץ אודיו")
// // // //       setLoading(false)
// // // //       return
// // // //     }

// // // //     try {
// // // //       setUploading(true)
// // // //       await uploadApi.uploadFile(selectedFile)
// // // //       setUploading(false)

// // // //       const lessonId = lessonsCount + 1; // הוספת 1 למספר השיעורים הקיימים
// // // //       console.log(lessonId);
      
// // // //       const lessonData = {
// // // //         categoryId: 1,
// // // //         courseId: Number.parseInt(formData.courseId),
// // // //         teacherId: user?.userId,
// // // //         // lessonId: Date.now(),
// // // //         lessonId: lessonId,
// // // //         title: formData.title,
// // // //         teacherName: user?.userName,
// // // //         description: formData.description,
// // // //       }
// // // //     //  setLessonsCount(lessonId);
// // // //       console.log(lessonData)
// // // //       await folderApi.addLesson(lessonData)
// // // //       setSuccess(true)

// // // //       setTimeout(() => {
// // // //         navigate("/my-courses")
// // // //       }, 2000)
// // // //     } catch (err: any) {
// // // //       if (axios.isAxiosError(err)) {
// // // //         if (err.response) {
// // // //           console.log(err.response.data?.message || `שגיאה: ${err.response.status} ${err.response.statusText}`)
// // // //         } else if (err.request) {
// // // //           console.log("לא התקבלה תגובה מהשרת. אנא בדוק את החיבור שלך.")
// // // //         } else {
// // // //           console.log("שגיאה לא ידועה: " + err.message)
// // // //         }
// // // //       } else {
// // // //         console.log("שגיאה לא צפויה: " + err)
// // // //       }
// // // //     } finally {
// // // //       setLoading(false)
// // // //       setUploading(false)
// // // //     }
// // // //   }

// // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       [e.target.name]: e.target.value,
// // // //     })
// // // //   }

// // // //   if (success) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
// // // //         <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
// // // //           <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
// // // //             <CheckCircle className="h-8 w-8 text-white" />
// // // //           </div>
// // // //           <h2 className="text-2xl font-bold text-gray-900 mb-2">השיעור נוסף בהצלחה!</h2>
// // // //           <p className="text-gray-600 mb-4">השיעור "{formData.title}" הועלה ונשמר במערכת</p>
// // // //           <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-500">
// // // //             <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
// // // //             <span>מעביר אותך לרשימת הקורסים שלך...</span>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="max-w-2xl mx-auto">
// // // //       <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
// // // //         <div className="text-center mb-8">
// // // //           <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
// // // //             <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
// // // //               <Upload className="h-6 w-6 text-white" />
// // // //             </div>
// // // //             {/* <div className="w-8 h-8 rounded-full overflow-hidden">
// // // //               <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
// // // //             </div> */}
// // // //           </div>
// // // //           <h1 className="text-3xl font-bold text-gray-900 mb-2">הוספת שיעור חדש</h1>
// // // //           <p className="text-gray-600">הוסף שיעור חדש לאחד הקורסים שלך ושתף את הידע</p>
// // // //         </div>

// // // //         <form onSubmit={handleSubmit} className="space-y-6">
// // // //           {error && (
// // // //             <div className="flex items-center space-x-3 space-x-reverse text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
// // // //               <AlertCircle className="h-5 w-5 flex-shrink-0" />
// // // //               <span className="text-sm">{error}</span>
// // // //             </div>
// // // //           )}

// // // //           <div>
// // // //             <label htmlFor="courseId" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// // // //               <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
// // // //               בחר קורס
// // // //             </label>
// // // //             <select
// // // //               id="courseId"
// // // //               name="courseId"
// // // //               value={formData.courseId}
// // // //               onChange={handleInputChange}
// // // //               required
// // // //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// // // //             >
// // // //               <option value="">בחר קורס...</option>
// // // //               {myCourses.map((course) => (
// // // //                 <option key={course.courseId} value={course.courseId}>
// // // //                   {course.title}
// // // //                 </option>
// // // //               ))}
// // // //             </select>
// // // //           </div>

// // // //           <div>
// // // //             <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// // // //               <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
// // // //               שם השיעור
// // // //             </label>
// // // //             <input
// // // //               id="title"
// // // //               name="title"
// // // //               type="text"
// // // //               required
// // // //               value={formData.title}
// // // //               onChange={handleInputChange}
// // // //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// // // //               placeholder="הכנס שם ברור ומעניין לשיעור"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// // // //               <FileText className="h-4 w-4 ml-1 text-blue-600" />
// // // //               תיאור השיעור
// // // //             </label>
// // // //             <textarea
// // // //               id="description"
// // // //               name="description"
// // // //               rows={3}
// // // //               required
// // // //               value={formData.description}
// // // //               onChange={handleInputChange}
// // // //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
// // // //               placeholder="תאר את תוכן השיעור ומה התלמידים ילמדו"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label htmlFor="audioFile" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// // // //               <FileAudio className="h-4 w-4 ml-1 text-blue-600" />
// // // //               קובץ הקלטה
// // // //             </label>
// // // //             <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-200 border-dashed rounded-2xl hover:border-blue-300 transition-all duration-200 bg-gradient-to-br from-gray-50 to-blue-50/30">
// // // //               <div className="space-y-2 text-center">
// // // //                 <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
// // // //                   <FileAudio className="h-8 w-8 text-blue-600" />
// // // //                 </div>
// // // //                 <div className="flex text-sm text-gray-600">
// // // //                   <label
// // // //                     htmlFor="audioFile"
// // // //                     className="relative cursor-pointer bg-white rounded-xl font-semibold text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-3 py-1"
// // // //                   >
// // // //                     <span>העלה קובץ אודיו</span>
// // // //                     <input
// // // //                       id="audioFile"
// // // //                       name="audioFile"
// // // //                       type="file"
// // // //                       accept="audio/*"
// // // //                       onChange={handleFileChange}
// // // //                       className="sr-only"
// // // //                     />
// // // //                   </label>
// // // //                   <p className="pr-1">או גרור ושחרר כאן</p>
// // // //                 </div>
// // // //                 <p className="text-xs text-gray-500">MP3, WAV, M4A עד 100MB</p>
// // // //                 {selectedFile && (
// // // //                   <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-3">
// // // //                     <p className="text-sm text-green-700 font-medium">✓ נבחר: {selectedFile.name}</p>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
// // // //             <p className="text-sm text-blue-800">
// // // //               <strong>🚀 מתקדם:</strong> הקובץ יועלה ל-AWS S3 ויתבצע תמלול אוטומטי של התוכן.
// // // //             </p>
// // // //           </div>

// // // //           <div className="flex space-x-4 space-x-reverse pt-4">
// // // //             <button
// // // //               type="submit"
// // // //               disabled={loading || uploading}
// // // //               className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse font-semibold shadow-lg hover:shadow-xl"
// // // //             >
// // // //               {uploading ? (
// // // //                 <>
// // // //                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
// // // //                   <span>מעלה קובץ...</span>
// // // //                 </>
// // // //               ) : loading ? (
// // // //                 <>
// // // //                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
// // // //                   <span>שומר שיעור...</span>
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <Save className="h-5 w-5" />
// // // //                   <span>הוסף שיעור</span>
// // // //                 </>
// // // //               )}
// // // //             </button>
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => navigate("/my-courses")}
// // // //               className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
// // // //             >
// // // //               ביטול
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default AddLesson
// // // "use client";

// // // import type React from "react";
// // // import { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { folderApi, uploadApi, userApi } from "../services/api";
// // // import { useAuth } from "../contexts/AuthContext";
// // // import { Upload, Save, AlertCircle, CheckCircle, FileAudio, BookOpen, FileText } from "lucide-react";
// // // import axios from "axios";

// // // interface Course {
// // //   folderId: number;
// // //   courseId: number;
// // //   title: string;
// // // }

// // // const AddLesson: React.FC = () => {
// // //   const { user } = useAuth();
// // //   const navigate = useNavigate();
// // //   const [myCourses, setMyCourses] = useState<Course[]>([]);
// // //   const [formData, setFormData] = useState({
// // //     courseId: "",
// // //     title: "",
// // //     description: "",
// // //   });
// // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // //   const [lessonsCount, setLessonsCount] = useState(0);
// // //   const [loading, setLoading] = useState(false);
// // //   const [uploading, setUploading] = useState(false);
// // //   const [error, setError] = useState("");
// // //   const [success, setSuccess] = useState(false);

// // //   useEffect(() => {
// // //     loadMyCourses();
// // //   }, [user]);

// // //   const loadMyCourses = async () => {
// // //     try {
// // //       if (user?.userId) {
// // //         const courses = await userApi.getUserCourses(user.userId);
// // //         console.log("courses from server:", courses);
// // //         setMyCourses(courses);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error loading my courses:", error);
// // //     }
// // //   };

// // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (file) {
// // //       if (file.type.startsWith("audio/")) {
// // //         setSelectedFile(file);
// // //         setError("");
// // //       } else {
// // //         setError("אנא בחר קובץ אודיו בלבד");
// // //         setSelectedFile(null);
// // //       }
// // //     }
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setLoading(true);

// // //     if (!selectedFile) {
// // //       setError("אנא בחר קובץ אודיו");
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     try {
// // //       setUploading(true);
// // //       // await uploadApi.uploadFile(selectedFile);
// // //       await uploadApi.uploadFile(selectedFile, lessonData.courseId, lessonData.lessonId);

// // //       setUploading(false);

// // //       // const lessonId = lessonsCount + 1; // הוספת 1 למספר השיעורים הקיימים
// // //       // console.log(lessonId);
      
// // //       const lessonData = {
// // //         categoryId: 1,
// // //         courseId: Number.parseInt(formData.courseId),
// // //         teacherId: user?.userId,
// // //         lessonId: 1,
// // //         title: formData.title,
// // //         teacherName: user?.userName,
// // //         description: formData.description,
// // //       };
      
// // //       console.log(lessonData);
// // //       await folderApi.addLesson(lessonData, lessonData.courseId, lessonData.lessonId);
// // //       setSuccess(true);

// // //       setTimeout(() => {
// // //         navigate("/my-courses");
// // //       }, 2000);
// // //     } catch (err: any) {
// // //       if (axios.isAxiosError(err)) {
// // //         if (err.response) {
// // //           console.log(err.response.data?.message || `שגיאה: ${err.response.status} ${err.response.statusText}`);
// // //         } else if (err.request) {
// // //           console.log("לא התקבלה תגובה מהשרת. אנא בדוק את החיבור שלך.");
// // //         } else {
// // //           console.log("שגיאה לא ידועה: " + err.message);
// // //         }
// // //       } else {
// // //         console.log("שגיאה לא צפויה: " + err);
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //       setUploading(false);
// // //     }
// // //   };

// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// // //     setFormData({
// // //       ...formData,
// // //       [e.target.name]: e.target.value,
// // //     });
// // //   };

// // //   if (success) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
// // //         <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
// // //           <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
// // //             <CheckCircle className="h-8 w-8 text-white" />
// // //           </div>
// // //           <h2 className="text-2xl font-bold text-gray-900 mb-2">השיעור נוסף בהצלחה!</h2>
// // //           <p className="text-gray-600 mb-4">השיעור "{formData.title}" הועלה ונשמר במערכת</p>
// // //           <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-500">
// // //             <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
// // //             <span>מעביר אותך לרשימת הקורסים שלך...</span>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="max-w-2xl mx-auto">
// // //       <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
// // //         <div className="text-center mb-8">
// // //           <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
// // //             <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
// // //               <Upload className="h-6 w-6 text-white" />
// // //             </div>
// // //           </div>
// // //           <h1 className="text-3xl font-bold text-gray-900 mb-2">הוספת שיעור חדש</h1>
// // //           <p className="text-gray-600">הוסף שיעור חדש לאחד הקורסים שלך ושתף את הידע</p>
// // //         </div>

// // //         <form onSubmit={handleSubmit} className="space-y-6">
// // //           {error && (
// // //             <div className="flex items-center space-x-3 space-x-reverse text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
// // //               <AlertCircle className="h-5 w-5 flex-shrink-0" />
// // //               <span className="text-sm">{error}</span>
// // //             </div>
// // //           )}

// // //           <div>
// // //             <label htmlFor="courseId" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// // //               <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
// // //               בחר קורס
// // //             </label>
// // //             <select
// // //               id="courseId"
// // //               name="courseId"
// // //               value={formData.courseId}
// // //               onChange={handleInputChange}
// // //               required
// // //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// // //             >
// // //               <option value="">בחר קורס...</option>
// // //               {myCourses.map((course) => (
// // //                 <option key={course.courseId} value={course.courseId}>
// // //                   {course.title}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>

// // //           <div>
// // //             <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// // //               <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
// // //               שם השיעור
// // //             </label>
// // //             <input
// // //               id="title"
// // //               name="title"
// // //               type="text"
// // //               required
// // //               value={formData.title}
// // //               onChange={handleInputChange}
// // //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// // //               placeholder="הכנס שם ברור ומעניין לשיעור"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// // //               <FileText className="h-4 w-4 ml-1 text-blue-600" />
// // //               תיאור השיעור
// // //             </label>
// // //             <textarea
// // //               id="description"
// // //               name="description"
// // //               rows={3}
// // //               required
// // //               value={formData.description}
// // //               onChange={handleInputChange}
// // //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
// // //               placeholder="תאר את תוכן השיעור ומה התלמידים ילמדו"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label htmlFor="audioFile" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// // //               <FileAudio className="h-4 w-4 ml-1 text-blue-600" />
// // //               קובץ הקלטה
// // //             </label>
// // //             <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-200 border-dashed rounded-2xl hover:border-blue-300 transition-all duration-200 bg-gradient-to-br from-gray-50 to-blue-50/30">
// // //               <div className="space-y-2 text-center">
// // //                 <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
// // //                   <FileAudio className="h-8 w-8 text-blue-600" />
// // //                 </div>
// // //                 <div className="flex text-sm text-gray-600">
// // //                   <label
// // //                     htmlFor="audioFile"
// // //                     className="relative cursor-pointer bg-white rounded-xl font-semibold text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-3 py-1"
// // //                   >
// // //                     <span>העלה קובץ אודיו</span>
// // //                     <input
// // //                       id="audioFile"
// // //                       name="audioFile"
// // //                       type="file"
// // //                       accept="audio/*"
// // //                       onChange={handleFileChange}
// // //                       className="sr-only"
// // //                     />
// // //                   </label>
// // //                   <p className="pr-1">או גרור ושחרר כאן</p>
// // //                 </div>
// // //                 <p className="text-xs text-gray-500">MP3, WAV, M4A עד 100MB</p>
// // //                 {selectedFile && (
// // //                   <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-3">
// // //                     <p className="text-sm text-green-700 font-medium">✓ נבחר: {selectedFile.name}</p>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
// // //             <p className="text-sm text-blue-800">
// // //               <strong>🚀 מתקדם:</strong> הקובץ יועלה ל-AWS S3 ויתבצע תמלול אוטומטי של התוכן.
// // //             </p>
// // //           </div>

// // //           <div className="flex space-x-4 space-x-reverse pt-4">
// // //             <button
// // //               type="submit"
// // //               disabled={loading || uploading}
// // //               className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse font-semibold shadow-lg hover:shadow-xl"
// // //             >
// // //               {uploading ? (
// // //                 <>
// // //                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
// // //                   <span>מעלה קובץ...</span>
// // //                 </>
// // //               ) : loading ? (
// // //                 <>
// // //                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
// // //                   <span>שומר שיעור...</span>
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <Save className="h-5 w-5" />
// // //                   <span>הוסף שיעור</span>
// // //                 </>
// // //               )}
// // //             </button>
// // //             <button
// // //               type="button"
// // //               onClick={() => navigate("/my-courses")}
// // //               className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
// // //             >
// // //               ביטול
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AddLesson;
// // "use client";

// // import type React from "react";
// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { folderApi, uploadApi, userApi } from "../services/api";
// // import { useAuth } from "../contexts/AuthContext";
// // import { Upload, Save, AlertCircle, CheckCircle, FileAudio, BookOpen, FileText } from "lucide-react";
// // import axios from "axios";

// // interface Course {
// //   folderId: number;
// //   courseId: number;
// //   title: string;
// // }

// // const AddLesson: React.FC = () => {
// //   const { user } = useAuth();
// //   const navigate = useNavigate();
// //   const [myCourses, setMyCourses] = useState<Course[]>([]);
// //   const [formData, setFormData] = useState({
// //     courseId: "",
// //     title: "",
// //     description: "",
// //   });
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [lessonsCount, setLessonsCount] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   const [uploading, setUploading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   useEffect(() => {
// //     loadMyCourses();
// //   }, [user]);

// //   const loadMyCourses = async () => {
// //     try {
// //       if (user?.userId) {
// //         const courses = await userApi.getUserCourses(user.userId);
// //         console.log("courses from server:", courses);
// //         setMyCourses(courses);
// //       }
// //     } catch (error) {
// //       console.error("Error loading my courses:", error);
// //     }
// //   };

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       if (file.type.startsWith("audio/")) {
// //         setSelectedFile(file);
// //         setError("");
// //       } else {
// //         setError("אנא בחר קובץ אודיו בלבד");
// //         setSelectedFile(null);
// //       }
// //     }
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     if (!selectedFile) {
// //       setError("אנא בחר קובץ אודיו");
// //       setLoading(false);
// //       return;
// //     }

// //     // הגדרת lessonData לפני השימוש בו
// //     const lessonData = {
// //       categoryId: 1,
// //       courseId: Number.parseInt(formData.courseId),
// //       teacherId: user?.userId,
// //       lessonId: 1, // תוכל לשנות את זה בהתאם לדרישות שלך
// //       title: formData.title,
// //       teacherName: user?.userName,
// //       description: formData.description,
// //     };

// //     try {
// //       setUploading(true);
// //       await uploadApi.uploadFile(selectedFile, lessonData.courseId, lessonData.lessonId);
// //       setUploading(false);

// //       console.log(lessonData);
// //       await folderApi.addLesson(lessonData);
// //       // await folderApi.addLesson(lessonData, lessonData.courseId, lessonData.lessonId);
// //       setSuccess(true);

// //       setTimeout(() => {
// //         navigate("/my-courses");
// //       }, 2000);
// //     } catch (err: any) {
// //       if (axios.isAxiosError(err)) {
// //         if (err.response) {
// //           console.log(err.response.data?.message || `שגיאה: ${err.response.status} ${err.response.statusText}`);
// //         } else if (err.request) {
// //           console.log("לא התקבלה תגובה מהשרת. אנא בדוק את החיבור שלך.");
// //         } else {
// //           console.log("שגיאה לא ידועה: " + err.message);
// //         }
// //       } else {
// //         console.log("שגיאה לא צפויה: " + err);
// //       }
// //     } finally {
// //       setLoading(false);
// //       setUploading(false);
// //     }
// //   };

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   if (success) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
// //         <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
// //           <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
// //             <CheckCircle className="h-8 w-8 text-white" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-900 mb-2">השיעור נוסף בהצלחה!</h2>
// //           <p className="text-gray-600 mb-4">השיעור "{formData.title}" הועלה ונשמר במערכת</p>
// //           <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-500">
// //             <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
// //             <span>מעביר אותך לרשימת הקורסים שלך...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-2xl mx-auto">
// //       <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
// //         <div className="text-center mb-8">
// //           <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
// //             <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
// //               <Upload className="h-6 w-6 text-white" />
// //             </div>
// //           </div>
// //           <h1 className="text-3xl font-bold text-gray-900 mb-2">הוספת שיעור חדש</h1>
// //           <p className="text-gray-600">הוסף שיעור חדש לאחד הקורסים שלך ושתף את הידע</p>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {error && (
// //             <div className="flex items-center space-x-3 space-x-reverse text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
// //               <AlertCircle className="h-5 w-5 flex-shrink-0" />
// //               <span className="text-sm">{error}</span>
// //             </div>
// //           )}

// //           <div>
// //             <label htmlFor="courseId" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// //               <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
// //               בחר קורס
// //             </label>
// //             <select
// //               id="courseId"
// //               name="courseId"
// //               value={formData.courseId}
// //               onChange={handleInputChange}
// //               required
// //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //             >
// //               <option value="">בחר קורס...</option>
// //               {myCourses.map((course) => (
// //                 <option key={course.courseId} value={course.courseId}>
// //                   {course.title}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// //               <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
// //               שם השיעור
// //             </label>
// //             <input
// //               id="title"
// //               name="title"
// //               type="text"
// //               required
// //               value={formData.title}
// //               onChange={handleInputChange}
// //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //               placeholder="הכנס שם ברור ומעניין לשיעור"
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// //               <FileText className="h-4 w-4 ml-1 text-blue-600" />
// //               תיאור השיעור
// //             </label>
// //             <textarea
// //               id="description"
// //               name="description"
// //               rows={3}
// //               required
// //               value={formData.description}
// //               onChange={handleInputChange}
// //               className="block w-full px-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
// //               placeholder="תאר את תוכן השיעור ומה התלמידים ילמדו"
// //             />
// //           </div>

// //           <div>
// //             <label htmlFor="audioFile" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
// //               <FileAudio className="h-4 w-4 ml-1 text-blue-600" />
// //               קובץ הקלטה
// //             </label>
// //             <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-200 border-dashed rounded-2xl hover:border-blue-300 transition-all duration-200 bg-gradient-to-br from-gray-50 to-blue-50/30">
// //               <div className="space-y-2 text-center">
// //                 <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
// //                   <FileAudio className="h-8 w-8 text-blue-600" />
// //                 </div>
// //                 <div className="flex text-sm text-gray-600">
// //                   <label
// //                     htmlFor="audioFile"
// //                     className="relative cursor-pointer bg-white rounded-xl font-semibold text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-3 py-1"
// //                   >
// //                     <span>העלה קובץ אודיו</span>
// //                     <input
// //                       id="audioFile"
// //                       name="audioFile"
// //                       type="file"
// //                       accept="audio/*"
// //                       onChange={handleFileChange}
// //                       className="sr-only"
// //                     />
// //                   </label>
// //                   <p className="pr-1">או גרור ושחרר כאן</p>
// //                 </div>
// //                 <p className="text-xs text-gray-500">MP3, WAV, M4A עד 100MB</p>
// //                 {selectedFile && (
// //                   <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-3">
// //                     <p className="text-sm text-green-700 font-medium">✓ נבחר: {selectedFile.name}</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
// //             <p className="text-sm text-blue-800">
// //                הקובץ יועלה ל-AWS S3 ויתבצע תמלול אוטומטי של התוכן.
// //             </p>
// //           </div>

// //           <div className="flex space-x-4 space-x-reverse pt-4">
// //             <button
// //               type="submit"
// //               disabled={loading || uploading}
// //               className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 space-x-reverse font-semibold shadow-lg hover:shadow-xl"
// //             >
// //               {uploading ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
// //                   <span>מעלה קובץ...</span>
// //                 </>
// //               ) : loading ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
// //                   <span>שומר שיעור...</span>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Save className="h-5 w-5" />
// //                   <span>הוסף שיעור</span>
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
// //   );
// // };

// // export default AddLesson;
// "use client";

// import type React from "react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { folderApi, uploadApi, userApi } from "../services/api";
// import { useAuth } from "../contexts/AuthContext";
// import { Upload, Save, AlertCircle, CheckCircle, FileAudio, BookOpen, FileText } from "lucide-react";
// import axios from "axios";

// interface Course {
//   folderId: number;
//   courseId: number;
//   title: string;
// }

// const AddLesson: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [myCourses, setMyCourses] = useState<Course[]>([]);
//   const [formData, setFormData] = useState({
//     courseId: "",
//     title: "",
//     description: "",
//   });
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [lessonsCount, setLessonsCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     loadMyCourses();
//   }, [user]);

//   const loadMyCourses = async () => {
//     try {
//       if (user?.userId) {
//         const courses = await userApi.getUserCourses(user.userId);
//         setMyCourses(courses);
//       }
//     } catch (error) {
//       console.error("Error loading my courses:", error);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.type.startsWith("audio/")) {
//         setSelectedFile(file);
//         setError("");
//       } else {
//         setError("אנא בחר קובץ אודיו בלבד");
//         setSelectedFile(null);
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!selectedFile) {
//       setError("אנא בחר קובץ אודיו");
//       setLoading(false);
//       return;
//     }

//     const lessonData = {
//       categoryId: 1,
//       courseId: Number.parseInt(formData.courseId),
//       teacherId: user?.userId,
//       lessonId: 1, // יש לעדכן לפי המזהה הנכון
//       title: formData.title,
//       teacherName: user?.userName,
//       description: formData.description,
//     };

//     try {
//       setUploading(true);
//       await uploadApi.uploadFile(selectedFile, lessonData.courseId, lessonData.lessonId);
//       setUploading(false);

//       await folderApi.addLesson(lessonData);
//       setSuccess(true);

//       setTimeout(() => {
//         navigate(`/course/${formData.courseId}`);
//       }, 2000);
//     } catch (err: any) {
//       if (axios.isAxiosError(err)) {
//         if (err.response) {
//           console.log(err.response.data?.message || `שגיאה: ${err.response.status} ${err.response.statusText}`);
//         } else if (err.request) {
//           console.log("לא התקבלה תגובה מהשרת. אנא בדוק את החיבור שלך.");
//         } else {
//           console.log("שגיאה לא ידועה: " + err.message);
//         }
//       } else {
//         console.log("שגיאה לא צפויה: " + err);
//       }
//     } finally {
//       setLoading(false);
//       setUploading(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
//           <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle className="h-8 w-8 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">השיעור נוסף בהצלחה!</h2>
//           <p className="text-gray-600 mb-4">השיעור "{formData.title}" הועלה ונשמר במערכת</p>
//           <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-500">
//             <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
//             <span>מעביר אותך לעמוד הקורס...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
//               <Upload className="h-6 w-6 text-white" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">הוספת שיעור חדש</h1>
//           <p className="text-gray-600">הוסף שיעור חדש לאחד הקורסים שלך ושתף את הידע</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <div className="flex items-center space-x-3 space-x-reverse text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
//               <AlertCircle className="h-5 w-5 flex-shrink-0" />
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           <div>
//             <label htmlFor="courseId" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//               <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
//               בחר קורס
//             </label>
//             <select
//               id="courseId"
//               name="courseId"
//               value={formData.courseId}
//               onChange={handleInputChange}
//               required
//               className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">בחר קורס...</option>
//               {myCourses.map((course) => (
//                 <option key={course.courseId} value={course.courseId}>
//                   {course.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//               <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
//               שם השיעור
//             </label>
//             <input
//               id="title"
//               name="title"
//               type="text"
//               required
//               value={formData.title}
//               onChange={handleInputChange}
//               className="block w-full px-4 py-3 border border-gray-200 rounded-xl"
//               placeholder="הכנס שם ברור ומעניין לשיעור"
//             />
//           </div>

//           <div>
//             <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//               <FileText className="h-4 w-4 ml-1 text-blue-600" />
//               תיאור השיעור
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               rows={3}
//               required
//               value={formData.description}
//               onChange={handleInputChange}
//               className="block w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
//               placeholder="תאר את תוכן השיעור ומה התלמידים ילמדו"
//             />
//           </div>

//           <div>
//             <label htmlFor="audioFile" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
//               <FileAudio className="h-4 w-4 ml-1 text-blue-600" />
//               קובץ הקלטה
//             </label>
//             <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-200 border-dashed rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/30">
//               <div className="space-y-2 text-center">
//                 <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                   <FileAudio className="h-8 w-8 text-blue-600" />
//                 </div>
//                 <div className="flex text-sm text-gray-600">
//                   <label
//                     htmlFor="audioFile"
//                     className="relative cursor-pointer bg-white rounded-xl font-semibold text-blue-600 px-3 py-1"
//                   >
//                     <span>העלה קובץ אודיו</span>
//                     <input
//                       id="audioFile"
//                       name="audioFile"
//                       type="file"
//                       accept="audio/*"
//                       onChange={handleFileChange}
//                       className="sr-only"
//                     />
//                   </label>
//                   <p className="pr-1">או גרור ושחרר כאן</p>
//                 </div>
//                 {selectedFile && (
//                   <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-3">
//                     <p className="text-sm text-green-700 font-medium">✓ נבחר: {selectedFile.name}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
//             <p className="text-sm text-blue-800">הקובץ יועלה ל-AWS S3 ויתבצע תמלול אוטומטי של התוכן.</p>
//           </div>

//           <div className="flex space-x-4 space-x-reverse pt-4">
//             <button
//               type="submit"
//               disabled={loading || uploading}
//               className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2 space-x-reverse"
//             >
//               {uploading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                   <span>מעלה קובץ...</span>
//                 </>
//               ) : loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                   <span>שומר שיעור...</span>
//                 </>
//               ) : (
//                 <>
//                   <Save className="h-5 w-5" />
//                   <span>הוסף שיעור</span>
//                 </>
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate("/my-courses")}
//               className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50"
//             >
//               ביטול
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddLesson;
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { folderApi, uploadApi, userApi } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { Upload, Save, AlertCircle, CheckCircle, FileAudio, BookOpen, FileText } from "lucide-react";
import axios from "axios";

interface Folder {
  folderId: number;
  categoryId: number | null;
  courseId: number | null;
  lessonId: number | null;
  title: string;
  description: string;
}

interface Course {
  folderId: number;
  courseId: number;
  title: string;
}

const AddLesson: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [allFolders, setAllFolders] = useState<Folder[]>([]);
  const [lessonsCount, setLessonsCount] = useState(0);

  const [formData, setFormData] = useState({
    courseId: "",
    title: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadMyCourses();
    loadAllFolders();
  }, [user]);

  const loadMyCourses = async () => {
    try {
      if (user?.userId) {
        const courses = await userApi.getUserCourses(user.userId);
        setMyCourses(courses);
      }
    } catch (error) {
      console.error("Error loading my courses:", error);
    }
  };

  const loadAllFolders = async () => {
    try {
      const folders = await folderApi.getAllFolders();
      setAllFolders(folders);
    } catch (error) {
      console.error("Error loading folders:", error);
    }
  };

  // פונקציה לעדכון ספירת השיעורים לפי courseId שנבחר
  useEffect(() => {
    if (!formData.courseId) {
      setLessonsCount(0);
      return;
    }
    const selectedCourseId = Number(formData.courseId);
    const lessons = allFolders.filter(
      (folder) =>
        folder.courseId === selectedCourseId &&
        folder.lessonId !== null // שיעור חייב להיות עם lessonId
    );
    setLessonsCount(lessons.length);
  }, [formData.courseId, allFolders]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("audio/")) {
        setSelectedFile(file);
        setError("");
      } else {
        setError("אנא בחר קובץ אודיו בלבד");
        setSelectedFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!selectedFile) {
      setError("אנא בחר קובץ אודיו");
      setLoading(false);
      return;
    }

    const courseIdNum = Number.parseInt(formData.courseId);
    const lessonIdNum = lessonsCount + 1; // יוצרים מזהה שיעור חדש (למשל +1 לספירה הנוכחית)

    const lessonData = {
      categoryId: 1, // אפשר לשנות בהתאם
      courseId: courseIdNum,
      teacherId: user?.userId,
      lessonId: lessonIdNum,
      title: formData.title,
      teacherName: user?.userName,
      description: formData.description,
    };

    try {
      setUploading(true);
      await uploadApi.uploadFile(selectedFile, lessonData.courseId, lessonData.lessonId);
      setUploading(false);

      await folderApi.addLesson(lessonData);
      setSuccess(true);

      setTimeout(() => {
        navigate(`/course/${formData.courseId}`);
      }, 2000);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.log(err.response.data?.message || `שגיאה: ${err.response.status} ${err.response.statusText}`);
        } else if (err.request) {
          console.log("לא התקבלה תגובה מהשרת. אנא בדוק את החיבור שלך.");
        } else {
          console.log("שגיאה לא ידועה: " + err.message);
        }
      } else {
        console.log("שגיאה לא צפויה: " + err);
      }
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">השיעור נוסף בהצלחה!</h2>
          <p className="text-gray-600 mb-4">השיעור "{formData.title}" הועלה ונשמר במערכת</p>
          <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
            <span>מעביר אותך לעמוד הקורס...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Upload className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">הוספת שיעור חדש</h1>
          <p className="text-gray-600">הוסף שיעור חדש לאחד הקורסים שלך ושתף את הידע</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center space-x-3 space-x-reverse text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="courseId" className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
              בחר קורס
            </label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">בחר קורס...</option>
              {myCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.title}
                </option>
              ))}
            </select>
            {/* הצגת מספר שיעורים בקורס הנבחר */}
            {formData.courseId && (
              <p className="mt-2 text-sm text-gray-600">
                יש <strong>{lessonsCount}</strong> שיעורים בקורס זה
              </p>
            )}
          </div>

          {/* שאר השדות נשארים כמו שהם */}

          <div>
            <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <BookOpen className="h-4 w-4 ml-1 text-blue-600" />
              שם השיעור
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 border border-gray-200 rounded-xl"
              placeholder="הכנס שם ברור ומעניין לשיעור"
            />
          </div>

          <div>
            <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <FileText className="h-4 w-4 ml-1 text-blue-600" />
              תיאור השיעור
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleInputChange}
              className="block w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
              placeholder="תאר את תוכן השיעור ומה התלמידים ילמדו"
            />
          </div>

          <div>
            <label htmlFor="audioFile" className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <FileAudio className="h-4 w-4 ml-1 text-blue-600" />
              קובץ הקלטה
            </label>
            <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-200 border-dashed rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/30">
              <div className="space-y-2 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileAudio className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="audioFile"
                    className="relative cursor-pointer bg-white rounded-xl font-semibold text-blue-600 px-3 py-1"
                  >
                    <span>העלה קובץ אודיו</span>
                    <input
                      id="audioFile"
                      name="audioFile"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pr-1">או גרור ושחרר כאן</p>
                </div>
                {selectedFile && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 mt-3">
                    <p className="text-sm text-green-700 font-medium">✓ נבחר: {selectedFile.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">הקובץ יועלה ל-AWS S3 ויתבצע תמלול אוטומטי של התוכן.</p>
          </div>

          <div className="flex space-x-4 space-x-reverse pt-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2 space-x-reverse"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>מעלה קובץ...</span>
                </>
              ) : loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>שומר שיעור...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>הוסף שיעור</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/my-courses")}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50"
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
