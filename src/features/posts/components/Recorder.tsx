import { Text, Flex, IconButton, Box, Divider, Icon } from "@chakra-ui/react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

import useMediaRecorder from "../hooks/useMediaRecorder";
import { formatTime } from "../utils/formatTime";
import AudioPlayer from "./Player";
import Visualizer from "./Visualizer";

const Recorder = () => {
  const { recorderState, startRecording, saveRecording } = useMediaRecorder();

  const methods = useFormContext();

  const [recorded, setRecorded] = useState<string | null>(null);

  useEffect(() => {
    if (recorderState.audio) {
      setRecorded(recorderState.audio);
    }
  }, [recorderState.audio]);

  useEffect(() => {
    if (recorderState.audioFile) {
      methods.setValue("audio", recorderState.audioFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recorderState.audioFile]);

  const handleRecord = () => {
    if (recorderState.startRecording) {
      saveRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Flex flexDir="column" gap={2} pt={4} justifyContent="flex-end">
      {recorded ? (
        <AudioPlayer src={recorded} />
      ) : (
        <Flex
          p={4}
          gap={2}
          borderRadius={10}
          position="relative"
          alignItems="center"
          backgroundColor="grey-5.500"
          justifyContent="space-between"
        >
          <IconButton
            icon={
              recorderState.startRecording ? (
                <Icon as={FaStop} />
              ) : (
                <Icon as={FaMicrophone} />
              )
            }
            aria-label="Record audio"
            onClick={handleRecord}
            variant={recorderState.startRecording ? "brandRed" : "brandBlue"}
            rounded="full"
            size="md"
          />

          <Box position="relative" width="full">
            {recorderState.mediaRecorder && (
              <Visualizer
                mediaRecorder={recorderState.mediaRecorder as MediaRecorder}
              />
            )}

            <Divider borderColor="black.500" />
          </Box>

          <Text textStyle="p3">{`${formatTime(
            recorderState.recordingSeconds
          )}/00:10`}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Recorder;
