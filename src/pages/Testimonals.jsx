import React from "react";

const Testimonials = () => {
  return (
    <>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .title {
          color: #2c3e50;
          font-size: 2.2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .subtitle {
          color: #7f8c8d;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .cta-button {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 12px 25px;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .cta-button:hover {
          background-color: #c0392b;
          transform: translateY(-2px);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.08);
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .quote-icon {
          font-size: 3rem;
          color: #e74c3c;
          line-height: 1;
          margin-bottom: 1rem;
          font-family: serif;
        }

        .testimonial-text {
          color: #34495e;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .author-container {
          border-top: 1px solid #eee;
          padding-top: 1rem;
        }

        .author-name {
          font-weight: bold;
          color: #2c3e50;
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }

        .author-title {
          color: #7f8c8d;
          font-size: 0.9rem;
        }

        .badge {
          position: absolute;
          top: -10px;
          right: 20px;
          background-color: #27ae60;
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          white-space: nowrap;
        }

        /* Tablet Styles */
        @media (max-width: 768px) {
          .container {
            padding: 2rem 1.5rem;
            margin: 1rem;
            border-radius: 8px;
          }

          .title {
            font-size: 1.8rem;
            margin-bottom: 0.75rem;
          }

          .subtitle {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .header {
            margin-bottom: 2rem;
          }

          .grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }

          .card {
            padding: 1.5rem;
          }

          .quote-icon {
            font-size: 2.5rem;
          }

          .badge {
            right: 15px;
            font-size: 0.75rem;
            padding: 4px 8px;
          }
        }

        /* Mobile Styles */
        @media (max-width: 480px) {
          .container {
            padding: 1.5rem 1rem;
            margin: 0.5rem;
          }

          .title {
            font-size: 1.5rem;
            line-height: 1.3;
          }

          .subtitle {
            font-size: 0.95rem;
            padding: 0 0.5rem;
          }

          .cta-button {
            padding: 10px 20px;
            font-size: 0.9rem;
            width: 100%;
            max-width: 250px;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .card {
            padding: 1.25rem;
          }

          .quote-icon {
            font-size: 2rem;
            margin-bottom: 0.75rem;
          }

          .testimonial-text {
            font-size: 0.95rem;
            margin-bottom: 1.25rem;
          }

          .author-name {
            font-size: 1rem;
          }

          .author-title {
            font-size: 0.85rem;
          }

          .badge {
            position: static;
            display: inline-block;
            margin-bottom: 1rem;
            font-size: 0.7rem;
            padding: 3px 6px;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 360px) {
          .container {
            padding: 1rem 0.75rem;
          }

          .title {
            font-size: 1.3rem;
          }

          .subtitle {
            font-size: 0.9rem;
          }

          .card {
            padding: 1rem;
          }

          .testimonial-text {
            font-size: 0.9rem;
          }
        }
      `}</style>

      <section className="container">
        <div className="header">
          <h2 className="title">What Our Students Say About ISSB Courses</h2>
          <p className="subtitle">
            Our comprehensive ISSB preparation program has helped hundreds of candidates succeed. 
            Join Pakistan's most trusted ISSB training platform.
          </p>
          <button className="cta-button">
            Explore Our Courses →
          </button>
        </div>

        <div className="grid">
          <div className="card">
            <div className="badge">First Attempt Success</div>
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              The ISSB preparation course helped me clear my tests on the first attempt. 
              The mock tests and expert tips were game-changers. I couldn't have done it without them!
            </p>
            <div className="author-container">
              <div className="author-name">Ahmed Khan</div>
              <div className="author-title">Successful Candidate</div>
            </div>
          </div>

          <div className="card">
            <div className="badge">Recommended by 95% Students</div>
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              Thanks to their amazing ISSB preparation course, I felt confident and well-prepared. 
              The trainers were exceptionally supportive and provided personalized feedback.
            </p>
            <div className="author-container">
              <div className="author-name">Maria Ali</div>
              <div className="author-title">Future Armed Forces Officer</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;