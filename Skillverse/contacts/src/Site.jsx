import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  Link
} from 'react-router-dom';

import Web3 from "web3";
import { abi, address } from "./config.js";
import './Site.css';
import Welcome from "./components/Welcome";
import BigButton from "./components/BigButton";
import Output from './pages/Output.jsx';
import Input from './pages/Input.jsx';

function Site() {
  const [userWalletAddress, setUserWalletAddress] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const [contract, setContract] = React.useState(null);
  const [userInput, setUserInput] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const hasInput = localStorage.getItem('userInput');

    if (hasInput) {
      setUserInput(hasInput);
    }

    async function load() {
      if (window.ethereum) {
        setWeb3(new Web3(window.ethereum));
      } else {
        alert("Please install MetaMask or any Ethereum Extension Wallet");
      }

      const storedAddress = window.localStorage.getItem("userWalletAddress");
      setUserWalletAddress(storedAddress);
      showUserDashboard();
    }

    load();
  }, []);

  React.useEffect(() => {
    if (web3) {
      const contractInstance = new web3.eth.Contract(abi, address);
      setContract(contractInstance);
    }
  }, [web3]);

  const loginWithEth = async () => {
    try {
      if (web3) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const selectedAccount = accounts[0];

        setUserWalletAddress(selectedAccount);
        window.localStorage.setItem("userWalletAddress", selectedAccount);

        showUserDashboard();
      } else {
        alert("Wallet not found");
      }
    } catch (error) {
      alert(error);
    }
  };

  const logout = () => {
    setUserWalletAddress(null);
    window.localStorage.removeItem("userWalletAddress");
    showUserDashboard();
  };

  const showUserDashboard = async () => {
    if (!userWalletAddress) {
      document.title = "Web3 Login";
      return;
    }

    document.title = "Web3 Dashboard";
  };

  const monsterInputBtn = () => {
    navigate('/monster-input');
  }

  const goBack = () => {
    navigate(-1);
  }
  
  return (
    <div className="site-container">
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="admin_title">Skillverse</h1>
          {window.location.pathname !== "/" && (
            <button className="back-btn" onClick={goBack}>Back</button>
          )}
          {userWalletAddress ? (
            <div className="user-info">
              <span>Logged in as:</span>
              <span className="user-address">{userWalletAddress}</span>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
          ) : (
            <button className="login-btn" onClick={loginWithEth}>Login with Ethereum</button>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Welcome monsterInputBtnFn={monsterInputBtn} userConnected={userWalletAddress} />} />
        <Route path='/monster-output' element={<Output userInput={userInput} userWalletAddress={userWalletAddress} />} />
        <Route path='/monster-input' element={<Input setUserInputFn={setUserInput} />} />
      </Routes>
    </div>
  );
}

export default Site;
