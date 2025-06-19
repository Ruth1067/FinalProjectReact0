import axios from "axios";
// import type { Note } from '../pages/Notes'; // עדכן את הנתיב הנכון

const API_BASE_URL = "https://learnaheadserver.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {}
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== AUTH ==========
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/api/auth/profile");
    return response.data;
  }
};

// ========== FOLDER ==========
export const folderApi = {
  getAllFolders: async () => {
    const response = await api.get("/api/folder");
    // console.log("תיקיות מהממשק:", response.data);
    return response.data.data;
  },


  addCourse: async (courseData: any) => {
    const response = await api.post("/api/folder/add-folder", courseData);
    return response.data.data;
  },

  // addLesson: async (lessonData: any, courseId: number, lessonId: number) => {
  //   const response = await api.post("/api/folder/add-lesson", lessonData, courseId, lessonId);
  //   return response.data;
  // },
  addLesson: async (lessonData: any, courseId: number, lessonId: number) => {
    const response = await api.post("/api/folder/add-lesson", {
        lessonData,
        courseId,
        lessonId,
    });
    return response.data;
},


  getFolderById: async (id: number) => {
    const response = await api.get(`/api/folder/${id}`);
    return response.data;
  },

  // purchaseFolder: async (userId: string, folderId: string) => {
  //   const response = await api.post(`/api/folder/${userId}/purchase/${folderId}`);
  //   return response.data;
  // },
  purchaseFolder: async (folderId: string) => {
    const response = await api.post(`/api/folder/purchase/${folderId}`);
    return response.data;
  },
  checkIfCoursePurchased: async (folderId: number) => {
    const response = await api.get(`/api/folder/check-purchase/${folderId}`);
    return response.data;
  },
  

  getCourseStudents: async (folderId: number) => {
    const res = await api.get(`/api/folder/${folderId}/students`);
    return res.data.data; // ← רשימת התלמידים
  },
  // sendTeacherEmail: async (folderId: number, ) => {
  //   console.log("שליחת מייל עבור folderId:", folderId)
  //   const response = await api.post(`/api/folder/send-teacher-email/${folderId}`);
  //   return response.data;
  // }
  sendTeacherEmail: async (folderId: number, bodyHtml: string) => {
    console.log("שליחת מייל עבור folderId:", folderId);
    const response = await api.post(`/api/folder/send-teacher-email`, null, {
      params: {
        folderId,
        bodyHtml,
      }
    });
    return response.data;
  }

  // sendTeacherEmail: async (folderId: number) => {
  //   const bodyHtml = prompt("אנא הכנס את תוכן המייל:");

  //   if (!folderId || !bodyHtml) {
  //       console.error("folderId או bodyHtml לא הוזנו.");
  //       return;
  //   }

  //   try {
  //       const response = await api.post('/api/folder/send-teacher-email', {
  //           folderId,
  //           bodyHtml
  //       });
  //       return response.data;
  //   } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //           console.error("שגיאה בבקשה:", error.response?.data.errors);
  //       } else {
  //           console.error("שגיאה לא ידועה:", error);
  //       }
  //       throw error;
  //   }


  // try {
  //   const response = await api.post('/api/folder/send-teacher-email', {
  //     folderId, // מזהה תיקיה
  //     bodyHtml // תוכן המייל
  //   });
  //   return response.data;
  // } catch (error) {
  //   console.error("שגיאה בבקשה:", error);
  //   throw error; // כך תוכל לתפוס את השגיאה בחלק הקורא
  // }
}



// sendTeacherEmail: async (
//   fromEmail: string,
//   toEmail: string,
//   subject: string,
//   bodyHtml: string
// ) => {
//   const response = await api.post("/api/folder/send-teacher-email", null, {
//     params: {
//       fromEmail,
//       toEmail,
//       subject,
//       bodyHtml
//     }
//   });
//   return response.data;
// }


// };

// ========== UPLOAD ==========
// export const uploadApi = {
//   uploadFile: async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     const response = await api.post("/upload/upload-file", formData);
//     return response.data;
//   },
export const uploadApi = {
  uploadFile: async (file: File, courseId: number, lessonId: number) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", courseId.toString());
    formData.append("lessonId", lessonId.toString());

    const response = await api.post("/upload/upload-file", formData);
    return response.data;
  },


  getTranscript: async (fileName: string) => {
    const response = await api.get(`/upload/transcript?fileName=${fileName}`);
    return response.data.data;
  }
};

// ========== USER ==========
export const userApi = {
  getUserById: async (userId: number) => {
    const response = await api.get(`/api/user/${userId}`);
    return response.data;
  },

  getUserCourses: async (userId: number) => {
    const response = await api.get(`/api/user/${userId}/folders`);
    return response.data.data;
  },

  // getCourseStudents: async (courseId: number) => {
  //   const response = await api.get(`/api/user/${courseId}/usersFolders`);
  //   return response.data;
  // }

  // פונקציה חדשה לרישום לקורס
  // enrollInCourse: async (userId: number, folderId: number) => {
  //   const response = await api.post("/api/user/enroll", { userId, folderId }); // שולח userId ו-folderId
  //   return response.data;
  // },
};
// export const notesApi = {
//   getNotes: async (userId: number) => {
//     const response = await api.get(`/api/notes/${userId}`);
//     return response.data;
//   },

//   createNote: async (note: Note) => {
//     const response = await api.post("/api/notes", note);
//     return response.data;
//   },

//   updateNote: async (id: number, note: Note) => {
//     const response = await api.put(`/api/notes/${id}`, note);
//     return response.data;
//   },

//   deleteNote: async (id: number) => {
//     await api.delete(`/api/notes/${id}`);
//   },
// };

export const notesApi = {
  getNotes: async (userId: number) => {
    const response = await api.get(`/api/notes/${userId}`);
    return response.data;
  },

  createNote: async (note: any) => {
    console.log("Sending note:", note);
    const response = await api.post("/api/notes", note);
    return response.data;
  },

  updateNote: async (id: number, note: any) => {
    const response = await api.put(`/api/notes/${id}`, note);
    return response.data;
  },

  deleteNote: async (id: number) => {
    await api.delete(`/api/notes/${id}`);
  },
};


export default api;
