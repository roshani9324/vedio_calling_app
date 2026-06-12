function RecordingModal({ onStart, onSkip }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Meeting Recording</h2>

        <p>Would you like to start recording this meeting?</p>

        <button onClick={onStart}>🎥 Start Recording</button>

        <button onClick={onSkip}>Skip</button>
      </div>
    </div>
  );
}

export default RecordingModal;
