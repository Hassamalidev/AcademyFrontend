import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "https://localhost:7110/api/notes";


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
    subject: subject || ''
  });

  const pageSize = 10;

  useEffect(() => {
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
        setError('Failed to fetch notes. Please try again.');
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };
    

    if (subject) {
      fetchNotes();
    }
  }, [subject, page]);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL, newNote);
      setPage(1);
      setNewNote({
        title: '',
        answer: '',
        explanation: '',
        subject: subject || ''
      });
      alert('Note created successfully!');
    } catch (err) {
      console.error('Error creating note:', err);
      alert('Failed to create note. Please try again.');
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  // Inline styles
  const styles = {
    container: {
      maxWidth: '56rem',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    header: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#4338ca',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    formContainer: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
      border: '1px solid #e5e7eb'
    },
    formHeader: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem'
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      marginBottom: '1rem'
    },
    textarea: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      marginBottom: '1rem',
      minHeight: '6rem'
    },
    submitButton: {
      backgroundColor: '#4f46e5',
      color: 'white',
      padding: '0.5rem 1.5rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer'
    },
    noteCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      marginBottom: '1rem',
      border: '1px solid #f3f4f6'
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
      borderRadius: '0.375rem',
      marginTop: '0.75rem'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem'
    },
    pageButton: {
      padding: '0.5rem 1rem',
      border: '1px solid #d1d5db',
      backgroundColor: 'white',
      color: '#374151'
    },
    pageInfo: {
      padding: '0.5rem 1rem',
      borderTop: '1px solid #d1d5db',
      borderBottom: '1px solid #d1d5db',
      backgroundColor: 'white',
      color: '#374151'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '2rem',
      height: '2rem',
      border: '2px solid #4338ca',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <> <style>
      {`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}
    </style>
    <div style={styles.container}>
      <h1 style={styles.header}>
        {subject ? `${subject} Notes` : 'Notes'}
      </h1>

      {/* Create Note Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.formHeader}>Create New Note</h2>
        <form onSubmit={handleCreateNote}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', color: '#374151' }}>Title</label>
            <input
              type="text"
              style={styles.input}
              value={newNote.title}
              onChange={(e) => setNewNote({...newNote, title: e.target.value})}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', color: '#374151' }}>Answer</label>
            <input
              type="text"
              style={styles.input}
              value={newNote.answer}
              onChange={(e) => setNewNote({...newNote, answer: e.target.value})}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', color: '#374151' }}>Explanation</label>
            <textarea
              style={styles.textarea}
              value={newNote.explanation}
              onChange={(e) => setNewNote({...newNote, explanation: e.target.value})}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Create Note
          </button>
        </form>
      </div>

      {/* Notes List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={styles.loadingSpinner}></div>
          <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>Loading notes...</p>
        </div>
      ) : error ? (
        <div style={{ 
          backgroundColor: '#fef2f2',
          borderLeft: '4px solid #ef4444',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <p style={{ color: '#b91c1c' }}>{error}</p>
        </div>
      ) : notes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: '#6b7280' }}>
          No notes available for this subject yet.
        </div>
      ) : (
        <div>
          {notes.map((note) => (
            <div key={note.id} style={styles.noteCard}>
              <h3 style={styles.noteTitle}>{note.title}</h3>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '500', color: '#374151' }}>Answer: </span>
                <span style={{ color: '#111827' }}>{note.answer}</span>
              </div>
              {note.explanation && (
                <div style={styles.explanationBox}>
                  <h4 style={{ fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Explanation:</h4>
                  <p style={{ color: '#111827' }}>{note.explanation}</p>
                </div>
              )}
              <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                Created: {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              ...styles.pageButton,
              borderTopLeftRadius: '0.375rem',
              borderBottomLeftRadius: '0.375rem',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              opacity: page === 1 ? 0.5 : 1
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
              borderTopRightRadius: '0.375rem',
              borderBottomRightRadius: '0.375rem',
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
              opacity: page === totalPages ? 0.5 : 1
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