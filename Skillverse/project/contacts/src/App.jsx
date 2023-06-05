import React from "react";
import Web3 from "web3";
import "./App.css";
import Welcome from "./components/Welcome";
import { abi, address } from "./config.js";
import Monster from './pages/Monster';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router
} from 'react-router-dom';

function App() {
  const [userWalletAddress, setUserWalletAddress] = React.useState(null);
  const [web3, setWeb3] = React.useState(null);
  const [balance, setBalance] = React.useState(null);
  const [contract, setContract] = React.useState(null);
  const [monsters, setMonsters] = React.useState([]);
  // const [id, setIdFn] = useState(null);

  React.useEffect(() => {
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


  const monsterPageBtn = () => {
    Navigate('/monster');
  }
  

  return (
    <Router>
      <div>
        <nav className="navbar">
          {userWalletAddress ? (
            <>
              <h1>Web3 Dashboard</h1>
              <p>
                Current wallet address: <span>{userWalletAddress}</span>
              </p>
              <p>
                Wallet balance: <span>{balance ? `${balance} ETH` : "Loading..."}</span>
              </p>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <h1>Web3 Login</h1>
              <p>Please install MetaMask or any Ethereum Extension Wallet</p>
              <button className="login-btn" onClick={loginWithEth}>
                Login with Ethereum
              </button>
            </>
          )}
        </nav>
      <Routes>
        <Route path='/' element={<Welcome monsterPageFn={monsterPageBtn}/>}></Route>
      </Routes>
      </div>
  </Router>
  );
}

export default App;