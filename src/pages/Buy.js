import {
  useEffect,
  useState,
} from "react";
import {
  Button,
  Heading,
  Text,
  Flex,
  useToast,
  VStack,
  Image
} from "@chakra-ui/react";

import Connect from "../components/Connect";

function Buy({ connectedContract, address, setAddress }) {
  const toast = useToast();
  const [
    totalTicketCount,
    setTotalTicketCount,
  ] = useState(null);

  const [
    availableTicketCount,
    setAvailableTicketCount,
  ] = useState(null);

  const [
    buyTxnPending,
    setBuyTxnPending,
  ] = useState(false);

  useEffect(() => {
    if (!connectedContract) return;

    getAvailableTicketCount();
    getTotalTicketCount();
  });

  const buyTicket = async () => {
    try {
      if (!connectedContract) return;

      setBuyTxnPending(true);
      const buyTxn =
        await connectedContract.mint({
          value: `${0.04 * 10 ** 18}`,
        });

      await buyTxn.wait();
      setBuyTxnPending(false);
      toast({
        title: "Transaction was successful!",
        description: (
          <a
            href={`https://rinkeby.etherscan.io/tx/${buyTxn.hash}`}
            target="_blank"
            rel="nofollow noreferrer"
          >
            View this transaction on Etherscan
          </a>
        ),
        status: "success",
        variant: "subtle",
      });
    } catch (err) {
      console.log(err);
      setBuyTxnPending(false);
      toast({
        title: "Failed.",
        description: (
          <p>
            Transaction failed!
          </p>
        ),
        status: "error",
        variant: "subtle",
      });
    }
  };

  const getAvailableTicketCount =
    async () => {
      try {
        const count = await connectedContract.availableTicketCount();
        setAvailableTicketCount(
          count.toNumber()
        );
      } catch (err) {
        console.log(err);
      }
    };

  const getTotalTicketCount =
    async () => {
      try {
        const count =
          await connectedContract.totalTicketCount();
        setTotalTicketCount(
          count.toNumber()
        );
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <VStack>
      <Heading>
        Buy NFT Tickets
      </Heading>
      {!address &&
        <Text fontSize="xl">
          OpenTicket is your one-stop shop for NFT tickets. Connect your wallet to view all available events.
        </Text>
      }

      {address &&
        <Text fontSize="xl" >
          Thanks for connecting your wallet. Browse the page to view all NFT tickets currently available for buying.
        </Text>
      }

      <Connect address={address} onConnect={(address) => {
        setAddress(address);

        window.localStorage.setItem(
          "open-ticket-address",
          address
        );
      }}

        onDisconnect={() => {
          setAddress(null);

          window.localStorage.removeItem(
            "open-ticket-address"
          );
        }}
      />

      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="0 auto"
        maxW="140px"
      >
        {address &&
          <VStack
            align="center"
            justify="center"
            border="1px"
            borderRadius="16px"
            width="200px"

          >
            <Image p={5} src="https://gateway.pinata.cloud/ipfs/QmWmYVgKziHKQ964iQ5TZgk3wCKrejiZroLfwthDEmr2pQ" alt="OPNT ticket NFT"></Image>
            <Text as="strong">
              OPNT
            </Text>
            <Button
              onClick={buyTicket}
              isLoading={buyTxnPending}
              loadingText="Pending"
              size="lg"
              colorScheme="yellow"
              color="white"
            >
              Buy Ticket
            </Button>
            <Text w="130px" p={3}>
              {availableTicketCount} of {totalTicketCount} minted!
            </Text>
          </VStack>
        }
      </Flex>
    </VStack>
  );
}

export default Buy;