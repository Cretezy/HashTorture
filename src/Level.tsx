import React, { useEffect, useRef, useState } from "react";
import { checkAnswer, generateAnswer } from "./answer";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { firstLevel } from "./constants";

interface LevelProps {
  level: number;

  onNextLevel(): void;
}

export const Level: React.FC<LevelProps> = ({ level, onNextLevel }) => {
  const [answer] = useState(() => generateAnswer(level));
  const [input, setInput] = useState(Array(level).fill(false));
  const rightAnswer = checkAnswer(answer, input);

  const [startTime] = useState(() => new Date());
  const [endTime, setEndTime] = useState<Date>();
  const [guesses, setGuesses] = useState(0);

  function toggleInput(index: number) {
    const inputCopy = [...input];
    inputCopy[index] = !inputCopy[index];
    setInput(inputCopy);
    setGuesses(guesses + 1);
  }

  const completeDisclosure = useDisclosure();
  const nextRef = useRef<any>();

  useEffect(() => {
    if (rightAnswer) {
      setEndTime(new Date());
      completeDisclosure.onOpen();
    }
  }, [rightAnswer, onNextLevel]);

  return (
    <VStack justify="center" h="100%">
      <Heading>Level {level - firstLevel + 1}</Heading>
      <Text>({level} bits)</Text>
      <Wrap justify="center" spacing={0} pt={12} px={4}>
        {[...Array(level)].map((_, index) => {
          return (
            <Button
              key={index}
              onClick={() => toggleInput(index)}
              aria-label={`Bit index ${index + 1}`}
            >
              {input[index] ? "1" : "0"}
            </Button>
          );
        })}
      </Wrap>

      <AlertDialog
        {...completeDisclosure}
        leastDestructiveRef={nextRef}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="xl">
              Completed level {level - firstLevel + 1}!
            </AlertDialogHeader>

            <AlertDialogBody>
              Time:{" "}
              {endTime ? (endTime.getTime() - startTime.getTime()) / 1000 : "?"}
              s
              <br />
              <br />
              Guesses: {guesses}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="green"
                ref={nextRef}
                onClick={onNextLevel}
                isFullWidth
                fontSize="lg"
              >
                Next
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};
