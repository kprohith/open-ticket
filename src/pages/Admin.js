import { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

function Admin({
  isOwner,
  connectedContract,
}) {

  const toast = useToast();
  const [openSaleTxnPending, setOpenSaleTxnPending] = useState(false);

  const openSale = async () => {
    try {
      if (!connectedContract) {
        return;
      }
      setOpenSaleTxnPending(true);
      let openSaleTxn = await connectedContract.openSale();

      await openSaleTxn.wait();
      setOpenSaleTxnPending(false);

      toast({
        status: 'success',
        title: 'Sale is open!',
        variant: 'subtle',
        description: (
          <a 
            href={`https://rinkeby.etherscan.io/tx/${openSaleTxn.hash}`} target="_blank" rel="nofollow no referrer"
          >
            View this transaction on Etherscan.
          </a>
        )
      })

    } catch (err) {
      console.log(err);
      setOpenSaleTxnPending(false);
      toast({
        status: 'error',
        title: 'Error opening sale',
        description: err,
        variant: 'subtle'
      });
    }
  }

  const [closeSaleTxnPending, setCloseSaleTxnPending] = useState(false);

  const closeSale = async () => {
    try {
      if (!connectedContract) {
        return;
      }
      setCloseSaleTxnPending(true);
      let closeSaleTxn = await connectedContract.closeSale();

      await closeSaleTxn.wait();
      setCloseSaleTxnPending(false);

      toast({
        status: 'success',
        title: 'Sale is closed!',
        variant: 'subtle',
        description: (
          <a 
            href={`https://rinkeby.etherscan.io/tx/${closeSaleTxn.hash}`} target="_blank" rel="nofollow no referrer"
          >
            View this transaction on Etherscan.
          </a>
        )
      })

    } catch (err) {
      console.log(err);
      setCloseSaleTxnPending(false);
      toast({
        status: 'error',
        title: 'Error closing sale',
        description: err,
        variant: 'subtle'
      });
    }
  }

  return (
    <>
      <Heading mb={4}>
        Admin panel
      </Heading>
      <Text fontSize="xl" mb={8}>
        Enable and disable sales on the
        smart contract.
      </Text>
      <Flex
        width="100%"
        justifyContent="center"
      >
        <Button
          isLoading={openSaleTxnPending}
          isDisabled={!isOwner || closeSaleTxnPending}
          onClick={openSale}
          size="lg"
          colorScheme="teal"
        >
          Open Sale
        </Button>
        <Button
          isLoading={closeSaleTxnPending}
          onClick={closeSale}
          isDisabled={!isOwner || openSaleTxnPending}
          size="lg"
          colorScheme="red"
          variant="solid"
          marginLeft="24px"
        >
          Close Sale
        </Button>
      </Flex>
    </>
  );
}

export default Admin;
