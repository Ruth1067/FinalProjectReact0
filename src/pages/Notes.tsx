"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FileText, Plus, Edit, Trash2, Save, X } from "lucide-react"

interface Note {
  id: number
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [newNote, setNewNote] = useState({ title: "", content: "" })

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = () => {
    // Load notes from localStorage
    const savedNotes = localStorage.getItem("userNotes")
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }))
      setNotes(parsedNotes)
    }
  }

  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem("userNotes", JSON.stringify(updatedNotes))
    setNotes(updatedNotes)
  }

  const createNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return

    const note: Note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updatedNotes = [note, ...notes]
    saveNotes(updatedNotes)
    setNewNote({ title: "", content: "" })
    setIsCreating(false)
  }

  const updateNote = () => {
    if (!editingNote) return

    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id ? { ...editingNote, updatedAt: new Date() } : note,
    )
    saveNotes(updatedNotes)
    setEditingNote(null)
  }

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    saveNotes(updatedNotes)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">המחברת שלי</h1>
          <p className="mt-2 text-gray-600">נהל את ההערות והרשימות האישיות שלך</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse"
        >
          <Plus className="h-4 w-4" />
          <span>הערה חדשה</span>
        </button>
      </div>

      {/* Create New Note */}
      {isCreating && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">הערה חדשה</h3>
            <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="כותרת ההערה"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              placeholder="תוכן ההערה"
              rows={4}
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={createNote}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
              >
                <Save className="h-4 w-4" />
                <span>שמור</span>
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {editingNote?.id === note.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                  rows={4}
                  value={editingNote.content}
                  onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={updateNote}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1 space-x-reverse"
                  >
                    <Save className="h-3 w-3" />
                    <span>שמור</span>
                  </button>
                  <button
                    onClick={() => setEditingNote(null)}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    ביטול
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{note.title}</h3>
                  </div>
                  <div className="flex space-x-1 space-x-reverse">
                    <button
                      onClick={() => setEditingNote(note)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-4">{note.content}</p>
                <div className="text-xs text-gray-500">
                  <p>נוצר: {formatDate(note.createdAt)}</p>
                  {note.updatedAt.getTime() !== note.createdAt.getTime() && <p>עודכן: {formatDate(note.updatedAt)}</p>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {notes.length === 0 && !isCreating && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">אין הערות עדיין</h3>
          <p className="text-gray-600 mb-4">התחל לכתוב הערות ורשימות כדי לארגן את הלמידה שלך</p>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 ml-1" />
            צור הערה ראשונה
          </button>
        </div>
      )}
    </div>
  )
}

export default Notes
