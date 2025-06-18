// // // // // "use client"

// // // // // // // import type React from "react"
// // // // // // // import { useState, useEffect } from "react"
// // // // // // // import { FileText, Plus, Edit, Trash2, Save, X } from "lucide-react"

// // // // // // // interface Note {
// // // // // // //   id: number
// // // // // // //   title: string
// // // // // // //   content: string
// // // // // // //   createdAt: Date
// // // // // // //   updatedAt: Date
// // // // // // // }

// // // // // // // const Notes: React.FC = () => {
// // // // // // //   const [notes, setNotes] = useState<Note[]>([])
// // // // // // //   const [isCreating, setIsCreating] = useState(false)
// // // // // // //   const [editingNote, setEditingNote] = useState<Note | null>(null)
// // // // // // //   const [newNote, setNewNote] = useState({ title: "", content: "" })

// // // // // // //   useEffect(() => {
// // // // // // //     loadNotes()
// // // // // // //   }, [])

// // // // // // //   const loadNotes = () => {
// // // // // // //     // Load notes from localStorage
// // // // // // //     const savedNotes = localStorage.getItem("userNotes")
// // // // // // //     if (savedNotes) {
// // // // // // //       const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
// // // // // // //         ...note,
// // // // // // //         createdAt: new Date(note.createdAt),
// // // // // // //         updatedAt: new Date(note.updatedAt),
// // // // // // //       }))
// // // // // // //       setNotes(parsedNotes)
// // // // // // //     }
// // // // // // //   }

// // // // // // //   const saveNotes = (updatedNotes: Note[]) => {
// // // // // // //     localStorage.setItem("userNotes", JSON.stringify(updatedNotes))
// // // // // // //     setNotes(updatedNotes)
// // // // // // //   }

// // // // // // //   const createNote = () => {
// // // // // // //     if (!newNote.title.trim() || !newNote.content.trim()) return

// // // // // // //     const note: Note = {
// // // // // // //       id: Date.now(),
// // // // // // //       title: newNote.title,
// // // // // // //       content: newNote.content,
// // // // // // //       createdAt: new Date(),
// // // // // // //       updatedAt: new Date(),
// // // // // // //     }

// // // // // // //     const updatedNotes = [note, ...notes]
// // // // // // //     saveNotes(updatedNotes)
// // // // // // //     setNewNote({ title: "", content: "" })
// // // // // // //     setIsCreating(false)
// // // // // // //   }

// // // // // // //   const updateNote = () => {
// // // // // // //     if (!editingNote) return

// // // // // // //     const updatedNotes = notes.map((note) =>
// // // // // // //       note.id === editingNote.id ? { ...editingNote, updatedAt: new Date() } : note,
// // // // // // //     )
// // // // // // //     saveNotes(updatedNotes)
// // // // // // //     setEditingNote(null)
// // // // // // //   }

// // // // // // //   const deleteNote = (id: number) => {
// // // // // // //     const updatedNotes = notes.filter((note) => note.id !== id)
// // // // // // //     saveNotes(updatedNotes)
// // // // // // //   }

// // // // // // //   const formatDate = (date: Date) => {
// // // // // // //     return date.toLocaleDateString("he-IL", {
// // // // // // //       year: "numeric",
// // // // // // //       month: "short",
// // // // // // //       day: "numeric",
// // // // // // //       hour: "2-digit",
// // // // // // //       minute: "2-digit",
// // // // // // //     })
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="space-y-6">
// // // // // // //       <div className="flex justify-between items-center">
// // // // // // //         <div>
// // // // // // //           <h1 className="text-3xl font-bold text-gray-900">המחברת שלי</h1>
// // // // // // //           <p className="mt-2 text-gray-600">נהל את ההערות והרשימות האישיות שלך</p>
// // // // // // //         </div>
// // // // // // //         <button
// // // // // // //           onClick={() => setIsCreating(true)}
// // // // // // //           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
// // // // // // //         >
// // // // // // //           <Plus className="h-4 w-4" />
// // // // // // //           <span>הערה חדשה</span>
// // // // // // //         </button>
// // // // // // //       </div>

// // // // // // //       {/* Create New Note */}
// // // // // // //       {isCreating && (
// // // // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // // //             <h3 className="text-lg font-semibold text-gray-900">הערה חדשה</h3>
// // // // // // //             <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
// // // // // // //               <X className="h-5 w-5" />
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //           <div className="space-y-4">
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               placeholder="כותרת ההערה"
// // // // // // //               value={newNote.title}
// // // // // // //               onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
// // // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // //             />
// // // // // // //             <textarea
// // // // // // //               placeholder="תוכן ההערה"
// // // // // // //               rows={4}
// // // // // // //               value={newNote.content}
// // // // // // //               onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
// // // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // //             />
// // // // // // //             <div className="flex space-x-2 space-x-reverse">
// // // // // // //               <button
// // // // // // //                 onClick={createNote}
// // // // // // //                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // // // // //               >
// // // // // // //                 <Save className="h-4 w-4" />
// // // // // // //                 <span>שמור</span>
// // // // // // //               </button>
// // // // // // //               <button
// // // // // // //                 onClick={() => setIsCreating(false)}
// // // // // // //                 className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
// // // // // // //               >
// // // // // // //                 ביטול
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* Notes List */}
// // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // //         {notes.map((note) => (
// // // // // // //           <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // //             {editingNote?.id === note.id ? (
// // // // // // //               <div className="space-y-4">
// // // // // // //                 <input
// // // // // // //                   type="text"
// // // // // // //                   value={editingNote.title}
// // // // // // //                   onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
// // // // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // //                 />
// // // // // // //                 <textarea
// // // // // // //                   rows={4}
// // // // // // //                   value={editingNote.content}
// // // // // // //                   onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
// // // // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // //                 />
// // // // // // //                 <div className="flex space-x-2 space-x-reverse">
// // // // // // //                   <button
// // // // // // //                     onClick={updateNote}
// // // // // // //                     className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // // // // //                   >
// // // // // // //                     <Save className="h-3 w-3" />
// // // // // // //                     <span>שמור</span>
// // // // // // //                   </button>
// // // // // // //                   <button
// // // // // // //                     onClick={() => setEditingNote(null)}
// // // // // // //                     className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
// // // // // // //                   >
// // // // // // //                     ביטול
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             ) : (
// // // // // // //               <>
// // // // // // //                 <div className="flex items-start justify-between mb-3">
// // // // // // //                   <div className="flex items-center space-x-2 space-x-reverse">
// // // // // // //                     <FileText className="h-5 w-5 text-blue-600" />
// // // // // // //                     <h3 className="font-semibold text-gray-900">{note.title}</h3>
// // // // // // //                   </div>
// // // // // // //                   <div className="flex space-x-1 space-x-reverse">
// // // // // // //                     <button
// // // // // // //                       onClick={() => setEditingNote(note)}
// // // // // // //                       className="text-gray-400 hover:text-blue-600 transition-colors"
// // // // // // //                     >
// // // // // // //                       <Edit className="h-4 w-4" />
// // // // // // //                     </button>
// // // // // // //                     <button
// // // // // // //                       onClick={() => deleteNote(note.id)}
// // // // // // //                       className="text-gray-400 hover:text-red-600 transition-colors"
// // // // // // //                     >
// // // // // // //                       <Trash2 className="h-4 w-4" />
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //                 <p className="text-gray-600 text-sm mb-4 line-clamp-4">{note.content}</p>
// // // // // // //                 <div className="text-xs text-gray-500">
// // // // // // //                   <p>נוצר: {formatDate(note.createdAt)}</p>
// // // // // // //                   {note.updatedAt.getTime() !== note.createdAt.getTime() && <p>עודכן: {formatDate(note.updatedAt)}</p>}
// // // // // // //                 </div>
// // // // // // //               </>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {notes.length === 0 && !isCreating && (
// // // // // // //         <div className="text-center py-12">
// // // // // // //           <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // // // // // //           <h3 className="text-lg font-medium text-gray-900 mb-2">אין הערות עדיין</h3>
// // // // // // //           <p className="text-gray-600 mb-4">התחל לכתוב הערות ורשימות כדי לארגן את הלמידה שלך</p>
// // // // // // //           <button
// // // // // // //             onClick={() => setIsCreating(true)}
// // // // // // //             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
// // // // // // //           >
// // // // // // //             <Plus className="h-4 w-4 ml-1" />
// // // // // // //             צור הערה ראשונה
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   )
// // // // // // // }

