import { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import { abi, address } from "./config.js";

const Admin = (props) => {
  const [userWalletAddress, setUserWalletAddress] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);
  const [monsters, setMonsters] = useState([]);

  // let AdminS = {
  //   userWalletAddress = '';
  //   web3 = '';
  //   balance = '';
  // const [contract, setContract] = useState(null);
  // const [monsters, setMonsters]
  // }

  useEffect(() => {
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

  useEffect(() => {
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

  return (
    <div>
      {userWalletAddress ? (
        <>
          <h1>Web3 Dashboard</h1>
          <p>
            Current wallet address: <span>{userWalletAddress}</span>
          </p>
          <p>
            Wallet balance: <span>{balance ? `${balance} ETH` : "Loading..."}</span>
          </p>
          <h2>Monsters:</h2>
          <div className="monsters">
            {monsters.map((id) => (
              <MonsterCard key={id} id={id} contract={contract} />
            ))}
          </div>
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
    </div>
  );
}

export default Admin;

Admin.propTypes = {
  token: PropTypes.any,
  availability: PropTypes.array
};
