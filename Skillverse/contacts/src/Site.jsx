// React content
import React from "react";
import {
    Routes,
    Route,
    useNavigate,
  } from 'react-router-dom';


// Web3 content
import Web3 from "web3";

// Components
import Welcome from "./components/Welcome";
import BigButton from "./components/BigButton";

// Pages
import Output from './pages/Output.jsx';
import Input from './pages/Input.jsx';



function Site() {
  const [userWalletAddress, setUserWalletAddress] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const [userInput, setUserInput] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    // 初始化UserInput
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
  

  return (
    <div>
        <nav className="navbar">
            {userWalletAddress ? (
            <>
                <h1 className="admin_title">Web3 Dashboard</h1>
                <p className="admin_info">
                Current wallet address: <span>{userWalletAddress}</span>
                </p>
                <BigButton onClick={logout}>Logout</BigButton>
            </>
            ) : (
            <>
                <h1 className="admin_title">Web3 Login</h1>
                <p className="admin_info">Please install MetaMask</p>
                <p className="admin_info">or any Ethereum Extension Wallet</p>
                <BigButton onClick={loginWithEth}>Login with Ethereum</BigButton>
            </>
            )}
        </nav>
        <Routes>
            <Route path="/" element={<Welcome monsterInputBtnFn={monsterInputBtn} userConnected={userWalletAddress}/>} />
            <Route path='/monster-output' element={<Output userInput={userInput} userWalletAddress={userWalletAddress}/>} />
            <Route path='/monster-input' element={<Input setUserInputFn={setUserInput}/>} />
        </Routes>
    </div>
  );
}

export default Site;
