// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
// import { BookOpen, Mail, Lock, AlertCircle } from "lucide-react"

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const { login } = useAuth()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       await login(email, password)
//     } catch (err: any) {
//       setError("שגיאה בהתחברות. אנא בדוק את הפרטים ונסה שוב.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
//       dir="rtl"
//     >
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <div className="flex justify-center">
//             <BookOpen className="h-12 w-12 text-blue-600" />
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">התחברות למערכת</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             או{" "}
//             <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
//               הירשם כעת
//             </Link>
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
//             {error && (
//               <div className="flex items-center space-x-2 space-x-reverse text-red-600 bg-red-50 p-3 rounded-md">
//                 <AlertCircle className="h-5 w-5" />
//                 <span className="text-sm">{error}</span>
//               </div>
//             )}

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 כתובת מייל
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="הכנס כתובת מייל"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 סיסמה
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="הכנס סיסמה"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "מתחבר..." : "התחבר"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login
"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { ArrowLeft, Mail, Lock, LogIn } from "lucide-react"

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate("/")
    } catch (err: any) {
      setError(err.message || "שגיאה בהתחברות. אנא נסה שוב.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="p-4">
        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4 ml-1" />
          <span className="font-medium">חזרה לדף הבית</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">מערכת ניהול שיעורים</h1>

        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Blue top border */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">התחברות למערכת</h2>
                  <p className="text-sm text-gray-500 mt-1">הזן את פרטי ההתחברות שלך כדי להיכנס למערכת</p>
                </div>
                {/* <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                  <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
                </div> */}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="h-4 w-4 ml-1 text-blue-600" />
                    דוא"ל
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="h-4 w-4 ml-1 text-blue-600" />
                    סיסמה
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="text-left">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    שכחת סיסמה?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 font-semibold"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent ml-2"></div>
                      <span>מתחבר...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span>התחבר</span>
                      <LogIn className="h-4 w-4 mr-2" />
                    </div>
                  )}
                </button>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>
                )}
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  אין לך חשבון?{" "}
                  <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    הירשם כאן
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
