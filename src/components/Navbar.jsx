import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";

function NavBar() {
  return (
    <Box
      bg="black"
      color="white"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={999}
    >
      <Flex justify="space-between" align="center" px={8}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Flex align="center">
            <Box fontSize="2xl" fontWeight="bold">
              <img src="/icon.png" width={78} alt="Star Wars Logo" />
            </Box>
          </Flex>
        </Link>
        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <Button colorScheme="yellow" variant="solid">
            Favorites
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default NavBar;
