// "use client"

// import type React from "react"
// import type { ReactNode } from "react"
// import { Link, useLocation } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
// import { BookOpen, LogOut, Home, ShoppingCart, FileText, Plus, Menu, X } from "lucide-react"
// import { useState } from "react"

// interface LayoutProps {
//   children: ReactNode
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { user, logout } = useAuth()
//   const location = useLocation()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const isTeacher = user?.role === "Teacher"
//   const isStudent = user?.role === "Student"

//   const navigation = [
//     { name: "דף הבית", href: "/", icon: Home, show: true },
//     { name: "רכישת שיעורים", href: "/categories", icon: ShoppingCart, show: isStudent },
//     { name: "כל הקורסים", href: "/categories", icon: BookOpen, show: isTeacher },
//     { name: "הקורסים שלי", href: "/my-courses", icon: BookOpen, show: true },
//     { name: "המחברת שלי", href: "/notes", icon: FileText, show: isStudent },
//     { name: "הוספת קורס", href: "/add-course", icon: Plus, show: isTeacher },
//     { name: "הוספת שיעור", href: "/add-lesson", icon: Plus, show: isTeacher },
//   ]

//   const filteredNavigation = navigation.filter((item) => item.show)

//   return (
//     <div className="min-h-screen bg-gray-50" dir="rtl">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex items-center">
//               <BookOpen className="h-8 w-8 text-blue-600 ml-2" />
//               <span className="text-xl font-bold text-gray-900">LearnAhead</span>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex space-x-8 space-x-reverse">
//               {filteredNavigation.map((item) => {
//                 const Icon = item.icon
//                 return (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                       location.pathname === item.href
//                         ? "text-blue-600 bg-blue-50"
//                         : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                     }`}
//                   >
//                     <Icon className="h-4 w-4 ml-2" />
//                     {item.name}
//                   </Link>
//                 )
//               })}
//             </nav>

//             {/* User Menu */}
//             <div className="flex items-center space-x-4 space-x-reverse">
//               <div className="flex items-center space-x-2 space-x-reverse">
//                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
//                   {user?.userName?.charAt(0)?.toUpperCase() || "U"}
//                 </div>
//                 <div className="hidden sm:block">
//                   <p className="text-sm font-medium text-gray-900">{user?.userName}</p>
//                   <p className="text-xs text-gray-500">{user?.role}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={logout}
//                 className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
//                 title="התנתק"
//               >
//                 <LogOut className="h-5 w-5" />
//               </button>

//               {/* Mobile menu button */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden p-2 text-gray-400 hover:text-gray-600"
//               >
//                 {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t bg-white">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {filteredNavigation.map((item) => {
//                 const Icon = item.icon
//                 return (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
//                       location.pathname === item.href
//                         ? "text-blue-600 bg-blue-50"
//                         : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                     }`}
//                   >
//                     <Icon className="h-5 w-5 ml-2" />
//                     {item.name}
//                   </Link>
//                 )
//               })}
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
//     </div>
//   )
// }

// export default Layout
"use client"

import type React from "react"
import type { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { BookOpen, LogOut, Home, ShoppingCart, FileText, Plus, Menu, X } from "lucide-react"
import { useState } from "react"

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isTeacher = user?.role === "Teacher"
  const isStudent = user?.role === "Student"

  const navigation = [
    { name: "דף הבית", href: "/", icon: Home, show: true },
    { name: "רכישת שיעורים", href: "/categories", icon: ShoppingCart, show: isStudent },
    { name: "כל הקורסים", href: "/categories", icon: BookOpen, show: isTeacher },
    { name: "הקורסים שלי", href: "/my-courses", icon: BookOpen, show: true },
    { name: "המחברת שלי", href: "/notes", icon: FileText, show: isStudent },
    { name: "הוספת קורס", href: "/add-course", icon: Plus, show: isTeacher },
    { name: "הוספת שיעור", href: "/add-lesson", icon: Plus, show: isTeacher },
  ]

  const filteredNavigation = navigation.filter((item) => item.show)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 space-x-reverse">
              {/* <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
                <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
              </div> */}
              <span className="text-xl font-bold text-gray-900">LearnAhead</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2 space-x-reverse">
              {filteredNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? "text-white bg-blue-600 shadow-lg"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Icon className="h-4 w-4 ml-2" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {user?.userName?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.userName}</p>
                  <p className="text-xs text-blue-600 font-medium">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                title="התנתק"
              >
                <LogOut className="h-5 w-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {filteredNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? "text-white bg-blue-600 shadow-lg"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Icon className="h-5 w-5 ml-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      {/* Footer */}
      {/* <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          {/* <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-semibold text-gray-700">LearnAhead</span>
          </div> */}
          {/* <p className="text-sm text-gray-500">© כל הזכויות שמורות לרות גריינימן 2025.</p> */}
          {/* © 2025 מערכת ניהול שיעורים. כל הזכויות שמורות. */}
        {/* </div> */}
      {/* // </footer>  */}
    </div>
  )
}

export default Layout
