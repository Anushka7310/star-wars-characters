import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Center, Icon, Image } from "@chakra-ui/react";
import CharacterCard from "../CharacterCard";
import { FiChevronDown } from "react-icons/fi";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState("https://swapi.dev/api/people/");
  const [isLoading, setIsLoading] = useState(false);
  const [loadFirstPage, setLoadFirstPage] = useState(true);
  const [favourites, setFavourites] = useState(() => {
    const localData = localStorage.getItem("favourites");
    return localData ? JSON.parse(localData) : [];
  });

  const fetchCharacters = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(nextPage);
      const data = await response.json();
      if (loadFirstPage) {
        setCharacters(data.results);
        setLoadFirstPage(false);
      } else {
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      }
      setNextPage(data.next);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }

    setIsLoading(false);
  };

  const toggleFavorite = (character) => {
    const existingIndex = favourites.findIndex((fav) => fav === character.name);
    if (existingIndex !== -1) {
      const updatedFavourites = [...favourites];
      updatedFavourites.splice(existingIndex, 1);
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    } else {
      const updatedFavourites = [...favourites, character.name];
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }
  };

  const isFavorite = (characterName) => {
    return favourites.includes(characterName);
  };

  const handleLoadMore = () => {
    fetchCharacters();
  };

  const scrollToCharacters = () => {
    const characterList = document.getElementById("characterList");
    if (characterList) {
      characterList.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (loadFirstPage) {
      fetchCharacters();
    }
  }, [loadFirstPage]);

  return (
    <Box bg="black" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
      <div style={{ height: "100vh", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src="/icon.png" alt="Star Wars Logo" mb={4} />{" "}
          <Button
            onClick={scrollToCharacters}
            leftIcon={<Icon as={FiChevronDown} />}
            mt={4}
            colorScheme="teal"
            size="lg"
          >
            Explore
          </Button>
        </div>
      </div>

      <div id="characterList">
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={4}
          justifyContent="center"
        >
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              character={character}
              isFavorite={isFavorite(character.name)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </Grid>
      </div>

      {nextPage && (
        <Center mt={4}>
          <Button onClick={handleLoadMore} isDisabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </Center>
      )}
    </Box>
  );
}

export default CharacterList;
