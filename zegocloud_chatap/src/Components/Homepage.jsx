import { useNavigate } from "react-router-dom";
import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .page {
    min-height: 100vh;
    background: #0d0f14;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
    padding: 20px;
  }

  /* Ambient glow blobs */
  .page::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
    top: -200px; left: -200px;
    pointer-events: none;
  }
  .page::after {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%);
    bottom: -150px; right: -150px;
    pointer-events: none;
  }

  .card {
    width: 100%;
    max-width: 420px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 40px 36px;
    backdrop-filter: blur(16px);
    position: relative;
    z-index: 1;
  }

  .logo-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 8px;
  }

  .logo-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }

  .logo-text {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
  }

  .tagline {
    text-align: center;
    color: rgba(255,255,255,0.4);
    font-size: 13px;
    margin-bottom: 32px;
    letter-spacing: 0.2px;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 24px 0;
  }
  .divider-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }
  .divider-label {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 6px;
  }

  .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.3);
    font-size: 16px;
    pointer-events: none;
  }

  .input {
    width: 100%;
    padding: 13px 14px 13px 40px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .input::placeholder { color: rgba(255,255,255,0.3); }
  .input:focus {
    border-color: #6366f1;
    background: rgba(99,102,241,0.08);
  }

  .error {
    color: #f87171;
    font-size: 12px;
    margin-top: 6px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .btn-primary {
    width: 100%;
    padding: 13px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-primary:active { transform: translateY(0); }

  .btn-secondary {
    width: 100%;
    padding: 13px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: rgba(255,255,255,0.85);
    font-size: 14px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); transform: translateY(-1px); }
  .btn-secondary:active { transform: translateY(0); }

  .features {
    display: flex;
    justify-content: space-around;
    margin-top: 28px;
    padding-top: 22px;
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .feature-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  .feature-icon {
    font-size: 18px;
  }
  .feature-label {
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.2px;
    text-align: center;
  }

  .recent-rooms {
    margin-top: 14px;
  }
  .recent-title {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .recent-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .chip {
    padding: 5px 12px;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 20px;
    color: rgba(99,102,241,0.9);
    font-size: 12px;
    cursor: pointer;
    transition: background 0.18s;
    font-family: 'Inter', sans-serif;
  }
  .chip:hover { background: rgba(99,102,241,0.22); }
`;

const RECENT_ROOMS_KEY = "vc_recent_rooms";

function getRecentRooms() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_ROOMS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecentRoom(roomId) {
  const rooms = getRecentRooms().filter((r) => r !== roomId);
  const updated = [roomId, ...rooms].slice(0, 5);
  localStorage.setItem(RECENT_ROOMS_KEY, JSON.stringify(updated));
}

function Homepage() {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [recentRooms] = useState(getRecentRooms);

  const navigate = useNavigate();

  const joinRoom = (id) => {
    saveRecentRoom(id);
    navigate(`/room/${id}`);
  };

  const handleJoin = () => {
    if (!roomId.trim()) {
      setError("Please enter a Room ID");
      return;
    }
    const cleanRoomId = roomId
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9_-]/g, "");
    if (!cleanRoomId) {
      setError("Enter a valid Room ID (letters, numbers, - or _)");
      return;
    }
    joinRoom(cleanRoomId);
  };

  const createRoom = () => {
    const randomRoom = `room-${Math.random().toString(36).substring(2, 8)}`;
    joinRoom(randomRoom);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="card">
          {/* Logo */}
          <div className="logo-row">
            <div className="logo-icon">🎥</div>
            <span className="logo-text">MeetSpace</span>
          </div>
          <p className="tagline">Instant, no-signup video rooms</p>

          {/* Join room section */}
          <div className="input-wrapper">
            <span className="input-icon">🔑</span>
            <input
              className="input"
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            />
          </div>

          {error && (
            <p className="error">
              <span>⚠️</span> {error}
            </p>
          )}

          <button className="btn-primary" onClick={handleJoin}>
            <span>🚀</span> Join Room
          </button>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-label">or</span>
            <div className="divider-line" />
          </div>

          <button className="btn-secondary" onClick={createRoom}>
            <span>✨</span> Create New Room
          </button>

          {/* Recent rooms */}
          {recentRooms.length > 0 && (
            <div className="recent-rooms">
              <div className="divider" style={{ margin: "18px 0 12px" }}>
                <div className="divider-line" />
                <span className="divider-label">Recent</span>
                <div className="divider-line" />
              </div>
              <div className="recent-chips">
                {recentRooms.map((room) => (
                  <button
                    key={room}
                    className="chip"
                    onClick={() => joinRoom(room)}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Features footer */}
          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span className="feature-label">
                End-to-end
                <br />
                encrypted
              </span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span className="feature-label">
                Low
                <br />
                latency
              </span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span className="feature-label">
                Works on
                <br />
                all devices
              </span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <span className="feature-label">
                No sign-up
                <br />
                needed
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
