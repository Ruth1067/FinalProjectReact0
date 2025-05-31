"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Categories from "./pages/Categories"
import Courses from "./pages/Courses"
import CourseView from "./pages/CourseView"
import MyCourses from "./pages/MyCourses"
import AddCourse from "./pages/AddCourse"
import AddLesson from "./pages/AddLesson"
import Notes from "./pages/Notes"
import Purchase from "./pages/Purchase"

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/courses/:categoryId" element={<Courses />} />
        <Route path="/course/:courseId" element={<CourseView />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/purchase/:courseId" element={<Purchase />} />
        {user.role === "Teacher" && (
          <>
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/add-lesson" element={<AddLesson />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}

export default App
