function RecordingIndicator({ time }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 15,
        left: 15,
        background: "red",
        color: "white",
        padding: "10px 15px",
        borderRadius: "8px",
        fontWeight: "bold",
        zIndex: 9999,
      }}
    >
      🔴 REC {time}
    </div>
  );
}

export default RecordingIndicator;
