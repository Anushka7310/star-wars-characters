import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import CharacterList from "./components/pages/CharacterList";
import CharacterDetails from "./components/pages/CharacterDetails";
import Favourites from "./components/pages/Favourites";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<CharacterList />} />
          <Route path="/character/:id" exact element={<CharacterDetails />} />
          <Route path="/favourites" exact element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
