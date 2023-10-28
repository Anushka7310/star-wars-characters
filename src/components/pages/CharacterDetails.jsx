import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Badge } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    async function fetchCharacterDetails() {
      const response = await fetch(`https://swapi.dev/api/people/${id}`);
      const data = await response.json();
      setCharacter(data);
    }

    fetchCharacterDetails();
  }, [id]);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
      {character ? (
        <>
          <Heading fontSize="lg">{character.name}</Heading>
          <Text>Height: {character.height}</Text>
          <Text>Mass: {character.mass}</Text>
          <Text>Hair Color: {character.hair_color}</Text>
          <Text>Eye Color: {character.eye_color}</Text>
          <Text>Birth Year: {character.birth_year}</Text>
          <Badge colorScheme="blue" variant="solid">
            Gender: {character.gender}
          </Badge>
          {/* Add more information here */}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
}

export default CharacterDetails;
