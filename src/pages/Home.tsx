"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { ArrowLeft, UserPlus, LogIn, BookOpen } from "lucide-react"

const Home: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          {/* <div className="w-10 h-10 rounded-full overflow-hidden shadow-2xl ring-4 ring-white">
            <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
          </div> */}
        </div>

        <h1 className="text-6xl font-bold text-blue-600 mb-6 tracking-tight">LearnAhead</h1>

        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
          פלטפורמה מתקדמת לניהול קורסים, שיעורים ותלמידים עם חווית למידה אינטראקטיבית
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse">
          {!user ? (
            <>
              <Link
                to="/register"
                className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl shadow-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                <UserPlus className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                הרשמה
                <ArrowLeft className="h-4 w-4 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/login"
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-blue-200 text-lg font-semibold rounded-2xl shadow-lg text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                <LogIn className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                התחברות
                <ArrowLeft className="h-4 w-4 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </>
          ) : (
            <Link
              to="/my-courses"
              className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl shadow-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              <BookOpen className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
              הקורסים שלי
              <ArrowLeft className="h-4 w-4 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">קורסים מתקדמים</h3>
            <p className="text-gray-600 text-sm">מגוון רחב של קורסים איכותיים עם תוכן מקצועי</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">מורים מקצועיים</h3>
            <p className="text-gray-600 text-sm">למידה ממורים מנוסים ומקצועיים בתחומם</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">גישה נוחה</h3>
            <p className="text-gray-600 text-sm">למידה בכל זמן ומכל מקום עם ממשק ידידותי</p>
          </div>
        </div>
      </div>
      {/* <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-auto"> */}
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center"> */}
          {/* <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-semibold text-gray-700">LearnAhead</span>
          </div> */}
          {/* <p className="text-sm text-gray-500">© כל הזכויות שמורות לרות גריינימן 2025.</p> */}
          {/* © 2025 מערכת ניהול שיעורים. כל הזכויות שמורות. */}
        {/* </div>
      </footer> */}
    </div>
  )
}

export default Home
// "use client"

// import type React from "react"
// import { Link } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
// import { ArrowLeft, UserPlus, LogIn, BookOpen } from "lucide-react"

// const Home: React.FC = () => {
//   const { user } = useAuth()

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="text-center max-w-4xl mx-auto">
//         <div className="flex justify-center mb-8">
//           {/* שיניתי את w-10 h-10 ל- w-8 h-8 */}
//           <div className="w-8 h-8 rounded-full overflow-hidden shadow-2xl ring-4 ring-white">
//             <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
//           </div>
//         </div>

//         <h1 className="text-6xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 mb-6 tracking-tight">
//           LearnAhead
//         </h1>

//         <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
//           פלטפורמה מתקדמת לניהול קורסים, שיעורים ותלמידים עם חווית למידה אינטראקטיבית
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse">
//           {!user ? (
//             <>
//               <Link
//                 to="/register"
//                 className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl shadow-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
//               >
//                 <UserPlus className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
//                 הרשמה
//                 <ArrowLeft className="h-4 w-4 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
//               </Link>
//               <Link
//                 to="/login"
//                 className="group inline-flex items-center justify-center px-8 py-4 border-2 border-blue-200 text-lg font-semibold rounded-2xl shadow-lg text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
//               >
//                 <LogIn className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
//                 התחברות
//                 <ArrowLeft className="h-4 w-4 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
//               </Link>
//             </>
//           ) : (
//             <Link
//               to="/my-courses"
//               className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl shadow-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus://ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
//             >
//               <BookOpen className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
//               הקורסים שלי
//               <ArrowLeft className="h-4 w-4 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
//             </Link>
//           )}
//         </div>

//         {/* Features Section */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <BookOpen className="h-6 w-6 text-white" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">קורסים מתקדמים</h3>
//             <p className="text-gray-600 text-sm">מגוון רחב של קורסים איכותיים עם תוכן מקצועי</p>
//           </div>
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
//             <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <UserPlus className="h-6 w-6 text-white" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">מורים מקצועיים</h3>
//             <p className="text-gray-600 text-sm">למידה ממורים מנוסים ומקצועיים בתחומם</p>
//           </div>
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
//             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <LogIn className="h-6 w-6 text-white" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">גישה נוחה</h3>
//             <p className="text-gray-600 text-sm">למידה בכל זמן ומכל מקום עם ממשק ידידותי</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home