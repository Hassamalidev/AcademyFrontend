import React, { useState, useEffect } from 'react';
import { getNotes, createNote } from '../api/api';

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

  const toggleExplanation = (id) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  const isFormValid = newNote.title.trim() && newNote.answer.trim();

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

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#333',
      transition: 'all 0.3s ease'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      animation: 'fadeIn 0.5s ease-out'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: '#2d3748',
      background: 'linear-gradient(90deg, #4299e1, #38b2ac)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      display: 'inline-block'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#718096',
      marginBottom: '0'
    },
    subjectTabs: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '2rem',
      justifyContent: 'center'
    },
    subjectTab: {
      padding: '0.5rem 1.25rem',
      background: '#edf2f7',
      borderRadius: '8px',
      cursor: 'pointer',
      border: 'none',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    },
    activeSubjectTab: {
      background: 'linear-gradient(135deg, #4299e1, #3182ce)',
      color: 'white',
      boxShadow: '0 2px 5px rgba(66, 153, 225, 0.3)'
    },
    alert: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      animation: 'slideDown 0.3s ease-out'
    },
    errorAlert: {
      backgroundColor: '#fff5f5',
      color: '#e53e3e',
      border: '1px solid #fed7d7'
    },
    successAlert: {
      backgroundColor: '#f0fff4',
      color: '#38a169',
      border: '1px solid #c6f6d5'
    },
    searchBar: {
      marginBottom: '1.5rem',
      display: 'flex',
      gap: '0.5rem'
    },
    searchInput: {
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
    },
    notesLayout: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      '@media (min-width: 1024px)': {
        flexDirection: 'row'
      }
    },
    notesListSection: {
      flex: 2,
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    notesCount: {
      background: '#edf2f7',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    loadingSpinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      color: '#718096'
    },
    spinner: {
      width: '2rem',
      height: '2rem',
      border: '3px solid rgba(66, 153, 225, 0.3)',
      borderRadius: '50%',
      borderTopColor: '#4299e1',
      animation: 'spin 1s linear infinite'
    },
    emptyState: {
      textAlign: 'center',
      padding: '2rem',
      color: '#718096'
    },
    refreshBtn: {
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
    },
    notesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    noteCard: {
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1.25rem',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s ease',
      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }
    },
    expandedNoteCard: {
      gridColumn: '1 / -1'
    },
    noteHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.5rem'
    },
    noteTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      margin: '0',
      color: '#2d3748'
    },
    noteAnswer: {
      margin: '0.5rem 0',
      color: '#4a5568'
    },
    noteExplanation: {
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid #edf2f7',
      animation: 'fadeIn 0.3s ease-out'
    },
    noExplanation: {
      color: '#a0aec0',
      fontStyle: 'italic'
    },
    noteFooter: {
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    noteDate: {
      fontSize: '0.75rem',
      color: '#a0aec0'
    },
    paginationContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      marginTop: '2rem'
    },
    paginationControls: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    paginationBtn: {
      padding: '0.5rem 0.75rem',
      border: '1px solid #e2e8f0',
      background: 'white',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '40px',
      textAlign: 'center',
      ':hover': {
        background: '#edf2f7'
      }
    },
    activePaginationBtn: {
      background: '#4299e1',
      color: 'white',
      borderColor: '#4299e1',
      ':hover': {
        background: '#3182ce'
      }
    },
    createNoteForm: {
      flex: 1,
      '@media (min-width: 1024px)': {
        position: 'sticky',
        top: '1rem',
        alignSelf: 'flex-start'
      }
    },
    formContainer: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    formGroup: {
      marginBottom: '1.25rem'
    },
    formLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#4a5568'
    },
    formInput: {
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
    },
    submitBtn: {
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
      ':hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 5px rgba(66, 153, 225, 0.3)'
      },
      ':disabled': {
        background: '#a0aec0',
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: 'none'
      }
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    },
    '@keyframes fadeIn': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 }
    },
    '@keyframes slideDown': {
      '0%': { transform: 'translateY(-10px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 }
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📚 Notes Manager</h1>
        <p style={styles.subtitle}>Organize and manage your study notes</p>
      </header>

      <div style={styles.subjectTabs}>
        {subjects.map(subject => (
          <button
            key={subject}
            style={{
              ...styles.subjectTab,
              ...(activeSubject === subject ? styles.activeSubjectTab : {})
            }}
            onClick={() => setActiveSubject(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      <div>
        {error && (
          <div style={{...styles.alert, ...styles.errorAlert}}>
            <span>⚠️</span>
            {error}
          </div>
        )}
        {success && (
          <div style={{...styles.alert, ...styles.successAlert}}>
            <span>✅</span>
            {success}
          </div>
        )}
      </div>

      <div style={styles.notesLayout}>
        <section style={styles.notesListSection}>
          <div style={styles.sectionHeader}>
            <h2>{activeSubject} Notes</h2>
            <span style={styles.notesCount}>{pagination.totalCount} notes</span>
          </div>

          {/* Search Bar */}
          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Search notes..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {loading ? (
            <div style={styles.loadingSpinner}>
              <div style={styles.spinner}></div>
            </div>
          ) : (notes?.length || 0) === 0 ? (
            <div style={styles.emptyState}>
              <p>No notes found for this subject.</p>
              <button 
                style={styles.refreshBtn}
                onClick={() => fetchNotes(1)}
              >
                Refresh
              </button>
            </div>
          ) : (
            <>
              <div style={styles.notesGrid}>
                {filteredNotes?.map(note => (
                  <div 
                    style={{
                      ...styles.noteCard,
                      ...(expandedNoteId === note.id ? styles.expandedNoteCard : {})
                    }}
                    key={note.id}
                  >
                    <div style={styles.noteHeader}>
                      <h3 style={styles.noteTitle}>{note.title}</h3>
                      <button 
                        style={{background: 'none', border: 'none', cursor: 'pointer'}}
                        onClick={() => toggleExplanation(note.id)}
                      >
                        {expandedNoteId === note.id ? '▲' : '▼'}
                      </button>
                    </div>
                    <p style={styles.noteAnswer}><strong>Answer:</strong> {note.answer}</p>
                    
                    {expandedNoteId === note.id && (
                      <div style={styles.noteExplanation}>
                        <h4>Explanation:</h4>
                        {note.explanation?.trim() ? (
                          <p>{note.explanation}</p>
                        ) : (
                          <p style={styles.noExplanation}>No explanation provided.</p>
                        )}
                      </div>
                    )}
                    
                    <div style={styles.noteFooter}>
                      <time style={styles.noteDate}>
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
                <div style={styles.paginationContainer}>
                  <div>Showing page {pagination.page} of {pagination.totalPages}</div>
                  <div style={styles.paginationControls}>
                    <button
                      style={styles.paginationBtn}
                      onClick={() => fetchNotes(1)}
                      disabled={pagination.page === 1}
                    >
                      « First
                    </button>
                    <button
                      style={styles.paginationBtn}
                      onClick={() => fetchNotes(pagination.page - 1)}
                      disabled={pagination.page === 1}
                    >
                      ‹ Prev
                    </button>
                    
                    {getVisiblePages().map(pageNum => (
                      <button
                        key={pageNum}
                        style={{
                          ...styles.paginationBtn,
                          ...(pagination.page === pageNum ? styles.activePaginationBtn : {})
                        }}
                        onClick={() => fetchNotes(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}
                    
                    <button
                      style={styles.paginationBtn}
                      onClick={() => fetchNotes(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                    >
                      Next ›
                    </button>
                    <button
                      style={styles.paginationBtn}
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

        <aside style={styles.createNoteForm}>
          <div style={styles.formContainer}>
            <h2>Create New Note</h2>
            <form onSubmit={handleCreateNote}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Subject</label>
                <select 
                  style={styles.formInput}
                  value={newNote.subject} 
                  onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Title*</label>
                <input 
                  style={styles.formInput}
                  type="text" 
                  value={newNote.title} 
                  onChange={e => setNewNote({ ...newNote, title: e.target.value })} 
                  placeholder="Enter note title"
                  required 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Answer*</label>
                <input 
                  style={styles.formInput}
                  type="text" 
                  value={newNote.answer} 
                  onChange={e => setNewNote({ ...newNote, answer: e.target.value })} 
                  placeholder="Enter the answer"
                  required 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Explanation</label>
                <textarea 
                  style={{...styles.formInput, minHeight: '100px'}}
                  value={newNote.explanation} 
                  onChange={e => setNewNote({ ...newNote, explanation: e.target.value })} 
                  placeholder="Add detailed explanation (optional)"
                />
              </div>

              <button 
                type="submit" 
                style={styles.submitBtn}
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
                    }}></span> Creating...
                  </>
                ) : (
                  'Add Note'
                )}
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NotesPage;