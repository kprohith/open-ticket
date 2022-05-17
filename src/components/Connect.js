import {
  Button,
  Box,
  Flex,
  Text,
  HStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
import nftTicketing from '../contracts/nftTicketing.json';


function Connect({ address, onConnect, onDisconnect, onContract }) {
  const navigate = useNavigate();

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    onConnect(account);
    connectContract();
  };

  const disconnectWallet = () => {
    onDisconnect();
    navigate("/");
  };

  const connectContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ID, nftTicketing.abi, signer
    );
    onContract(connectedContract);
  }

  return (
    <Flex
      fontWeight="bold"
      padding={2}
    >
      {address && (
        <HStack spacing="20px">
          <Box
            bg="white"
            color="black"
            border="1px solid #ECC94B"
            minW="120px"
            p="8px 16px"
            borderRadius="16px"
            textAlign="center"
          >
            <Text >
              💳 {address.slice(0, 6)}
              ...{address.slice(-4)}
            </Text>
          </Box>
          <Box
            bg="#ECC94B"
            minW="120px"
            p="8px 16px"
            borderRadius="16px"
            textAlign="center"
          >
            <Button
              onClick={disconnectWallet}
              size="sm"
              variant="link"
              color="white"
            >
              Disconnect Wallet
            </Button>
          </Box>
        </HStack>
      )}

      {!address &&
        <Box
          bg="goldenrod"
          minW="120px"
          p="8px 16px"
          borderRadius="16px"
          textAlign="center"
        >

          <Button
            onClick={connectWallet}
            size="sm"
            variant="link"
            color="white"
          >
            Connect to Wallet
          </Button>

        </Box>
      }

    </Flex>
  );
}

export default Connect;
