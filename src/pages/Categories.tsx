// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { folderApi } from "../services/api"
// import { BookOpen, Users, Clock } from "lucide-react"

// interface Category {
//   categoryId: number
//   categoryName: string
//   // courseCount: number
// }

// const Categories: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     loadCategories()
//   }, [])

//   const loadCategories = async () => {
//     try {
      
//       const folders = await folderApi.getAllFolders()
//       const categoryMap = new Map<number, Category>()

//       folders.forEach((folder: any) => {
//         // console.log(folder)
//         const id = folder.categoryId
//         if (id !== null && id !== undefined) {
//           if (!categoryMap.has(id)) {
//             categoryMap.set(id, {
//               categoryId: id,
//               categoryName: `קטגוריה ${folder.title}`,
//               // courseCount: 0,
//             })
//           }
       
//           // categoryMap.get(id)!.courseCount++
         
//         }
//       })

//       setCategories(Array.from(categoryMap.values()))
//     } catch (error) {
//       console.error("Error loading categories:", error)
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
//         <h1 className="text-3xl font-bold text-gray-900">קטגוריות קורסים</h1>
//         <p className="mt-2 text-gray-600">בחר קטגוריה כדי לעיין בקורסים הזמינים</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map((category) => (
//           <Link
//             key={category.categoryId}
//             to={`/courses/${category.categoryId}`}
//             className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 hover:border-blue-300"
//           >
//             <div className="flex items-center space-x-3 space-x-reverse mb-4">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <BookOpen className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">{category.categoryName}</h3>
//                 {/* <p className="text-sm text-gray-600">{category.courseCount} קורסים זמינים</p> */}
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-sm text-gray-500">
//               <div className="flex items-center space-x-1 space-x-reverse">
//                 <Users className="h-4 w-4" />
//                 <span>מגוון מורים</span>
//               </div>
//               <div className="flex items-center space-x-1 space-x-reverse">
//                 <Clock className="h-4 w-4" />
//                 <span>שיעורים מוקלטים</span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {categories.length === 0 && (
//         <div className="text-center py-12">
//           <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">אין קטגוריות זמינות</h3>
//           <p className="text-gray-600">בקרוב יתווספו קטגוריות חדשות</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Categories
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { folderApi } from "../services/api"
import { BookOpen, Users, Clock, Sparkles } from "lucide-react"

interface Category {
  categoryId: number
  categoryName: string
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

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
              categoryName: `קטגוריה ${folder.title}`,
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 space-x-reverse mb-6">
          {/* <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
            <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
          </div> */}
          <Sparkles className="h-8 w-8 text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">קטגוריות קורסים</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          בחר קטגוריה כדי לעיין בקורסים הזמינים ולהתחיל את המסע הלימודי שלך
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Link
            key={category.categoryId}
            to={`/courses/${category.categoryId}`}
            className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-blue-100 hover:border-blue-300 overflow-hidden transform hover:scale-105"
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 ${
                    index % 3 === 0
                      ? "bg-gradient-to-br from-blue-500 to-blue-600"
                      : index % 3 === 1
                        ? "bg-gradient-to-br from-purple-500 to-purple-600"
                        : "bg-gradient-to-br from-green-500 to-green-600"
                  }`}
                >
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.categoryName}
                  </h3>
                  <p className="text-sm text-gray-500">לחץ לצפייה בקורסים</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Users className="h-4 w-4" />
                  <span>מגוון מורים</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Clock className="h-4 w-4" />
                  <span>שיעורים מוקלטים</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">אין קטגוריות זמינות</h3>
          <p className="text-gray-600 max-w-md mx-auto">בקרוב יתווספו קטגוריות חדשות עם תוכן לימודי מעולה</p>
        </div>
      )}
    </div>
  )
}

export default Categories
