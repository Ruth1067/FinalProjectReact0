// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
// import { BookOpen, User, Mail, Phone, AlertCircle, CheckCircle } from "lucide-react"

// const Register: React.FC = () => {
//   const [formData, setFormData] = useState({
//     userName: "",
//     email: "",
//     phoneNumber: "",
//     role: "Student",
//   })
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const { register } = useAuth()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)

//     try {
//       await register(formData)
//       setSuccess(true)
//     } catch (err: any) {
//       setError("שגיאה בהרשמה. אנא נסה שוב.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   if (success) {
//     return (
//       <div
//         className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
//         dir="rtl"
//       >
//         <div className="max-w-md w-full">
//           <div className="bg-white p-8 rounded-lg shadow-md text-center">
//             <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">ההרשמה הושלמה בהצלחה!</h2>
//             <p className="text-gray-600 mb-6">סיסמה חדשה נשלחה לכתובת המייל שלך. אנא בדוק את תיבת הדואר שלך.</p>
//             <Link
//               to="/"
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//             >
//               המשך למערכת
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
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
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">הרשמה למערכת</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             או{" "}
//             <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
//               התחבר אם יש לך חשבון
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
//               <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
//                 שם משתמש
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                   <User className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="userName"
//                   name="userName"
//                   type="text"
//                   required
//                   value={formData.userName}
//                   onChange={handleInputChange}
//                   className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="הכנס שם משתמש"
//                 />
//               </div>
//             </div>

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
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="הכנס כתובת מייל"
//                 />
//               </div>
//             </div>
//             <div className="bg-red-500 text-white p-4">בדיקה</div>
//             <div>
//               <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
//                 מספר טלפון
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                   <Phone className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   type="tel"
//                   required
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                   className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="הכנס מספר טלפון"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
//                 סוג משתמש
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleInputChange}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="Student">תלמיד</option>
//                 <option value="Teacher">מורה</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "נרשם..." : "הירשם"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Register
// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import { Link, useNavigate } from "react-router-dom"
// // import { useAuth } from "../contexts/AuthContext"
// // import { ArrowLeft, User, Mail, Phone, GraduationCap } from "lucide-react"

// // const Register: React.FC = () => {
// //   const navigate = useNavigate()
// //   const { register } = useAuth()
// //   const [formData, setFormData] = useState({
// //     userName: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //     isTeacher: false,
// //     phoneNumber: "",
// //     role: "Student"
// //   })
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState("")

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
  
// //     setFormData(prevFormData => {
// //       return {
// //         ...prevFormData,
// //         [e.target.name]: value,
// //         role: e.target.name === "isTeacher" && value ? "Teacher" : "Student"
// //       };
// //     });
// //   };
  
// //   // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //   //   const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
// //   //   setFormData({
// //   //     ...formData,
// //   //     [e.target.name]: value,
// //   //   })
// //   // }
// //   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //   //   setFormData({
// //   //     ...formData,
// //   //     [e.target.name]: e.target.value,
// //   //   })
// //   // }
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setError("")
// //     setLoading(true)

// //     try {
// //       await register(formData)
// //       navigate("/")
// //     } catch (err: any) {
// //       setError(err.message || "שגיאה בהרשמה. אנא נסה שוב.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }


// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
// //       <div className="p-4">
// //         <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
// //           <ArrowLeft className="h-4 w-4 ml-1" />
// //           <span className="font-medium">חזרה לדף הבית</span>
// //         </Link>
// //       </div>

// //       <div className="flex-1 flex flex-col items-center justify-center px-4">
// //         <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">מערכת ניהול שיעורים</h1>

// //         <div className="w-full max-w-md">
// //           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
// //             {/* Blue top border */}
// //             <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

