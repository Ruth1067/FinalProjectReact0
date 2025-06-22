// // import { useEffect, useState } from "react"
// // import { useParams } from "react-router-dom"
// // import { folderApi, uploadApi } from "../services/api"
// // import { BookOpen, FileText } from "lucide-react"

// // interface Folder {
// //   folderId: number
// //   title: string
// //   description: string
// //   audioFileName?: string // שם הקובץ ב-S3 (למשל lesson123.mp3)
// // }

// // const LessonView: React.FC = () => {
// //   const { folderId } = useParams<{ folderId: string }>()
// //   const [lesson, setLesson] = useState<Folder | null>(null)
// //   const [audioUrl, setAudioUrl] = useState<string | null>(null)
// //   const [transcription, setTranscription] = useState<string | null>(null)
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     const loadLesson = async () => {
// //       try {
// //         const folders = await folderApi.getAllFolders()
// //         const folder = folders.find((f: Folder) => f.folderId === Number(folderId))

// //         if (!folder) {
// //           console.warn("לא נמצא שיעור עם folderId:", folderId)
// //           return
// //         }

// //         setLesson(folder)

// //         if (folder.audioFileName) {
// //           const audioUrl = `https://your-bucket-name.s3.amazonaws.com/${folder.audioFileName}`
// //           setAudioUrl(audioUrl)

// //           const transcript = await uploadApi.getTranscript(folder.audioFileName)
// //           setTranscription(transcript)
// //         }
// //       } catch (err) {
// //         console.error("שגיאה בטעינת השיעור:", err)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     loadLesson()
// //   }, [folderId])

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     )
// //   }

// //   if (!lesson) {
// //     return <div className="text-center mt-12 text-red-500 font-bold">שיעור לא נמצא</div>
// //   }

// //   return (
// //     <div className="max-w-3xl mx-auto space-y-6 p-4">
// //       <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
// //       <p className="text-gray-600">{lesson.description}</p>

// //       {audioUrl ? (
// //         <div className="bg-gray-100 p-4 rounded-lg">
// //           <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
// //             <BookOpen className="w-5 h-5" /> הקלטת שיעור
// //           </h2>
// //           <audio controls className="w-full">
// //             <source src={audioUrl} type="audio/mpeg" />
// //             הדפדפן שלך לא תומך בניגון אודיו.
// //           </audio>
// //         </div>
// //       ) : (
// //         <div className="text-gray-500">אין הקלטה זמינה לשיעור זה.</div>
// //       )}

// //       {transcription ? (
// //         <div className="bg-white border p-4 rounded-lg shadow-sm">
// //           <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
// //             <FileText className="w-5 h-5" /> תמלול אוטומטי
// //           </h2>
// //           <pre className="whitespace-pre-wrap text-gray-700 text-sm">{transcription}</pre>
// //         </div>
// //       ) : (
// //         <div className="text-gray-400">אין תמלול זמין לשיעור זה.</div>
// //       )}
// //     </div>
// //   )
// // }

// // export default LessonView
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { folderApi, uploadApi } from "../services/api";
// import { BookOpen, FileText } from "lucide-react";

// interface Folder {
//   folderId: number;
//   title: string;
//   description: string;
//   audioFileName?: string; // לדוג' "123-1-A.mp3"
// }

// const LessonView: React.FC = () => {
//   const { folderId } = useParams<{ folderId: string }>();
//   const [lesson, setLesson] = useState<Folder | null>(null);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [transcription, setTranscription] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadLessonAndMedia = async () => {
//       try {
//         const folders = await folderApi.getAllFolders();
//         const folder = folders.find((f: Folder) => f.folderId === Number(folderId));

//         if (!folder || !folder.audioFileName) {
//           console.warn("שיעור או קובץ אודיו לא נמצא");
//           return;
//         }

//         setLesson(folder);

//         const mediaFileName = folder.audioFileName;
//         const transcriptFileName = mediaFileName.replace(/\.[^/.]+$/, ".json");

//         const result = await uploadApi.downloadLesson(mediaFileName, transcriptFileName);
//         setAudioUrl(result.mediaUrl);
//         setTranscription(result.transcriptText);
//       } catch (err) {
//         console.error("שגיאה בטעינת נתוני השיעור:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadLessonAndMedia();
//   }, [folderId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!lesson) {
//     return <div className="text-center mt-12 text-red-500 font-bold">שיעור לא נמצא</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto space-y-6 p-4">
//       <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
//       <p className="text-gray-600">{lesson.description}</p>

//       {audioUrl ? (
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
//             <BookOpen className="w-5 h-5" /> הקלטת שיעור
//           </h2>
//           <audio controls className="w-full">
//             <source src={audioUrl} type="audio/mpeg" />
//             הדפדפן שלך לא תומך בניגון אודיו.
//           </audio>
//         </div>
//       ) : (
//         <div className="text-gray-500">אין הקלטה זמינה לשיעור זה.</div>
//       )}

//       {transcription ? (
//         <div className="bg-white border p-4 rounded-lg shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
//             <FileText className="w-5 h-5" /> תמלול אוטומטי
//           </h2>
//           <pre className="whitespace-pre-wrap text-gray-700 text-sm">{transcription}</pre>
//         </div>
//       ) : (
//         <div className="text-gray-400">אין תמלול זמין לשיעור זה.</div>
//       )}
//     </div>
//   );
// };

// export default LessonView;
