// // // // "use client"

// // // // import type React from "react"
// // // // import { useState, useEffect } from "react"
// // // // import { useParams } from "react-router-dom"
// // // // import { folderApi, uploadApi, userApi } from "../services/api"
// // // // import { Play, FileText, Mail, Download } from "lucide-react"

// // // // interface Course {
// // // //   folderId: number
// // // //   courseId: number
// // // //   teacherId: number
// // // //   teacherName: string
// // // //   teacherEmail: string
// // // //   title: string
// // // //   description: string
// // // //   numberOfLessons: number
// // // // }

// // // // interface Lesson {
// // // //   folderId: number
// // // //   lessonId: number
// // // //   courseId: number
// // // //   title: string
// // // //   description: string
// // // //   audioUrl?: string
// // // //   transcriptUrl?: string
// // // // }

// // // // const CourseView: React.FC = () => {
// // // //   const { courseId } = useParams<{ courseId: string }>()
// // // //   const [course, setCourse] = useState<Course | null>(null)
// // // //   const [lessons, setLessons] = useState<Lesson[]>([])
// // // //   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
// // // //   const [transcript, setTranscript] = useState<string>("")
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [loadingTranscript, setLoadingTranscript] = useState(false)

// // // //   useEffect(() => {
// // // //     loadCourseAndLessons()
// // // //   }, [courseId])

// // // //   const loadCourseAndLessons = async () => {
// // // //     try {
// // // //       const folders = await folderApi.getAllFolders()

// // // //       if (!Array.isArray(folders)) {
// // // //         console.warn("לא הוחזרו תקיות תקינות מהשרת", folders)
// // // //         return
// // // //       }

// // // //       const foundCourse = folders.find((folder: any) =>
// // // //         folder.courseId === Number(courseId) &&
// // // //         folder.lessonId == null &&
// // // //         folder.teacherId != null &&
// // // //         folder.title &&
// // // //         folder.numberOfLessons != null
// // // //       )

// // // //       if (!foundCourse) {
// // // //         console.warn(`לא נמצא קורס תקני עם courseId=${courseId}`)
// // // //         setCourse(null)
// // // //         return
// // // //       }

// // // //       const teacher = await userApi.getUserById(foundCourse.teacherId)
// // // //       const teacherEmail = teacher?.email || ""

// // // //       setCourse({
// // // //         folderId: foundCourse.folderId,
// // // //         courseId: foundCourse.courseId,
// // // //         teacherId: foundCourse.teacherId,
// // // //         teacherName: foundCourse.teacherName,
// // // //         teacherEmail,
// // // //         title: foundCourse.title,
// // // //         description: foundCourse.description,
// // // //         numberOfLessons: foundCourse.numberOfLessons,
// // // //       })

// // // //       const relatedLessons = folders
// // // //         .filter((folder: any) =>
// // // //           folder.lessonId != null &&
// // // //           folder.courseId === Number(courseId)
// // // //         )
// // // //         .map((folder: any) => ({
// // // //           folderId: folder.folderId,
// // // //           lessonId: folder.lessonId,
// // // //           courseId: folder.courseId,
// // // //           title: folder.title,
// // // //           description: folder.description,
// // // //           audioUrl: folder.audioUrl,
// // // //           transcriptUrl: folder.transcriptUrl,
// // // //         }))

// // // //       setLessons(relatedLessons)
// // // //     } catch (error) {
// // // //       console.error("שגיאה בטעינת הקורס או השיעורים:", error)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   const loadTranscript = async (lesson: Lesson) => {
// // // //     if (!lesson.transcriptUrl) return
// // // //     setLoadingTranscript(true)
// // // //     try {
// // // //       const transcriptText = await uploadApi.getTranscript(lesson.transcriptUrl)
// // // //       setTranscript(transcriptText)
// // // //     } catch (error) {
// // // //       console.error("שגיאה בטעינת תמלול:", error)
// // // //       setTranscript("תמלול לא זמין עבור שיעור זה")
// // // //     } finally {
// // // //       setLoadingTranscript(false)
// // // //     }
// // // //   }

// // // //   const selectLesson = (lesson: Lesson) => {
// // // //     setSelectedLesson(lesson)
// // // //     setTranscript("")
// // // //     loadTranscript(lesson)
// // // //   }


// // // //   // const sendEmailToTeacher = () => {
// // // //   //   const email = course?.teacherEmail || "teacher@example.com"
// // // //   //   const subject = encodeURIComponent(`שאלה לגבי הקורס: ${course?.title || ""}`)
// // // //   //   const body = encodeURIComponent(
// // // //   //     `שלום ${course?.teacherName || "המורה"},\n\nיש לי שאלה לגבי הקורס "${course?.title || ""}".\n\nתודה,`
// // // //   //   )
// // // //   //   window.location.href = (`mailto:${email}?subject=${subject}&body=${body}`)
// // // //   // }
// // // //   const sendEmailToTeacher = async () => {
// // // //     try {
// // // //       await folderApi.sendTeacherEmail(course?.folderId ?? 0)
// // // //       alert("המייל נשלח בהצלחה למורה")
// // // //     } catch (error) {
// // // //       console.error("שגיאה בשליחת מייל למורה:", error)
// // // //       alert("אירעה שגיאה בשליחת המייל")
// // // //     }
// // // //   }
  
  

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex justify-center items-center h-64">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   if (!course) {
// // // //     return (
// // // //       <div className="text-center py-12">
// // // //         <h3 className="text-lg font-medium text-gray-900 mb-2">קורס לא נמצא</h3>
// // // //         <p className="text-gray-600">הקורס המבוקש אינו קיים במערכת</p>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <div className="bg-white rounded-lg shadow-sm p-6">
// // // //         <div className="flex justify-between items-start mb-4">
// // // //           <div>
// // // //             <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
// // // //             <p className="text-gray-600 mb-2">{course.description}</p>
// // // //             <p className="text-sm text-gray-500">מורה: {course.teacherName}</p>
// // // //           </div>
// // // //           <button
// // // //             onClick={sendEmailToTeacher}
// // // //             className="flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
// // // //           >
// // // //             <Mail className="h-4 w-4" />
// // // //             <span>שלח מייל למורה</span>
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // //         <div className="lg:col-span-1">
// // // //           <div className="bg-white rounded-lg shadow-sm p-6">
// // // //             <h2 className="text-xl font-semibold text-gray-900 mb-4">רשימת שיעורים</h2>
// // // //             <div className="space-y-2">
// // // //               {lessons.map((lesson) => (
// // // //                 <button
// // // //                   key={lesson.lessonId}
// // // //                   onClick={() => selectLesson(lesson)}
// // // //                   className={`w-full text-right p-3 rounded-md transition-colors ${
// // // //                     selectedLesson?.lessonId === lesson.lessonId
// // // //                       ? "bg-blue-100 text-blue-900 border border-blue-200"
// // // //                       : "bg-gray-50 text-gray-700 hover:bg-gray-100"
// // // //                   }`}
// // // //                 >
// // // //                   <div className="flex items-center space-x-2 space-x-reverse">
// // // //                     <Play className="h-4 w-4" />
// // // //                     <span className="font-medium">{lesson.title}</span>
// // // //                   </div>
// // // //                   <p className="text-sm text-gray-600 mt-1 text-right">{lesson.description}</p>
// // // //                 </button>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="lg:col-span-2">
// // // //           {selectedLesson ? (
// // // //             <div className="space-y-6">
// // // //               <div className="bg-white rounded-lg shadow-sm p-6">
// // // //                 <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedLesson.title}</h3>
// // // //                 <div className="bg-gray-100 rounded-lg p-4 text-center">
// // // //                   <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
// // // //                   <p className="text-gray-600">נגן אודיו יוצג כאן</p>
// // // //                   <p className="text-sm text-gray-500 mt-2">(הקלטה תורד מ-AWS S3)</p>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="bg-white rounded-lg shadow-sm p-6">
// // // //                 <div className="flex items-center justify-between mb-4">
// // // //                   <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2 space-x-reverse">
// // // //                     <FileText className="h-5 w-5" />
// // // //                     <span>תמלול אוטומטי</span>
// // // //                   </h3>
// // // //                   {transcript && (
// // // //                     <button className="flex items-center space-x-1 space-x-reverse text-blue-600 hover:text-blue-700">
// // // //                       <Download className="h-4 w-4" />
// // // //                       <span>הורד תמלול</span>
// // // //                     </button>
// // // //                   )}
// // // //                 </div>

// // // //                 <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
// // // //                   {loadingTranscript ? (
// // // //                     <div className="flex items-center justify-center py-8">
// // // //                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // // //                       <span className="mr-2 text-gray-600">טוען תמלול...</span>
// // // //                     </div>
// // // //                   ) : transcript ? (
// // // //                     <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{transcript}</p>
// // // //                   ) : (
// // // //                     <p className="text-gray-500 text-center py-8">בחר שיעור כדי לצפות בתמלול</p>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           ) : (
// // // //             <div className="bg-white rounded-lg shadow-sm p-6">
// // // //               <div className="text-center py-12">
// // // //                 <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // // //                 <h3 className="text-lg font-medium text-gray-900 mb-2">בחר שיעור</h3>
// // // //                 <p className="text-gray-600">בחר שיעור מהרשימה כדי להתחיל לצפות</p>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default CourseView
// // // "use client"

// // // import type React from "react"
// // // import { useState, useEffect } from "react"
// // // import { useParams } from "react-router-dom"
// // // import { folderApi, uploadApi, userApi } from "../services/api"
// // // import { Play, FileText, Mail, Download } from "lucide-react"

// // // interface Course {
// // //   folderId: number
// // //   courseId: number
// // //   teacherId: number
// // //   teacherName: string
// // //   teacherEmail: string
// // //   title: string
// // //   description: string
// // //   numberOfLessons: number
// // // }

// // // interface Lesson {
// // //   folderId: number
// // //   lessonId: number
// // //   courseId: number
// // //   title: string
// // //   description: string
// // //   audioUrl?: string
// // //   transcriptUrl?: string
// // // }

// // // const CourseView: React.FC = () => {
// // //   const { courseId } = useParams<{ courseId: string }>()
// // //   const [course, setCourse] = useState<Course | null>(null)
// // //   const [lessons, setLessons] = useState<Lesson[]>([])
// // //   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
// // //   const [transcript, setTranscript] = useState<string>("")
// // //   const [loading, setLoading] = useState(true)
// // //   const [loadingTranscript, setLoadingTranscript] = useState(false)
// // //   const [emailBody, setEmailBody] = useState<string>("")
// // //   const [showEmailDialog, setShowEmailDialog] = useState<boolean>(false)

// // //   useEffect(() => {
// // //     loadCourseAndLessons()
// // //   }, [courseId])

// // //   const loadCourseAndLessons = async () => {
// // //     try {
// // //       const folders = await folderApi.getAllFolders()

// // //       if (!Array.isArray(folders)) {
// // //         console.warn("לא הוחזרו תקיות תקינות מהשרת", folders)
// // //         return
// // //       }

// // //       const foundCourse = folders.find((folder: any) =>
// // //         folder.courseId === Number(courseId) &&
// // //         folder.lessonId == null &&
// // //         folder.teacherId != null &&
// // //         folder.title &&
// // //         folder.numberOfLessons != null
// // //       )

// // //       if (!foundCourse) {
// // //         console.warn(`לא נמצא קורס תקני עם courseId=${courseId}`)
// // //         setCourse(null)
// // //         return
// // //       }

// // //       const teacher = await userApi.getUserById(foundCourse.teacherId)
// // //       const teacherEmail = teacher?.email || ""

// // //       setCourse({
// // //         folderId: foundCourse.folderId,
// // //         courseId: foundCourse.courseId,
// // //         teacherId: foundCourse.teacherId,
// // //         teacherName: foundCourse.teacherName,
// // //         teacherEmail,
// // //         title: foundCourse.title,
// // //         description: foundCourse.description,
// // //         numberOfLessons: foundCourse.numberOfLessons,
// // //       })

// // //       const relatedLessons = folders
// // //         .filter((folder: any) =>
// // //           folder.lessonId != null &&
// // //           folder.courseId === Number(courseId)
// // //         )
// // //         .map((folder: any) => ({
// // //           folderId: folder.folderId,
// // //           lessonId: folder.lessonId,
// // //           courseId: folder.courseId,
// // //           title: folder.title,
// // //           description: folder.description,
// // //           audioUrl: folder.audioUrl,
// // //           transcriptUrl: folder.transcriptUrl,
// // //         }))

// // //       setLessons(relatedLessons)
// // //     } catch (error) {
// // //       console.error("שגיאה בטעינת הקורס או השיעורים:", error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const loadTranscript = async (lesson: Lesson) => {
// // //     if (!lesson.transcriptUrl) return
// // //     setLoadingTranscript(true)
// // //     try {
// // //       const transcriptText = await uploadApi.getTranscript(lesson.transcriptUrl)
// // //       setTranscript(transcriptText)
// // //     } catch (error) {
// // //       console.error("שגיאה בטעינת תמלול:", error)
// // //       setTranscript("תמלול לא זמין עבור שיעור זה")
// // //     } finally {
// // //       setLoadingTranscript(false)
// // //     }
// // //   }

// // //   const selectLesson = (lesson: Lesson) => {
// // //     setSelectedLesson(lesson)
// // //     setTranscript("")
// // //     loadTranscript(lesson)
// // //   }

// // //   const sendEmailToTeacher = async () => {
// // //     if (!emailBody.trim()) {
// // //       alert("אנא הכנס תוכן למייל");
// // //       return;
// // //     }

// // //     try {
// // //       await folderApi.sendTeacherEmail(course?.folderId ?? 0, emailBody);
// // //       alert("המייל נשלח בהצלחה למורה");
// // //       setShowEmailDialog(false);
// // //       setEmailBody(""); // לנקות את תוכן המייל לאחר שליחה
// // //     } catch (error) {
// // //       console.error("שגיאה בשליחת מייל למורה:", error);
// // //       alert("אירעה שגיאה בשליחת המייל");
// // //     }
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

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="bg-white rounded-lg shadow-sm p-6">
// // //         <div className="flex justify-between items-start mb-4">
// // //           <div>
// // //             <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
// // //             <p className="text-gray-600 mb-2">{course.description}</p>
// // //             <p className="text-sm text-gray-500">מורה: {course.teacherName}</p>
// // //           </div>
// // //           <div>
            
