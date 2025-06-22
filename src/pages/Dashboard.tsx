"use client"

import type React from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { BookOpen, ShoppingCart, FileText, Plus, Users, TrendingUp } from "lucide-react"

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const isTeacher = user?.role === "Teacher"
  const isStudent = user?.role === "Student"

  const studentActions = [
    {
      title: "רכישת שיעורים",
      description: "עיין בקטגוריות השונות ורכוש קורסים חדשים",
      icon: ShoppingCart,
      href: "/categories",
      color: "bg-blue-500",
    },
    {
      title: "הקורסים שלי",
      description: "צפה בקורסים שרכשת והמשך ללמוד",
      icon: BookOpen,
      href: "/my-courses",
      color: "bg-green-500",
    },
    {
      title: "המחברת שלי",
      description: "נהל את ההערות והרשימות האישיות שלך",
      icon: FileText,
      href: "/notes",
      color: "bg-purple-500",
    },
  ]

  const teacherActions = [
    {
      title: "כל הקורסים",
      description: "עיין בכל הקורסים הזמינים במערכת",
      icon: BookOpen,
      href: "/categories",
      color: "bg-blue-500",
    },
    {
      title: "הקורסים שלי",
      description: "נהל את הקורסים שיצרת וצפה בתלמידים",
      icon: Users,
      href: "/my-courses",
      color: "bg-green-500",
    },
    {
      title: "הוספת קורס",
      description: "צור קורס חדש והתחל ללמד",
      icon: Plus,
      href: "/add-course",
      color: "bg-orange-500",
    },
    {
      title: "הוספת שיעור",
      description: "הוסף שיעור חדש לאחד הקורסים שלך",
      icon: TrendingUp,
      href: "/add-lesson",
      color: "bg-purple-500",
    },
  ]

  const actions = isTeacher ? teacherActions : studentActions

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.userName?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">שלום, {user?.userName}!</h1>
            <p className="text-gray-600">
              {isTeacher ? "ברוך הבא למערכת ניהול השיעורים למורים" : "ברוך הבא למערכת הלמידה"}
            </p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
              {user?.role === "Teacher" ? "מורה" : "תלמיד"}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">פעולות מהירות</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link
                key={index}
                to={action.href}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 hover:border-gray-300"
              >
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{action.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

