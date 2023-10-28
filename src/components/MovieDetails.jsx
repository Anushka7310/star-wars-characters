// MovieDetails.js
import React, { useState, useEffect } from "react";
import { Box, Text, Badge } from "@chakra-ui/react";

function MovieDetails({ movieUrl }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(movieUrl);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieUrl]);

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} m={2}>
      {movie ? (
        <>
          <Text fontWeight="bold" fontSize="lg">
            {movie.title}
          </Text>
          <Text>Director: {movie.director}</Text>
          <Text>Producer: {movie.producer}</Text>
          <Text>Release Date: {movie.release_date}</Text>
          <Badge colorScheme="teal">Episode {movie.episode_id}</Badge>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}

export default MovieDetails;
