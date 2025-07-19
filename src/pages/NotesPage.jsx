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
  const [newNote, setNewNote] = useState({ title: '', answer: '', explanation: '', subject: subjects[0] });
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);

  const fetchNotes = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getNotes(activeSubject, pageNum, limit);
      setNotes(response.notes);
      setTotalPages(response.totalPages || 1);
      setTotalNotes(response.totalNotes || 0);
      setPage(pageNum);
      setExpandedNoteId(null);
    } catch (err) {
      setError(`Failed to load notes: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(1);
  }, [activeSubject]);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await createNote({ ...newNote, createdAt: new Date().toISOString() });
      setNewNote({ title: '', answer: '', explanation: '', subject: activeSubject });
      setSuccess('Note created!');
      fetchNotes(1);
    } catch (err) {
      setError('Failed to create note.');
    } finally {
      setFormLoading(false);
    }
  };

  const toggleExplanation = (id) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  const isFormValid = newNote.title.trim() && newNote.answer.trim();

  return (
    <div className="container">
      <h1 className="title">🧠 Notes Manager</h1>

      <div className="tabs">
        {subjects.map(subject => (
          <button
            key={subject}
            className={`tab ${activeSubject === subject ? 'active' : ''}`}
            onClick={() => setActiveSubject(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="grid">
        {/* Left - Notes */}
        <div className="notes-section">
          <h2>{activeSubject} Notes ({totalNotes})</h2>
          {loading ? (
            <p>Loading notes...</p>
          ) : notes.length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            notes.map(note => (
              <div className="note-card" key={note.id}>
                <h3>{note.title}</h3>
                <p><strong>Answer:</strong> {note.answer}</p>
                <button className="show-btn" onClick={() => toggleExplanation(note.id)}>
                  {expandedNoteId === note.id ? 'Hide' : 'Show'} Explanation
                </button>
                {expandedNoteId === note.id && (
                  <div className="explanation">
                    {note.explanation?.trim()
                      ? <p>{note.explanation}</p>
                      : <p className="no-explanation">No explanation provided.</p>
                    }
                  </div>
                )}
                <p className="date">{new Date(note.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`page-btn ${page === i + 1 ? 'current' : ''}`}
                  onClick={() => fetchNotes(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right - Form */}
        <div className="form-card">
          <h2>Create Note</h2>
          <form onSubmit={handleCreateNote}>
            <label>Subject</label>
            <select name="subject" value={newNote.subject} onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <label>Title</label>
            <input type="text" name="title" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} required />

            <label>Answer</label>
            <input type="text" name="answer" value={newNote.answer} onChange={e => setNewNote({ ...newNote, answer: e.target.value })} required />

            <label>Explanation (optional)</label>
            <textarea name="explanation" value={newNote.explanation} onChange={e => setNewNote({ ...newNote, explanation: e.target.value })} />

            <button type="submit" disabled={!isFormValid || formLoading}>
              {formLoading ? 'Creating...' : 'Add Note'}
            </button>
          </form>
        </div>
      </div>

      {/* Inline Styles */}
      <style>{`
        .container {
          max-width: 1200px;
          margin: auto;
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
        }

        .title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          justify-content: center;
        }

        .tab {
          padding: 0.4rem 1rem;
          background: #e5e7eb;
          border-radius: 9999px;
          cursor: pointer;
          border: none;
        }

        .tab.active {
          background: #2563eb;
          color: white;
        }

        .error { color: red; }
        .success { color: green; }

        .grid {
          display: flex;
          flex-direction: column-reverse;
          gap: 2rem;
        }

        @media(min-width: 768px) {
          .grid {
            flex-direction: row;
          }
        }

        .notes-section {
          flex: 2;
        }

        .form-card {
          flex: 1;
          background: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 0 6px rgba(0,0,0,0.1);
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        input, textarea, select {
          padding: 0.5rem;
          border-radius: 0.375rem;
          border: 1px solid #d1d5db;
          font-size: 1rem;
        }

        button {
          background: #2563eb;
          color: white;
          padding: 0.5rem;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
        }

        .note-card {
          background: white;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .show-btn {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          background: none;
          color: #2563eb;
          border: none;
          cursor: pointer;
        }

        .explanation {
          margin-top: 0.75rem;
          background: #f3f4f6;
          padding: 0.75rem;
          border-radius: 0.25rem;
        }

        .no-explanation {
          color: #6b7280;
          font-style: italic;
        }

        .date {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #6b7280;
        }

        .pagination {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .page-btn {
          padding: 0.3rem 0.7rem;
          border: none;
          border-radius: 0.375rem;
          background: #e5e7eb;
          cursor: pointer;
        }

        .page-btn.current {
          background: #2563eb;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default NotesPage;
