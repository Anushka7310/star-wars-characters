import React from "react";
import { ChakraProvider, CSSReset, Box, position } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterList from "./components/pages/CharacterList";
import CharacterDetails from "./components/pages/CharacterDetails";
import Favourites from "./components/pages/Favourites";
import NavBar from "./components/NavBar";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: `black`, // Set the background color to black
        color: "white", // Set the text color to white
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Router>
        <NavBar />
        <div style={{ marginTop: "64px", padding: "20px" }}>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetails />} />
            <Route path="/favorites" element={<Favourites />} />
            <Route
              path="/"
              element={
                <Box p={4}>
                  <CharacterList />
                </Box>
              }
            />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