// // // // // // // export default Notes
// // // // // // // // "use client"

// // // // // // // // import type React from "react"
// // // // // // // // import { useState, useEffect } from "react"
// // // // // // // // import { FileText, Plus, Edit, Trash2, Save, X } from "lucide-react"
// // // // // // // // import { authApi, userApi } from '../services/api'; // עדכן את הנתיב לפי הצורך

// // // // // // // // interface Note {
// // // // // // // //   id: number
// // // // // // // //   title: string
// // // // // // // //   content: string
// // // // // // // //   createdAt: Date
// // // // // // // //   updatedAt: Date
// // // // // // // // }

// // // // // // // // const Notes: React.FC = () => {
// // // // // // // //   const [notes, setNotes] = useState<Note[]>([])
// // // // // // // //   const [isCreating, setIsCreating] = useState(false)
// // // // // // // //   const [editingNote, setEditingNote] = useState<Note | null>(null)
// // // // // // // //   const [newNote, setNewNote] = useState({ title: "", content: "" })
// // // // // // // //   const [userId, setUserId] = useState<number | null>(null)

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchUserProfile = async () => {
// // // // // // // //       try {
// // // // // // // //         const profile = await authApi.getProfile();
// // // // // // // //         setUserId(profile.id); // נניח שה-id נמצא בפרופיל
// // // // // // // //         loadNotes(profile.id); // טען את הפתקים עבור המשתמש
// // // // // // // //       } catch (error) {
// // // // // // // //         console.error("שגיאה בטעינת פרטי המשתמש:", error);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchUserProfile();
// // // // // // // //   }, []);

// // // // // // // //   const loadNotes = async (userId: number) => {
// // // // // // // //     try {
// // // // // // // //       const userNotes = await userApi.getUserCourses(userId); // טען את הפתקים של המשתמש
// // // // // // // //       const parsedNotes = userNotes.map((note: any) => ({
// // // // // // // //         ...note,
// // // // // // // //         createdAt: new Date(note.createdAt),
// // // // // // // //         updatedAt: new Date(note.updatedAt),
// // // // // // // //       }));
// // // // // // // //       setNotes(parsedNotes);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("שגיאה בטעינת הפתקים:", error);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   const createNote = async () => {
// // // // // // // //     if (!newNote.title.trim() || !newNote.content.trim()) return;

// // // // // // // //     const note: Note = {
// // // // // // // //       id: Date.now(), // זה עשוי להיות שונה אם השרת מחזיר id
// // // // // // // //       title: newNote.title,
// // // // // // // //       content: newNote.content,
// // // // // // // //       createdAt: new Date(),
// // // // // // // //       updatedAt: new Date(),
// // // // // // // //     };

// // // // // // // //     try {
// // // // // // // //       await userApi.addNote(userId, note); // הוסף את הפונקציה המתאימה
// // // // // // // //       setNewNote({ title: "", content: "" });
// // // // // // // //       setIsCreating(false);
// // // // // // // //       loadNotes(userId); // טען מחדש את הפתקים
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("שגיאה ביצירת ההערה:", error);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   const updateNote = async () => {
// // // // // // // //     if (!editingNote) return;

// // // // // // // //     try {
// // // // // // // //       await userApi.updateNote(userId, editingNote); // הוסף את הפונקציה המתאימה
// // // // // // // //       setEditingNote(null);
// // // // // // // //       loadNotes(userId); // טען מחדש את הפתקים
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("שגיאה בעדכון ההערה:", error);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   const deleteNote = async (id: number) => {
// // // // // // // //     try {
// // // // // // // //       await userApi.deleteNote(userId, id); // הוסף את הפונקציה המתאימה
// // // // // // // //       loadNotes(userId); // טען מחדש את הפתקים
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("שגיאה במחיקת ההערה:", error);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   const formatDate = (date: Date) => {
// // // // // // // //     return date.toLocaleDateString("he-IL", {
// // // // // // // //       year: "numeric",
// // // // // // // //       month: "short",
// // // // // // // //       day: "numeric",
// // // // // // // //       hour: "2-digit",
// // // // // // // //       minute: "2-digit",
// // // // // // // //     });
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <div className="space-y-6">
// // // // // // // //       <div className="flex justify-between items-center">
// // // // // // // //         <div>
// // // // // // // //           <h1 className="text-3xl font-bold text-gray-900">המחברת שלי</h1>
// // // // // // // //           <p className="mt-2 text-gray-600">נהל את ההערות והרשימות האישיות שלך</p>
// // // // // // // //         </div>
// // // // // // // //         <button
// // // // // // // //           onClick={() => setIsCreating(true)}
// // // // // // // //           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
// // // // // // // //         >
// // // // // // // //           <Plus className="h-4 w-4" />
// // // // // // // //           <span>הערה חדשה</span>
// // // // // // // //         </button>
// // // // // // // //       </div>

// // // // // // // //       {/* Create New Note */}
// // // // // // // //       {isCreating && (
// // // // // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // // // //             <h3 className="text-lg font-semibold text-gray-900">הערה חדשה</h3>
// // // // // // // //             <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
// // // // // // // //               <X className="h-5 w-5" />
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //           <div className="space-y-4">
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               placeholder="כותרת ההערה"
// // // // // // // //               value={newNote.title}
// // // // // // // //               onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
// // // // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // // //             />
// // // // // // // //             <textarea
// // // // // // // //               placeholder="תוכן ההערה"
// // // // // // // //               rows={4}
// // // // // // // //               value={newNote.content}
// // // // // // // //               onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
// // // // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // // //             />
// // // // // // // //             <div className="flex space-x-2 space-x-reverse">
// // // // // // // //               <button
// // // // // // // //                 onClick={createNote}
// // // // // // // //                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // // // // // //               >
// // // // // // // //                 <Save className="h-4 w-4" />
// // // // // // // //                 <span>שמור</span>
// // // // // // // //               </button>
// // // // // // // //               <button
// // // // // // // //                 onClick={() => setIsCreating(false)}
// // // // // // // //                 className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
// // // // // // // //               >
// // // // // // // //                 ביטול
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       {/* Notes List */}
// // // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // // //         {notes.map((note) => (
// // // // // // // //           <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // // //             {editingNote?.id === note.id ? (
// // // // // // // //               <div className="space-y-4">
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   value={editingNote.title}
// // // // // // // //                   onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
// // // // // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // // //                 />
// // // // // // // //                 <textarea
// // // // // // // //                   rows={4}
// // // // // // // //                   value={editingNote.content}
// // // // // // // //                   onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
// // // // // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // // //                 />
// // // // // // // //                 <div className="flex space-x-2 space-x-reverse">
// // // // // // // //                   <button
// // // // // // // //                     onClick={updateNote}
// // // // // // // //                     className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // // // // // //                   >
// // // // // // // //                     <Save className="h-3 w-3" />
// // // // // // // //                     <span>שמור</span>
// // // // // // // //                   </button>
// // // // // // // //                   <button
// // // // // // // //                     onClick={() => setEditingNote(null)}
// // // // // // // //                     className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
// // // // // // // //                   >
// // // // // // // //                     ביטול
// // // // // // // //                   </button>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             ) : (
// // // // // // // //               <>
// // // // // // // //                 <div className="flex items-start justify-between mb-3">
// // // // // // // //                   <div className="flex items-center space-x-2 space-x-reverse">
// // // // // // // //                     <FileText className="h-5 w-5 text-blue-600" />
// // // // // // // //                     <h3 className="font-semibold text-gray-900">{note.title}</h3>
// // // // // // // //                   </div>
// // // // // // // //                   <div className="flex space-x-1 space-x-reverse">
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setEditingNote(note)}
// // // // // // // //                       className="text-gray-400 hover:text-blue-600 transition-colors"
// // // // // // // //                     >
// // // // // // // //                       <Edit className="h-4 w-4" />
// // // // // // // //                     </button>
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => deleteNote(note.id)}
// // // // // // // //                       className="text-gray-400 hover:text-red-600 transition-colors"
// // // // // // // //                     >
// // // // // // // //                       <Trash2 className="h-4 w-4" />
// // // // // // // //                     </button>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //                 <p className="text-gray-600 text-sm mb-4 line-clamp-4">{note.content}</p>
// // // // // // // //                 <div className="text-xs text-gray-500">
// // // // // // // //                   <p>נוצר: {formatDate(note.createdAt)}</p>
// // // // // // // //                   {note.updatedAt.getTime() !== note.createdAt.getTime() && <p>עודכן: {formatDate(note.updatedAt)}</p>}
// // // // // // // //                 </div>
// // // // // // // //               </>
// // // // // // // //             )}
// // // // // // // //           </div>
// // // // // // // //         ))}
// // // // // // // //       </div>

// // // // // // // //       {notes.length === 0 && !isCreating && (
// // // // // // // //         <div className="text-center py-12">
// // // // // // // //           <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // // // // // // //           <h3 className="text-lg font-medium text-gray-900 mb-2">אין הערות עדיין</h3>
// // // // // // // //           <p className="text-gray-600 mb-4">התחל לכתוב הערות ורשימות כדי לארגן את הלמידה שלך</p>
// // // // // // // //           <button
// // // // // // // //             onClick={() => setIsCreating(true)}
// // // // // // // //             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
// // // // // // // //           >
// // // // // // // //             <Plus className="h-4 w-4 ml-1" />
// // // // // // // //             צור הערה ראשונה
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   )
// // // // // // // // }

// // // // // // // // export default Notes
// // // // // // // import type React from "react";
// // // // // // // import { useState, useEffect } from "react";
// // // // // // // import { FileText, Plus, Edit, Trash2, Save, X } from "lucide-react";
// // // // // // // import { notesApi } from '../services/api'; // עדכן את הנתיב הנכון
// // // // // // // import { useAuth } from "../contexts/AuthContext";

// // // // // // // interface Note {
// // // // // // //   id: number;
// // // // // // //   userId: number,
// // // // // // //   title: string;
// // // // // // //   content: string;
// // // // // // //   createdAt: Date;
// // // // // // //   updatedAt: Date;
// // // // // // // }



// // // // // // // const Notes: React.FC = () => {
// // // // // // //   const { user } = useAuth()
// // // // // // //   if (!user) return null
// // // // // // //   const [notes, setNotes] = useState<Note[]>([]);
// // // // // // //   const [isCreating, setIsCreating] = useState(false);
// // // // // // //   const [editingNote, setEditingNote] = useState<Note | null>(null);
// // // // // // //   const [newNote, setNewNote] = useState({ title: "", content: "" });
// // // // // // //   // const userId = 1; // עדכן את מזהה המשתמש לפי הצורך

// // // // // // //   // useEffect(() => {
// // // // // // //   //   loadNotes();
// // // // // // //   // }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     if (user) {
// // // // // // //       loadNotes()
// // // // // // //     }
// // // // // // //   }, [user])

// // // // // // //   // const loadNotes = async () => {
// // // // // // //   //   try {
// // // // // // //   //     const fetchedNotes = await notesApi.getNotes(user?.userId);
// // // // // // //   //     setNotes(fetchedNotes);
// // // // // // //   //   } catch (error) {
// // // // // // //   //     console.error("Error loading notes:", error);
// // // // // // //   //   }
// // // // // // //   // };
// // // // // // //   const loadNotes = async () => {
// // // // // // //     try {
// // // // // // //       const fetchedNotes = await notesApi.getNotes(user?.userId);
// // // // // // //       // המרת התאריכים לאובייקטי Date
// // // // // // //       const notesWithDates = fetchedNotes.map((note: { createdAt: string | number | Date; updatedAt: string | number | Date; }) => ({
// // // // // // //         ...note,
// // // // // // //         createdAt: new Date(note.createdAt), // המרה לאובייקט Date
// // // // // // //         updatedAt: new Date(note.updatedAt), // המרה לאובייקט Date
// // // // // // //       }));
// // // // // // //       setNotes(notesWithDates);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error loading notes:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const createNote = async () => {
// // // // // // //     if (!newNote.title.trim() || !newNote.content.trim()) return;

// // // // // // //     const note: any = {
// // // // // // //       // id: 1, // לא נדרש, השרת ייצור מזהה
// // // // // // //       userId: user?.userId, // הוסף את מזהה המשתמש
// // // // // // //       title: newNote.title,
// // // // // // //       content: newNote.content,
// // // // // // //       createdAt: new Date(),
// // // // // // //       updatedAt: new Date(),
// // // // // // //     };

// // // // // // //     try {
// // // // // // //       const createdNote = await notesApi.createNote(note);
// // // // // // //       setNotes((prevNotes) => [createdNote, ...prevNotes]);
// // // // // // //       setNewNote({ title: "", content: "" });
// // // // // // //       setIsCreating(false);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error creating note:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // const createNote = async () => {
// // // // // // //   //   if (!newNote.title.trim() || !newNote.content.trim()) return;

// // // // // // //   //   const note: Note = {
// // // // // // //   //     id: Date.now(), // לא נדרש, השרת ייצור מזהה
// // // // // // //   //     userId: 
// // // // // // //   //     title: newNote.title,
// // // // // // //   //     content: newNote.content,
// // // // // // //   //     createdAt: new Date(),
// // // // // // //   //     updatedAt: new Date(),
// // // // // // //   //   };

// // // // // // //   //   try {
// // // // // // //   //     const createdNote = await notesApi.createNote(note);
// // // // // // //   //     setNotes((prevNotes) => [createdNote, ...prevNotes]);
// // // // // // //   //     setNewNote({ title: "", content: "" });
// // // // // // //   //     setIsCreating(false);
// // // // // // //   //   } catch (error) {
// // // // // // //   //     console.error("Error creating note:", error);
// // // // // // //   //   }
// // // // // // //   // };

// // // // // // //   const updateNote = async () => {
// // // // // // //     if (!editingNote) return;

// // // // // // //     try {
// // // // // // //       await notesApi.updateNote(editingNote.id, editingNote);
// // // // // // //       setNotes((prevNotes) =>
// // // // // // //         prevNotes.map((note) =>
// // // // // // //           note.id === editingNote.id ? { ...editingNote, updatedAt: new Date() } : note
// // // // // // //         )
// // // // // // //       );
// // // // // // //       setEditingNote(null);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error updating note:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const deleteNote = async (id: number) => {
// // // // // // //     try {
// // // // // // //       await notesApi.deleteNote(id);
// // // // // // //       setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Error deleting note:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // const formatDate = (date: Date) => {
// // // // // // //   //   return date.toLocaleDateString("he-IL", {
// // // // // // //   //     year: "numeric",
// // // // // // //   //     month: "short",
// // // // // // //   //     day: "numeric",
// // // // // // //   //     hour: "2-digit",
// // // // // // //   //     minute: "2-digit",
// // // // // // //   //   });
// // // // // // //   // };
// // // // // // //   const formatDate = (date: Date) => {
// // // // // // //     if (!(date instanceof Date) || isNaN(date.getTime())) {
// // // // // // //       return ""; // החזר מחרוזת ריקה אם התאריך לא תקין
// // // // // // //     }
// // // // // // //     return date.toLocaleDateString("he-IL", {
// // // // // // //       year: "numeric",
// // // // // // //       month: "short",
// // // // // // //       day: "numeric",
// // // // // // //       hour: "2-digit",
// // // // // // //       minute: "2-digit",
// // // // // // //     });
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="space-y-6">
// // // // // // //       <div className="flex justify-between items-center">
// // // // // // //         <div>
// // // // // // //           <h1 className="text-3xl font-bold text-gray-900">המחברת שלי</h1>
// // // // // // //           <p className="mt-2 text-gray-600">נהל את ההערות והרשימות האישיות שלך</p>
// // // // // // //         </div>
// // // // // // //         <button
// // // // // // //           onClick={() => setIsCreating(true)}
// // // // // // //           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
// // // // // // //         >
// // // // // // //           <Plus className="h-4 w-4" />
// // // // // // //           <span>הערה חדשה</span>
// // // // // // //         </button>
// // // // // // //       </div>

// // // // // // //       {/* Create New Note */}
// // // // // // //       {isCreating && (
// // // // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // // //             <h3 className="text-lg font-semibold text-gray-900">הערה חדשה</h3>
// // // // // // //             <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
// // // // // // //               <X className="h-5 w-5" />
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //           <div className="space-y-4">
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               placeholder="כותרת ההערה"
// // // // // // //               value={newNote.title}
// // // // // // //               onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
// // // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // //             />
// // // // // // //             <textarea
// // // // // // //               placeholder="תוכן ההערה"
// // // // // // //               rows={4}
// // // // // // //               value={newNote.content}
// // // // // // //               onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
// // // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // //             />
// // // // // // //             <div className="flex space-x-2 space-x-reverse">
// // // // // // //               <button
// // // // // // //                 onClick={createNote}
// // // // // // //                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // // // // //               >
// // // // // // //                 <Save className="h-4 w-4" />
// // // // // // //                 <span>שמור</span>
// // // // // // //               </button>
// // // // // // //               <button
// // // // // // //                 onClick={() => setIsCreating(false)}
// // // // // // //                 className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
// // // // // // //               >
// // // // // // //                 ביטול
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       {/* Notes List */}
// // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // //         {notes.map((note) => (
// // // // // // //           <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // //             {editingNote?.id === note.id ? (
// // // // // // //               <div className="space-y-4">
// // // // // // //                 <input
// // // // // // //                   type="text"
// // // // // // //                   value={editingNote.title}
// // // // // // //                   onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
// // // // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // //                 />
// // // // // // //                 <textarea
// // // // // // //                   rows={4}
// // // // // // //                   value={editingNote.content}
// // // // // // //                   onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
// // // // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // // //                 />
// // // // // // //                 <div className="flex space-x-2 space-x-reverse">
// // // // // // //                   <button
// // // // // // //                     onClick={updateNote}
// // // // // // //                     className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // // // // //                   >
// // // // // // //                     <Save className="h-3 w-3" />
// // // // // // //                     <span>שמור</span>
// // // // // // //                   </button>
// // // // // // //                   <button
// // // // // // //                     onClick={() => setEditingNote(null)}
// // // // // // //                     className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
// // // // // // //                   >
// // // // // // //                     ביטול
// // // // // // //                   </button>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             ) : (
// // // // // // //               <>
// // // // // // //                 <div className="flex items-start justify-between mb-3">
// // // // // // //                   <div className="flex items-center space-x-2 space-x-reverse">
// // // // // // //                     <FileText className="h-5 w-5 text-blue-600" />
// // // // // // //                     <h3 className="font-semibold text-gray-900">{note.title}</h3>
// // // // // // //                   </div>
// // // // // // //                   <div className="flex space-x-1 space-x-reverse">
// // // // // // //                     <button
// // // // // // //                       onClick={() => setEditingNote(note)}
// // // // // // //                       className="text-gray-400 hover:text-blue-600 transition-colors"
// // // // // // //                     >
// // // // // // //                       <Edit className="h-4 w-4" />
// // // // // // //                     </button>
// // // // // // //                     <button
// // // // // // //                       onClick={() => deleteNote(note.id)}
// // // // // // //                       className="text-gray-400 hover:text-red-600 transition-colors"
// // // // // // //                     >
// // // // // // //                       <Trash2 className="h-4 w-4" />
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //                 <p className="text-gray-600 text-sm mb-4 line-clamp-4">{note.content}</p>
// // // // // // //                 <div className="text-xs text-gray-500">
// // // // // // //                   {/* <p>נוצר: {formatDate(note.createdAt)}</p> */}
// // // // // // //                   <div className="text-xs text-gray-500">
// // // // // // //                     <p>נוצר: {formatDate(note.createdAt)}</p>
// // // // // // //                     {note.updatedAt.getTime() !== note.createdAt.getTime() && <p>עודכן: {formatDate(note.updatedAt)}</p>}
// // // // // // //                   </div>

// // // // // // //                   {/* {note.updatedAt.getTime() !== note.createdAt.getTime() && <p>עודכן: {formatDate(note.updatedAt)}</p>} */}
// // // // // // //                 </div>
// // // // // // //               </>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {
// // // // // // //         notes.length === 0 && !isCreating && (
// // // // // // //           <div className="text-center py-12">
// // // // // // //             <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // // // // // //             <h3 className="text-lg font-medium text-gray-900 mb-2">אין הערות עדיין</h3>
// // // // // // //             <p className="text-gray-600 mb-4">התחל לכתוב הערות ורשימות כדי לארגן את הלמידה שלך</p>
// // // // // // //             <button
// // // // // // //               onClick={() => setIsCreating(true)}
// // // // // // //               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
// // // // // // //             >
// // // // // // //               <Plus className="h-4 w-4 ml-1" />
// // // // // // //               צור הערה ראשונה
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         )
// // // // // // //       }
// // // // // // //     </div >
// // // // // // //   )
// // // // // // // };

