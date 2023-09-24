import { Box, IconButton, Flex, Text, Divider } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

import { formatTime } from "../utils/formatTime";

interface PlayerProps {
  src: string;
}

const Player: React.FC<PlayerProps> = ({ src }) => {
  const audio = useMemo(() => new Audio(src), [src]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    let playerInterval: null | void = null;

    if (isPlaying) {
      audio.play();
      playerInterval = startTimer();
    } else {
      clearInterval(playerInterval as unknown as number);
      audio.pause();
    }

    return () => clearInterval(playerInterval as unknown as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    if (audio.ended) {
      setIsPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio.ended]);

  const startTimer = () => {
    const trackInterval = setInterval(() => {
      if (audio.ended) {
        clearInterval(trackInterval);
        setCurrentTime(0);
      } else {
        setCurrentTime(audio.currentTime);
      }
    }, 100);
  };

  const handleTogglePlay = () => {
    setIsPlaying((playing) => !playing);
  };

  return (
    <Flex
      backgroundColor="grey-5.500"
      alignItems="center"
      borderRadius={10}
      gap={2}
      p={4}
    >
      <IconButton
        icon={isPlaying ? <FaPause /> : <FaPlay />}
        onClick={handleTogglePlay}
        aria-label="Play audio"
        variant="brandBlue"
        rounded="full"
        size="md"
      />

      <Box width="full" position="relative">
        <Divider position="absolute" top={0} borderColor="black.500" />

        {isPlaying && (
          <input
            max={isNaN(audio.duration) ? 0 : audio.duration}
            value={currentTime}
            type="range"
            step={1}
            readOnly
            min={0}
          />
        )}
      </Box>

      <Flex>
        <Text textStyle="p3">
          {(!!currentTime && !isNaN(currentTime) && formatTime(currentTime)) ||
            `00:00`}
        </Text>
        <Text textStyle="p3">/</Text>
        <Text textStyle="p3">
          {!!audio.duration && isFinite(audio.duration)
            ? formatTime(audio.duration)
            : "00:00"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Player;
