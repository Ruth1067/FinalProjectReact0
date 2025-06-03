// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { folderApi } from "../services/api"
// import { BookOpen, Users, Clock } from "lucide-react"

// interface Category {
//   categoryId: number
//   categoryName: string
//   courseCount: number
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
//       // Group by category
//       const categoryMap = new Map()
//       folders.forEach((folder: any) => {
//         if (!categoryMap.has(folder.categoryId)) {
//           categoryMap.set(folder.categoryId, {
//             categoryId: folder.categoryId,
//             categoryName: `קטגוריה ${folder.categoryId}`,
//             courseCount: 0,
//           })
//         }
//         categoryMap.get(folder.categoryId).courseCount++
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
//                 <p className="text-sm text-gray-600">{category.courseCount} קורסים זמינים</p>
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
import { BookOpen, Users, Clock } from "lucide-react"

interface Category {
  categoryId: number
  categoryName: string
  courseCount: number
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
              courseCount: 0,
            })
          }
       
          categoryMap.get(id)!.courseCount++
         
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">קטגוריות קורסים</h1>
        <p className="mt-2 text-gray-600">בחר קטגוריה כדי לעיין בקורסים הזמינים</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.categoryId}
            to={`/courses/${category.categoryId}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 hover:border-blue-300"
          >
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{category.categoryName}</h3>
                <p className="text-sm text-gray-600">{category.courseCount} קורסים זמינים</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Users className="h-4 w-4" />
                <span>מגוון מורים</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Clock className="h-4 w-4" />
                <span>שיעורים מוקלטים</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">אין קטגוריות זמינות</h3>
          <p className="text-gray-600">בקרוב יתווספו קטגוריות חדשות</p>
        </div>
      )}
    </div>
  )
}

export default Categories