// // // // // // // export default Notes;
// // // // // // import type React from "react";
// // // // // // import { useState, useEffect } from "react";
// // // // // // import { FileText, Plus, Edit, Trash2, Save, X } from "lucide-react";
// // // // // // import { notesApi } from '../services/api'; // עדכן את הנתיב הנכון
// // // // // // import { useAuth } from "../contexts/AuthContext";

// // // // // // interface Note {
// // // // // //   id: number;
// // // // // //   userId: number,
// // // // // //   title: string;
// // // // // //   content: string;
// // // // // //   createdAt: Date;
// // // // // //   updatedAt: Date;
// // // // // // }

// // // // // // const Notes: React.FC = () => {
// // // // // //   const { user } = useAuth();
// // // // // //   if (!user) return null;

// // // // // //   const [notes, setNotes] = useState<Note[]>([]);
// // // // // //   const [isCreating, setIsCreating] = useState(false);
// // // // // //   const [editingNote, setEditingNote] = useState<Note | null>(null);
// // // // // //   const [newNote, setNewNote] = useState({ title: "", content: "" });

// // // // // //   useEffect(() => {
// // // // // //     if (user) {
// // // // // //       loadNotes();
// // // // // //     }
// // // // // //   }, [user]);

  
// // // // // //   const loadNotes = async () => {
// // // // // //     try {
// // // // // //       const fetchedNotes = await notesApi.getNotes(user?.userId);
// // // // // //       const notesWithDates = fetchedNotes.map((note: { createdAt: string | number | Date; updatedAt: string | number | Date; }) => ({
// // // // // //         ...note,
// // // // // //         createdAt: new Date(note.createdAt),
// // // // // //         updatedAt: new Date(note.updatedAt),
// // // // // //       }));
// // // // // //       setNotes(notesWithDates);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error loading notes:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const createNote = async () => {
// // // // // //     if (!newNote.title.trim() || !newNote.content.trim()) return;

// // // // // //     const note: any = {
// // // // // //       userId: user?.userId,
// // // // // //       title: newNote.title,
// // // // // //       content: newNote.content,
// // // // // //       createdAt: new Date(),
// // // // // //       updatedAt: new Date(),
// // // // // //     };

// // // // // //     try {
// // // // // //       const createdNote = await notesApi.createNote(note);
// // // // // //       setNotes((prevNotes) => [createdNote, ...prevNotes]);
// // // // // //       setNewNote({ title: "", content: "" });
// // // // // //       setIsCreating(false);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error creating note:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const updateNote = async () => {
// // // // // //     if (!editingNote) return;

// // // // // //     try {
// // // // // //       await notesApi.updateNote(editingNote.id, editingNote);
// // // // // //       setNotes((prevNotes) =>
// // // // // //         prevNotes.map((note) =>
// // // // // //           note.id === editingNote.id ? { ...editingNote, updatedAt: new Date() } : note
// // // // // //         )
// // // // // //       );
// // // // // //       setEditingNote(null);
// // // // // //     } catch (error) {
// // // // // //       console.error("Error updating note:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const deleteNote = async (id: number) => {
// // // // // //     try {
// // // // // //       await notesApi.deleteNote(id);
// // // // // //       setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
// // // // // //     } catch (error) {
// // // // // //       console.error("Error deleting note:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const formatDate = (date: Date) => {
// // // // // //     if (!(date instanceof Date) || isNaN(date.getTime())) {
// // // // // //       return "";
// // // // // //     }
// // // // // //     return date.toLocaleDateString("he-IL", {
// // // // // //       year: "numeric",
// // // // // //       month: "short",
// // // // // //       day: "numeric",
// // // // // //       hour: "2-digit",
// // // // // //       minute: "2-digit",
// // // // // //     });
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="space-y-6">
// // // // // //       <div className="flex justify-between items-center">
// // // // // //         <div>
// // // // // //           <h1 className="text-3xl font-bold text-gray-900">המחברת שלי</h1>
// // // // // //           <p className="mt-2 text-gray-600">נהל את ההערות והרשימות האישיות שלך</p>
// // // // // //         </div>
// // // // // //         <button
// // // // // //           onClick={() => setIsCreating(true)}
// // // // // //           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
// // // // // //         >
// // // // // //           <Plus className="h-4 w-4" />
// // // // // //           <span>הערה חדשה</span>
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* Create New Note */}
// // // // // //       {isCreating && (
// // // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // //           <div className="flex justify-between items-center mb-4">
// // // // // //             <h3 className="text-lg font-semibold text-gray-900">הערה חדשה</h3>
// // // // // //             <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
// // // // // //               <X className="h-5 w-5" />
// // // // // //             </button>
// // // // // //           </div>
// // // // // //           <div className="space-y-4">
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               placeholder="כותרת ההערה"
// // // // // //               value={newNote.title}
// // // // // //               onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
// // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // //             />
// // // // // //             <textarea
// // // // // //               placeholder="תוכן ההערה"
// // // // // //               rows={4}
// // // // // //               value={newNote.content}
// // // // // //               onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
// // // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // //             />
// // // // // //             <div className="flex space-x-2 space-x-reverse">
// // // // // //               <button
// // // // // //                 onClick={createNote}
// // // // // //                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // // // //               >
// // // // // //                 <Save className="h-4 w-4" />
// // // // // //                 <span>שמור</span>
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 onClick={() => setIsCreating(false)}
// // // // // //                 className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
// // // // // //               >
// // // // // //                 ביטול
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Notes List */}
// // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //         {notes.map((note) => (
// // // // // //           <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // //             {editingNote?.id === note.id ? (
// // // // // //               <div className="space-y-4">
// // // // // //                 <input
// // // // // //                   type="text"
// // // // // //                   value={editingNote.title}
// // // // // //                   onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
// // // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // //                 />
// // // // // //                 <textarea
// // // // // //                   rows={4}
// // // // // //                   value={editingNote.content}
// // // // // //                   onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
// // // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // // //                 />
// // // // // //                 <div className="flex space-x-2 space-x-reverse">
// // // // // //                   <button
// // // // // //                     onClick={updateNote}
// // // // // //                     className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // // // //                   >
// // // // // //                     <Save className="h-3 w-3" />
// // // // // //                     <span>שמור</span>
// // // // // //                   </button>
// // // // // //                   <button
// // // // // //                     onClick={() => setEditingNote(null)}
// // // // // //                     className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
// // // // // //                   >
// // // // // //                     ביטול
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <>
// // // // // //                 <div className="flex items-start justify-between mb-3">
// // // // // //                   <div className="flex items-center space-x-2 space-x-reverse">
// // // // // //                     <FileText className="h-5 w-5 text-blue-600" />
// // // // // //                     <h3 className="font-semibold text-gray-900">{note.title}</h3>
// // // // // //                   </div>
// // // // // //                   <div className="flex space-x-1 space-x-reverse">
// // // // // //                     <button
// // // // // //                       onClick={() => setEditingNote(note)}
// // // // // //                       className="text-gray-400 hover:text-blue-600 transition-colors"
// // // // // //                     >
// // // // // //                       <Edit className="h-4 w-4" />
// // // // // //                     </button>
// // // // // //                     <button
// // // // // //                       onClick={() => deleteNote(note.id)}
// // // // // //                       className="text-gray-400 hover:text-red-600 transition-colors"
// // // // // //                     >
// // // // // //                       <Trash2 className="h-4 w-4" />
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //                 <p className="text-gray-600 text-sm mb-4 line-clamp-4">{note.content}</p>
// // // // // //                 <div className="text-xs text-gray-500">
// // // // // //                   <p>נוצר: {formatDate(note.createdAt)}</p>
// // // // // //                   {note.updatedAt.getTime() !== note.createdAt.getTime() && <p>עודכן: {formatDate(note.updatedAt)}</p>}
// // // // // //                 </div>
// // // // // //               </>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {notes.length === 0 && !isCreating && (
// // // // // //         <div className="text-center py-12">
// // // // // //           <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // // // // //           <h3 className="text-lg font-medium text-gray-900 mb-2">אין הערות עדיין</h3>
// // // // // //           <p className="text-gray-600 mb-4">התחל לכתוב הערות ורשימות כדי לארגן את הלמידה שלך</p>
// // // // // //           <button
// // // // // //             onClick={() => setIsCreating(true)}
// // // // // //             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
// // // // // //           >
// // // // // //             <Plus className="h-4 w-4 ml-1" />
// // // // // //             צור הערה ראשונה
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Notes;
// // // // // import type React from "react";
// // // // // import { useState, useEffect } from "react";
// // // // // import { FileText, Plus, Edit, Trash2, Save, X } from "lucide-react";
// // // // // import { notesApi } from '../services/api'; // עדכן את הנתיב הנכון
// // // // // import { useAuth } from "../contexts/AuthContext";

// // // // // interface Note {
// // // // //   id: number;
// // // // //   userId: number;
// // // // //   title: string;
// // // // //   content: string;
// // // // //   createdAt: Date;
// // // // //   updatedAt: Date;
// // // // // }

// // // // // const Notes: React.FC = () => {
// // // // //   const { user } = useAuth();
// // // // //   if (!user) return null;

// // // // //   const [notes, setNotes] = useState<Note[]>([]);
// // // // //   const [isCreating, setIsCreating] = useState(false);
// // // // //   const [editingNote, setEditingNote] = useState<Note | null>(null);
// // // // //   const [newNote, setNewNote] = useState({ title: "", content: "" });

// // // // //   useEffect(() => {
// // // // //     if (user) {
// // // // //       loadNotes();
// // // // //     }
// // // // //   }, [user]);

// // // // //   const loadNotes = async () => {
// // // // //     try {
// // // // //       const fetchedNotes = await notesApi.getNotes(user?.userId);
// // // // //       const notesWithDates = fetchedNotes.map((note: { createdAt: string | number | Date; updatedAt: string | number | Date; }) => ({
// // // // //         ...note,
// // // // //         createdAt: new Date(note.createdAt),
// // // // //         updatedAt: new Date(note.updatedAt),
// // // // //       }));

