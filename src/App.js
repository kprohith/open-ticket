import { useState } from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import Admin from "./pages/Admin";
import Buy from "./pages/Buy";
import CheckIn from "./pages/CheckIn";
import Page from "./layouts/Page";
import Wallet from "./pages/Wallet";
import NavBar from "./components/NavBar";

function App() {
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [isOwner, setIsOwner] = useState(null);

  return (
    <Page>
      <NavBar address={address} isOwner={isOwner} />
      <Routes>
        <Route
          path="/"
          element={<Buy address={address} setAddress={setAddress} contract={contract} setContract={setContract} isOwner={isOwner} setIsOwner={setIsOwner} />}
        />

        <Route
          path="/wallet"
          element={<Wallet address={address} />}
        />
        <Route
          path="/check-in"
          element={<CheckIn contract={contract} />}
        />

        <Route
          path="/admin"
          element={<Admin isOwner={isOwner} contract={contract} />}
        />

      </Routes>
    </Page>
  );
}

export default App;
