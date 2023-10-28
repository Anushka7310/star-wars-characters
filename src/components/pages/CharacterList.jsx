import React, { useState, useEffect } from "react";
import { SimpleGrid, Center } from "@chakra-ui/react";
import CharacterCard from "../CharacterCard";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  // Initialize favorites from local storage or an empty array
  const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(initialFavorites);

  useEffect(() => {
    async function fetchCharacters() {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${page}`
      );
      const data = await response.json();
      setCharacters([...characters, ...data.results]);
    }

    fetchCharacters();
  }, [page, characters]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const addCharacterToFavorites = (character) => {
    if (!favorites.find((fav) => fav.name === character.name)) {
      const newFavorites = [...favorites, character];
      setFavorites(newFavorites);
      updateLocalStorage(newFavorites);
    }
  };

  const removeCharacterFromFavorites = (character) => {
    const newFavorites = favorites.filter((fav) => fav.name !== character.name);
    setFavorites(newFavorites);
    updateLocalStorage(newFavorites);
  };

  const updateLocalStorage = (newFavorites) => {
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <Center>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} width="100%">
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            isFavorite={favorites.some((fav) => fav.name === character.name)}
            onAddToFavorites={addCharacterToFavorites}
            onRemoveFromFavorites={removeCharacterFromFavorites}
          />
        ))}
      </SimpleGrid>
      <button onClick={handleLoadMore}>Load More</button>
    </Center>
  );
}

export default CharacterList;
