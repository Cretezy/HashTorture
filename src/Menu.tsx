import React from "react";
import { Button, Heading, VStack } from "@chakra-ui/react";

interface MenuProps {
  onPlay(): void;
}

export const Menu: React.FC<MenuProps> = ({ onPlay }) => {
  return (
    <VStack justify="center" align="center" h="100%" spacing={12}>
      <Heading>Hash Torture</Heading>
      <Button onClick={onPlay} fontSize="2xl">
        Play
      </Button>
    </VStack>
  );
};
