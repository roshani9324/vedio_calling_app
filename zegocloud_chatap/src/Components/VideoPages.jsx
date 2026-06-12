import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { APP_ID, SERVER_SECRET } from "./Constants";
import RecordingControls from "../Pages/RecordingControls";

import { useState, useRef } from "react";

function VideoPages() {
  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const { id } = useParams();
  
  console.log(id);
  const roomID = id;
console.log("Room ID:", id);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = APP_ID;
    const serverSecret = SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "iron coding"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,

      sharedLinks: [
        {
          name: "Meeting Link",
          url: `${window.location.origin}/room/${roomID}`,
        },
      ],

      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      recordedChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();

      setRecording(true);

      alert("Recording Started");
    } catch (error) {
      console.error(error);
    }
  };
  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;

    if (!mediaRecorder) return;

    mediaRecorder.stop();

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, {
        type: "video/webm",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = `meeting-recording-${Date.now()}.webm`;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    };

    setRecording(false);

    alert("Recording Saved");
  };
  return (
    <div ref={myMeeting}>
      {!recording ? (
        <button onClick={startRecording}>🎥 Start Recording</button>
      ) : (
        <button onClick={stopRecording}>⏹ Stop Recording</button>
      )}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      ></div>
      <RecordingControls />

      <div
        ref={myMeeting}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
}

export default VideoPages;