// // //             <button
// // //               onClick={() => setShowEmailDialog(true)}
// // //               className="flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
// // //             >
// // //               <Mail className="h-4 w-4" />
// // //               <span>שלח מייל למורה</span>
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {showEmailDialog && (
// // //         <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
// // //           <div className="bg-white rounded-lg shadow-lg p-6 w-96">
// // //             <h2 className="text-lg font-semibold mb-4">שלח מייל למורה</h2>
// // //             <p className="mb-2">אל: {course.teacherEmail}</p>
// // //             <p className="mb-2">נושא: שאלה על קורס {course.title}</p>
// // //             <textarea
// // //               value={emailBody}
// // //               onChange={(e) => setEmailBody(e.target.value)}
// // //               placeholder="הכנס את תוכן המייל כאן..."
// // //               className="w-full h-24 p-2 border border-gray-300 rounded-md mb-2"
// // //             />
// // //             <div className="flex justify-end">
// // //               <button
// // //                 onClick={() => setShowEmailDialog(false)}
// // //                 className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
// // //               >
// // //                 סגור
// // //               </button>
// // //               <button
// // //                 onClick={sendEmailToTeacher}
// // //                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// // //               >
// // //                 שלח
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //         <div className="lg:col-span-1">
// // //           <div className="bg-white rounded-lg shadow-sm p-6">
// // //             <h2 className="text-xl font-semibold text-gray-900 mb-4">רשימת שיעורים</h2>
// // //             <div className="space-y-2">
// // //               {lessons.map((lesson) => (
// // //                 <button
// // //                   key={lesson.lessonId}
// // //                   onClick={() => selectLesson(lesson)}
// // //                   className={`w-full text-right p-3 rounded-md transition-colors ${
// // //                     selectedLesson?.lessonId === lesson.lessonId
// // //                       ? "bg-blue-100 text-blue-900 border border-blue-200"
// // //                       : "bg-gray-50 text-gray-700 hover:bg-gray-100"
// // //                   }`}
// // //                 >
// // //                   <div className="flex items-center space-x-2 space-x-reverse">
// // //                     <Play className="h-4 w-4" />
// // //                     <span className="font-medium">{lesson.title}</span>
// // //                   </div>
// // //                   <p className="text-sm text-gray-600 mt-1 text-right">{lesson.description}</p>
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="lg:col-span-2">
// // //           {selectedLesson ? (
// // //             <div className="space-y-6">
// // //               <div className="bg-white rounded-lg shadow-sm p-6">
// // //                 <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedLesson.title}</h3>
// // //                 <div className="bg-gray-100 rounded-lg p-4 text-center">
// // //                   <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
// // //                   <p className="text-gray-600">נגן אודיו יוצג כאן</p>
// // //                   <p className="text-sm text-gray-500 mt-2">(הקלטה תורד מ-AWS S3)</p>
// // //                 </div>
// // //               </div>

// // //               <div className="bg-white rounded-lg shadow-sm p-6">
// // //                 <div className="flex items-center justify-between mb-4">
// // //                   <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2 space-x-reverse">
// // //                     <FileText className="h-5 w-5" />
// // //                     <span>תמלול אוטומטי</span>
// // //                   </h3>
// // //                   {transcript && (
// // //                     <button className="flex items-center space-x-1 space-x-reverse text-blue-600 hover:text-blue-700">
// // //                       <Download className="h-4 w-4" />
// // //                       <span>הורד תמלול</span>
// // //                     </button>
// // //                   )}
// // //                 </div>

// // //                 <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
// // //                   {loadingTranscript ? (
// // //                     <div className="flex items-center justify-center py-8">
// // //                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //                       <span className="mr-2 text-gray-600">טוען תמלול...</span>
// // //                     </div>
// // //                   ) : transcript ? (
// // //                     <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{transcript}</p>
// // //                   ) : (
// // //                     <p className="text-gray-500 text-center py-8">בחר שיעור כדי לצפות בתמלול</p>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ) : (
// // //             <div className="bg-white rounded-lg shadow-sm p-6">
// // //               <div className="text-center py-12">
// // //                 <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // //                 <h3 className="text-lg font-medium text-gray-900 mb-2">בחר שיעור</h3>
// // //                 <p className="text-gray-600">בחר שיעור מהרשימה כדי להתחיל לצפות</p>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default CourseView

// // // import type React from "react"
// // // import { useState, useEffect } from "react"
// // // import { useParams } from "react-router-dom"
// // // import { folderApi, uploadApi, userApi } from "../services/api"
// // // import { Play, FileText, Mail, Download } from "lucide-react"

// // // interface Course {
// // //   folderId: number
// // //   courseId: number
// // //   teacherId: number
// // //   teacherName: string
// // //   teacherEmail: string
// // //   title: string
// // //   description: string
// // //   numberOfLessons: number
// // // }

// // // interface Lesson {
// // //   folderId: number
// // //   lessonId: number
// // //   courseId: number
// // //   title: string
// // //   description: string
// // //   audioUrl?: string
// // //   transcriptUrl?: string
// // // }

// // // const CourseView: React.FC = () => {
// // //   const { courseId } = useParams<{ courseId: string }>()
// // //   const [course, setCourse] = useState<Course | null>(null)
// // //   const [lessons, setLessons] = useState<Lesson[]>([])
// // //   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
// // //   const [transcript, setTranscript] = useState<string>("")
// // //   const [mediaUrl, setMediaUrl] = useState<string>("")
// // //   const [loading, setLoading] = useState(true)
// // //   const [loadingTranscript, setLoadingTranscript] = useState(false)
// // //   const [emailBody, setEmailBody] = useState<string>("")
// // //   const [showEmailDialog, setShowEmailDialog] = useState<boolean>(false)

// // //   useEffect(() => {
// // //     loadCourseAndLessons()
// // //   }, [courseId])

// // //   const loadCourseAndLessons = async () => {
// // //     try {
// // //       const folders = await folderApi.getAllFolders()

// // //       if (!Array.isArray(folders)) {
// // //         console.warn("לא הוחזרו תקיות תקינות מהשרת", folders)
// // //         return
// // //       }

// // //       const foundCourse = folders.find((folder: any) =>
// // //         folder.courseId === Number(courseId) &&
// // //         folder.lessonId == null &&
// // //         folder.teacherId != null &&
// // //         folder.title &&
// // //         folder.numberOfLessons != null
// // //       )

// // //       if (!foundCourse) {
// // //         console.warn(`לא נמצא קורס תקני עם courseId=${courseId}`)
// // //         setCourse(null)
// // //         return
// // //       }

// // //       const teacher = await userApi.getUserById(foundCourse.teacherId)
// // //       const teacherEmail = teacher?.email || ""

// // //       setCourse({
// // //         folderId: foundCourse.folderId,
// // //         courseId: foundCourse.courseId,
// // //         teacherId: foundCourse.teacherId,
// // //         teacherName: foundCourse.teacherName,
// // //         teacherEmail,
// // //         title: foundCourse.title,
// // //         description: foundCourse.description,
// // //         numberOfLessons: foundCourse.numberOfLessons,
// // //       })

// // //       const relatedLessons = folders
// // //         .filter((folder: any) =>
// // //           folder.lessonId != null &&
// // //           folder.courseId === Number(courseId)
// // //         )
// // //         .map((folder: any) => ({
// // //           folderId: folder.folderId,
// // //           lessonId: folder.lessonId,
// // //           courseId: folder.courseId,
// // //           title: folder.title,
// // //           description: folder.description,
// // //           audioUrl: folder.audioUrl,
// // //           transcriptUrl: folder.transcriptUrl,
// // //         }))

// // //       setLessons(relatedLessons)
// // //     } catch (error) {
// // //       console.error("שגיאה בטעינת הקורס או השיעורים:", error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   // פונקציה מעודכנת: טעינת מדיה ותמלול יחד
// // //   const loadTranscriptAndMedia = async (lesson: Lesson) => {
// // //     if (!lesson.audioUrl || !lesson.transcriptUrl) {
// // //       setTranscript("")
// // //       setMediaUrl("")
// // //       return
// // //     }
// // //     setLoadingTranscript(true)
// // //     try {
// // //       const data = await uploadApi.downloadLesson(lesson.audioUrl, lesson.transcriptUrl)
// // //       setTranscript(data.transcriptText || "תמלול לא זמין עבור שיעור זה")
// // //       setMediaUrl(data.mediaUrl || "")
// // //     } catch (error) {
// // //       console.error("שגיאה בטעינת מדיה ותמלול:", error)
// // //       setTranscript("תמלול לא זמין עבור שיעור זה")
// // //       setMediaUrl("")
// // //     } finally {
// // //       setLoadingTranscript(false)
// // //     }
// // //   }

// // //   const selectLesson = (lesson: Lesson) => {
// // //     setSelectedLesson(lesson)
// // //     setTranscript("")
// // //     setMediaUrl("")
// // //     loadTranscriptAndMedia(lesson)
// // //   }

// // //   const sendEmailToTeacher = async () => {
// // //     if (!emailBody.trim()) {
// // //       alert("אנא הכנס תוכן למייל")
// // //       return
// // //     }

// // //     try {
// // //       await folderApi.sendTeacherEmail(course?.folderId ?? 0, emailBody)
// // //       alert("המייל נשלח בהצלחה למורה")
// // //       setShowEmailDialog(false)
// // //       setEmailBody("")
// // //     } catch (error) {
// // //       console.error("שגיאה בשליחת מייל למורה:", error)
// // //       alert("אירעה שגיאה בשליחת המייל")
// // //     }
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

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="bg-white rounded-lg shadow-sm p-6">
// // //         <div className="flex justify-between items-start mb-4">
// // //           <div>
// // //             <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
// // //             <p className="text-gray-600 mb-2">{course.description}</p>
// // //             <p className="text-sm text-gray-500">מורה: {course.teacherName}</p>
// // //           </div>
// // //           <div>
// // //             <button
// // //               onClick={() => setShowEmailDialog(true)}
// // //               className="flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
// // //             >
// // //               <Mail className="h-4 w-4" />
// // //               <span>שלח מייל למורה</span>
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {showEmailDialog && (
// // //         <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
// // //           <div className="bg-white rounded-lg shadow-lg p-6 w-96">
// // //             <h2 className="text-lg font-semibold mb-4">שלח מייל למורה</h2>
// // //             <p className="mb-2">אל: {course.teacherEmail}</p>
// // //             <p className="mb-2">נושא: שאלה על קורס {course.title}</p>
// // //             <textarea
// // //               value={emailBody}
// // //               onChange={(e) => setEmailBody(e.target.value)}
// // //               placeholder="הכנס את תוכן המייל כאן..."
// // //               className="w-full h-24 p-2 border border-gray-300 rounded-md mb-2"
// // //             />
// // //             <div className="flex justify-end">
// // //               <button
// // //                 onClick={() => setShowEmailDialog(false)}
// // //                 className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
// // //               >
// // //                 סגור
// // //               </button>
// // //               <button
// // //                 onClick={sendEmailToTeacher}
// // //                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// // //               >
// // //                 שלח
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //         <div className="lg:col-span-1">
// // //           <div className="bg-white rounded-lg shadow-sm p-6">
// // //             <h2 className="text-xl font-semibold text-gray-900 mb-4">רשימת שיעורים</h2>
// // //             <div className="space-y-2">
// // //               {lessons.map((lesson) => (
// // //                 <button
// // //                   key={lesson.lessonId}
// // //                   onClick={() => selectLesson(lesson)}
// // //                   className={`w-full text-right p-3 rounded-md transition-colors ${
// // //                     selectedLesson?.lessonId === lesson.lessonId
// // //                       ? "bg-blue-100 text-blue-900 border border-blue-200"
// // //                       : "bg-gray-50 text-gray-700 hover:bg-gray-100"
// // //                   }`}
// // //                 >
// // //                   <div className="flex items-center space-x-2 space-x-reverse">
// // //                     <Play className="h-4 w-4" />
// // //                     <span className="font-medium">{lesson.title}</span>
// // //                   </div>
// // //                   <p className="text-sm text-gray-600 mt-1 text-right">{lesson.description}</p>
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="lg:col-span-2">
// // //           {selectedLesson ? (
// // //             <div className="space-y-6">
// // //               <div className="bg-white rounded-lg shadow-sm p-6">
// // //                 <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedLesson.title}</h3>
// // //                 <div className="bg-gray-100 rounded-lg p-4 text-center">
// // //                   {mediaUrl ? (
// // //                     <audio controls src={mediaUrl} className="w-full">
// // //                       הדפדפן שלך לא תומך בנגן אודיו.
// // //                     </audio>
// // //                   ) : (
// // //                     <>
// // //                       <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
// // //                       <p className="text-gray-600">נגן אודיו יוצג כאן</p>
// // //                       <p className="text-sm text-gray-500 mt-2">(הקלטה תורד מ-AWS)</p>
// // //                     </>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               <div className="bg-white rounded-lg shadow-sm p-6">
// // //                 <div className="flex items-center justify-between mb-4">
// // //                   <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2 space-x-reverse">
// // //                     <FileText className="h-5 w-5" />
// // //                     <span>תמלול אוטומטי</span>
// // //                   </h3>
// // //                   {transcript && (
// // //                     <button
// // //                       className="flex items-center space-x-1 space-x-reverse text-blue-600 hover:text-blue-700"
// // //                       onClick={() => {
// // //                         const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" })
// // //                         const url = URL.createObjectURL(blob)
// // //                         const a = document.createElement("a")
// // //                         a.href = url
// // //                         a.download = `${selectedLesson?.title || "transcript"}.txt`
// // //                         a.click()
// // //                         URL.revokeObjectURL(url)
// // //                       }}
// // //                     >
// // //                       <Download className="h-4 w-4" />
// // //                       <span>הורד תמלול</span>
// // //                     </button>
// // //                   )}
// // //                 </div>

// // //                 <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto whitespace-pre-wrap">
// // //                   {loadingTranscript ? (
// // //                     <div className="flex items-center justify-center py-8">
// // //                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //                       <span className="mr-2 text-gray-600">טוען תמלול...</span>
// // //                     </div>
// // //                   ) : transcript ? (
// // //                     <p className="text-gray-700 leading-relaxed">{transcript}</p>
// // //                   ) : (
// // //                     <p className="text-gray-500 text-center py-8">בחר שיעור כדי לצפות בתמלול</p>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ) : (
// // //             <div className="bg-white rounded-lg shadow-sm p-6">
// // //               <div className="text-center py-12">
// // //                 <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // //                 <h3 className="text-lg font-medium text-gray-900 mb-2">בחר שיעור</h3>
// // //                 <p className="text-gray-600">בחר שיעור מהרשימה כדי להתחיל לצפות</p>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default CourseView
// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { useParams } from "react-router-dom"
// // import { folderApi, uploadApi, userApi } from "../services/api"
// // import { Play, FileText, Mail, Download } from "lucide-react"

// // interface Course {
// //   folderId: number
// //   courseId: number
// //   teacherId: number
// //   teacherName: string
// //   teacherEmail: string
// //   title: string
// //   description: string
// //   numberOfLessons: number
// // }

// // interface Lesson {
// //   folderId: number
// //   lessonId: number
// //   courseId: number
// //   title: string
// //   description: string
// //   audioUrl?: string
// //   transcriptUrl?: string
// // }

// // const CourseView: React.FC = () => {
// //   const { courseId } = useParams<{ courseId: string }>()
// //   const [course, setCourse] = useState<Course | null>(null)
// //   const [lessons, setLessons] = useState<Lesson[]>([])
// //   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
// //   const [transcript, setTranscript] = useState<string>("")
// //   const [mediaUrl, setMediaUrl] = useState<string>("")
// //   const [loading, setLoading] = useState(true)
// //   const [loadingTranscript, setLoadingTranscript] = useState(false)
// //   const [emailBody, setEmailBody] = useState<string>("")
// //   const [showEmailDialog, setShowEmailDialog] = useState<boolean>(false)

// //   useEffect(() => {
// //     loadCourseAndLessons()
// //   }, [courseId])

// //   const loadCourseAndLessons = async () => {
// //     try {
// //       const folders = await folderApi.getAllFolders()

// //       if (!Array.isArray(folders)) {
// //         console.warn("לא הוחזרו תקיות תקינות מהשרת", folders)
// //         return
// //       }

// //       const foundCourse = folders.find((folder: any) =>
// //         folder.courseId === Number(courseId) &&
// //         folder.lessonId == null &&
// //         folder.teacherId != null &&
// //         folder.title &&
// //         folder.numberOfLessons != null
// //       )

// //       if (!foundCourse) {
// //         console.warn(`לא נמצא קורס תקני עם courseId=${courseId}`)
// //         setCourse(null)
// //         return
// //       }

// //       const teacher = await userApi.getUserById(foundCourse.teacherId)
// //       const teacherEmail = teacher?.email || ""

// //       setCourse({
// //         folderId: foundCourse.folderId,
// //         courseId: foundCourse.courseId,
// //         teacherId: foundCourse.teacherId,
// //         teacherName: foundCourse.teacherName,
// //         teacherEmail,
// //         title: foundCourse.title,
// //         description: foundCourse.description,
// //         numberOfLessons: foundCourse.numberOfLessons,
// //       })

// //       const relatedLessons = folders
// //         .filter((folder: any) =>
// //           folder.lessonId != null &&
// //           folder.courseId === Number(courseId)
// //         )
// //         .map((folder: any) => ({
// //           folderId: folder.folderId,
// //           lessonId: folder.lessonId,
// //           courseId: folder.courseId,
// //           title: folder.title,
// //           description: folder.description,
// //           audioUrl: folder.audioUrl,
// //           transcriptUrl: folder.transcriptUrl,
// //         }))

// //       setLessons(relatedLessons)
// //     } catch (error) {
// //       console.error("שגיאה בטעינת הקורס או השיעורים:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // כאן השינוי: הפונקציה קוראת ל-uploadApi.downloadLesson עם courseId ו-lessonId בלבד
// //   const loadTranscriptAndMedia = async (lesson: Lesson) => {
// //     if (!lesson.courseId || !lesson.lessonId) {
// //       console.warn("courseId או lessonId חסרים", lesson)
// //       return
// //     }

// //     setLoadingTranscript(true)
// //     try {
// //       const data = await uploadApi.downloadLesson(lesson.courseId, lesson.lessonId)
// //       setTranscript(data.transcriptText || "תמלול לא זמין עבור שיעור זה")
// //       setMediaUrl(data.mediaUrl || "")
// //     } catch (error) {
// //       console.error("שגיאה בטעינת מדיה ותמלול:", error)
// //       setTranscript("תמלול לא זמין עבור שיעור זה")
// //       setMediaUrl("")
// //     } finally {
// //       setLoadingTranscript(false)
// //     }
// //   }

// //   const selectLesson = (lesson: Lesson) => {
// //     setSelectedLesson(lesson)
// //     setTranscript("")
// //     setMediaUrl("")
// //     loadTranscriptAndMedia(lesson)
// //   }

// //   const sendEmailToTeacher = async () => {
// //     if (!emailBody.trim()) {
// //       alert("אנא הכנס תוכן למייל")
// //       return
// //     }

// //     try {
// //       await folderApi.sendTeacherEmail(course?.folderId ?? 0, emailBody)
// //       alert("המייל נשלח בהצלחה למורה")
// //       setShowEmailDialog(false)
// //       setEmailBody("")
// //     } catch (error) {
// //       console.error("שגיאה בשליחת מייל למורה:", error)
// //       alert("אירעה שגיאה בשליחת המייל")
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

// //   return (
// //     <div className="space-y-6">
// //       <div className="bg-white rounded-lg shadow-sm p-6">
// //         <div className="flex justify-between items-start mb-4">
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
// //             <p className="text-gray-600 mb-2">{course.description}</p>
// //             <p className="text-sm text-gray-500">מורה: {course.teacherName}</p>
// //           </div>
// //           <div>
// //             <button
// //               onClick={() => setShowEmailDialog(true)}
// //               className="flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
// //             >
// //               <Mail className="h-4 w-4" />
// //               <span>שלח מייל למורה</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {showEmailDialog && (
// //         <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
// //           <div className="bg-white rounded-lg shadow-lg p-6 w-96">
// //             <h2 className="text-lg font-semibold mb-4">שלח מייל למורה</h2>
// //             <p className="mb-2">אל: {course.teacherEmail}</p>
// //             <p className="mb-2">נושא: שאלה על קורס {course.title}</p>
// //             <textarea
// //               value={emailBody}
// //               onChange={(e) => setEmailBody(e.target.value)}
// //               placeholder="הכנס את תוכן המייל כאן..."
// //               className="w-full h-24 p-2 border border-gray-300 rounded-md mb-2"
// //             />
// //             <div className="flex justify-end">
// //               <button
// //                 onClick={() => setShowEmailDialog(false)}
// //                 className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
// //               >
// //                 סגור
// //               </button>
// //               <button
// //                 onClick={sendEmailToTeacher}
// //                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// //               >
// //                 שלח
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         <div className="lg:col-span-1">
// //           <div className="bg-white rounded-lg shadow-sm p-6">
// //             <h2 className="text-xl font-semibold text-gray-900 mb-4">רשימת שיעורים</h2>
// //             <div className="space-y-2">
// //               {lessons.map((lesson) => (
// //                 <button
// //                   key={lesson.lessonId}
// //                   onClick={() => selectLesson(lesson)}
// //                   className={`w-full text-right p-3 rounded-md transition-colors ${
// //                     selectedLesson?.lessonId === lesson.lessonId
// //                       ? "bg-blue-100 text-blue-900 border border-blue-200"
// //                       : "bg-gray-50 text-gray-700 hover:bg-gray-100"
// //                   }`}
// //                 >
// //                   <div className="flex items-center space-x-2 space-x-reverse">
// //                     <Play className="h-4 w-4" />
// //                     <span className="font-medium">{lesson.title}</span>
// //                   </div>
// //                   <p className="text-sm text-gray-600 mt-1 text-right">{lesson.description}</p>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         <div className="lg:col-span-2">
// //           {selectedLesson ? (
// //             <div className="space-y-6">
// //               <div className="bg-white rounded-lg shadow-sm p-6">
// //                 <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedLesson.title}</h3>
// //                 <div className="bg-gray-100 rounded-lg p-4 text-center">
// //                   {mediaUrl ? (
// //                     <audio controls src={mediaUrl} className="w-full">
// //                       הדפדפן שלך לא תומך בנגן אודיו.
// //                     </audio>
// //                   ) : (
// //                     <>
// //                       <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
// //                       <p className="text-gray-600">נגן אודיו יוצג כאן</p>
// //                       <p className="text-sm text-gray-500 mt-2">(הקלטה תורד מ-AWS)</p>
// //                     </>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="bg-white rounded-lg shadow-sm p-6">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2 space-x-reverse">
// //                     <FileText className="h-5 w-5" />
// //                     <span>תמלול אוטומטי</span>
// //                   </h3>
// //                   {transcript && (
// //                     <button
// //                       className="flex items-center space-x-1 space-x-reverse text-blue-600 hover:text-blue-700"
// //                       onClick={() => {
// //                         const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" })
// //                         const url = URL.createObjectURL(blob)
// //                         const a = document.createElement("a")
// //                         a.href = url
// //                         a.download = `${selectedLesson?.title || "transcript"}.txt`
// //                         a.click()
// //                         URL.revokeObjectURL(url)
// //                       }}
// //                     >
// //                       <Download className="h-4 w-4" />
// //                       <span>הורד תמלול</span>
// //                     </button>
// //                   )}
// //                 </div>

// //                 <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto whitespace-pre-wrap">
// //                   {loadingTranscript ? (
// //                     <div className="flex items-center justify-center py-8">
// //                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //                       <span className="mr-2 text-gray-600">טוען תמלול...</span>
// //                     </div>
// //                   ) : transcript ? (
// //                     <p className="text-gray-700 leading-relaxed">{transcript}</p>
// //                   ) : (
// //                     <p className="text-gray-500 text-center py-8">בחר שיעור כדי לצפות בתמלול</p>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="bg-white rounded-lg shadow-sm p-6">
// //               <div className="text-center py-12">
// //                 <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //                 <h3 className="text-lg font-medium text-gray-900 mb-2">בחר שיעור</h3>
// //                 <p className="text-gray-600">בחר שיעור מהרשימה כדי להתחיל לצפות</p>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default CourseView
// "use client"

// import React, { useState, useEffect } from "react"
// import { useParams } from "react-router-dom"
// import { folderApi, uploadApi, userApi } from "../services/api"
// import { Play, FileText, Mail, Download } from "lucide-react"
// import { useAuth } from "../contexts/AuthContext"

// interface Course {
//   folderId: number
//   courseId: number
//   teacherId: number
//   teacherName: string
//   teacherEmail: string
//   title: string
//   description: string
//   numberOfLessons: number
// }

// interface Lesson {
//   folderId: number
//   lessonId: number
//   courseId: number
//   title: string
//   description: string
//   audioUrl?: string
//   transcriptUrl?: string
// }

// const CourseView: React.FC = () => {
//   const { user } = useAuth()
//   const { courseId } = useParams<{ courseId: string }>()
//   const [course, setCourse] = useState<Course | null>(null)
//   const [lessons, setLessons] = useState<Lesson[]>([])
//   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
//   const [transcript, setTranscript] = useState<string>("")
//   const [mediaUrl, setMediaUrl] = useState<string>("")
//   const [loading, setLoading] = useState(true)
//   const [loadingTranscript, setLoadingTranscript] = useState(false)
//   const [emailBody, setEmailBody] = useState<string>("")
//   const [showEmailDialog, setShowEmailDialog] = useState<boolean>(false)

//   const [editingLessonId, setEditingLessonId] = useState<number | null>(null)
//   const [lessonEditData, setLessonEditData] = useState({ title: "", description: "" })

//   useEffect(() => {
//     loadCourseAndLessons()
//   }, [courseId])

//   const loadCourseAndLessons = async () => {
//     setLoading(true)
//     try {
//       const folders = await folderApi.getAllFolders()
//       const foundCourse = folders.find((f: any) =>
//         f.courseId === Number(courseId) &&
//         f.lessonId == null &&
//         f.teacherId != null &&
//         f.title &&
//         f.description != null
//       )
//       if (!foundCourse) {
//         setCourse(null)
//         return
//       }
//       const teacher = await userApi.getUserById(foundCourse.teacherId)
//       setCourse({
//         folderId: foundCourse.folderId,
//         courseId: foundCourse.courseId,
//         teacherId: foundCourse.teacherId,
//         teacherName: foundCourse.teacherName,
//         teacherEmail: teacher.email || "",
//         title: foundCourse.title,
//         description: foundCourse.description,
//         numberOfLessons: foundCourse.numberOfLessons,
//       })
//       const relLessons = folders
//         .filter((f: any) => f.lessonId != null && f.courseId === Number(courseId))
//         .map((f: any) => ({
//           folderId: f.folderId,
//           lessonId: f.lessonId,
//           courseId: f.courseId,
//           title: f.title,
//           description: f.description,
//           audioUrl: f.audioUrl,
//           transcriptUrl: f.transcriptUrl,
//         }))
//       setLessons(relLessons)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const selectLesson = async (lesson: Lesson) => {
//     setSelectedLesson(lesson)
//     setTranscript("")
//     setMediaUrl("")
//     setLessonEditData({ title: lesson.title, description: lesson.description })
//     setLoadingTranscript(true)
//     try {
//       const data = await uploadApi.downloadLesson(lesson.courseId, lesson.lessonId)
//       setTranscript(data.transcriptText || "")
//       setMediaUrl(data.mediaUrl || "")
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoadingTranscript(false)
//     }
//   }

//   const saveLesson = async () => {
//     if (!selectedLesson) return
//     try {
//       await folderApi.updateLesson(selectedLesson.folderId, lessonEditData)
//       setLessons(prev =>
//         prev.map(l =>
//           l.folderId === selectedLesson.folderId
//             ? { ...l, ...lessonEditData }
//             : l
//         )
//       )
//       setSelectedLesson({ ...selectedLesson, ...lessonEditData })
//       setEditingLessonId(null)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const removeLesson = async () => {
//     if (!selectedLesson || !window.confirm("להסיר את השיעור הזה?")) return
//     try {
//       await folderApi.deleteLesson(selectedLesson.folderId)
//       setLessons(prev => prev.filter(l => l.folderId !== selectedLesson.folderId))
//       setSelectedLesson(null)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const sendEmailToTeacher = async () => {
//     if (!emailBody.trim()) return
//     try {
//       await folderApi.sendTeacherEmail(course!.folderId, emailBody)
//       setEmailBody("")
//       setShowEmailDialog(false)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-blue-600 border-b-2"/></div>
//   if (!course) return <div className="text-center py-12"><p className="text-lg">קורס לא קיים</p></div>

//   const isOwner = user?.userId === course.teacherId

//   return (
//     <div className="space-y-6">
//       {/* קורס */}
//       <div className="bg-white p-6 rounded shadow">
//         <div className="flex justify-between">
//           <div>
//             <h1 className="text-3xl">{course.title}</h1>
//             <p className="text-gray-600">{course.description}</p>
//             <p className="text-sm text-gray-500">מורה: {course.teacherName}</p>
//           </div>
//           <button onClick={() => setShowEmailDialog(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
//             שלח מייל
//           </button>
//         </div>
//       </div>

//       {showEmailDialog && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
//           <div className="bg-white p-6 rounded shadow w-96">
//             <h2 className="text-xl mb-4">שלח מייל למורה</h2>
//             <textarea
//               rows={5}
//               className="w-full border p-2"
//               placeholder="תוכן ההודעה"
//               value={emailBody}
//               onChange={e => setEmailBody(e.target.value)}
//             />
//             <div className="mt-4 flex justify-end gap-2">
//               <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowEmailDialog(false)}>ביטול</button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={sendEmailToTeacher}>שלח</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* תוכן */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* רשימת שיעורים */}
//         <div className="lg:col-span-1 bg-white rounded shadow p-6">
//           <h2 className="text-xl mb-4">שיעורים</h2>
//           <ul className="space-y-2">
//             {lessons.map(l => (
//               <li key={l.lessonId}>
//                 <button
//                   className={`w-full text-left p-2 rounded ${selectedLesson?.lessonId === l.lessonId ? "bg-blue-100" : "hover:bg-gray-100"}`}
//                   onClick={() => selectLesson(l)}
//                 >
//                   {l.title}
//                 </button>
//               </li>
//             ))}
//             {lessons.length === 0 && <p className="text-gray-500">אין שיעורים</p>}
//           </ul>
//         </div>

//         {/* תצוגה / עריכה של שיעור */}
//         <div className="lg:col-span-2 space-y-6">
//           {!selectedLesson ? (
//             <div className="p-6 bg-white rounded shadow text-center text-gray-500">בחר שיעור</div>
//           ) : (
//             <div className="space-y-4">
//               <div className="bg-white p-6 rounded shadow">
//                 {editingLessonId === selectedLesson.folderId && isOwner ? (
//                   <>
//                     <input
//                       className="w-full border p-2 mb-2"
//                       value={lessonEditData.title}
//                       onChange={e => setLessonEditData({ ...lessonEditData, title: e.target.value })}
//                     />
//                     <textarea
//                       className="w-full border p-2 mb-2"
//                       value={lessonEditData.description}
//                       onChange={e => setLessonEditData({ ...lessonEditData, description: e.target.value })}
//                     />
//                     <div className="flex gap-2">
//                       <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={saveLesson}>שמור</button>
//                       <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => setEditingLessonId(null)}>ביטול</button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <h3 className="text-xl">{selectedLesson.title}</h3>
//                     <p className="text-gray-700">{selectedLesson.description}</p>
//                   </>
//                 )}

//                 {isOwner && editingLessonId !== selectedLesson.folderId && (
//                   <div className="mt-3 flex gap-4">
//                     <button className="text-blue-600" onClick={() => setEditingLessonId(selectedLesson.folderId)}>ערוך</button>
//                     <button className="text-red-600" onClick={removeLesson}>מחק</button>
//                   </div>
//                 )}
//               </div>

//               {/* אודיו ותמלול */}
//               <div className="bg-white p-6 rounded shadow">
//                 {mediaUrl ? (
//                   <audio controls src={mediaUrl} className="w-full" />
//                 ) : (
//                   <div className="text-gray-400">אין אודיו</div>
//                 )}
//                 <div className="mt-4">
//                   <div className="flex justify-between items-center">
//                     <h4 className="text-lg">תמלול</h4>
//                     {transcript && (
//                       <button
//                         onClick={() => {
//                           const blob = new Blob([transcript], { type: "text/plain" })
//                           const url = URL.createObjectURL(blob)
//                           const a = document.createElement("a")
//                           a.href = url
//                           a.download = `${selectedLesson.title}.txt`
//                           a.click()
//                         }}
//                       >
//                         <Download />
//                       </button>
//                     )}
//                   </div>
//                   <div className="mt-2 h-40 overflow-auto border p-2 bg-gray-50">
//                     {loadingTranscript ? "טוען..." : (transcript || "אין תמלול")}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CourseView
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { folderApi } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Download,
  Share2,
  BookOpen,
  FileText,
  Clock,
  User,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Bookmark,
  FastForward,
  Rewind,
  Subtitles,
  Search,
  Heart,
  ThumbsUp,
  Eye,
  CheckCircle,
} from "lucide-react"

interface Lesson {
  lessonId: number
  title: string
  videoUrl: string
  transcription: string
  duration: number
  completed: boolean
  notes: Note[]
}

interface Note {
  id: number
  timestamp: number
  content: string
  createdAt: string
}

interface Course {
  folderId: number
  title: string
  description: string
  lessons: Lesson[]
  instructor: string
  rating: number
  studentsCount: number
  totalDuration: number
}

const CourseView: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const { user } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [course, setCourse] = useState<Course | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showTranscription, setShowTranscription] = useState(true)
  const [showNotes, setShowNotes] = useState(true)
  const [showLessonList, setShowLessonList] = useState(true)
  const [newNote, setNewNote] = useState("")
  const [searchTranscript, setSearchTranscript] = useState("")
  const [activeTab, setActiveTab] = useState<"transcript" | "notes" | "info">("transcript")

  useEffect(() => {
    if (courseId) {
      loadCourse()
    }
  }, [courseId])

  const loadCourse = async () => {
    try {
      setLoading(true)
      const folders = await folderApi.getAllFolders()
      const courseData = folders.find((f: any) => f.folderId === Number.parseInt(courseId!))

      if (courseData) {
        // Generate mock lessons data
        const mockLessons: Lesson[] = Array.from({ length: 8 }, (_, index) => ({
          lessonId: index + 1,
          title: `שיעור ${index + 1}: ${["מבוא לנושא", "עקרונות יסוד", "דוגמאות מעשיות", "תרגול מתקדם", "מקרי בוחן", "סיכום ביניים", "יישום מעשי", "סיכום וסקירה"][index]}`,
          videoUrl: `/placeholder-video-${index + 1}.mp4`,
          transcription: `זהו תמלול של שיעור ${index + 1}. בשיעור זה נלמד על ${courseData.title} ונעמיק בנושאים הבאים: עקרונות יסוד, דוגמאות מעשיות ויישומים בפועל. השיעור מכיל הסברים מפורטים ודוגמאות רלוונטיות שיעזרו לכם להבין את החומר בצורה הטובה ביותר. נתחיל עם הגדרות בסיסיות ונתקדם לנושאים מורכבים יותר. חשוב לשים לב לפרטים הקטנים ולהבין את הקשר בין הנושאים השונים.`,
          duration: Math.floor(Math.random() * 1800) + 600, // 10-40 minutes
          completed: index < 3,
          notes: [],
        }))

        const mockCourse: Course = {
          folderId: courseData.folderId,
          title: courseData.title,
          description: courseData.description,
          lessons: mockLessons,
          instructor: `ד"ר ${["אבי כהן", "שרה לוי", "דוד ישראלי", "מיכל רוזן"][Math.floor(Math.random() * 4)]}`,
          rating: 4.8,
          studentsCount: Math.floor(Math.random() * 1000) + 100,
          totalDuration: mockLessons.reduce((sum, lesson) => sum + lesson.duration, 0),
        }

        setCourse(mockCourse)
        setCurrentLesson(mockLessons[0])
        setCurrentLessonIndex(0)
      }
    } catch (error) {
      console.error("Error loading course:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setMuted(newVolume === 0)
    }
  }

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
      setPlaybackRate(rate)
    }
  }

  const handleLessonChange = (lessonIndex: number) => {
    if (course && course.lessons[lessonIndex]) {
      setCurrentLesson(course.lessons[lessonIndex])
      setCurrentLessonIndex(lessonIndex)
      setCurrentTime(0)
      setPlaying(false)
    }
  }

  const handleAddNote = () => {
    if (newNote.trim() && currentLesson) {
      const note: Note = {
        id: Date.now(),
        timestamp: currentTime,
        content: newNote.trim(),
        createdAt: new Date().toISOString(),
      }
      // In real app, this would save to backend
      setNewNote("")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="aspect-video bg-gray-200 rounded-3xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">קורס לא נמצא</h2>
          <p className="text-gray-600 mb-6">הקורס שחיפשת אינו קיים או שאין לך הרשאה לצפות בו</p>
          <Link
            to="/my-courses"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            חזור לקורסים שלי
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link
              to="/my-courses"
              className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600 mt-2">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <User className="h-4 w-4" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <Eye className="h-4 w-4" />
                  <span>{course.studentsCount} תלמידים</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse">
            <button className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
            <button className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Download className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player */}
            <div className="animate-fade-in-up animation-delay-200">
              <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl group">
                <video
                  ref={videoRef}
                  className="w-full aspect-video"
                  poster="/placeholder.svg?height=400&width=800&text=Video+Player"
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                >
                  <source src={currentLesson.videoUrl} type="video/mp4" />
                </video>

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full h-2 bg-white/20 rounded-full cursor-pointer">
                        <div
                          className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <button
                          onClick={handlePlayPause}
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          {playing ? (
                            <Pause className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white mr-1" />
                          )}
                        </button>

                        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                          <Rewind className="h-5 w-5 text-white" />
                        </button>

                        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                          <FastForward className="h-5 w-5 text-white" />
                        </button>

                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => setMuted(!muted)}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                          >
                            {muted || volume === 0 ? (
                              <VolumeX className="h-5 w-5 text-white" />
                            ) : (
                              <Volume2 className="h-5 w-5 text-white" />
                            )}
                          </button>
                          <div className="w-20 h-1 bg-white/20 rounded-full">
                            <div className="h-1 bg-white rounded-full" style={{ width: `${volume * 100}%` }}></div>
                          </div>
                        </div>

                        <span className="text-white text-sm font-medium">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <select
                          value={playbackRate}
                          onChange={(e) => handlePlaybackRateChange(Number.parseFloat(e.target.value))}
                          className="bg-white/20 backdrop-blur-sm text-white text-sm rounded-lg px-2 py-1 border-none outline-none"
                        >
                          <option value={0.5}>0.5x</option>
                          <option value={0.75}>0.75x</option>
                          <option value={1}>1x</option>
                          <option value={1.25}>1.25x</option>
                          <option value={1.5}>1.5x</option>
                          <option value={2}>2x</option>
                        </select>

                        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                          <Subtitles className="h-5 w-5 text-white" />
                        </button>

                        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                          <Settings className="h-5 w-5 text-white" />
                        </button>

                        <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                          <Maximize className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Play Button */}
                {!playing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={handlePlayPause}
                      className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                    >
                      <Play className="h-10 w-10 text-blue-600 mr-2" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Lesson Info & Tabs */}
            <div className="animate-fade-in-up animation-delay-400">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h2>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {currentLesson.completed && (
                      <div className="flex items-center space-x-1 space-x-reverse text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">הושלם</span>
                      </div>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                      <ThumbsUp className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                      <Bookmark className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 space-x-reverse mb-6 bg-gray-100 rounded-2xl p-1">
                  <button
                    onClick={() => setActiveTab("transcript")}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === "transcript"
                        ? "bg-white text-blue-600 shadow-lg"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <FileText className="h-4 w-4" />
                      <span>תמלול</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("notes")}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === "notes" ? "bg-white text-blue-600 shadow-lg" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <MessageSquare className="h-4 w-4" />
                      <span>הערות</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === "info" ? "bg-white text-blue-600 shadow-lg" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <BookOpen className="h-4 w-4" />
                      <span>מידע</span>
                    </div>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="min-h-[300px]">
                  {activeTab === "transcript" && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="relative flex-1">
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="חפש בתמלול..."
                            value={searchTranscript}
                            onChange={(e) => setSearchTranscript(e.target.value)}
                            className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          />
                        </div>
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-6 max-h-80 overflow-y-auto">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {currentLesson.transcription}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "notes" && (
                    <div className="space-y-4">
                      <div className="flex space-x-3 space-x-reverse">
                        <input
                          type="text"
                          placeholder="הוסף הערה חדשה..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                          onKeyPress={(e) => e.key === "Enter" && handleAddNote()}
                        />
                        <button
                          onClick={handleAddNote}
                          disabled={!newNote.trim()}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          הוסף
                        </button>
                      </div>
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {currentLesson.notes.length === 0 ? (
                          <div className="text-center py-12">
                            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">אין הערות עדיין</p>
                            <p className="text-sm text-gray-400">הוסף הערה ראשונה כדי להתחיל</p>
                          </div>
                        ) : (
                          currentLesson.notes.map((note) => (
                            <div key={note.id} className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-blue-600 font-medium">{formatTime(note.timestamp)}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(note.createdAt).toLocaleDateString("he-IL")}
                                </span>
                              </div>
                              <p className="text-gray-700">{note.content}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "info" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">תיאור השיעור</h3>
                        <p className="text-gray-600 leading-relaxed">{course.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-2xl p-4">
                          <div className="flex items-center space-x-2 space-x-reverse mb-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-gray-900">משך השיעור</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">{formatTime(currentLesson.duration)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-4">
                          <div className="flex items-center space-x-2 space-x-reverse mb-2">
                            <User className="h-5 w-5 text-purple-600" />
                            <span className="font-medium text-gray-900">מרצה</span>
                          </div>
                          <p className="text-lg font-semibold text-purple-600">{course.instructor}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Lessons List */}
          <div className="animate-fade-in-up animation-delay-600">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">רשימת שיעורים</h3>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm text-gray-500">
                    {currentLessonIndex + 1} מתוך {course.lessons.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {course.lessons.map((lesson, index) => (
                  <button
                    key={lesson.lessonId}
                    onClick={() => handleLessonChange(index)}
                    className={`w-full text-right p-4 rounded-2xl transition-all duration-300 ${
                      index === currentLessonIndex
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          index === currentLessonIndex
                            ? "bg-white/20"
                            : lesson.completed
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-medium truncate ${
                            index === currentLessonIndex ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {lesson.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <span
                            className={`text-sm ${index === currentLessonIndex ? "text-white/80" : "text-gray-500"}`}
                          >
                            {formatTime(lesson.duration)}
                          </span>
                          {index === currentLessonIndex && (
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex space-x-3 space-x-reverse mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleLessonChange(currentLessonIndex - 1)}
                  disabled={currentLessonIndex === 0}
                  className="flex-1 flex items-center justify-center space-x-2 space-x-reverse py-3 px-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>קודם</span>
                </button>
                <button
                  onClick={() => handleLessonChange(currentLessonIndex + 1)}
                  disabled={currentLessonIndex === course.lessons.length - 1}
                  className="flex-1 flex items-center justify-center space-x-2 space-x-reverse py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>הבא</span>
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>

              {/* Progress */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">התקדמות בקורס</span>
                  <span className="text-sm text-gray-500">
                    {Math.round((course.lessons.filter((l) => l.completed).length / course.lessons.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(course.lessons.filter((l) => l.completed).length / course.lessons.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseView
