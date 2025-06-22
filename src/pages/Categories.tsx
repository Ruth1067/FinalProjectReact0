// // // "use client"

// // // import type React from "react"
// // // import { useState, useEffect } from "react"
// // // import { Link } from "react-router-dom"
// // // import { folderApi } from "../services/api"
// // // import { BookOpen, Users, Clock } from "lucide-react"

// // // interface Category {
// // //   categoryId: number
// // //   categoryName: string
// // //   // courseCount: number
// // // }

// // // const Categories: React.FC = () => {
// // //   const [categories, setCategories] = useState<Category[]>([])
// // //   const [loading, setLoading] = useState(true)

// // //   useEffect(() => {
// // //     loadCategories()
// // //   }, [])

// // //   const loadCategories = async () => {
// // //     try {
      
// // //       const folders = await folderApi.getAllFolders()
// // //       const categoryMap = new Map<number, Category>()

// // //       folders.forEach((folder: any) => {
// // //         // console.log(folder)
// // //         const id = folder.categoryId
// // //         if (id !== null && id !== undefined) {
// // //           if (!categoryMap.has(id)) {
// // //             categoryMap.set(id, {
// // //               categoryId: id,
// // //               categoryName: `קטגוריה ${folder.title}`,
// // //               // courseCount: 0,
// // //             })
// // //           }
       
// // //           // categoryMap.get(id)!.courseCount++
         
// // //         }
// // //       })

// // //       setCategories(Array.from(categoryMap.values()))
// // //     } catch (error) {
// // //       console.error("Error loading categories:", error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-64">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="space-y-8">
// // //       <div>
// // //         <h1 className="text-3xl font-bold text-gray-900">קטגוריות קורסים</h1>
// // //         <p className="mt-2 text-gray-600">בחר קטגוריה כדי לעיין בקורסים הזמינים</p>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {categories.map((category) => (
// // //           <Link
// // //             key={category.categoryId}
// // //             to={`/courses/${category.categoryId}`}
// // //             className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 hover:border-blue-300"
// // //           >
// // //             <div className="flex items-center space-x-3 space-x-reverse mb-4">
// // //               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
// // //                 <BookOpen className="h-6 w-6 text-blue-600" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-900">{category.categoryName}</h3>
// // //                 {/* <p className="text-sm text-gray-600">{category.courseCount} קורסים זמינים</p> */}
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center justify-between text-sm text-gray-500">
// // //               <div className="flex items-center space-x-1 space-x-reverse">
// // //                 <Users className="h-4 w-4" />
// // //                 <span>מגוון מורים</span>
// // //               </div>
// // //               <div className="flex items-center space-x-1 space-x-reverse">
// // //                 <Clock className="h-4 w-4" />
// // //                 <span>שיעורים מוקלטים</span>
// // //               </div>
// // //             </div>
// // //           </Link>
// // //         ))}
// // //       </div>

// // //       {categories.length === 0 && (
// // //         <div className="text-center py-12">
// // //           <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// // //           <h3 className="text-lg font-medium text-gray-900 mb-2">אין קטגוריות זמינות</h3>
// // //           <p className="text-gray-600">בקרוב יתווספו קטגוריות חדשות</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // export default Categories
// // "use client"

// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { Link } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { BookOpen, Users, Clock, Sparkles } from "lucide-react"

// // interface Category {
// //   categoryId: number
// //   categoryName: string
// // }

// // const Categories: React.FC = () => {
// //   const [categories, setCategories] = useState<Category[]>([])
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     loadCategories()
// //   }, [])

// //   const loadCategories = async () => {
// //     try {
// //       const folders = await folderApi.getAllFolders()
// //       const categoryMap = new Map<number, Category>()

// //       folders.forEach((folder: any) => {
// //         const id = folder.categoryId
// //         if (id !== null && id !== undefined) {
// //           if (!categoryMap.has(id)) {
// //             categoryMap.set(id, {
// //               categoryId: id,
// //               categoryName: `קטגוריה ${folder.title}`,
// //             })
// //           }
// //         }
// //       })