// //             <div className="p-8">
// //               <div className="flex items-center justify-between mb-6">
// //                 <div>
// //                   <h2 className="text-2xl font-bold text-gray-900">הרשמה למערכת</h2>
// //                   <p className="text-sm text-gray-500 mt-1">צור חשבון חדש כמורה או תלמיד</p>
// //                 </div>
// //                 {/* <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
// //                   <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
// //                 </div> */}
// //               </div>

// //               <form onSubmit={handleSubmit} className="space-y-6">
// //                 <div>
// //                   <label htmlFor="userName" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
// //                     <User className="h-4 w-4 ml-1 text-blue-600" />
// //                     שם משתמש
// //                   </label>
// //                   <input
// //                     id="userName"
// //                     name="userName"
// //                     type="text"
// //                     required
// //                     value={formData.userName}
// //                     onChange={handleChange}
// //                     placeholder="הזן שם משתמש"
// //                     className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
// //                     <Mail className="h-4 w-4 ml-1 text-blue-600" />
// //                     דוא"ל
// //                   </label>
// //                   <input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     required
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     placeholder="your@email.com"
// //                     className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label htmlFor="phone" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
// //                     <Phone className="h-4 w-4 ml-1 text-blue-600" />
// //                     טלפון נייד
// //                   </label>
// //                   <input
// //                     id="phone"
// //                     name="phone"
// //                     type="tel"
// //                     required
// //                     value={formData.phone}
// //                     onChange={handleChange}
// //                     placeholder="050-1234567"
// //                     className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                   />
// //                 </div>

// //                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
// //                   <label className="flex items-center cursor-pointer">
// //                     <input
// //                       type="checkbox"
// //                       name="isTeacher"
// //                       checked={formData.isTeacher}
// //                       onChange={handleChange}
// //                       className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
// //                     />
// //                     <span className="mr-3 text-sm font-medium text-blue-800 flex items-center">
// //                       <GraduationCap className="h-4 w-4 ml-1" />
// //                       אני מורה
// //                     </span>
// //                   </label>
// //                 </div>

// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 font-semibold"
// //                 >
// //                   {loading ? (
// //                     <div className="flex items-center">
// //                       <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent ml-2"></div>
// //                       <span>מבצע רישום...</span>
// //                     </div>
// //                   ) : (
// //                     <div className="flex items-center">
// //                       <span>הירשם</span>
// //                       <ArrowLeft className="h-4 w-4 mr-2 rotate-180" />
// //                     </div>
// //                   )}
// //                 </button>

// //                 {error && (
// //                   <div className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>
// //                 )}
// //               </form>

// //               <div className="mt-6 text-center">
// //                 <p className="text-sm text-gray-600">
// //                   כבר יש לך חשבון?{" "}
// //                   <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
// //                     התחבר כאן
// //                   </Link>
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Register
"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { ArrowLeft, User, Mail, Phone, GraduationCap } from "lucide-react"

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    role: "Student" // ברירת מחדל
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: value,
        role: e.target.name === "isTeacher" && value ? "Teacher" : "Student"
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await register(formData)
      navigate("/")
    } catch (err: any) {
      setError(err.message || "שגיאה בהרשמה. אנא נסה שוב.")
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
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">הרשמה למערכת</h2>
                  <p className="text-sm text-gray-500 mt-1">צור חשבון חדש כמורה או תלמיד</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="userName" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="h-4 w-4 ml-1 text-blue-600" />
                    שם משתמש
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    required
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="הזן שם משתמש"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

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
                  <label htmlFor="phoneNumber" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="h-4 w-4 ml-1 text-blue-600" />
                    טלפון נייד
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="050-1234567"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isTeacher"
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
                    />
                    <span className="mr-3 text-sm font-medium text-blue-800 flex items-center">
                      <GraduationCap className="h-4 w-4 ml-1" />
                      אני מורה
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 font-semibold"
                >
                  {loading ? (
                    <span>מבצע רישום...</span>
                  ) : (
                    <span>הירשם</span>
                  )}
                </button>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>
                )}
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  כבר יש לך חשבון?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    התחבר כאן
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

export default Register
