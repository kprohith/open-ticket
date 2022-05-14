import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { ethers } from 'ethers';

import logo from "./images/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import {
  faQrcode,
  faTools,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";

import Connect from "./components/Connect";
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";

import Admin from "./pages/Admin";
import Buy from "./pages/Buy";
import CheckIn from "./pages/CheckIn";
import Page from "./layouts/Page";
import Wallet from "./pages/Wallet";

import nftTicketing from './contracts/nftTicketing.json'

function App() {
  const navigate = useNavigate();

  const [address, setAddress] = useState(null);

  console.log('address:', address);
  
  const [isOwner, setIsOwner] = useState(false);
  console.log('isOwner', isOwner);

  const [connectedContract, setConnectedContract] = useState(null);
  console.log('connectContract:', connectedContract);

  useEffect(() => {
    const checkIsContractOwner = async () => {
      if (!address || !connectedContract) return;

      const ownerAddress = await connectedContract.owner();

      if (address.toLowerCase() === ownerAddress.toLowerCase()) {
        setIsOwner(true)
      } else {
        setIsOwner(false);
      }
    };
    checkIsContractOwner();

  }, [address, connectedContract])

  useEffect(() => {
    if (!address) {
      const previousAddress = window.localStorage.getItem(
        "open-ticket-address"
      );

      if (previousAddress) {
        setAddress(previousAddress);
      }
    }
  }, [address]);

  const getConnectedContract = async () => {
    const {ethereum} = window;
    if (!ethereum) return;

    const provider = new ethers.providers.Web3Provider(
      ethereum
    );
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ID, nftTicketing.abi, signer
    );
    setConnectedContract(connectedContract)
  };
  useEffect(() => {
    getConnectedContract();
  }, []);

  return (
    <>
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
      <Page>
        <Menu
          left="0"
          _hover={{
            bg: "purple.500",
            fontWeight: "bold",
          }}
        >
          {({ isOpen }) => (
            <>
              <MenuButton
                position="absolute"
                top="12px"
                right="16px"
                as={Button}
                colorScheme="purple"
                rightIcon={
                  isOpen ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )
                }
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    navigate("/")
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Buy
                    <FontAwesomeIcon
                      icon={faEthereum}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() =>
                    navigate("/wallet")
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Your Tickets
                    <FontAwesomeIcon
                      icon={faTicketAlt}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  isDisabled={!isOwner}
                  onClick={() =>
                    navigate(
                      "/check-in"
                    )
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Check In
                    <FontAwesomeIcon
                      icon={faQrcode}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  isDisabled={!isOwner}
                  onClick={() =>
                    navigate("/admin")
                  }
                >
                  <Flex
                    alignItems="center"
                    flexDirection="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    Settings
                    <FontAwesomeIcon
                      icon={faTools}
                      size="lg"
                    />
                  </Flex>
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
        <Flex
          alignItems="flex-start"
          flex="1 1 auto"
          flexDirection="column"
          justifyContent="center"
          width="100%"
        >
          <Image
            src={logo}
            alt="OpenTicket logo"
            margin="36px auto 12px"
            width="400px"
            height="80px"
           // width="15%"
          />
          <Routes>
            <Route
              path="/"
              element={<Buy connectedContract={connectedContract} />}
            />

            <Route
              path="/check-in"
              element={<CheckIn connectedContract={connectedContract} />}
            />

            <Route
              path="/admin"
              element={<Admin 
                isOwner={isOwner}
                connectedContract={connectedContract}
              />}
            />

            <Route
              path="/wallet"
              element={<Wallet />}
            />
          </Routes>
        </Flex>
      </Page>
    </>
  );
}

export default App;