// //       setCategories(Array.from(categoryMap.values()))
// //     } catch (error) {
// //       console.error("Error loading categories:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="relative">
// //           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
// //           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-8">
// //       <div className="text-center">
// //         <div className="flex items-center justify-center space-x-3 space-x-reverse mb-6">
// //           {/* <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
// //             <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
// //           </div> */}
// //           <Sparkles className="h-8 w-8 text-blue-500" />
// //         </div>
// //         <h1 className="text-4xl font-bold text-gray-900 mb-4">קטגוריות קורסים</h1>
// //         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
// //           בחר קטגוריה כדי לעיין בקורסים הזמינים ולהתחיל את המסע הלימודי שלך
// //         </p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //         {categories.map((category, index) => (
// //           <Link
// //             key={category.categoryId}
// //             to={`/courses/${category.categoryId}`}
// //             className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-blue-100 hover:border-blue-300 overflow-hidden transform hover:scale-105"
// //           >
// //             {/* Background gradient overlay */}
// //             <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

// //             <div className="relative z-10">
// //               <div className="flex items-center space-x-4 space-x-reverse mb-6">
// //                 <div
// //                   className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 ${
// //                     index % 3 === 0
// //                       ? "bg-gradient-to-br from-blue-500 to-blue-600"
// //                       : index % 3 === 1
// //                         ? "bg-gradient-to-br from-purple-500 to-purple-600"
// //                         : "bg-gradient-to-br from-green-500 to-green-600"
// //                   }`}
// //                 >
// //                   <BookOpen className="h-8 w-8 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
// //                     {category.categoryName}
// //                   </h3>
// //                   <p className="text-sm text-gray-500">לחץ לצפייה בקורסים</p>
// //                 </div>
// //               </div>

// //               <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
// //                 <div className="flex items-center space-x-2 space-x-reverse">
// //                   <Users className="h-4 w-4" />
// //                   <span>מגוון מורים</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2 space-x-reverse">
// //                   <Clock className="h-4 w-4" />
// //                   <span>שיעורים מוקלטים</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>

// //       {categories.length === 0 && (
// //         <div className="text-center py-16">
// //           <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
// //             <BookOpen className="h-12 w-12 text-gray-400" />
// //           </div>
// //           <h3 className="text-2xl font-semibold text-gray-900 mb-4">אין קטגוריות זמינות</h3>
// //           <p className="text-gray-600 max-w-md mx-auto">בקרוב יתווספו קטגוריות חדשות עם תוכן לימודי מעולה</p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Categories
// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { folderApi } from "../services/api"
// import { BookOpen, Users, Clock, Sparkles, ArrowRight, TrendingUp, Award, Zap } from "lucide-react"

// interface Category {
//   categoryId: number
//   categoryName: string
// }

// const Categories: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([])
//   const [loading, setLoading] = useState(true)
//   const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

//   useEffect(() => {
//     loadCategories()
//   }, [])

//   const loadCategories = async () => {
//     try {
//       const folders = await folderApi.getAllFolders()
//       const categoryMap = new Map<number, Category>()

//       folders.forEach((folder: any) => {
//         const id = folder.categoryId
//         if (id !== null && id !== undefined) {
//           if (!categoryMap.has(id)) {
//             categoryMap.set(id, {
//               categoryId: id,
//               categoryName: folder.title,
//             })
//           }
//         }
//       })

//       setCategories(Array.from(categoryMap.values()))
//     } catch (error) {
//       console.error("Error loading categories:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const categoryIcons = [BookOpen, Users, TrendingUp, Award, Zap, Clock]
//   const categoryColors = [
//     "from-blue-500 to-cyan-500",
//     "from-purple-500 to-pink-500",
//     "from-green-500 to-emerald-500",
//     "from-orange-500 to-red-500",
//     "from-indigo-500 to-purple-500",
//     "from-teal-500 to-blue-500",
//   ]

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
//         {/* Background Elements */}
//         <div className="absolute inset-0">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//           <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//           <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//         </div>

//         <div className="relative z-10 flex justify-center items-center min-h-screen">
//           <div className="text-center">
//             <div className="relative mb-8">
//               <div className="animate-spin rounded-full h-24 w-24 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
//               <div className="animate-spin rounded-full h-24 w-24 border-4 border-white border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
//             </div>
//             <div className="space-y-4">
//               <div className="flex justify-center space-x-1">
//                 <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
//                 <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
//                 <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
//               </div>
//               <p className="text-xl font-semibold text-gray-700 animate-pulse">טוען קטגוריות...</p>
//               <p className="text-gray-500">מכין עבורך את החוויה הטובה ביותר</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-12">
//         {/* Header Section */}
//         <div className="text-center mb-16 animate-fade-in-up">
//           <div className="flex items-center justify-center space-x-3 space-x-reverse mb-6">
//             <div className="relative">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
//                 <Sparkles className="h-8 w-8 text-white animate-pulse" />
//               </div>
//               <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce"></div>
//             </div>
//           </div>

//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent animate-gradient-x">
//             קטגוריות קורסים
//           </h1>

//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
//             גלה את עולם הידע הרחב שלנו - מקטגוריות מגוונות עם תוכן איכותי ומקצועי
//             <br />
//             <span className="text-blue-600 font-semibold">בחר קטגוריה והתחל את המסע הלימודי שלך עוד היום</span>
//           </p>

//           {/* Stats Section */}
//           <div className="flex justify-center space-x-8 space-x-reverse mb-12">
//             <div className="text-center group">
//               <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
//                 {categories.length}+
//               </div>
//               <div className="text-gray-500 text-sm">קטגוריות</div>
//             </div>
//             <div className="text-center group">
//               <div className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
//                 100+
//               </div>
//               <div className="text-gray-500 text-sm">קורסים</div>
//             </div>
//             <div className="text-center group">
//               <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">
//                 1000+
//               </div>
//               <div className="text-gray-500 text-sm">שיעורים</div>
//             </div>
//           </div>
//         </div>

//         {/* Categories Grid */}
//         {categories.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//             {categories.map((category, index) => {
//               const IconComponent = categoryIcons[index % categoryIcons.length]
//               const colorClass = categoryColors[index % categoryColors.length]

//               return (
//                 <Link
//                   key={category.categoryId}
//                   to={`/courses/${category.categoryId}`}
//                   className="group relative"
//                   onMouseEnter={() => setHoveredCategory(category.categoryId)}
//                   onMouseLeave={() => setHoveredCategory(null)}
//                   style={{
//                     animationDelay: `${index * 150}ms`,
//                   }}
//                 >
//                   <div className="animate-fade-in-up">
//                     {/* Card */}
//                     <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden group-hover:scale-105 group-hover:-translate-y-2">
//                       {/* Background Gradient Overlay */}
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
//                       ></div>

//                       {/* Floating Elements */}
//                       <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
//                         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 animate-pulse"></div>
//                       </div>

//                       <div className="relative z-10">
//                         {/* Icon */}
//                         <div className="flex items-center justify-between mb-6">
//                           <div
//                             className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}
//                           >
//                             <IconComponent className="h-8 w-8 text-white" />
//                           </div>

//                           <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
//                             <ArrowRight className="h-6 w-6 text-gray-400" />
//                           </div>
//                         </div>

//                         {/* Content */}
//                         <div className="space-y-4">
//                           <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
//                             {category.categoryName}
//                           </h3>

//                           <p className="text-gray-600 leading-relaxed">
//                             חקור קורסים מקצועיים ואיכותיים בתחום זה עם מורים מומחים ותוכן מעודכן
//                           </p>

//                           {/* Features */}
//                           <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
//                             <div className="flex items-center space-x-2 space-x-reverse">
//                               <Users className="h-4 w-4" />
//                               <span>מורים מקצועיים</span>
//                             </div>
//                             <div className="flex items-center space-x-2 space-x-reverse">
//                               <Clock className="h-4 w-4" />
//                               <span>תוכן מעודכן</span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Hover Effect Indicator */}
//                         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//                       </div>

//                       {/* Animated Border */}
//                       <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
//                     </div>
//                   </div>
//                 </Link>
//               )
//             })}
//           </div>
//         ) : (
//           /* Empty State */
//           <div className="text-center py-20 animate-fade-in-up">
//             <div className="relative mb-8">
//               <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
//                 <BookOpen className="h-16 w-16 text-gray-400" />
//               </div>
//               <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"></div>
//             </div>

//             <h3 className="text-3xl font-bold text-gray-900 mb-4">בקרוב - קטגוריות חדשות!</h3>
//             <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
//               אנחנו עובדים קשה להביא לכם תוכן לימודי מעולה בקטגוריות מגוונות
//             </p>

//             <div className="flex justify-center space-x-4 space-x-reverse">
//               <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
//               <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
//               <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
//             </div>
//           </div>
//         )}

//         {/* Bottom CTA Section */}
//         <div className="text-center animate-fade-in-up animation-delay-600">
//           <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">מוכן להתחיל ללמוד?</h2>
//             <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//               הצטרף לאלפי תלמידים שכבר מתקדמים במסע הלימודי שלהם עם המורים הטובים ביותר
//             </p>
//             <div className="flex justify-center space-x-4 space-x-reverse">
//               <Link
//                 to="/register"
//                 className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//               >
//                 הרשמה חינם
//               </Link>
//               <Link
//                 to="/login"
//                 className="px-8 py-4 bg-white/80 text-gray-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200"
//               >
//                 התחברות
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Categories
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { folderApi } from "../services/api"
import { BookOpen, Users, Clock, Sparkles, ArrowRight, TrendingUp, Award, Zap } from "lucide-react"

interface Category {
  categoryId: number
  categoryName: string
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const folders = await folderApi.getAllFolders()
      const categoryMap = new Map<number, Category>()

      folders.forEach((folder: any) => {
        const id = folder.categoryId
        if (id !== null && id !== undefined) {
          if (!categoryMap.has(id)) {
            categoryMap.set(id, {
              categoryId: id,
              categoryName: folder.title,
            })
          }
        }
      })

      setCategories(Array.from(categoryMap.values()))
    } catch (error) {
      console.error("Error loading categories:", error)
    } finally {
      setLoading(false)
    }
  }

  const categoryIcons = [BookOpen, Users, TrendingUp, Award, Zap, Clock]
  const categoryColors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-teal-500 to-blue-500",
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-24 w-24 border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
              <div className="animate-spin rounded-full h-24 w-24 border-4 border-white border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
              </div>
              <p className="text-xl font-semibold text-gray-700 animate-pulse">טוען קטגוריות...</p>
              <p className="text-gray-500">מכין עבורך את החוויה הטובה ביותר</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-3 space-x-reverse mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <Sparkles className="h-8 w-8 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent animate-gradient-x">
            קטגוריות קורסים
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            גלה את עולם הידע הרחב שלנו - מקטגוריות מגוונות עם תוכן איכותי ומקצועי
            <br />
            <span className="text-blue-600 font-semibold">בחר קטגוריה והתחל את המסע הלימודי שלך עוד היום</span>
          </p>

          {/* Stats Section */}
          <div className="flex justify-center space-x-8 space-x-reverse mb-12">
            <div className="text-center group">
              <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                {categories.length}+
              </div>
              <div className="text-gray-500 text-sm">קטגוריות</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
                100+
              </div>
              <div className="text-gray-500 text-sm">קורסים</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <div className="text-gray-500 text-sm">שיעורים</div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => {
              const IconComponent = categoryIcons[index % categoryIcons.length]
              const colorClass = categoryColors[index % categoryColors.length]

              return (
                <Link
                  key={category.categoryId}
                  to={`/courses/${category.categoryId}`}
                  className="group relative"
                  onMouseEnter={() => setHoveredCategory(category.categoryId)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="animate-fade-in-up">
                    {/* Card */}
                    <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden group-hover:scale-105 group-hover:-translate-y-2">
                      {/* Background Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      ></div>

                      {/* Floating Elements */}
                      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 animate-pulse"></div>
                      </div>

                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="flex items-center justify-between mb-6">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}
                          >
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>

                          <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                            <ArrowRight className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {category.categoryName}
                          </h3>

                          <p className="text-gray-600 leading-relaxed">
                            חקור קורסים מקצועיים ואיכותיים בתחום זה עם מורים מומחים ותוכן מעודכן
                          </p>

                          {/* Features */}
                          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Users className="h-4 w-4" />
                              <span>מורים מקצועיים</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Clock className="h-4 w-4" />
                              <span>תוכן מעודכן</span>
                            </div>
                          </div>
                        </div>

                        {/* Hover Effect Indicator */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>

                      {/* Animated Border */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 animate-fade-in-up">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <BookOpen className="h-16 w-16 text-gray-400" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"></div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">בקרוב - קטגוריות חדשות!</h3>
            <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
              אנחנו עובדים קשה להביא לכם תוכן לימודי מעולה בקטגוריות מגוונות
            </p>

            <div className="flex justify-center space-x-4 space-x-reverse">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
            </div>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="text-center animate-fade-in-up animation-delay-600">
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">מוכן להתחיל ללמוד?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              הצטרף לאלפי תלמידים שכבר מתקדמים במסע הלימודי שלהם עם המורים הטובים ביותר
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                הרשמה חינם
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white/80 text-gray-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200"
              >
                התחברות
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
