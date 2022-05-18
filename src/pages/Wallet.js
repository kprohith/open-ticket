import {
  Heading,
  Text,
  Box,
  CircularProgress,
  Image,
  Link,
  VStack,
  Wrap,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption
} from "@chakra-ui/react";

import { ChevronDownIcon } from '@chakra-ui/icons'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Wallet({ address }) {
  const [loadingTicket, setLoadingTicket] = useState(false);
  const [tickets, setTickets] = useState(null);
  const [ticketDisplay, setTicketDisplay] = useState(null);

  const alphabetical = (a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  }

  const newest = (a, b) => {
    if (parseInt(a.token_id) > parseInt(b.token_id)) return -1
    if (parseInt(a.token_id) < parseInt(b.token_id)) return 1
    return 0
  }

  useEffect(() => {
    if (!address) return;
    setLoadingTicket(true);
    axios.get(`https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${process.env.REACT_APP_CONTRACT_ID}`
    )
      .then(res => {
        //console.log(res);
        if (res.status === 200 && res?.data?.assets && res?.data?.assets.length) {
          setTickets(res.data.assets);
        }
        setLoadingTicket(false);
      })
      .catch(err => {
        //console.log(err);
        setLoadingTicket(false);
      })
  }, [address]);

  useEffect(() => {
    const createTicketDisplay = () => {
      if (!tickets) return null
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
    setTicketDisplay(createTicketDisplay());
  }, [tickets]);

  return (
    <VStack>
      <Heading>
        Your tickets
      </Heading>

      <Text fontSize="xl">A register of all tickets you've bought so far.</Text>

      {loadingTicket && (
        <CircularProgress
          capIsRound
          isIndeterminate
          color="yellow.300"
          size="120px"
        />
      )}

      {!loadingTicket &&
        <VStack>
          {tickets &&
            <Menu closeOnSelect={false}>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Sort by
              </MenuButton>
              <MenuList>
                <MenuOptionGroup defaultValue="last" title="Order" type="radio">
                  <MenuItemOption onClick={() => { setTickets([...tickets].sort(newest)) }}
                    value='new'>Newest</MenuItemOption>
                  <MenuItemOption onClick={() => { setTickets([...tickets].sort(newest).reverse()) }}
                    value='time'>Time Owned</MenuItemOption>
                  <MenuItemOption onClick={() => { setTickets([...tickets].sort(alphabetical)) }}
                    value='alpha'>Alphabetical Order</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          }
          <Wrap justify="center" width="100%"> {ticketDisplay} </Wrap>
        </VStack>
      }

      {!loadingTicket && !tickets && (
        <Text as="em"
          fontSize="xl"
          width="100%"
          padding={1}
        >
          You own zero tickets as of now.
        </Text>
      )
      }

    </VStack >
  );
}

export default Wallet;
