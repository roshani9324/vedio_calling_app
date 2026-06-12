import { useRef, useState, useEffect } from "react";
import RecordingModal from "./RecordingModal";
import RecordingIndicator from "./RecordingIndicator";

function RecordingControls() {
  const [showModal, setShowModal] = useState(true);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    let interval;

    if (recording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recording]);

  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.start();

      setRecording(true);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) return;

    recorder.stop();

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, {
        type: "video/webm",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = `meeting-${Date.now()}.webm`;

      a.click();

      URL.revokeObjectURL(url);
    };

    setRecording(false);
  };

  return (
    <>
      {showModal && (
        <RecordingModal
          onStart={startRecording}
          onSkip={() => setShowModal(false)}
        />
      )}

      {recording && (
        <>
          <RecordingIndicator time={formatTime()} />

          <button
            onClick={stopRecording}
            style={{
              position: "fixed",
              top: 15,
              right: 15,
              zIndex: 9999,
            }}
          >
            Stop Recording
          </button>
        </>
      )}
    </>
  );
}

export default RecordingControls;