// // // // //       // סנן אובייקטים null
// // // // //       const validNotes = notesWithDates.filter((note: { title: any; content: any; } | null) => note !== null && note.title && note.content);
// // // // //       setNotes(validNotes);
// // // // //     } catch (error) {
// // // // //       console.error("Error loading notes:", error);
// // // // //     }
// // // // //   };

// // // // //   const createNote = async () => {
// // // // //     if (!newNote.title.trim() || !newNote.content.trim()) return;

// // // // //     const note: any = {
// // // // //       userId: user?.userId,
// // // // //       title: newNote.title,
// // // // //       content: newNote.content,
// // // // //       createdAt: new Date(),
// // // // //       updatedAt: new Date(),
// // // // //     };

// // // // //     try {
// // // // //       const createdNote = await notesApi.createNote(note);
// // // // //       setNotes((prevNotes) => [createdNote, ...prevNotes]);
// // // // //       setNewNote({ title: "", content: "" });
// // // // //       setIsCreating(false);
// // // // //     } catch (error) {
// // // // //       console.error("Error creating note:", error);
// // // // //     }
// // // // //   };

// // // // //   const updateNote = async () => {
// // // // //     if (!editingNote) return;

// // // // //     try {
// // // // //       await notesApi.updateNote(editingNote.id, editingNote);
// // // // //       setNotes((prevNotes) =>
// // // // //         prevNotes.map((note) =>
// // // // //           note.id === editingNote.id ? { ...editingNote, updatedAt: new Date() } : note
// // // // //         )
// // // // //       );
// // // // //       setEditingNote(null);
// // // // //     } catch (error) {
// // // // //       console.error("Error updating note:", error);
// // // // //     }
// // // // //   };

