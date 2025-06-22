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
//           {/* <div className="w-10 h-10 rounded-full overflow-hidden shadow-2xl ring-4 ring-white">
//             <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
//           </div> */}
//         </div>

//         <h1 className="text-6xl font-bold text-blue-600 mb-6 tracking-tight">LearnAhead</h1>

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
//               className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl shadow-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
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
//       {/* <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-auto"> */}
//         {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center"> */}
//           {/* <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
//             <div className="w-6 h-6 rounded-full overflow-hidden">
//               <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
//             </div>
//             <span className="text-sm font-semibold text-gray-700">LearnAhead</span>
//           </div> */}
//           {/* <p className="text-sm text-gray-500">© כל הזכויות שמורות לרות גריינימן 2025.</p> */}
//           {/* © 2025 מערכת ניהול שיעורים. כל הזכויות שמורות. */}
//         {/* </div>
//       </footer> */}
//     </div>
//   )
// }

// export default Home
// // "use client"

// // import type React from "react"
// // import { Link } from "react-router-dom"
// // import { useAuth } from "../contexts/AuthContext"
// // import { ArrowLeft, UserPlus, LogIn, BookOpen } from "lucide-react"

// // const Home: React.FC = () => {
// //   const { user } = useAuth()

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="text-center max-w-4xl mx-auto">
// //         <div className="flex justify-center mb-8">
// //           {/* שיניתי את w-10 h-10 ל- w-8 h-8 */}
// //           <div className="w-8 h-8 rounded-full overflow-hidden shadow-2xl ring-4 ring-white">
// //             <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
// //           </div>
// //         </div>

// //         <h1 className="text-6xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 mb-6 tracking-tight">
// //           LearnAhead
// //         </h1>

// //         <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
// //           פלטפורמה מתקדמת לניהול קורסים, שיעורים ותלמידים עם חווית למידה אינטראקטיבית
// //         </p>

// //         <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse">
// //           {!user ? (
// //             <>
// //               <Link
// //                 to="/register"
// //                 className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl shadow-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
// //               >
// //                 <UserPlus className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
// //                 הרשמה
// //                 <ArrowLeft className="h-4 w-4 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
// //               </Link>
// //               <Link
// //                 to="/login"
// //                 className="group inline-flex items-center justify-center px-8 py-4 border-2 border-blue-200 text-lg font-semibold rounded-2xl shadow-lg text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
// //               >
// //                 <LogIn className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
// //                 התחברות
// //                 <ArrowLeft className="h-4 w-4 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
// //               </Link>
// //             </>
// //           ) : (
// //             <Link
// //               to="/my-courses"
// //               className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl shadow-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus://ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
// //             >
// //               <BookOpen className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
// //               הקורסים שלי
// //               <ArrowLeft className="h-4 w-4 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
// //             </Link>
// //           )}
// //         </div>

// //         {/* Features Section */}
// //         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
// //             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
// //               <BookOpen className="h-6 w-6 text-white" />
// //             </div>
// //             <h3 className="text-lg font-semibold text-gray-900 mb-2">קורסים מתקדמים</h3>
// //             <p className="text-gray-600 text-sm">מגוון רחב של קורסים איכותיים עם תוכן מקצועי</p>
// //           </div>
// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
// //             <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
// //               <UserPlus className="h-6 w-6 text-white" />
// //             </div>
// //             <h3 className="text-lg font-semibold text-gray-900 mb-2">מורים מקצועיים</h3>
// //             <p className="text-gray-600 text-sm">למידה ממורים מנוסים ומקצועיים בתחומם</p>
// //           </div>
// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
// //             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
// //               <LogIn className="h-6 w-6 text-white" />
// //             </div>
// //             <h3 className="text-lg font-semibold text-gray-900 mb-2">גישה נוחה</h3>
// //             <p className="text-gray-600 text-sm">למידה בכל זמן ומכל מקום עם ממשק ידידותי</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Home

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  ArrowLeft,
  UserPlus,
  LogIn,
  BookOpen,
  Play,
  Users,
  Award,
  Zap,
  Shield,
  Globe,
  Star,
  CheckCircle,
  ArrowDown,
  Mic,
  FileText,
  Cloud,
} from "lucide-react"

