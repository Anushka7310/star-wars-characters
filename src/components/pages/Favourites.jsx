import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  VStack,
  Badge,
  Button,
  Stack,
  Center,
  Image,
} from "@chakra-ui/react";

function Favourites() {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    const storedFavourites = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );
    setFavoriteCharacters(storedFavourites);
  }, []);

  const removeCharacterFromFavorites = (characterName) => {
    const updatedFavorites = favoriteCharacters.filter(
      (name) => name !== characterName
    );
    setFavoriteCharacters(updatedFavorites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Favorite Characters
      </Text>
      {favoriteCharacters.length > 0 ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {favoriteCharacters.map((characterName, index) => (
            <CharacterCard
              key={index}
              characterName={characterName}
              onRemove={() => removeCharacterFromFavorites(characterName)}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text>No favorite characters selected yet.</Text>
      )}
    </Box>
  );
}

function CharacterCard({ characterName, onRemove }) {
  const [character, setCharacter] = useState(null);
  const [characterImage, setCharacterImage] = useState("");

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${characterName}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          setCharacter(data.results[0]);
          const characterId = data.results[0]?.url.split("/").slice(-2, -1);
          const characterImageResponse = await fetch(
            `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`
          );
          if (characterImageResponse.ok) {
            setCharacterImage(characterImageResponse.url);
          }
        }
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    fetchCharacterDetails();
  }, [characterName]);

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      {character ? (
        <VStack spacing={3} align="start">
          <Image
            src={characterImage}
            alt={character.name}
            boxSize="300px"
            objectFit="cover"
          />{" "}
          {/* Increased image size */}
          <Text fontWeight="bold" fontSize="lg">
            {character.name}
          </Text>
          <Text>Height: {character.height} cm</Text>
          <Text>Gender: {character.gender}</Text>
          <Text>Hair Color: {character.hair_color}</Text>
          <Text>Skin Color: {character.skin_color}</Text>
          <Text>Eye Color: {character.eye_color}</Text>
          <Text>Birth Year: {character.birth_year}</Text>
          <Badge colorScheme="teal">Gender: {character.gender}</Badge>
          <Stack
            direction="row"
            justify="space-between"
            align="center"
            w="100%"
          >
            <Button onClick={onRemove} colorScheme="red">
              Remove from Favorites
            </Button>
          </Stack>
        </VStack>
      ) : (
        <Center>Loading...</Center>
      )}
    </Box>
  );
}

export default Favourites;