// // // // //   const deleteNote = async (id: number) => {
// // // // //     try {
// // // // //       await notesApi.deleteNote(id);
// // // // //       setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
// // // // //     } catch (error) {
// // // // //       console.error("Error deleting note:", error);
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (date: Date) => {
// // // // //     if (!(date instanceof Date) || isNaN(date.getTime())) {
// // // // //       return "";
// // // // //     }
// // // // //     return date.toLocaleDateString("he-IL", {
// // // // //       year: "numeric",
// // // // //       month: "short",
// // // // //       day: "numeric",
// // // // //       hour: "2-digit",
// // // // //       minute: "2-digit",
// // // // //     });
// // // // //   };

// // // // //   return (
// // // // //     <div className="space-y-6">
// // // // //       <div className="flex justify-between items-center">
// // // // //         <div>
// // // // //           <h1 className="text-3xl font-bold text-gray-900">המחברת שלי</h1>
// // // // //           <p className="mt-2 text-gray-600">נהל את ההערות והרשימות האישיות שלך</p>
// // // // //         </div>
// // // // //         <button
// // // // //           onClick={() => setIsCreating(true)}
// // // // //           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
// // // // //         >
// // // // //           <Plus className="h-4 w-4" />
// // // // //           <span>הערה חדשה</span>
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Create New Note */}
// // // // //       {isCreating && (
// // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // //           <div className="flex justify-between items-center mb-4">
// // // // //             <h3 className="text-lg font-semibold text-gray-900">הערה חדשה</h3>
// // // // //             <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
// // // // //               <X className="h-5 w-5" />
// // // // //             </button>
// // // // //           </div>
// // // // //           <div className="space-y-4">
// // // // //             <input
// // // // //               type="text"
// // // // //               placeholder="כותרת ההערה"
// // // // //               value={newNote.title}
// // // // //               onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
// // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // //             />
// // // // //             <textarea
// // // // //               placeholder="תוכן ההערה"
// // // // //               rows={4}
// // // // //               value={newNote.content}
// // // // //               onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
// // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // //             />
// // // // //             <div className="flex space-x-2 space-x-reverse">
// // // // //               <button
// // // // //                 onClick={createNote}
// // // // //                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // // //               >
// // // // //                 <Save className="h-4 w-4" />
// // // // //                 <span>שמור</span>
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={() => setIsCreating(false)}
// // // // //                 className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
// // // // //               >
// // // // //                 ביטול
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Notes List */}
// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //         {notes.map((note) => (
// // // // //           <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // //             {editingNote?.id === note.id ? (
// // // // //               <div className="space-y-4">
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   value={editingNote.title}
// // // // //                   onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
// // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // //                 />
// // // // //                 <textarea
// // // // //                   rows={4}
// // // // //                   value={editingNote.content}
// // // // //                   onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
// // // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // // //                 />
// // // // //                 <div className="flex space-x-2 space-x-reverse">
// // // // //                   <button
// // // // //                     onClick={updateNote}
// // // // //                     className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // // //                   >
// // // // //                     <Save className="h-3 w-3" />
// // // // //                     <span>שמור</span>
// // // // //                   </button>
// // // // //                   <button
// // // // //                     onClick={() => setEditingNote(null)}
// // // // //                     className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
// // // // //                   >
// // // // //                     ביטול
// // // // //                   </button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <div className="flex items-start justify-between mb-3">
// // // // //                   <div className="flex items-center space-x-2 space-x-reverse">
// // // // //                     <FileText className="h-5 w-5 text-blue-600" />
// // // // //                     <h3 className="font-semibold text-gray-900">{note.title}</h3>
// // // // //                   </div>
// // // // //                   <div className="flex space-x-1 space-x-reverse">
// // // // //                     <button
// // // // //                       onClick={() => setEditingNote(note)}
// // // // //                       className="text-gray-400 hover:text-blue-600 transition-colors"
// // // // //                     >
// // // // //                       <Edit className="h-4 w-4" />
// // // // //                     </button>
// // // // //                     <button
// // // // //                       onClick={() => deleteNote(note.id)}
// // // // //                       className="text-gray-400 hover:text-red-600 transition-colors"
// // // // //                     >
// // // // //                       <Trash2 className="h-4 w-4" />
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <p className="text-gray-600 text-sm mb-4 line-clamp-4">{note.content}</p>
// // // // //                 <div className="text-xs text-gray-500">
// // // // //                   <p>נוצר: {formatDate(note.createdAt)}</p>
// // // // //                   {note.updatedAt.getTime() !== note.createdAt.getTime() && <p>עודכן: {formatDate(note.updatedAt)}</p>}
// // // // //                 </div>
// // // // //               </>
// // // // //             )}
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       {notes.length === 0 && !isCreating && (
// // // // //         <div className="text-center py-12">
// // // // //           <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // // // //           <h3 className="text-lg font-medium text-gray-900 mb-2">אין הערות עדיין</h3>
// // // // //           <p className="text-gray-600 mb-4">התחל לכתוב הערות ורשימות כדי לארגן את הלמידה שלך</p>
// // // // //           <button
// // // // //             onClick={() => setIsCreating(true)}
// // // // //             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
// // // // //           >
// // // // //             <Plus className="h-4 w-4 ml-1" />
// // // // //             צור הערה ראשונה
// // // // //           </button>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Notes;
// // // // import type React from "react";
// // // // import { useState, useEffect } from "react";
// // // // import { FileText, Plus, Edit, Trash2, Save, X } from "lucide-react";
// // // // import { notesApi } from '../services/api'; // עדכן את הנתיב הנכון
// // // // import { useAuth } from "../contexts/AuthContext";

// // // // interface Note {
// // // //   id: number;
// // // //   userId: number;
// // // //   title: string;
// // // //   content: string;
// // // //   createdAt: Date;
// // // //   updatedAt: Date;
// // // // }

// // // // const Notes: React.FC = () => {
// // // //   const { user } = useAuth();
// // // //   if (!user) return null;

// // // //   const [notes, setNotes] = useState<Note[]>([]);
// // // //   const [isCreating, setIsCreating] = useState(false);
// // // //   const [editingNote, setEditingNote] = useState<Note | null>(null);
// // // //   const [newNote, setNewNote] = useState({ title: "", content: "" });

// // // //   useEffect(() => {
// // // //     if (user) {
// // // //       loadNotes();
// // // //     }
// // // //   }, [user]);

// // // //   const loadNotes = async () => {
// // // //     try {
// // // //       const fetchedNotes = await notesApi.getNotes(user.userId);
// // // //       const notesWithDates = fetchedNotes.map((note: { createdAt: string | number | Date; updatedAt: string | number | Date; }) => ({
// // // //         ...note,
// // // //         createdAt: new Date(note.createdAt),
// // // //         updatedAt: new Date(note.updatedAt),
// // // //       }));

// // // //       const validNotes = notesWithDates.filter((note: { title: any; content: any; }) => note && note.title && note.content);
// // // //       setNotes(validNotes);
// // // //     } catch (error) {
// // // //       console.error("Error loading notes:", error);
// // // //     }
// // // //   };

// // // //   const createNote = async () => {
// // // //     if (!newNote.title.trim() || !newNote.content.trim()) return;

// // // //     const note: any = {
// // // //       userId: user.userId,
// // // //       title: newNote.title,
// // // //       content: newNote.content,
// // // //       createdAt: new Date(),
// // // //       updatedAt: new Date(),
// // // //     };

// // // //     try {
// // // //       const createdNote = await notesApi.createNote(note);
// // // //       setNotes((prevNotes) => [createdNote, ...prevNotes]);
// // // //       setNewNote({ title: "", content: "" });
// // // //       setIsCreating(false);
// // // //     } catch (error) {
// // // //       console.error("Error creating note:", error);
// // // //     }
// // // //   };

// // // //   const updateNote = async () => {
// // // //     if (!editingNote || !editingNote.title || !editingNote.content) return;

// // // //     try {
// // // //       await notesApi.updateNote(editingNote.id, editingNote);
// // // //       setNotes((prevNotes) =>
// // // //         prevNotes.map((note) =>
// // // //           note.id === editingNote.id ? { ...editingNote, updatedAt: new Date() } : note
// // // //         )
// // // //       );
// // // //       setEditingNote(null);
// // // //     } catch (error) {
// // // //       console.error("Error updating note:", error);
// // // //     }
// // // //   };

// // // //   const deleteNote = async (id: number) => {
// // // //     try {
// // // //       await notesApi.deleteNote(id);
// // // //       setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
// // // //     } catch (error) {
// // // //       console.error("Error deleting note:", error);
// // // //     }
// // // //   };

// // // //   const formatDate = (date: Date) => {
// // // //     if (!(date instanceof Date) || isNaN(date.getTime())) {
// // // //       return "";
// // // //     }
// // // //     return date.toLocaleDateString("he-IL", {
// // // //       year: "numeric",
// // // //       month: "short",
// // // //       day: "numeric",
// // // //       hour: "2-digit",
// // // //       minute: "2-digit",
// // // //     });
// // // //   };

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <div className="flex justify-between items-center">
// // // //         <div>
// // // //           <h1 className="text-3xl font-bold text-gray-900">המחברת שלי</h1>
// // // //           <p className="mt-2 text-gray-600">נהל את ההערות והרשימות האישיות שלך</p>
// // // //         </div>
// // // //         <button
// // // //           onClick={() => setIsCreating(true)}
// // // //           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
// // // //         >
// // // //           <Plus className="h-4 w-4" />
// // // //           <span>הערה חדשה</span>
// // // //         </button>
// // // //       </div>

// // // //       {/* Create New Note */}
// // // //       {isCreating && (
// // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // //           <div className="flex justify-between items-center mb-4">
// // // //             <h3 className="text-lg font-semibold text-gray-900">הערה חדשה</h3>
// // // //             <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
// // // //               <X className="h-5 w-5" />
// // // //             </button>
// // // //           </div>
// // // //           <div className="space-y-4">
// // // //             <input
// // // //               type="text"
// // // //               placeholder="כותרת ההערה"
// // // //               value={newNote.title}
// // // //               onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
// // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // //             />
// // // //             <textarea
// // // //               placeholder="תוכן ההערה"
// // // //               rows={4}
// // // //               value={newNote.content}
// // // //               onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
// // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // //             />
// // // //             <div className="flex space-x-2 space-x-reverse">
// // // //               <button
// // // //                 onClick={createNote}
// // // //                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // //               >
// // // //                 <Save className="h-4 w-4" />
// // // //                 <span>שמור</span>
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => setIsCreating(false)}
// // // //                 className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
// // // //               >
// // // //                 ביטול
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Notes List */}
// // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //         {notes.map((note) => (
// // // //           <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // //             {editingNote?.id === note.id ? (
// // // //               <div className="space-y-4">
// // // //                 <input
// // // //                   type="text"
// // // //                   value={editingNote.title}
// // // //                   onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
// // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // //                 />
// // // //                 <textarea
// // // //                   rows={4}
// // // //                   value={editingNote.content}
// // // //                   onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
// // // //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
// // // //                 />
// // // //                 <div className="flex space-x-2 space-x-reverse">
// // // //                   <button
// // // //                     onClick={updateNote}
// // // //                     className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
// // // //                   >
// // // //                     <Save className="h-3 w-3" />
// // // //                     <span>שמור</span>
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={() => setEditingNote(null)}
// // // //                     className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
// // // //                   >
// // // //                     ביטול
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               <>
// // // //                 <div className="flex items-start justify-between mb-3">
// // // //                   <div className="flex items-center space-x-2 space-x-reverse">
// // // //                     <FileText className="h-5 w-5 text-blue-600" />
// // // //                     <h3 className="font-semibold text-gray-900">{note.title}</h3>
// // // //                   </div>
// // // //                   <div className="flex space-x-1 space-x-reverse">
// // // //                     <button
// // // //                       onClick={() => setEditingNote(note)}
// // // //                       className="text-gray-400 hover:text-blue-600 transition-colors"
// // // //                     >
// // // //                       <Edit className="h-4 w-4" />
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => deleteNote(note.id)}
// // // //                       className="text-gray-400 hover:text-red-600 transition-colors"
// // // //                     >
// // // //                       <Trash2 className="h-4 w-4" />
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //                 <p className="text-gray-600 text-sm mb-4 line-clamp-4">{note.content}</p>
// // // //                 <div className="text-xs text-gray-500">
// // // //                   <p>נוצר: {formatDate(note.createdAt)}</p>
// // // //                   {note.updatedAt.getTime() !== note.createdAt.getTime() && <p>עודכן: {formatDate(note.updatedAt)}</p>}
// // // //                 </div>
// // // //               </>
// // // //             )}
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {notes.length === 0 && !isCreating && (
// // // //         <div className="text-center py-12">
// // // //           <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // // //           <h3 className="text-lg font-medium text-gray-900 mb-2">אין הערות עדיין</h3>
// // // //           <p className="text-gray-600 mb-4">התחל לכתוב הערות ורשימות כדי לארגן את הלמידה שלך</p>
// // // //           <button
// // // //             onClick={() => setIsCreating(true)}
// // // //             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
// // // //           >
// // // //             <Plus className="h-4 w-4 ml-1" />
// // // //             צור הערה ראשונה
// // // //           </button>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Notes;
import type React from "react";
import { useState, useEffect } from "react";
import { FileText, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { notesApi } from '../services/api'; // עדכן את הנתיב הנכון
import { useAuth } from "../contexts/AuthContext";

interface Note {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const Notes: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  const loadNotes = async () => {
    try {
      const fetchedNotes = await notesApi.getNotes(user.userId);
      const notesWithDates = fetchedNotes.map((note: { createdAt: string | number | Date; updatedAt: string | number | Date; }) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));

      // סנן אובייקטים null
      const validNotes = notesWithDates.filter((note: Note | null) => note !== null && note.title && note.content);
      setNotes(validNotes);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const createNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: any = {
      userId: user.userId,
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const createdNote = await notesApi.createNote(note);
      setNotes((prevNotes) => [createdNote, ...prevNotes]);
      setNewNote({ title: "", content: "" });
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const updateNote = async () => {
    if (!editingNote || !editingNote.title || !editingNote.content) return; // ודא שהערה לא null

    try {
      await notesApi.updateNote(editingNote.id, editingNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNote.id ? { ...editingNote, updatedAt: new Date() } : note
        )
      );
      setEditingNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await notesApi.deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const formatDate = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">המחברת שלי</h1>
          <p className="mt-2 text-gray-600">נהל את ההערות והרשימות האישיות שלך</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
        >
          <Plus className="h-4 w-4" />
          <span>הערה חדשה</span>
        </button>
      </div>

      {/* Create New Note */}
      {isCreating && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">הערה חדשה</h3>
            <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="כותרת ההערה"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              placeholder="תוכן ההערה"
              rows={4}
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={createNote}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
              >
                <Save className="h-4 w-4" />
                <span>שמור</span>
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {editingNote?.id === note.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) => editingNote && setEditingNote({ ...editingNote, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                  rows={4}
                  value={editingNote.content}
                  onChange={(e) => editingNote && setEditingNote({ ...editingNote, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={updateNote}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
                  >
                    <Save className="h-3 w-3" />
                    <span>שמור</span>
                  </button>
                  <button
                    onClick={() => setEditingNote(null)}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    ביטול
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{note.title}</h3>
                  </div>
                  <div className="flex space-x-1 space-x-reverse">
                    <button
                      onClick={() => setEditingNote(note)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-4">{note.content}</p>
                <div className="text-xs text-gray-500">
                  <p>נוצר: {formatDate(note.createdAt)}</p>
                  {note.updatedAt.getTime() !== note.createdAt.getTime() && <p>עודכן: {formatDate(note.updatedAt)}</p>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {notes.length === 0 && !isCreating && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">אין הערות עדיין</h3>
          <p className="text-gray-600 mb-4">התחל לכתוב הערות ורשימות כדי לארגן את הלמידה שלך</p>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 ml-1" />
            צור הערה ראשונה
          </button>
        </div>
      )}
    </div>
  );
};

export default Notes;
// // import React, { useState, useEffect } from "react";
// // import { useAuth } from "../contexts/AuthContext";
// // // import { Note } from "../types";
// // // import notesApi from "../api/notesApi";
// // import { notesApi } from '../services/api'; // עדכן את הנתיב הנכון

// // interface Note {
// //   id: number;
// //   userId: number;
// //   title: string;
// //   content: string;
// //   createdAt: Date;
// //   updatedAt: Date;
// // }
// // const Notes: React.FC = () => {
// //   const { user } = useAuth();
// //   const [notes, setNotes] = useState<Note[]>([]);
// //   const [isCreating, setIsCreating] = useState(false);
// //   const [newNote, setNewNote] = useState({ title: "", content: "" });

// //   useEffect(() => {
// //     if (user) {
// //       loadNotes();
// //     }
// //   }, [user]);

// //   const loadNotes = async () => {
// //     try {
// //       const fetchedNotes = await notesApi.getNotes(user.userId);

// //       // סינון ראשוני לפני map
// //       const cleanedNotes = fetchedNotes.filter((note: any) =>
// //         note &&
// //         note.createdAt &&
// //         note.updatedAt &&
// //         note.title &&
// //         note.content
// //       );

// //       const notesWithDates = cleanedNotes.map((note: any) => ({
// //         ...note,
// //         createdAt: new Date(note.createdAt),
// //         updatedAt: new Date(note.updatedAt),
// //       }));

// //       setNotes(notesWithDates);
// //     } catch (error) {
// //       console.error("Error loading notes:", error);
// //     }
// //   };

// //   const createNote = async () => {
// //     if (!newNote.title.trim() || !newNote.content.trim()) return;

// //     const note: Partial<Note> = {
// //       userId: user.userId,
// //       title: newNote.title,
// //       content: newNote.content,
// //       createdAt: new Date(),
// //       updatedAt: new Date(),
// //     };

// //     try {
// //       await notesApi.createNote(note);
// //       await loadNotes();
// //       setNewNote({ title: "", content: "" });
// //       setIsCreating(false);
// //     } catch (error) {
// //       console.error("Error creating note:", error);
// //     }
// //   };

// //   return (
// //     <div className="p-4">
// //       <h2 className="text-2xl font-bold mb-4">Notes</h2>

// //       <button
// //         onClick={() => setIsCreating(!isCreating)}
// //         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
// //       >
// //         {isCreating ? "Cancel" : "Add Note"}
// //       </button>

// //       {isCreating && (
// //         <div className="mb-4">
// //           <input
// //             type="text"
// //             placeholder="Title"
// //             value={newNote.title}
// //             onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
// //             className="block border p-2 mb-2 w-full"
// //           />
// //           <textarea
// //             placeholder="Content"
// //             value={newNote.content}
// //             onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
// //             className="block border p-2 mb-2 w-full"
// //           />
// //           <button
// //             onClick={createNote}
// //             className="bg-green-500 text-white px-4 py-2 rounded"
// //           >
// //             Save Note
// //           </button>
// //         </div>
// //       )}

// //       {notes.length === 0 ? (
// //         <p>No notes found.</p>
// //       ) : (
// //         <ul>
// //           {notes.map((note) => (
// //             <li key={note.id} className="border p-4 mb-2 rounded">
// //               <h3 className="font-bold">{note.title}</h3>
// //               <p>{note.content}</p>
// //               <small className="text-gray-500">
// //                 Created: {note.createdAt.toLocaleString()} <br />
// //                 Updated: {note.updatedAt.toLocaleString()}
// //               </small>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default Notes;
// import { useEffect, useState } from "react";
// // import { Note } from "../types";
// import { notesApi } from '../services/api';
// import { useAuth } from "../contexts/AuthContext";
// interface Note {
//   id: number;
//   userId: number;
//   title: string;
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
// const Notes = () => {
//   const { user } = useAuth();
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [text, setText] = useState("");

//   // אם אין משתמש מחובר, לא מציגים כלום (או אפשר גם טקסט אחר)
//   if (!user) return <p>אנא התחבר כדי לצפות בפתקים</p>;

//   const loadNotes = async () => {
//     try {
//       const fetchedNotes = await notesApi.getNotes(user.userId);
//       setNotes(fetchedNotes);
//     } catch (err) {
//       console.error("שגיאה בטעינת פתקים:", err);
//     }
//   };

//   const createNote = async () => {
//     if (!text.trim()) return;
//     const note: Partial<Note> = {
//       userId: user.userId,
//       createdAt: new Date(),
//     };
//     try {
//       await notesApi.createNote(note);
//       setText("");
//       await loadNotes();
//     } catch (err) {
//       console.error("שגיאה ביצירת פתק:", err);
//     }
//   };

//   const deleteNote = async (noteId: number) => {
//     try {
//       await notesApi.deleteNote(noteId);
//       await loadNotes();
//     } catch (err) {
//       console.error("שגיאה במחיקת פתק:", err);
//     }
//   };

//   useEffect(() => {
//     loadNotes();
//   }, [user]);

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">הפתקים שלי</h1>
//       <div className="mb-4">
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//           placeholder="כתוב פתק חדש..."
//         />
//         <button
//           onClick={createNote}
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           שמור פתק
//         </button>
//       </div>
//       <ul className="space-y-2">
//         {notes.map((note) => (
//           <li
//             key={note.id}
//             className="p-3 bg-gray-100 border border-gray-300 rounded flex justify-between items-center"
//           >
//             <span>{note.content}</span>
//             <button
//               onClick={() => deleteNote(note.id!)}
//               className="text-red-500 hover:underline"
//             >
//               מחק
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notes;
