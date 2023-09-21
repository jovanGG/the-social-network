import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@chakra-ui/react";

const AudioRecorder = () => {
  return (
    <IconButton
      icon={<FontAwesomeIcon icon={faMicrophone} />}
      aria-label="Record audio"
      variant="ghost"
      size="md"
    />
  );
};

export default AudioRecorder;
