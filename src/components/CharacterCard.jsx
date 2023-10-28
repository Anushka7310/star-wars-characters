import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

function CharacterCard({
  character,
  isFavorite,
  onAddToFavorites,
  onRemoveFromFavorites,
}) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      m={2}
      width={["90%", "45%", "30%"]}
    >
      <Text fontSize="lg" fontWeight="bold">
        {character.name}
      </Text>
      <Flex justifyContent="space-between">
        <Text>Height: {character.height}</Text>
        <Text>Mass: {character.mass}</Text>
      </Flex>
      <Text>Hair Color: {character.hair_color}</Text>
      <Text>Eye Color: {character.eye_color}</Text>
      <Text>Birth Year: {character.birth_year}</Text>
      <Text>Gender: {character.gender}</Text>
      {isFavorite ? (
        <Button
          leftIcon={<FaStar />}
          colorScheme="yellow"
          variant="outline"
          onClick={() => onRemoveFromFavorites(character)}
          mt={2}
        >
          Remove from Favorites
        </Button>
      ) : (
        <Button
          leftIcon={<FaStar />}
          colorScheme="blue"
          variant="outline"
          onClick={() => onAddToFavorites(character)}
          mt={2}
        >
          Add to Favorites
        </Button>
      )}
    </Box>
  );
}

export default CharacterCard;
