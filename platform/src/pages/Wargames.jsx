import React from "react";
import { Link } from "react-router-dom";
import { ProtectedCard } from "../components/ProtectedCard";
import "./Pages.css";

const Wargames = () => {
  return (
    <div className="page-content">
      <h1>Wargames</h1>
      
      {/* Launch Challenge Section */}
      <div className="launch-section" style={{
        backgroundColor: '#f8f9fa',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '32px',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '16px' }}>Wargames AI Challenge</h2>
        <p style={{ marginBottom: '20px' }}>
          Enter the Wargames AI Challenge interface - a cyberpunk-themed environment 
          for strategic analysis and game simulations. Features multiple themes, 
          real-time model interactions, and advanced evaluation tools.
        </p>
        <Link 
          to="/wargames/challenge" 
          className="launch-button"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#1a73e8',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '500',
            fontSize: '16px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#1765cc'}
          onMouseLeave={e => e.target.style.backgroundColor = '#1a73e8'}
        >
          Launch Challenge Interface →
        </Link>
      </div>

      <div className="lorem-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
          diam sit amet quam vehicula elementum sed sit amet dui. Curabitur
          aliquet quam id dui posuere blandit.
        </p>
        <p>
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus
          magna justo, lacinia eget consectetur sed, convallis at tellus. Sed
          porttitor lectus nibh.
        </p>
        <p>
          Nulla quis lorem ut libero malesuada feugiat. Praesent sapien massa,
          convallis a pellentesque nec, egestas non nisi. Vivamus suscipit
          tortor eget felis porttitor volutpat.
        </p>
        <p>
          Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae;
          Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet
          ligula.
        </p>
      </div>

      <h2 style={{ marginTop: "40px" }}>Protected Content Example</h2>
      <ProtectedCard className="protected-section">
        <div className="lorem-content">
          <h3>Premium Wargames Content</h3>
          <p>
            This content is only visible to authenticated users. It contains
            advanced wargaming scenarios and strategic analysis that requires
            user authentication to access.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </div>
      </ProtectedCard>
    </div>
  );
};

export default Wargames;
