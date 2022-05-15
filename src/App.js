import { useEffect, useState } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import { ethers } from 'ethers';

import Admin from "./pages/Admin";
import Buy from "./pages/Buy";
import CheckIn from "./pages/CheckIn";
import Page from "./layouts/Page";
import Wallet from "./pages/Wallet";

import nftTicketing from './contracts/nftTicketing.json'
import NavBar from "./components/NavBar";

function App() {

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
    const { ethereum } = window;
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
      <Page>
        <NavBar
          address={address}
          isOwner={isOwner}
        />
        <Routes>
          <Route
            path="/"
            element={<Buy connectedContract={connectedContract} address={address} setAddress={setAddress} />}
          />

          <Route
            path="/check-in"
            element={<CheckIn connectedContract={connectedContract} />}
          />

          <Route
            path="/admin"
            element={<Admin isOwner={isOwner} connectedContract={connectedContract} />}
          />

          <Route
            path="/wallet"
            element={<Wallet address={address} />}
          />
        </Routes>
      </Page>
  );
}

export default App;
