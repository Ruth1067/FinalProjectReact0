"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFolders } from "../contexts/FoldersProvider";
import { BookOpen, ShoppingCart, Play } from "lucide-react";
import { title } from "process";

// הגדרת Course לפי צרכי הרכיב
interface Course {
  folderId: number;
  courseId: number;
  teacherId: number;
  teacherName: string;
  title: string;
  description: string;
  numberOfLessons: number;
  categoryId: number;
}

const Courses: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { user } = useAuth();
  const { folders, loading: foldersLoading, checkIfCoursePurchased } = useFolders();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!foldersLoading && folders.length > 0 && categoryId) {
      const filteredCourses: Course[] = folders
        .filter((folder) =>
          folder.categoryId === Number(categoryId) &&
          folder.courseId !== null &&
          folder.lessonId === null &&
          folder.teacherId !== null
        )
        .map((folder) => {
          const lessonCount = folders.filter(
            (f) => f.courseId === folder.courseId && f.lessonId !== null
          ).length;

          return {
            folderId: folder.folderId,
            courseId: folder.courseId!,
            teacherId: folder.teacherId!,
            teacherName: folder.teacherName || "מורה לא ידוע",
            title: folder.title || "ללא כותרת",
            description: folder.description || "",
            numberOfLessons: lessonCount,
            categoryId: folder.categoryId
          };
        });

      setCourses(filteredCourses);
    }
  }, [folders, foldersLoading, categoryId]);

  if (foldersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">קורסים בקטגוריה {title}</h1>
        <p className="mt-2 text-gray-600">בחר קורס כדי לצפות בפרטים או לרכוש</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseItem
            key={course.folderId}
            course={course}
            userId={user?.userId}
            role={user?.role}
            checkIfCoursePurchased={checkIfCoursePurchased}
          />
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">אין קורסים זמינים</h3>
          <p className="text-gray-600">בקרוב יתווספו קורסים חדשים לקטגוריה זו</p>
        </div>
      )}
    </div>
  );
};

const CourseItem: React.FC<{
  course: Course;
  userId?: number;
  role?: string;
  checkIfCoursePurchased: (folderId: number) => Promise<boolean>;
}> = ({ course, userId, role, checkIfCoursePurchased }) => {
  const [canView, setCanView] = useState<boolean>(false);

  useEffect(() => {
    const checkPermission = async () => {
      if (role === "Teacher" && course.teacherId === userId) {
        setCanView(true);
      } else {
        const result = await checkIfCoursePurchased(course.folderId);
        setCanView(result);
      }
    };
    checkPermission();
  }, [userId, role, course, checkIfCoursePurchased]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-2 space-x-reverse mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.teacherName}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-2 line-clamp-3">{course.description}</p>
        <p className="text-gray-500 text-xs mb-4">מספר שיעורים: {course.numberOfLessons}</p>

        <div className="flex space-x-2 space-x-reverse">
          {canView ? (
            <Link
              to={`/course/${course.courseId}`}
              className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
            >
              <Play className="h-4 w-4" />
              <span>צפה בקורס</span>
            </Link>
          ) : (
            <Link
              to={`/purchase/${course.courseId}`}
              className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>לרכישה</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;


// "use client";

// import type React from "react";
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { useFolders } from "../contexts/FoldersProvider";
// import { BookOpen, ShoppingCart, Play } from "lucide-react";

// interface Course {
//   folderId: number;
//   courseId: number;
//   teacherId: number;
//   teacherName: string;
//   title: string;
//   description: string;
//   numberOfLessons: number;
//   categoryId: number;
// }

// const Courses: React.FC = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const { user } = useAuth();
//   const { folders, loading: foldersLoading } = useFolders();
//   const [courses, setCourses] = useState<Course[]>([]);

//   useEffect(() => {
//     if (!foldersLoading && folders.length > 0 && categoryId) {
//       const filteredCourses: Course[] = folders
//         // .filter(
//         //   (folder: { categoryId: number; courseId: null; lessonId: null; teacherId: null; }) =>
//         //     folder.categoryId === Number(categoryId) &&
//         //     folder.courseId !== null &&
//         //     folder.lessonId === null && // זיהוי תיקיית קורס בלבד
//         //     folder.teacherId !== null
//         // )
//         folders.filter((folder) =>
//   folder.categoryId === Number(categoryId) &&
//   folder.courseId !== null &&
//   folder.lessonId === null &&
//   folder.teacherId !== null
// )

//         .map((courseFolder: Course) => {
//           const lessonCount = folders.filter(
//             (f: { courseId: any; lessonId: null; }) => f.courseId === courseFolder.courseId && f.lessonId !== null
//           ).length;

//           return {
//             ...courseFolder,
//             numberOfLessons: lessonCount,
//           } as Course;
//         });

//       setCourses(filteredCourses);
//     }
//   }, [folders, foldersLoading, categoryId]);

//   if (foldersLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">קורסים בקטגוריה {categoryId}</h1>
//         <p className="mt-2 text-gray-600">בחר קורס כדי לצפות בפרטים או לרכוש</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map((course) => (
//           <CourseItem key={course.folderId} course={course} userId={user?.userId} role={user?.role} />
//         ))}
//       </div>

//       {courses.length === 0 && (
//         <div className="text-center py-12">
//           <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">אין קורסים זמינים</h3>
//           <p className="text-gray-600">בקרוב יתווספו קורסים חדשים לקטגוריה זו</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const CourseItem: React.FC<{ course: Course; userId?: number; role?: string }> = ({ course, userId, role }) => {
//   const [canView, setCanView] = useState<boolean>(false);
//   const { checkIfCoursePurchased } = useFolders();

//   useEffect(() => {
//     const checkPermission = async () => {
//       if (role === "Teacher" && course.teacherId === userId) {
//         setCanView(true);
//       } else {
//         const result = await checkIfCoursePurchased(course.folderId);
//         setCanView(result);
//       }
//     };
//     checkPermission();
//   }, [userId, role, course, checkIfCoursePurchased]);

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//       <div className="p-6">
//         <div className="flex items-center space-x-2 space-x-reverse mb-3">
//           <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//             <BookOpen className="h-5 w-5 text-blue-600" />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
//             <p className="text-sm text-gray-600">{course.teacherName}</p>
//           </div>
//         </div>

//         <p className="text-gray-600 text-sm mb-2 line-clamp-3">{course.description}</p>
//         <p className="text-gray-500 text-xs mb-4">מספר שיעורים: {course.numberOfLessons}</p>

//         <div className="flex space-x-2 space-x-reverse">
//           {canView ? (
//             <Link
//               to={`/course/${course.courseId}`}
//               className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
//             >
//               <Play className="h-4 w-4" />
//               <span>צפה בקורס</span>
//             </Link>
//           ) : (
//             <Link
//               to={`/purchase/${course.courseId}`}
//               className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
//             >
//               <ShoppingCart className="h-4 w-4" />
//               <span>לרכישה</span>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

// "use client";

// import type React from "react";
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { useFolders } from "../contexts/FoldersContext";
// import { BookOpen, ShoppingCart, Play } from "lucide-react";

// interface Course {
//   folderId: number;
//   courseId: number;
//   teacherId: number;
//   teacherName: string;
//   title: string;
//   description: string;
//   numberOfLessons: number;
//   categoryId: number;
// }

// const Courses: React.FC = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const { user } = useAuth();
//   const { folders, loading: foldersLoading } = useFolders();
//   const [courses, setCourses] = useState<Course[]>([]);

//   useEffect(() => {
//     if (!foldersLoading && folders.length > 0 && categoryId) {
//       const filteredCourses: Course[] = folders
//         .filter(
//           (folder: { categoryId: number; courseId: null; lessonId: null; teacherId: null; }) =>
//             folder.categoryId === Number(categoryId) &&
//             folder.courseId !== null &&
//             folder.lessonId === null && // זיהוי תיקיית קורס בלבד
//             folder.teacherId !== null
//         )
//         .map((courseFolder: Course) => {
//           const lessonCount = folders.filter(
//             (f: { courseId: any; lessonId: null; }) => f.courseId === courseFolder.courseId && f.lessonId !== null
//           ).length;

//           return {
//             ...courseFolder,
//             numberOfLessons: lessonCount,
//           } as Course;
//         });

//       setCourses(filteredCourses);
//     }
//   }, [folders, foldersLoading, categoryId]);

//   if (foldersLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">קורסים בקטגוריה {categoryId}</h1>
//         <p className="mt-2 text-gray-600">בחר קורס כדי לצפות בפרטים או לרכוש</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map((course) => (
//           <CourseItem key={course.folderId} course={course} userId={user?.userId} role={user?.role} />
//         ))}
//       </div>

//       {courses.length === 0 && (
//         <div className="text-center py-12">
//           <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">אין קורסים זמינים</h3>
//           <p className="text-gray-600">בקרוב יתווספו קורסים חדשים לקטגוריה זו</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const CourseItem: React.FC<{ course: Course; userId?: number; role?: string }> = ({ course, userId, role }) => {
//   const [canView, setCanView] = useState<boolean>(false);
//   const { checkIfCoursePurchased } = useFolders();

//   useEffect(() => {
//     const checkPermission = async () => {
//       if (role === "Teacher" && course.teacherId === userId) {
//         setCanView(true);
//       } else {
//         const result = await checkIfCoursePurchased(course.folderId);
//         setCanView(result);
//       }
//     };
//     checkPermission();
//   }, [userId, role, course, checkIfCoursePurchased]);

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//       <div className="p-6">
//         <div className="flex items-center space-x-2 space-x-reverse mb-3">
//           <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//             <BookOpen className="h-5 w-5 text-blue-600" />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
//             <p className="text-sm text-gray-600">{course.teacherName}</p>
//           </div>
//         </div>

//         <p className="text-gray-600 text-sm mb-2 line-clamp-3">{course.description}</p>
//         <p className="text-gray-500 text-xs mb-4">מספר שיעורים: {course.numberOfLessons}</p>

//         <div className="flex space-x-2 space-x-reverse">
//           {canView ? (
//             <Link
//               to={`/course/${course.courseId}`}
//               className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
//             >
//               <Play className="h-4 w-4" />
//               <span>צפה בקורס</span>
//             </Link>
//           ) : (
//             <Link
//               to={`/purchase/${course.courseId}`}
//               className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
//             >
//               <ShoppingCart className="h-4 w-4" />
//               <span>לרכישה</span>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

// // "use client"

// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { useParams, Link } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { useAuth } from "../contexts/AuthContext"
// // import { BookOpen, User, Clock, ShoppingCart, Play } from "lucide-react"

// // interface Course {
// //   folderId: number
// //   courseId: number
// //   teacherId: number
// //   teacherName: string
// //   title: string
// //   description: string
// //   numberOfLessons: number
// //   categoryId: number
// // }

// // const Courses: React.FC = () => {
// //   const { categoryId } = useParams<{ categoryId: string }>()
// //   const { user } = useAuth()
// //   const [courses, setCourses] = useState<Course[]>([])
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     const loadCourses = async () => {
// //       try {
// //         const folders = await folderApi.getAllFolders();
// //         const filteredCourses = folders.filter((folder: any) =>
// //           folder.categoryId == Number(categoryId) &&
// //           folder.courseId != null &&
// //           folder.teacherId != null &&
// //           folder.title 
// //         );

// //         setCourses(filteredCourses);
// //       } catch (error) {
// //         console.error("Error loading courses:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     loadCourses();
// //   }, [categoryId])

// //   // const canViewCourse = async (course: Course) => {
// //   //   if (user?.role === "Teacher" && course.teacherId === user.userId) {
// //   //     return true;
// //   //   }

// //   //   try {
// //   //     const response = await folderApi.checkIfCoursePurchased(course.folderId);
// //   //     return response.purchased; // נניח שהמענה מהשרת כולל שדה purchased
// //   //   } catch (error) {
// //   //     // console.error("Error checking purchase status:", error);
// //   //     return false; // אם יש שגיאה, נניח שהקורס לא נרכש
// //   //   }
// //   // }
// //   const canViewCourse = async (course: Course) => {
// //     if (user?.role === "Teacher" && course.teacherId === user.userId) {
// //       return true;
// //     }
  
// //     try {
// //       const purchased = await folderApi.checkIfCoursePurchased(course.folderId);
// //       return purchased; // כאן תשתמש בערך המוחזר ישירות
// //     } catch (error) {
// //       // console.error("Error checking purchase status:", error);
// //       return false; // אם יש שגיאה, נניח שהקורס לא נרכש
// //     }
// //   }
  

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-8">
// //       <div>
// //         <h1 className="text-3xl font-bold text-gray-900">קורסים בקטגוריה {categoryId}</h1>
// //         <p className="mt-2 text-gray-600">בחר קורס כדי לצפות בפרטים או לרכוש</p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {courses.map((course) => (
// //           <CourseItem key={course.folderId} course={course} canViewCourse={canViewCourse} />
// //         ))}
// //       </div>

// //       {courses.length === 0 && (
// //         <div className="text-center py-12">
// //           <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //           <h3 className="text-lg font-medium text-gray-900 mb-2">אין קורסים זמינים</h3>
// //           <p className="text-gray-600">בקרוב יתווספו קורסים חדשים לקטגוריה זו</p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // const CourseItem: React.FC<{ course: Course, canViewCourse: (course: Course) => Promise<boolean> }> = ({ course, canViewCourse }) => {
// //   const [canView, setCanView] = useState<boolean>(false);

// //   useEffect(() => {
// //     const checkViewPermission = async () => {
// //       const permission = await canViewCourse(course);
// //       setCanView(permission);
// //     };
// //     checkViewPermission();
// //   }, [course, canViewCourse]);

// //   return (
// //     <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //       {/* <div className="p-6">
// //         <h2 className="text-lg font-bold">{course.title}</h2> */}
// //            <div className="p-6">
// //               <div className="flex items-center space-x-2 space-x-reverse mb-3">
// //                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
// //                   <BookOpen className="h-5 w-5 text-blue-600" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
// //                   <p className="text-sm text-gray-600">{course.teacherName}</p>
// //                 </div>
// //               </div>

// //               <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
// //         <div className="flex space-x-2 space-x-reverse">
// //           {canView ? (
// //             // <Link
// //             //   to={`/course/${course.courseId}`}
// //             //   className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
// //             // >
// //             //   <span>כניסה לקורס</span>
// //             // </Link>
// //                   <Link
// //                   to={`/course/${course.courseId}`}
// //                   className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
// //                 >
// //                   <Play className="h-4 w-4" />
// //                   <span>צפה בקורס</span>
// //                 </Link>
// //           ) : (
// //             <Link
// //               to={`/purchase/${course.courseId}`}
// //               className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
// //             >
// //               <ShoppingCart className="h-4 w-4" />
// //               <span>לרכישה</span>
// //             </Link>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Courses;

// // "use client"

// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { useParams, Link } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { useAuth } from "../contexts/AuthContext"
// // import { BookOpen, User, Clock, ShoppingCart } from "lucide-react"

// // interface Course {
// //   folderId: number
// //   courseId: number
// //   teacherId: number
// //   teacherName: string
// //   title: string
// //   description: string
// //   numberOfLessons: number
// //   categoryId: number
// // }

// // // פונקציה לבדוק אם הקורס נרכש
// // // const isCoursePurchased = (courseId: number) => {
// // //   const purchased = JSON.parse(localStorage.getItem("purchasedCourses") || "[]")
// // //   return purchased.includes(courseId)
// // // }

// // const Courses: React.FC = () => {
// //   const { categoryId } = useParams<{ categoryId: string }>()
// //   const { user } = useAuth()
// //   const [courses, setCourses] = useState<Course[]>([])
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     loadCourses()
// //   }, [categoryId])

// //   const loadCourses = async () => {
// //     try {
// //       const folders = await folderApi.getAllFolders()
// //       const filteredCourses = folders.filter((folder: any) =>
// //         folder.categoryId == Number(categoryId) &&
// //         folder.courseId != null &&
// //         folder.teacherId != null &&
// //         folder.title 
// //         // folder.price != null
// // )

      
// //       setCourses(filteredCourses)
// //     } catch (error) {
// //       console.error("Error loading courses:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // const canViewCourse = (course: Course) => {
// //   //   return (
// //   //     (user?.role === "Teacher" && course.teacherId === user.userId) 
// //   //     // isCoursePurchased(course.courseId)
// //   //   )
// //   // }
// //   const canViewCourse = async (course: Course) => {
// //     if (user?.role === "Teacher" && course.teacherId === user.userId) {
// //       return true;
// //     }
  
// //     try {
// //       const response = await folderApi.checkIfCoursePurchased(course.courseId);
// //       return response.purchased; // נניח שהמענה מהשרת כולל שדה purchased
// //     } catch (error) {
// //       console.error("Error checking purchase status:", error);
// //       return false; // אם יש שגיאה, נניח שהקורס לא נרכש
// //     }
// //   }
  

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-8">
// //       <div>
// //         <h1 className="text-3xl font-bold text-gray-900">קורסים בקטגוריה {categoryId}</h1>
// //         <p className="mt-2 text-gray-600">בחר קורס כדי לצפות בפרטים או לרכוש</p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {courses.map((course) => (
// //           <div key={course.folderId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //             <div className="p-6">
// //               <div className="flex items-center space-x-2 space-x-reverse mb-3">
// //                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
// //                   <BookOpen className="h-5 w-5 text-blue-600" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
// //                   <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600">
// //                     <User className="h-4 w-4" />
// //                     <span>{course.teacherName}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

// //               <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mb-4">
// //                 <div className="flex items-center space-x-1 space-x-reverse">
// //                   <Clock className="h-4 w-4" />
// //                   <span>{course.numberOfLessons} שיעורים</span>
// //                 </div>
// //               </div>

// //               <div className="flex space-x-2 space-x-reverse">
// //                 {canViewCourse(course) ? (
// //                   <Link
// //                     to={`/course/${course.courseId}`}
// //                     className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
// //                   >
// //                     {/* <Eye className="h-4 w-4" /> */}
// //                     <span>כניסה לקורס</span>
// //                   </Link>
// //                 ) : (
// //                   <Link
// //                     to={`/purchase/${course.courseId}`}
// //                     className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
// //                   >
// //                     <ShoppingCart className="h-4 w-4" />
// //                     <span>לרכישה</span>
// //                   </Link>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {courses.length === 0 && (
// //         <div className="text-center py-12">
// //           <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //           <h3 className="text-lg font-medium text-gray-900 mb-2">אין קורסים זמינים</h3>
// //           <p className="text-gray-600">בקרוב יתווספו קורסים חדשים לקטגוריה זו</p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Courses
// // "use client"

// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { useParams, Link } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { useAuth } from "../contexts/AuthContext"
// // import { BookOpen, User, Clock, ShoppingCart } from "lucide-react"

// // interface Course {
// //   folderId: number
// //   courseId: number
// //   teacherId: number
// //   teacherName: string
// //   title: string
// //   description: string
// //   numberOfLessons: number
// //   categoryId: number
// // }

// // // פונקציה לבדוק אם הקורס נרכש
// // // const isCoursePurchased = (courseId: number) => {
// // //   const purchased = JSON.parse(localStorage.getItem("purchasedCourses") || "[]")
// // //   return purchased.includes(courseId)
// // // }

// // const Courses: React.FC = () => {
// //   const { categoryId } = useParams<{ categoryId: string }>()
// //   const { user } = useAuth()
// //   const [courses, setCourses] = useState<Course[]>([])
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     loadCourses()
// //   }, [categoryId])

// //   const loadCourses = async () => {
// //     try {
// //       const folders = await folderApi.getAllFolders()
// //       const filteredCourses = folders.filter((folder: any) =>
// //         folder.categoryId == Number(categoryId) &&
// //         folder.courseId != null &&
// //         folder.teacherId != null &&
// //         folder.title 
// //         // folder.price != null
// // )

      
// //       setCourses(filteredCourses)
// //     } catch (error) {
// //       console.error("Error loading courses:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const canViewCourse = (course: Course) => {
// //     return (
// //       (user?.role === "Teacher" && course.teacherId === user.userId) 
// //       // isCoursePurchased(course.courseId)
// //     )
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="space-y-8">
// //       <div>
// //         <h1 className="text-3xl font-bold text-gray-900">קורסים בקטגוריה {categoryId}</h1>
// //         <p className="mt-2 text-gray-600">בחר קורס כדי לצפות בפרטים או לרכוש</p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {courses.map((course) => (
// //           <div key={course.folderId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //             <div className="p-6">
// //               <div className="flex items-center space-x-2 space-x-reverse mb-3">
// //                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
// //                   <BookOpen className="h-5 w-5 text-blue-600" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
// //                   <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600">
// //                     <User className="h-4 w-4" />
// //                     <span>{course.teacherName}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

// //               <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mb-4">
// //                 <div className="flex items-center space-x-1 space-x-reverse">
// //                   <Clock className="h-4 w-4" />
// //                   <span>{course.numberOfLessons} שיעורים</span>
// //                 </div>
// //               </div>

// //               <div className="flex space-x-2 space-x-reverse">
// //                 {canViewCourse(course) ? (
// //                   <Link
// //                     to={`/course/${course.courseId}`}
// //                     className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
// //                   >
// //                     {/* <Eye className="h-4 w-4" /> */}
// //                     <span>כניסה לקורס</span>
// //                   </Link>
// //                 ) : (
// //                   <Link
// //                     to={`/purchase/${course.courseId}`}
// //                     className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 space-x-reverse"
// //                   >
// //                     <ShoppingCart className="h-4 w-4" />
// //                     <span>לרכישה</span>
// //                   </Link>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {courses.length === 0 && (
// //         <div className="text-center py-12">
// //           <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
// //           <h3 className="text-lg font-medium text-gray-900 mb-2">אין קורסים זמינים</h3>
// //           <p className="text-gray-600">בקרוב יתווספו קורסים חדשים לקטגוריה זו</p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Courses
// // "use client"

// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { useParams, Link } from "react-router-dom"
// // import { folderApi } from "../services/api"
// // import { useAuth } from "../contexts/AuthContext"
// // import { BookOpen, User, Clock, ShoppingCart, Star } from "lucide-react"

// // interface Course {
// //   folderId: number
// //   courseId: number
// //   teacherId: number
// //   teacherName: string
// //   title: string
// //   description: string
// //   numberOfLessons: number
// //   categoryId: number
// // }

// // const Courses: React.FC = () => {
// //   const { categoryId } = useParams<{ categoryId: string }>()
// //   const { user } = useAuth()
// //   const [courses, setCourses] = useState<Course[]>([])
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     loadCourses()
// //   }, [categoryId])

// //   const loadCourses = async () => {
// //     try {
// //       const folders = await folderApi.getAllFolders()
// //       const filteredCourses = folders.filter(
// //         (folder: any) =>
// //           folder.categoryId == Number(categoryId) &&
// //           folder.courseId != null &&
// //           folder.teacherId != null &&
// //           folder.title,
// //       )

// //       setCourses(filteredCourses)
// //     } catch (error) {
// //       console.error("Error loading courses:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const canViewCourse = (course: Course) => {
// //     return user?.role === "Teacher" && course.teacherId === user.userId
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
// //           {/* <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg">
// //             <img src="/logo.png" alt="LearnAhead Logo" className="w-full h-full object-cover" />
// //           </div> */}
// //           <Star className="h-6 w-6 text-blue-500" />
// //         </div>
// //         <h1 className="text-4xl font-bold text-gray-900 mb-4">קורסים בקטגוריה {categoryId}</h1>
// //         <p className="text-lg text-gray-600">בחר קורס כדי לצפות בפרטים או לרכוש</p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //         {courses.map((course, index) => (
// //           <div
// //             key={course.folderId}
// //             className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300 overflow-hidden transform hover:scale-105"
// //           >
// //             <div className="p-6">
// //               <div className="flex items-center space-x-3 space-x-reverse mb-4">
// //                 <div
// //                   className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
// //                     index % 3 === 0
// //                       ? "bg-gradient-to-br from-blue-500 to-blue-600"
// //                       : index % 3 === 1
// //                         ? "bg-gradient-to-br from-purple-500 to-purple-600"
// //                         : "bg-gradient-to-br from-green-500 to-green-600"
// //                   }`}
// //                 >
// //                   <BookOpen className="h-6 w-6 text-white" />
// //                 </div>
// //                 <div className="flex-1">
// //                   <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
// //                     {course.title}
// //                   </h3>
// //                   <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600">
// //                     <User className="h-4 w-4" />
// //                     <span>{course.teacherName}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

// //               <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mb-6">
// //                 <div className="flex items-center space-x-1 space-x-reverse">
// //                   <Clock className="h-4 w-4" />
// //                   <span>{course.numberOfLessons} שיעורים</span>
// //                 </div>
// //               </div>

// //               <div className="flex space-x-2 space-x-reverse">
// //                 {canViewCourse(course) ? (
// //                   <Link
// //                     to={`/course/${course.courseId}`}
// //                     className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-3 px-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-1 space-x-reverse font-semibold shadow-lg"
// //                   >
// //                     <span>כניסה לקורס</span>
// //                   </Link>
// //                 ) : (
// //                   <Link
// //                     to={`/purchase/${course.courseId}`}
// //                     className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-1 space-x-reverse font-semibold shadow-lg"
// //                   >
// //                     <ShoppingCart className="h-4 w-4" />
// //                     <span>לרכישה</span>
// //                   </Link>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {courses.length === 0 && (
// //         <div className="text-center py-16">
// //           <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
// //             <BookOpen className="h-12 w-12 text-gray-400" />
// //           </div>
// //           <h3 className="text-2xl font-semibold text-gray-900 mb-4">אין קורסים זמינים</h3>
// //           <p className="text-gray-600 max-w-md mx-auto">בקרוב יתווספו קורסים חדשים לקטגוריה זו</p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Courses
