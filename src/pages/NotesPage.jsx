import React, { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../api/api';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const subjects = [
  "Maths", "Computer", "General Knowledge",
  "Who is Who", "What is What", "Academic", "Physics"
];

const NotesPage = () => {
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newNote, setNewNote] = useState({ 
    title: '', 
    answer: '', 
    explanation: '', 
    subject: subjects[0] 
  });
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalCount: 0,
    totalPages: 1
  });

  useEffect(() => {
    checkAdminStatus();
    fetchNotes(1);
  }, [activeSubject]);

  const checkAdminStatus = () => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      const adminStatus = storedRole.toLowerCase() === 'admin';
      setIsAdmin(adminStatus);
      return adminStatus;
    }
    
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const roleClaimKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        const userRole = payload[roleClaimKey] || payload.role;
        
        const adminStatus = userRole && userRole.toLowerCase() === 'admin';
        setIsAdmin(adminStatus);
        return adminStatus;
      } catch (err) {
        console.error('Error decoding token:', err);
        setIsAdmin(false);
        return false;
      }
    } else {
      setIsAdmin(false);
      return false;
    }
  };

  const getToken = () => {
    return localStorage.getItem('authToken') || localStorage.getItem('token');
  };

  const fetchNotes = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await getNotes(activeSubject, pageNum, pagination.limit, token);
      setNotes(response?.items || []);
      setPagination({
        page: response?.pageNumber || 1,
        limit: pagination.limit,
        totalCount: response?.totalCount || 0,
        totalPages: response?.totalPages || 1
      });
      setExpandedNoteId(null);
    } catch (err) {
      setError(`Failed to load notes: ${err.response?.data?.message || err.message}`);
      setNotes([]);
      setPagination({
        page: 1,
        limit: pagination.limit,
        totalCount: 0,
        totalPages: 1
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    const adminStatus = checkAdminStatus();
    if (!adminStatus) {
      setError('Only administrators can create notes');
      return;
    }
    
    setFormLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      
      await createNote({ 
        ...newNote, 
        createdAt: new Date().toISOString() 
      }, token);
      
      setNewNote({ 
        title: '', 
        answer: '', 
        explanation: '', 
        subject: activeSubject 
      });
      setSuccess('Note created successfully!');
      fetchNotes(1);
    } catch (err) {
      setError(`Failed to create note: ${err.response?.data?.message || err.message}`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    const adminStatus = checkAdminStatus();
    if (!adminStatus) {
      setError('Only administrators can update notes');
      return;
    }
    
    setFormLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      
      await updateNote(editingNote.id, editingNote, token);
      setSuccess('Note updated successfully!');
      setIsEditing(false);
      setEditingNote(null);
      fetchNotes(pagination.page);
    } catch (err) {
      setError(`Failed to update note: ${err.response?.data?.message || err.message}`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    const adminStatus = checkAdminStatus();
    if (!adminStatus) {
      setError('Only administrators can delete notes');
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      
      await deleteNote(id, token);
      setSuccess('Note deleted successfully!');
      if (notes.length === 1 && pagination.page > 1) {
        fetchNotes(pagination.page - 1);
      } else {
        fetchNotes(pagination.page);
      }
    } catch (err) {
      setError(`Failed to delete note: ${err.response?.data?.message || err.message}`);
    }
  };

  const startEditing = (note) => {
    const adminStatus = checkAdminStatus();
    if (!adminStatus) {
      setError('Only administrators can edit notes');
      return;
    }
    
    setEditingNote({ ...note });
    setIsEditing(true);
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingNote(null);
  };

  const toggleExplanation = (id) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  const isFormValid = (isEditing ? editingNote?.title : newNote.title)?.trim() && 
                     (isEditing ? editingNote?.answer : newNote.answer)?.trim();

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getVisiblePages = () => {
    const { page, totalPages } = pagination;
    const visiblePages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
      let endPage = startPage + maxVisible - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }
    }
    
    return visiblePages;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans text-[#333] transition-all duration-300">
      <header className="text-center mb-8 relative z-10 animate-fadeIn">
        <h1 className="text-[2.5rem] font-bold mb-4 text-[#2d3748] relative inline-block">
          <span className="bg-gradient-to-r from-[#1a4b8c] to-[#3a7ca5] bg-clip-text text-transparent">
            📚 Notes Manager
          </span>
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#1a4b8c] to-[#3a7ca5] rounded"></span>
        </h1>
        <p className="text-[1.1rem] text-[#666] max-w-[700px] mx-auto leading-relaxed">
          Get latest study notes
        </p>
        
        <div className={`mt-2 px-4 py-1 rounded-full text-sm font-medium inline-block ${
          isAdmin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isAdmin ? 'Admin Mode' : 'Viewer Mode'}
        </div>
      </header>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {subjects.map(subject => (
          <button
            key={subject}
            className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeSubject === subject 
                ? 'bg-gradient-to-br from-[#1a4b8c] to-[#3a7ca5] text-white shadow-md' 
                : 'bg-[#edf2f7] hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow'
            }`}
            onClick={() => {
              setActiveSubject(subject);
              setIsEditing(false);
              setEditingNote(null);
            }}
          >
            {subject}
          </button>
        ))}
      </div>

      <div>
        {error && (
          <div className="p-3 rounded-lg flex items-center gap-2 mb-6 animate-slideDown bg-[#fff5f5] text-[#e53e3e] border border-[#fed7d7]">
            <span>⚠️</span>
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg flex items-center gap-2 mb-6 animate-slideDown bg-[#f0fff4] text-[#38a169] border border-[#c6f6d5]">
            <span>✅</span>
            {success}
          </div>
        )}
      </div>

      {/* Notes Display Section */}
      <section className="bg-white rounded-[15px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[1.5rem] font-bold text-[#333]">{activeSubject} Notes</h2>
          <span className="bg-[#edf2f7] px-3 py-1 rounded-full text-sm font-medium">
            {pagination.totalCount} notes
          </span>
        </div>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search notes..."
            className="flex-1 px-3 py-2 border border-[#e2e8f0] rounded-md text-base transition-all duration-200 focus:outline-none focus:border-[#4299e1] focus:ring-2 focus:ring-[rgba(66,153,225,0.2)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-[200px] text-[#718096]">
            <div className="w-8 h-8 border-3 border-t-[#4299e1] border-r-[rgba(66,153,225,0.3)] border-b-[rgba(66,153,225,0.3)] border-l-[rgba(66,153,225,0.3)] rounded-full animate-spin"></div>
          </div>
        ) : (notes?.length || 0) === 0 ? (
          <div className="text-center py-8 text-[#718096]">
            <p>No notes found for this subject.</p>
            <button 
              className="mt-4 px-4 py-2 bg-[#4299e1] text-white rounded-md hover:bg-[#3182ce] transition-all duration-200 hover:-translate-y-0.5"
              onClick={() => fetchNotes(1)}
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {filteredNotes?.map(note => (
                <div 
                  className="bg-white rounded-[15px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] border-3 border-[#e2e8f0] hover:-translate-y-2"
                  key={note.id}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[1.5rem] font-bold text-[#333]">
                      {note.title}
                    </h3>
                    <div className="flex gap-2">
                      <button 
                        className="text-gray-500 hover:text-gray-700 text-base"
                        onClick={() => toggleExplanation(note.id)}
                      >
                        {expandedNoteId === note.id ? '▲' : '▼'}
                      </button>
                      
                      {isAdmin && (
                        <>
                          <button
                            className="text-[#4299e1] hover:text-[#3182ce] text-base"
                            onClick={() => startEditing(note)}
                          >
                            ✏️
                          </button>
                          <button
                            className="text-[#e53e3e] hover:text-[#c53030] text-base"
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="my-3 text-[#666] leading-relaxed">
                    <strong>Answer:</strong> {note.answer}
                  </p>
                  
                  {expandedNoteId === note.id && (
                    <div className="mt-4 pt-4 border-t border-[#edf2f7] animate-fadeIn">
                      <h4 className="font-semibold mb-2">Explanation:</h4>
                      {note.explanation?.trim() ? (
                        <p className="text-[#666]">{note.explanation}</p>
                      ) : (
                        <p className="text-[#a0aec0] italic">
                          No explanation provided.
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end">
                    <time className="text-xs text-[#a0aec0]">
                      {new Date(note.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  </div>
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-8">
                <div>Showing page {pagination.page} of {pagination.totalPages}</div>
                <div className="flex gap-2 flex-wrap justify-center">
                  <button
                    className={`px-3 py-2 border border-[#e2e8f0] rounded-md text-center min-w-[40px] transition-all duration-200 ${
                      pagination.page === 1 
                        ? 'bg-[#e2e8f0] cursor-not-allowed' 
                        : 'bg-white hover:bg-[#edf2f7]'
                    }`}
                    onClick={() => fetchNotes(1)}
                    disabled={pagination.page === 1}
                  >
                    « First
                  </button>
                  <button
                    className={`px-3 py-2 border border-[#e2e8f0] rounded-md text-center min-w-[40px] transition-all duration-200 ${
                      pagination.page === 1 
                        ? 'bg-[#e2e8f0] cursor-not-allowed' 
                        : 'bg-white hover:bg-[#edf2f7]'
                    }`}
                    onClick={() => fetchNotes(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    ‹ Prev
                  </button>
                  
                  {getVisiblePages().map(pageNum => (
                    <button
                      key={pageNum}
                      className={`px-3 py-2 border rounded-md text-center min-w-[40px] transition-all duration-200 ${
                        pagination.page === pageNum 
                          ? 'border-[#4299e1] bg-[#4299e1] text-white' 
                          : 'border-[#e2e8f0] bg-white hover:bg-[#edf2f7]'
                      }`}
                      onClick={() => fetchNotes(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}
                  
                  <button
                    className={`px-3 py-2 border border-[#e2e8f0] rounded-md text-center min-w-[40px] transition-all duration-200 ${
                      pagination.page === pagination.totalPages 
                        ? 'bg-[#e2e8f0] cursor-not-allowed' 
                        : 'bg-white hover:bg-[#edf2f7]'
                    }`}
                    onClick={() => fetchNotes(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Next ›
                  </button>
                  <button
                    className={`px-3 py-2 border border-[#e2e8f0] rounded-md text-center min-w-[40px] transition-all duration-200 ${
                      pagination.page === pagination.totalPages 
                        ? 'bg-[#e2e8f0] cursor-not-allowed' 
                        : 'bg-white hover:bg-[#edf2f7]'
                    }`}
                    onClick={() => fetchNotes(pagination.totalPages)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Last »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Form Section */}
      <section id="form-section" className="bg-white rounded-[15px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
        {isAdmin ? (
          <>
            <h2 className="text-[1.5rem] font-bold text-[#333] mb-6">
              {isEditing ? 'Edit Note' : 'Create New Note'}
            </h2>
            <form onSubmit={isEditing ? handleUpdateNote : handleCreateNote}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 font-medium text-[#4a5568]">Subject</label>
                  <select 
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md text-base transition-all duration-200 focus:outline-none focus:border-[#4299e1] focus:ring-2 focus:ring-[rgba(66,153,225,0.2)]"
                    value={isEditing ? editingNote?.subject : newNote.subject} 
                    onChange={(e) => isEditing 
                      ? setEditingNote({ ...editingNote, subject: e.target.value })
                      : setNewNote({ ...newNote, subject: e.target.value })
                    }
                    disabled={isEditing}
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-[#4a5568]">Title*</label>
                  <input 
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md text-base transition-all duration-200 focus:outline-none focus:border-[#4299e1] focus:ring-2 focus:ring-[rgba(66,153,225,0.2)]"
                    type="text" 
                    value={isEditing ? editingNote?.title : newNote.title} 
                    onChange={e => isEditing 
                      ? setEditingNote({ ...editingNote, title: e.target.value })
                      : setNewNote({ ...newNote, title: e.target.value })
                    } 
                    placeholder="Enter note title"
                    required 
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium text-[#4a5568]">Answer*</label>
                <input 
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md text-base transition-all duration-200 focus:outline-none focus:border-[#4299e1] focus:ring-2 focus:ring-[rgba(66,153,225,0.2)]"
                  type="text" 
                  value={isEditing ? editingNote?.answer : newNote.answer} 
                  onChange={e => isEditing 
                    ? setEditingNote({ ...editingNote, answer: e.target.value })
                    : setNewNote({ ...newNote, answer: e.target.value })
                  } 
                  placeholder="Enter the answer"
                  required 
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium text-[#4a5568]">Explanation</label>
                <textarea 
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-md text-base transition-all duration-200 focus:outline-none focus:border-[#4299e1] focus:ring-2 focus:ring-[rgba(66,153,225,0.2)] min-h-[100px]"
                  value={isEditing ? editingNote?.explanation : newNote.explanation} 
                  onChange={e => isEditing 
                    ? setEditingNote({ ...editingNote, explanation: e.target.value })
                    : setNewNote({ ...newNote, explanation: e.target.value })
                  } 
                  placeholder="Add detailed explanation (optional)"
                />
              </div>

              <div className="flex gap-2">
                <button 
                  type="submit" 
                  disabled={!isFormValid || formLoading}
                  className="px-6 py-3 bg-[#4299e1] text-white font-medium rounded-full flex justify-center items-center gap-2 transition-all duration-300 hover:bg-[#333] hover:translate-x-1 shadow-[0_4px_15px_rgba(66,153,225,0.25)] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {formLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {isEditing ? 'Update Note' : 'Add Note'} <ArrowRight size={16} />
                    </>
                  )}
                </button>

                {isEditing && (
                  <button 
                    type="button" 
                    className="px-6 py-3 bg-[#e53e3e] text-white font-medium rounded-full flex justify-center items-center gap-2 transition-all duration-300 hover:bg-[#c53030] hover:shadow-[0_4px_15px_rgba(229,62,62,0.25)]"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-[1.5rem] font-bold text-[#333] mb-4">Admin Access Required</h2>
            <p className="text-[#718096] mb-4">
              You need administrator privileges to create or edit notes.
            </p>
            <button 
              className="px-6 py-3 bg-[#4299e1] text-white font-medium rounded-full transition-all duration-300 hover:bg-[#3182ce] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(66,153,225,0.25)]"
              onClick={() => {
                window.location.href = '/login';
              }}
            >
              Login as Admin
            </button>
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideDown {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NotesPage;