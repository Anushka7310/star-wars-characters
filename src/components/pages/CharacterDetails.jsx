import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  Center,
  Image,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import MovieDetails from "../MovieDetails";

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [movies, setMovies] = useState([]);
  const [characterImage, setCharacterImage] = useState("");
  const [loadingMovies, setLoadingMovies] = useState(true); // Track movie loading

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        const data = await response.json();
        setCharacter(data);

        // Fetch character image
        const characterImageResponse = await fetch(
          `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
        );
        if (characterImageResponse.ok) {
          setCharacterImage(characterImageResponse.url);
        }

        fetchMovies(data.films);
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    const fetchMovies = (filmUrls) => {
      const movieRequests = filmUrls.map((filmUrl) =>
        fetch(filmUrl).then((response) => response.json())
      );
      Promise.all(movieRequests)
        .then((movieData) => {
          setMovies(movieData);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        })
        .finally(() => {
          setLoadingMovies(false); // Mark movies as loaded
        });
    };

    fetchCharacterDetails();
  }, [id]);

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      {character ? (
        <Flex direction={{ base: "column", md: "row" }}>
          <Image
            src={characterImage}
            alt={character.name}
            boxSize={{ base: "200px", md: "300px" }} // Adjusted image size for mobile and larger screens
            objectFit="cover"
            flexShrink="0" // Prevents the image from shrinking
          />
          <VStack
            spacing={3}
            align="start"
            flex="1"
            ml={{ base: 0, md: 4 }} // Adjusted margin for mobile and larger screens
          >
            <Text fontWeight="bold" fontSize="lg">
              {character.name}
            </Text>
            <Text>Height: {character.height} cm</Text>
            <Text>Gender: {character.gender}</Text>
            <Text>Hair Color: {character.hair_color}</Text>
            <Text>Skin Color: {character.skin_color}</Text>
            <Text>Eye Color: {character.eye_color}</Text>
            <Text>Birth Year: {character.birth_year}</Text>
            <Center>
              <Text fontWeight="bold">Movies:</Text>
            </Center>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              {loadingMovies ? (
                <Center gridColumnStart={1} gridColumnEnd={3}>
                  <Spinner size="lg" color="teal.500" />
                </Center>
              ) : (
                movies.map((movie, index) => (
                  <MovieDetails key={index} movieUrl={character.films[index]} />
                ))
              )}
            </SimpleGrid>
          </VStack>
        </Flex>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}

export default CharacterDetails;
