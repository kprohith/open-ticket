import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";

function Buy({connectedContract}) {
  const [totalTicketCount, setTotalTicketCount] = useState(null);

  const [availableTicketCount, setAvailableTicketCount] = useState(null);

  useEffect(() => {
    if (!connectedContract) return;

    getAvailableTicketCount();
    getTotalTicketCount();
  });

  const getAvailableTicketCount = async () => {

    try {
      const count = await connectedContract.availableTicketCount();
      setAvailableTicketCount(count.toNumber());

    } catch(error) {
      console.log(error);
    }
  };

  const getTotalTicketCount = async () => {
    try {
      const count = await connectedContract.totalTicketCount();
      setTotalTicketCount(count.toNumber());
      
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <>
      <Heading mb={30}>
        |NFT Event Ticketing System|
      </Heading>
      <Text fontSize="xl" mb={4}>
        Connect your wallet to mint your
        NFT. It'll be your ticket to get
        in!
      </Text>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="0 auto"
        maxW="140px"
      >
        <ButtonGroup mb={4}>
          <Button
            loadingText="Pending"
            size="lg"
            colorScheme="teal"
          >
            Buy Ticket
          </Button>
        </ButtonGroup>
        {availableTicketCount && totalTicketCount && 
        (
        <Text>
          {availableTicketCount} of{" "} {totalTicketCount} minted!
        </Text>
        )}
      </Flex>
    </>
  );
}

export default Buy;
