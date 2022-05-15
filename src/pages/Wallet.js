import {
  Heading,
  Text,
  Box,
  CircularProgress,
  Image,
  Link,
  VStack,
  Flex
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Wallet({ address }) {
  const [loadingTicket, setLoadingTicket] = useState(false);
  const [tickets, setTickets] = useState(null);

  const createTicketDisplay = () => {
    if (!tickets) {
      return null
    };

    // TODO: sort the json to list the tickets in order of buying
    return (
      <>
        {tickets.map((ticket) => {
          return <Link
            href={ticket.permalink}
            key={ticket.token_id}
            isExternal
            margin="16px 8px"
            padding={4}
          >
            <Box
              padding="12px"
              border="1px solid black"
              borderRadius="12px"
            >
              <Image
                src={ticket.image_url}
                alt={`OPNT #${ticket.token_id}`}
              />

              <Text
                fontSize="xl"
                textAlign="center"
                mb={2}
              >
                OPNT #{ticket.token_id}
              </Text>
            </Box>
          </Link>
        })}
        </>
        );
  };

  useEffect(() => {
    if (!address) return;
    axios.get(`https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${process.env.REACT_APP_CONTRACT_ID}`
    )
      .then(res => {
        setLoadingTicket(true);
        console.log(res);
        if (res.status === 200 && res?.data?.assets && res?.data?.assets.length) {
          setTickets(res.data.assets);
        }
        setLoadingTicket(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingTicket(false);
      })
  }, [address]);

  return (
    <VStack>
      <Heading>
        Your tickets
      </Heading>

      {loadingTicket && (
        <CircularProgress
          capIsRound
          isIndeterminate
          color="yellow.300"
          size="120px"
        />
      )}

      {!loadingTicket && tickets && <Flex justify="center" width="100%"> {createTicketDisplay()} </Flex>}

      {!loadingTicket && !tickets && (
        <Text
          fontSize="xl"
          width="100%"
          padding={4}
        >
          You own zero tickets as of now.
        </Text>
      )}

    </VStack>
  );
}

export default Wallet;
