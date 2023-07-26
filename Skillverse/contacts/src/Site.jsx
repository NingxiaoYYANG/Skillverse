// React content
import React from "react";
import {
    Routes,
    Route,
    useNavigate,
  } from 'react-router-dom';


// Web3 content
import Web3 from "web3";
import { abi, address } from "./config.js";

// Components
import Welcome from "./components/Welcome";
import BigButton from "./components/BigButton";

// Pages
import Monster from './pages/Monster';
import Output from './pages/Output';
import Input from './pages/Input.jsx';



function Site() {
  const [userWalletAddress, setUserWalletAddress] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const [balance, setBalance] = React.useState(null);
  const [contract, setContract] = React.useState(null);
  const [monsters, setMonsters] = React.useState([]);
  const [id, setId] = React.useState(null);
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

  const getMonstersByOwner = async (owner) => {
    if (!contract) {
      return [];
    }

    try {
      const ids = await contract.methods.getMonstersByOwner(owner).call();
      setMonsters(ids);
    } catch (error) {
      console.error(error);
    }
  };

  const showUserDashboard = async () => {
    if (!userWalletAddress) {
      document.title = "Web3 Login";
      return;
    }

    document.title = "Web3 Dashboard";
    getWalletBalance();
    getMonstersByOwner(userWalletAddress);
  };

  const getWalletBalance = async () => {
    if (!userWalletAddress || !web3) {
      setBalance(null);
      return;
    }

    const balance = await web3.eth.getBalance(userWalletAddress);
    setBalance(web3.utils.fromWei(balance, "ether"));
  };


//   const monsterPageBtn = () => {
//     navigate('/monster')
//   }

  const monsterInputBtn = () => {
    navigate('/monster-input');
  }

  const monsterOutputBtn = () => {
    navigate('/monster-output');
  };
  

  return (
    <div>
        <nav className="navbar">
            {userWalletAddress ? (
            <>
                <h1 className="admin_title">Web3 Dashboard</h1>
                <p className="admin_info">
                Current wallet address: <span>{userWalletAddress}</span>
                </p>
                <p className="admin_info">
                Wallet balance: <span>{balance ? `${balance} ETH` : "Loading..."}</span>
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
            <Route path="/" element={<Welcome monsterInputBtnFn={monsterInputBtn} monsterOutputBtnFn={monsterOutputBtn} />} />
            <Route path='/monster' element={<Monster setId={setId} setContract={setContract} />} />
            <Route path='/monster-output' element={<Output userInput={userInput}/>} />
            <Route path='/monster-input' element={<Input setUserInputFn={setUserInput}/>} />
        </Routes>
    </div>
  );
}

export default Site;
