// "use client";

// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { folderApi } from "../services/api";

// interface Folder {
//   folderId: number;
//   categoryId: number | null;
//   courseId: number | null;
//   lessonId: number | null;
//   title: string;
//   description: string;
// }

// interface FoldersContextType {
//   allFolders: Folder[];
//   reloadFolders: () => Promise<void>;
//   getLessonCountByCourseId: (courseId: number) => number;
// }

// const FoldersContext = createContext<FoldersContextType | undefined>(undefined);

// export const useFolders = (): FoldersContextType => {
//   const context = useContext(FoldersContext);
//   if (!context) {
//     throw new Error("useFolders must be used within a FoldersProvider");
//   }
//   return context;
// };

// export const FoldersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [allFolders, setAllFolders] = useState<Folder[]>([]);

//   const reloadFolders = async () => {
//     try {
//       const folders = await folderApi.getAllFolders();
//       setAllFolders(folders);
//     } catch (error) {
//       console.error("שגיאה בטעינת תיקיות:", error);
//     }
//   };

//   const getLessonCountByCourseId = (courseId: number) => {
//     return allFolders.filter(
//       (f) => f.courseId === courseId && f.lessonId !== null
//     ).length;
//   };

//   useEffect(() => {
//     reloadFolders();
//   }, []);

//   return (
//     <FoldersContext.Provider value={{ allFolders, reloadFolders, getLessonCountByCourseId }}>
//       {children}
//     </FoldersContext.Provider>
//   );
// };
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { folderApi } from "../services/api"

interface Folder {
  folderId: number
  courseId: number | null
  lessonId: number | null
  teacherId: number | null
  teacherName?: string
  title?: string
  description?: string
  categoryId: number
}

interface FoldersContextType {
  folders: Folder[]
  loading: boolean
  checkIfCoursePurchased: (folderId: number) => Promise<boolean>
  refreshFolders: () => Promise<void>
}

const FoldersContext = createContext<FoldersContextType | undefined>(undefined)

export const useFolders = () => {
  const context = useContext(FoldersContext)
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider")
  }
  return context
}

export const FoldersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)

  const loadFolders = async () => {
    try {
      const data = await folderApi.getAllFolders()
      setFolders(data)
    } catch (error) {
      console.error("שגיאה בטעינת תיקיות:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFolders()
  }, [])

  const checkIfCoursePurchased = async (folderId: number): Promise<boolean> => {
    try {
      const result = await folderApi.checkIfCoursePurchased(folderId)
      return result === true
    } catch (error) {
      return false
    }
  }

  return (
    <FoldersContext.Provider
      value={{
        folders,
        loading,
        checkIfCoursePurchased,
        refreshFolders: loadFolders,
      }}
    >
      {children}
    </FoldersContext.Provider>
  )
}
