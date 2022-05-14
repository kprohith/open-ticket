import {
  useEffect,
  useState,
} from "react";
import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";

function Buy({ connectedContract }) {
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
          <a>
            Transaction failed!
          </a>
        ),
        status: "error",
        variant: "subtle",
      });
    }
  };

  const getAvailableTicketCount =
    async () => {
      try {
        const count =
          await connectedContract.availableTicketCount();
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
            onClick={buyTicket}
            isLoading={buyTxnPending}
            loadingText="Pending"
            size="lg"
            colorScheme="teal"
          >
            Buy Ticket
          </Button>
        </ButtonGroup>
        {availableTicketCount &&
          totalTicketCount && (
            <Text>
              {availableTicketCount} of{" "}
              {totalTicketCount} minted!
            </Text>
          )}
      </Flex>
    </>
  );
}

export default Buy;