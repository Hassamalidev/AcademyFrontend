import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "https://localhost:7218/api/Notes";

const NotesPage = () => {
  const { subject } = useParams();
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newNote, setNewNote] = useState({
    title: '',
    answer: '',
    explanation: '',
    subject: subject || '',
    createdAt: new Date().toISOString()
  });
  const [creatingNote, setCreatingNote] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const pageSize = 10;

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/${subject}`, {
        params: { page, pageSize }
      });
      setNotes(response.data);
      setTotalCount(parseInt(response.headers['x-total-count']) || 0);
    } catch (err) {
      setError(`Failed to load notes: ${err.response?.data?.message || err.message}`);
      console.error('API Error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subject) {
      fetchNotes();
    }
  }, [subject, page]);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    setCreatingNote(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const noteToCreate = {
        ...newNote,
        subject: subject || newNote.subject,
        createdAt: new Date().toISOString()
      };
      
      await axios.post(BASE_URL, noteToCreate);
      
      setNewNote({
        title: '',
        answer: '',
        explanation: '',
        subject: subject || '',
        createdAt: new Date().toISOString()
      });
      
      setSuccessMessage('Note created successfully!');
      setPage(1);
      await fetchNotes();
    } catch (err) {
      setError(`Failed to create note: ${err.response?.data?.message || err.message}`);
      console.error('API Error:', err.response?.data || err.message);
    } finally {
      setCreatingNote(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = newNote.title.trim() && newNote.answer.trim() && newNote.subject.trim();

  const totalPages = Math.ceil(totalCount / pageSize);

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: "'Inter', sans-serif"
    },
    header: {
      fontSize: '2rem',
      fontWeight: '700',
      color: 'var(--primary)',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    formContainer: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      marginBottom: '2rem',
      border: '1px solid #e5e7eb'
    },
    formHeader: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem'
    },
    inputGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#374151'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.2s',
      ':focus': {
        outline: 'none',
        borderColor: '#4f46e5',
        boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)'
      }
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      minHeight: '120px',
      fontSize: '1rem',
      resize: 'vertical'
    },
    submitButton: {
      backgroundColor: 'var(--primary)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: '#4338ca'
      },
      ':disabled': {
        opacity: '0.7',
        cursor: 'not-allowed'
      }
    },
    noteCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      marginBottom: '1rem',
      border: '1px solid #f3f4f6',
      transition: 'transform 0.2s, box-shadow 0.2s',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }
    },
    noteTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    explanationBox: {
      backgroundColor: '#f9fafb',
      padding: '1rem',
      borderRadius: '8px',
      marginTop: '1rem'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem',
      gap: '0.5rem'
    },
    pageButton: {
      padding: '0.5rem 1rem',
      border: '1px solid #d1d5db',
      backgroundColor: 'white',
      color: '#374151',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: '#f3f4f6'
      },
      ':disabled': {
        opacity: '0.5',
        cursor: 'not-allowed'
      }
    },
    pageInfo: {
      padding: '0.5rem 1rem',
      backgroundColor: 'white',
      color: '#374151',
      display: 'flex',
      alignItems: 'center'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '24px',
      height: '24px',
      border: '3px solid rgba(79, 70, 229, 0.3)',
      borderTopColor: '#4f46e5',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    messageBox: {
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1.5rem'
    },
    errorBox: {
      backgroundColor: '#fef2f2',
      borderLeft: '4px solid #ef4444',
      color: '#b91c1c'
    },
    successBox: {
      backgroundColor: '#ecfdf5',
      borderLeft: '4px solid #10b981',
      color: '#065f46'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 0',
      color: '#6b7280'
    }
  };

  return (
    <>
      <style>
        {`
          :root {
            --primary: #4f46e5;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          body {
            background-color: #f9fafb;
            margin: 0;
            color: #1f2937;
          }
        `}
      </style>
      
      <div style={styles.container}>
        <h1 style={styles.header}>
          {subject ? `${subject} Notes` : 'All Notes'}
        </h1>

        {error && (
          <div style={{ ...styles.messageBox, ...styles.errorBox }}>
            {error}
          </div>
        )}
        {successMessage && (
          <div style={{ ...styles.messageBox, ...styles.successBox }}>
            {successMessage}
          </div>
        )}

        <div style={styles.formContainer}>
          <h2 style={styles.formHeader}>Create New Note</h2>
          <form onSubmit={handleCreateNote}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Title</label>
              <input
                type="text"
                name="title"
                style={styles.input}
                value={newNote.title}
                onChange={handleInputChange}
                required
                placeholder="Enter note title"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Answer</label>
              <input
                type="text"
                name="answer"
                style={styles.input}
                value={newNote.answer}
                onChange={handleInputChange}
                required
                placeholder="Enter the answer"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Explanation</label>
              <textarea
                name="explanation"
                style={styles.textarea}
                value={newNote.explanation}
                onChange={handleInputChange}
                placeholder="Add detailed explanation (optional)"
              />
            </div>
            <button
              type="submit"
              style={styles.submitButton}
              disabled={creatingNote || !isFormValid}
            >
              {creatingNote ? (
                <>
                  <span style={styles.loadingSpinner}></span> Creating...
                </>
              ) : (
                'Create Note'
              )}
            </button>
          </form>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ ...styles.loadingSpinner, width: '48px', height: '48px', margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: '#4b5563' }}>Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div style={styles.emptyState}>
            <h3 style={{ marginBottom: '0.5rem' }}>No notes found</h3>
            <p>Be the first to create a note for this subject!</p>
          </div>
        ) : (
          <div>
            {notes.map((note) => (
              <div key={note.id} style={styles.noteCard}>
                <h3 style={styles.noteTitle}>{note.title}</h3>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '500', color: '#374151' }}>Answer: </span>
                  <span style={{ color: '#111827' }}>{note.answer}</span>
                </div>
                {note.explanation && (
                  <div style={styles.explanationBox}>
                    <h4 style={{ fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Explanation:</h4>
                    <p style={{ color: '#111827', whiteSpace: 'pre-wrap' }}>{note.explanation}</p>
                  </div>
                )}
                <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  Created: {new Date(note.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                ...styles.pageButton,
                borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px'
              }}
            >
              Previous
            </button>
            <span style={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                ...styles.pageButton,
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotesPage;