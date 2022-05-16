import {
  Box,
  Flex,
} from "@chakra-ui/react";

function Page({ children }) {
  return (
    <Flex
      align="center"
      bgImage="linear-gradient(
        rgba(103, 130, 180, 0.35),
        rgba(177, 191, 216, 0.50)
      )"
      direction="column"
      grow="1"
      minH="100vh"
    >
      <Box
        bg="white"
        width="100%"
        padding="0px 0px 100px 0px"
        align="center">
        {children}
      </Box>
    </Flex>
  );
}

export default Page;
