import { useState, useEffect } from "react";

interface Recorder {
  recordingSeconds: number;
  startRecording: boolean;
  mediaStream: MediaStream | null;
  mediaRecorder: MediaRecorder | null;
  audioFile: File | null;
  audio: string | null;
}

const initialState: Recorder = {
  recordingSeconds: 0,
  startRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audioFile: null,
  audio: null,
};

const useMediaRecorder = () => {
  const [recorderState, setRecorderState] = useState<Recorder>(initialState);

  const startRecording = async (
    setRecorderState: React.Dispatch<React.SetStateAction<Recorder>>
  ) => {
    {
      try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        setRecorderState((prevState) => {
          return {
            ...prevState,
            startRecording: true,
            mediaStream: stream,
          };
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const saveRecording = (recorder: MediaRecorder) => {
    if (recorder.state !== "inactive") recorder.stop();
  };

  useEffect(() => {
    let recordingInterval: null | number = null;

    if (recorderState.startRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (prevState.recordingSeconds === 10) {
            typeof recordingInterval === "number" &&
              clearInterval(recordingInterval);
            saveRecording(recorderState.mediaRecorder as MediaRecorder);
            return prevState;
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds <= 10
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };
          else return prevState;
        });
      }, 1000);
    else clearInterval(recordingInterval as unknown as number);

    return () => {
      clearInterval(recordingInterval as unknown as number);
    };
  });

  useEffect(() => {
    setRecorderState((prevState) => {
      if (prevState.mediaStream)
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      else return prevState;
    });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks: Blob[] = [];

    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (e: { data: Blob }) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm;codecs=pcm" });
        chunks = [];

        const audioFile = new File([blob], "audio/webm;codecs=pcm", {
          type: "audio/webm;codecs=pcm",
          lastModified: new Date().getTime(),
        });

        setRecorderState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: URL.createObjectURL(blob),
              audioFile: audioFile,
            };
          else return initialState;
        });
      };
    }

    return () => {
      if (recorder)
        recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    saveRecording: () =>
      saveRecording(recorderState.mediaRecorder as MediaRecorder),
  };
};

export default useMediaRecorder;
