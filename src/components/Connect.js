import {
  Button,
  Box,
  Flex,
  Text,
  HStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Connect({ address, onConnect, onDisconnect }) {
  const navigate = useNavigate();
  const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      onConnect(accounts[0])

    } catch (err) {
      console.log(err)
    }
  };

  const disconnectWallet = () => {
    onDisconnect();
    navigate("/");
  };
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
         border="1px solid goldenrod"
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
            bg="goldenrod"
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