const Home: React.FC = () => {
  const { user } = useAuth()
  const [currentSection, setCurrentSection] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".scroll-section")
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0

        if (isInView && !isVisible[index]) {
          setIsVisible((prev) => ({ ...prev, [index]: true }))
          setCurrentSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isVisible])

  const scrollToSection = (sectionIndex: number) => {
    const section = document.querySelector(`#section-${sectionIndex}`)
    section?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Navigation */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-blue-100 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LearnAhead
              </span>
            </div>

            <nav className="hidden md:flex space-x-8 space-x-reverse">
              <button
                onClick={() => scrollToSection(0)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                בית
              </button>
              <button
                onClick={() => scrollToSection(1)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                אודות
              </button>
              <button
                onClick={() => scrollToSection(2)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                תכונות
              </button>
              <button
                onClick={() => scrollToSection(3)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                יתרונות
              </button>
              <button
                onClick={() => scrollToSection(4)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                צור קשר
              </button>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              {!user ? (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    התחברות
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    הרשמה
                  </Link>
                </>
              ) : (
                <Link
                  to="/my-courses"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  הקורסים שלי
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="section-0"
        className={`scroll-section min-h-screen flex items-center justify-center pt-16 transition-all duration-1000 ${isVisible[0] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                LearnAhead
              </span>
              <br />
              <span className="text-gray-800 text-4xl md:text-5xl">מערכת למידה מתקדמת</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              פלטפורמה חדשנית לניהול קורסים דיגיטליים עם הקלטות מתקדמות, תמלול אוטומטי ו-AI, וחוויית למידה אינטראקטיבית
              ללא תחרות
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse mb-16">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-3xl"
                  >
                    <UserPlus className="h-6 w-6 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                    התחל עכשיו - חינם
                    <ArrowLeft className="h-5 w-5 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    to="/login"
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl border-2 border-blue-200 text-blue-700 bg-white/80 backdrop-blur-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
                  >
                    <LogIn className="h-6 w-6 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                    יש לי חשבון
                  </Link>
                </>
              ) : (
                <Link
                  to="/my-courses"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  <BookOpen className="h-6 w-6 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                  המשך ללמוד
                  <ArrowLeft className="h-5 w-5 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              )}
            </div>

            Floating Elements
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-20 left-20 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
          </div>

          <div className="animate-bounce mt-16">
            <ArrowDown className="h-8 w-8 text-blue-600 mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
  id="section-1"
  className={`scroll-section min-h-screen flex items-center py-20 transition-all duration-1000 delay-200 ${isVisible[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-900 mb-6">
        מה זה{" "}
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          LearnAhead
        </span>
        ?
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        פלטפורמה מהפכנית המשלבת טכנולוגיות AI מתקדמות עם חוויית למידה אנושית
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* למורים */}
      <div className="order-1 lg:order-none bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center space-x-4 space-x-reverse mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">למורים</h3>
            <p className="text-gray-600">כלים מתקדמים להוראה</p>
          </div>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3 space-x-reverse">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>יצירת קורסים בקלות</span>
          </li>
          <li className="flex items-center space-x-3 space-x-reverse">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>העלאה אוטומטית ל-AWS</span>
          </li>
          <li className="flex items-center space-x-3 space-x-reverse">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>תמלול אוטומטי מתקדם</span>
          </li>
          <li className="flex items-center space-x-3 space-x-reverse">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>מעקב אחר תלמידים</span>
          </li>
        </ul>
      </div>

      {/* לתלמידים */}
      <div className="order-2 lg:order-none bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center space-x-4 space-x-reverse mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">לתלמידים</h3>
            <p className="text-gray-600">חוויית למידה מותאמת</p>
          </div>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center space-x-3 space-x-reverse">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>רכישת קורסים בקלות</span>
          </li>
          <li className="flex items-center space-x-3 space-x-reverse">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>צפייה בכל מקום ובכל זמן</span>
          </li>
          <li className="flex items-center space-x-3 space-x-reverse">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>הערות אישיות ושמירה</span>
          </li>
          <li className="flex items-center space-x-3 space-x-reverse">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>תמלולים מלאים</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* <section
        id="section-1"
        className={`scroll-section min-h-screen flex items-center py-20 transition-all duration-1000 delay-200 ${isVisible[1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              מה זה{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LearnAhead
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              פלטפורמה מהפכנית המשלבת טכנולוגיות AI מתקדמות עם חוויית למידה אנושית
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">למורים</h3>
                    <p className="text-gray-600">כלים מתקדמים להוראה</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>יצירת קורסים בקלות</span>
                  </li>
                  <li className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>העלאה אוטומטית ל-AWS</span>
                  </li>
                  <li className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>תמלול אוטומטי מתקדם</span>
                  </li>
                  <li className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>מעקב אחר תלמידים</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">לתלמידים</h3>
                    <p className="text-gray-600">חוויית למידה מותאמת</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>רכישת קורסים בקלות</span>
                  </li>
                  <li className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>צפייה בכל מקום ובכל זמן</span>
                  </li>
                  <li className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>הערות אישיות ושמירה</span>
                  </li>
                  <li className="flex items-center space-x-3 space-x-reverse">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>תמלולים מלאים</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">שיעור פיזיקה - פרק 3</h4>
                    <Play className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                    <div className="w-1/3 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">"בשיעור זה נלמד על חוקי ניוטון ויישומם במציאות..."</p>
                  <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500">
                    <Mic className="h-4 w-4" />
                    <span>תמלול אוטומטי זמין</span>
                  </div>
                </div>
              </div>
            </div> */}
          {/* </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section
        id="section-2"
        className={`scroll-section min-h-screen flex items-center py-20 bg-gradient-to-br from-blue-50 to-indigo-50 transition-all duration-1000 delay-400 ${isVisible[2] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              תכונות{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                מתקדמות
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">טכנולוגיות חדשניות המשנות את פני החינוך הדיגיטלי</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Cloud,
                title: "אחסון ענן מתקדם",
                description: "העלאה אוטומטית ל-AWS S3 עם גיבוי מלא ואבטחה מקסימלית",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Mic,
                title: "תמלול AI מתקדם",
                description: "המרת דיבור לטקסט באיכות גבוהה עם זיהוי דוברים מרובים",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: FileText,
                title: "הערות חכמות",
                description: "מערכת הערות אישיות עם חיפוש מתקדם וסנכרון בזמן אמת",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Shield,
                title: "אבטחה מקסימלית",
                description: "הצפנה מתקדמת והגנה על פרטיות המשתמשים ברמה הגבוהה ביותר",
                color: "from-red-500 to-orange-500",
              },
              {
                icon: Zap,
                title: "ביצועים מהירים",
                description: "טעינה מהירה וחוויית משתמש חלקה עם אופטימיזציה מתקדמת",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: Globe,
                title: "נגישות גלובלית",
                description: "גישה מכל מקום בעולם עם תמיכה במספר שפות ופלטפורמות",
                color: "from-indigo-500 to-purple-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:border-blue-200"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="section-3"
        className={`scroll-section min-h-screen flex items-center py-20 transition-all duration-1000 delay-600 ${isVisible[3] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              למה{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LearnAhead
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">היתרונות שיעשו את ההבדל בחוויית הלמידה שלכם</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: Award,
                  title: "איכות ללא פשרות",
                  description: "תמלול מדויק ב-99% עם טכנולוגיית AI מתקדמת",
                },
                {
                  icon: Zap,
                  title: "מהירות מקסימלית",
                  description: "עיבוד והעלאה של קבצים תוך דקות ספורות",
                },
                {
                  icon: Users,
                  title: "קהילה תומכת",
                  description: "תמיכה 24/5 וקהילת משתמשים פעילה",
                },
                {
                  icon: Star,
                  title: "חוויה מותאמת",
                  description: "ממשק אינטואיטיבי המותאם לכל סוג משתמש",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 space-x-reverse group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white transform hover:scale-105 transition-all duration-500">
                <h3 className="text-3xl font-bold mb-6">סטטיסטיקות מרשימות</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">99%</div>
                    <div className="text-blue-100">דיוק תמלול</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">24/5</div>
                    <div className="text-blue-100">זמינות</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">10K+</div>
                    <div className="text-blue-100">משתמשים</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">5★</div>
                    <div className="text-blue-100">דירוג ממוצע</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="section-4"
        className={`scroll-section min-h-screen flex items-center py-20 bg-gradient-to-br from-blue-600 to-indigo-600 transition-all duration-1000 delay-800 ${isVisible[4] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">מוכנים להתחיל?</h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12">
            הצטרפו לאלפי המשתמשים שכבר חווים את עתיד החינוך הדיגיטלי
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse mb-16">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl text-blue-600 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  <UserPlus className="h-6 w-6 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                  הרשמה חינם
                  <ArrowLeft className="h-5 w-5 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/categories"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  <BookOpen className="h-6 w-6 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                  עיון בקורסים
                </Link>
              </>
            ) : (
              <Link
                to="/my-courses"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl text-blue-600 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="h-6 w-6 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                המשך ללמוד
                <ArrowLeft className="h-5 w-5 mr-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Shield className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">100% מאובטח</h3>
              <p className="text-blue-100">הנתונים שלכם מוגנים ברמה הגבוהה ביותר</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Zap className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">התחלה מיידית</h3>
              <p className="text-blue-100">תוכלו להתחיל ללמד או ללמוד תוך דקות</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">תמיכה מלאה</h3>
              <p className="text-blue-100">צוות התמיכה שלנו כאן בשבילכם 24/5</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">LearnAhead</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2025 LearnAhead. כל הזכויות שמורות.</p>
              <p className="text-sm mt-1">מערכת למידה מתקדמת לעתיד החינוך</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
