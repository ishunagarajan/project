import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [docName, setDocName] = useState("");
  const navigate = useNavigate();

  const handleCreateDocument = () => {
    if (docName.trim() !== "") {
      navigate(`/editor?name=${docName}`);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Your Document Editor</h1>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card" onClick={() => navigate("/feature/live-editing")}>
          <h3>Live Editing</h3>
          <p>See changes as they happen with our real-time collaborative editor.</p>
        </div>
        <div className="feature-card" onClick={() => navigate("/feature/multiuser-access")}>
          <h3>Multi-User Access</h3>
          <p>Work together with your team members simultaneously on the same document.</p>
        </div>
        <div className="feature-card" onClick={() => navigate("/feature/version-control")}>
          <h3>Version Control</h3>
          <p>Track changes and revert to previous versions easily.</p>
        </div>
        <div className="feature-card" onClick={() => navigate("/feature/real-time-sync")}>
          <h3>Real-Time Sync</h3>
          <p>Your documents update instantly across all devices.</p>
        </div>
      </div>

      {/* Create Document Button */}
      <div className="button-container">
        <button className="create-doc-btn" onClick={() => setShowModal(true)}>
          Create New Document +
        </button>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Name Your Document</h2>
            <input
              type="text"
              placeholder="Enter document name..."
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleCreateDocument}>
                Confirm
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
