import React, { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../api/api';

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

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalCount: 0,
    totalPages: 1
  });

  useEffect(() => {
    fetchNotes(1);
  }, [activeSubject]);

  const fetchNotes = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getNotes(activeSubject, pageNum, pagination.limit);
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
    setFormLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await createNote({ 
        ...newNote, 
        createdAt: new Date().toISOString() 
      });
      setNewNote({ 
        title: '', 
        answer: '', 
        explanation: '', 
        subject: activeSubject 
      });
      setSuccess('Note created successfully!');
      fetchNotes(1);
    } catch (err) {
      setError('Failed to create note. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await updateNote(editingNote.id, editingNote);
      setSuccess('Note updated successfully!');
      setIsEditing(false);
      setEditingNote(null);
      fetchNotes(pagination.page);
    } catch (err) {
      setError('Failed to update note. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      await deleteNote(id);
      setSuccess('Note deleted successfully!');
      if (notes.length === 1 && pagination.page > 1) {
        fetchNotes(pagination.page - 1);
      } else {
        fetchNotes(pagination.page);
      }
    } catch (err) {
      setError('Failed to delete note. Please try again.');
    }
  };

  const startEditing = (note) => {
    setEditingNote({ ...note });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#333',
      transition: 'all 0.3s ease'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '2rem',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '0.5rem',
          color: '#2d3748',
          background: 'linear-gradient(90deg, #4299e1, #38b2ac)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'inline-block'
        }}>📚 Notes Manager</h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#718096',
          marginBottom: '0'
        }}>Organize and manage your study notes</p>
      </header>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '2rem',
        justifyContent: 'center'
      }}>
        {subjects.map(subject => (
          <button
            key={subject}
            style={{
              padding: '0.5rem 1.25rem',
              background: activeSubject === subject 
                ? 'linear-gradient(135deg, #4299e1, #3182ce)' 
                : '#edf2f7',
              color: activeSubject === subject ? 'white' : 'inherit',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              boxShadow: activeSubject === subject 
                ? '0 2px 5px rgba(66, 153, 225, 0.3)' 
                : 'none',
              ...(activeSubject !== subject && {
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
              })
            }}
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
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            animation: 'slideDown 0.3s ease-out',
            backgroundColor: '#fff5f5',
            color: '#e53e3e',
            border: '1px solid #fed7d7'
          }}>
            <span>⚠️</span>
            {error}
          </div>
        )}
        {success && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            animation: 'slideDown 0.3s ease-out',
            backgroundColor: '#f0fff4',
            color: '#38a169',
            border: '1px solid #c6f6d5'
          }}>
            <span>✅</span>
            {success}
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        '@media (min-width: 1024px)': {
          flexDirection: 'row'
        }
      }}>
        <section style={{
          flex: 2,
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2>{activeSubject} Notes</h2>
            <span style={{
              background: '#edf2f7',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>{pagination.totalCount} notes</span>
          </div>

          <div style={{
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              placeholder="Search notes..."
              style={{
                flex: 1,
                padding: '0.625rem 0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                ':focus': {
                  outline: 'none',
                  borderColor: '#4299e1',
                  boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.2)'
                }
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              color: '#718096'
            }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                border: '3px solid rgba(66, 153, 225, 0.3)',
                borderRadius: '50%',
                borderTopColor: '#4299e1',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          ) : (notes?.length || 0) === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#718096'
            }}>
              <p>No notes found for this subject.</p>
              <button 
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: '#4299e1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ':hover': {
                    background: '#3182ce',
                    transform: 'translateY(-1px)'
                  }
                }}
                onClick={() => fetchNotes(1)}
              >
                Refresh
              </button>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {filteredNotes?.map(note => (
                  <div 
                    style={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '1.25rem',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.2s ease',
                      ':hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      },
                      ...(expandedNoteId === note.id && {
                        gridColumn: '1 / -1'
                      })
                    }}
                    key={note.id}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        margin: '0',
                        color: '#2d3748'
                      }}>{note.title}</h3>
                      <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button 
                          style={{
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            fontSize: '1rem'
                          }}
                          onClick={() => toggleExplanation(note.id)}
                        >
                          {expandedNoteId === note.id ? '▲' : '▼'}
                        </button>
                        <button
                          style={{
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            color: '#4299e1',
                            fontSize: '1rem'
                          }}
                          onClick={() => startEditing(note)}
                        >
                          ✏️
                        </button>
                        <button
                          style={{
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            color: '#e53e3e',
                            fontSize: '1rem'
                          }}
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <p style={{
                      margin: '0.5rem 0',
                      color: '#4a5568'
                    }}><strong>Answer:</strong> {note.answer}</p>
                    
                    {expandedNoteId === note.id && (
                      <div style={{
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid #edf2f7',
                        animation: 'fadeIn 0.3s ease-out'
                      }}>
                        <h4>Explanation:</h4>
                        {note.explanation?.trim() ? (
                          <p>{note.explanation}</p>
                        ) : (
                          <p style={{
                            color: '#a0aec0',
                            fontStyle: 'italic'
                          }}>No explanation provided.</p>
                        )}
                      </div>
                    )}
                    
                    <div style={{
                      marginTop: '1rem',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}>
                      <time style={{
                        fontSize: '0.75rem',
                        color: '#a0aec0'
                      }}>
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
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '2rem'
                }}>
                  <div>Showing page {pagination.page} of {pagination.totalPages}</div>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}>
                    <button
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #e2e8f0',
                        background: pagination.page === 1 ? '#e2e8f0' : 'white',
                        borderRadius: '6px',
                        cursor: pagination.page === 1 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        minWidth: '40px',
                        textAlign: 'center',
                        ':hover': pagination.page !== 1 && {
                          background: '#edf2f7'
                        }
                      }}
                      onClick={() => fetchNotes(1)}
                      disabled={pagination.page === 1}
                    >
                      « First
                    </button>
                    <button
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #e2e8f0',
                        background: pagination.page === 1 ? '#e2e8f0' : 'white',
                        borderRadius: '6px',
                        cursor: pagination.page === 1 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        minWidth: '40px',
                        textAlign: 'center',
                        ':hover': pagination.page !== 1 && {
                          background: '#edf2f7'
                        }
                      }}
                      onClick={() => fetchNotes(pagination.page - 1)}
                      disabled={pagination.page === 1}
                    >
                      ‹ Prev
                    </button>
                    
                    {getVisiblePages().map(pageNum => (
                      <button
                        key={pageNum}
                        style={{
                          padding: '0.5rem 0.75rem',
                          border: pagination.page === pageNum 
                            ? '1px solid #4299e1' 
                            : '1px solid #e2e8f0',
                          background: pagination.page === pageNum 
                            ? '#4299e1' 
                            : 'white',
                          color: pagination.page === pageNum 
                            ? 'white' 
                            : 'inherit',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          minWidth: '40px',
                          textAlign: 'center',
                          ':hover': {
                            background: pagination.page === pageNum 
                              ? '#3182ce' 
                              : '#edf2f7'
                          }
                        }}
                        onClick={() => fetchNotes(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}
                    
                    <button
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #e2e8f0',
                        background: pagination.page === pagination.totalPages 
                          ? '#e2e8f0' 
                          : 'white',
                        borderRadius: '6px',
                        cursor: pagination.page === pagination.totalPages 
                          ? 'not-allowed' 
                          : 'pointer',
                        transition: 'all 0.2s ease',
                        minWidth: '40px',
                        textAlign: 'center',
                        ':hover': pagination.page !== pagination.totalPages && {
                          background: '#edf2f7'
                        }
                      }}
                      onClick={() => fetchNotes(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                    >
                      Next ›
                    </button>
                    <button
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #e2e8f0',
                        background: pagination.page === pagination.totalPages 
                          ? '#e2e8f0' 
                          : 'white',
                        borderRadius: '6px',
                        cursor: pagination.page === pagination.totalPages 
                          ? 'not-allowed' 
                          : 'pointer',
                        transition: 'all 0.2s ease',
                        minWidth: '40px',
                        textAlign: 'center',
                        ':hover': pagination.page !== pagination.totalPages && {
                          background: '#edf2f7'
                        }
                      }}
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

        <aside style={{
          flex: 1,
          '@media (min-width: 1024px)': {
            position: 'sticky',
            top: '1rem',
            alignSelf: 'flex-start'
          }
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h2>{isEditing ? 'Edit Note' : 'Create New Note'}</h2>
            <form onSubmit={isEditing ? handleUpdateNote : handleCreateNote}>
              <div style={{
                marginBottom: '1.25rem'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>Subject</label>
                <select 
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#4299e1',
                      boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.2)'
                    }
                  }}
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

              <div style={{
                marginBottom: '1.25rem'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>Title*</label>
                <input 
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#4299e1',
                      boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.2)'
                    }
                  }}
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

              <div style={{
                marginBottom: '1.25rem'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>Answer*</label>
                <input 
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#4299e1',
                      boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.2)'
                    }
                  }}
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

              <div style={{
                marginBottom: '1.25rem'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#4a5568'
                }}>Explanation</label>
                <textarea 
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#4299e1',
                      boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.2)'
                    },
                    minHeight: '100px'
                  }}
                  value={isEditing ? editingNote?.explanation : newNote.explanation} 
                  onChange={e => isEditing 
                    ? setEditingNote({ ...editingNote, explanation: e.target.value })
                    : setNewNote({ ...newNote, explanation: e.target.value })
                  } 
                  placeholder="Add detailed explanation (optional)"
                />
              </div>

              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button 
                  type="submit" 
                  style={{
                    flex: 1,
                    width: '100%',
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #4299e1, #3182ce)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    ':hover': !(!isFormValid || formLoading) && {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 2px 5px rgba(66, 153, 225, 0.3)'
                    },
                    ':disabled': {
                      background: '#a0aec0',
                      cursor: 'not-allowed',
                      transform: 'none',
                      boxShadow: 'none'
                    }
                  }}
                  disabled={!isFormValid || formLoading}
                >
                  {formLoading ? (
                    <>
                      <span style={{
                        display: 'inline-block',
                        width: '1rem',
                        height: '1rem',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        borderTopColor: 'white',
                        animation: 'spin 1s ease-in-out infinite'
                      }}></span> 
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    isEditing ? 'Update Note' : 'Add Note'
                  )}
                </button>

                {isEditing && (
                  <button 
                    type="button" 
                    style={{
                      flex: 0.5,
                      width: '100%',
                      padding: '0.75rem',
                      background: '#e53e3e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                      ':hover': {
                        background: '#c53030',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 5px rgba(229, 62, 62, 0.3)'
                      }
                    }}
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </aside>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
};

export default NotesPage;