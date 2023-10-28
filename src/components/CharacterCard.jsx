import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Button,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiStar as StarIcon } from "react-icons/hi";

function CharacterCard({ character, isFavorite, toggleFavorite }) {
  // Extract the character ID from the character's URL
  const characterId = character.url.split("/").slice(-2, -1);
  // Construct the image URL for the character
  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;

  const hoverBgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      borderRadius="md"
      overflow="hidden"
      position="relative"
      transition="background 0.3s"
      _hover={{ backgroundColor: hoverBgColor }}
      maxW="sm"
      margin="auto"
    >
      <Link to={`/character/${characterId}`}>
        <img src={imageUrl} alt={character.name} width="100%" height="auto" />
        <Center p={2} bg="white">
          <Text fontSize="md" fontWeight="bold" color={"black"}>
            {character.name}
          </Text>
        </Center>
      </Link>
      <Button
        onClick={() => toggleFavorite(character)}
        position="absolute"
        top="0"
        right="0"
        bgColor={isFavorite ? "yellow.400" : "gray.300"}
      >
        <StarIcon color="white" />
      </Button>
    </Box>
  );
}

export default CharacterCard;
