import React from 'react';

const SubjectCards = () => {
  const subjects = [
    { name: 'Mathematics', description: 'Numbers, formulas, and logic' },
    { name: 'Science', description: 'Experiments, nature, and discovery' },
    { name: 'English', description: 'Language, grammar, and literature' },
    { name: 'History', description: 'Events, people, and timelines' },
    { name: 'Geography', description: 'Maps, places, and environments' },
  ];

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '200px',
    margin: '10px',
    padding: '16px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.2s',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  };

  const descStyle = {
    fontSize: '14px',
    color: '#666',
  };

  return (
    <div style={containerStyle}>
      {subjects.map((subject, index) => (
        <div key={index} style={cardStyle}>
          <div style={titleStyle}>{subject.name}</div>
          <div style={descStyle}>{subject.description}</div>
        </div>
      ))}
    </div>
  );
};

export default SubjectCards;
