import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import contract from './contracts/UnshelvedElvesSeries1.json';
import { Fragment } from 'react/cjs/react.production.min';
import Footer from './components/Footer';
import Header from './components/Header';
import ElvesBanner from './assets/ElvesBanner.png';
import ElvesGif from './assets/UnshelvedElves-Series1.gif';

const contractAddress = "0x02c4ab6E4DB3cCb2406885E38Fa17181B6f96247";
const abi = contract.abi;

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [metamaskError, setMetamaskError] = useState(null);
  const [mineStatus, setMineStatus] = useState(null);

  const checkWalletIsConnected = async () => {
	  const { ethereum } = window;
	  
	  if (!ethereum) {
		  console.log("Make sure you have Metamask installed!");
		  return;
	  } else {
		  console.log("Wallet exists! We're ready to go!");
	  }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const network = await ethereum.request({ method: 'eth_chainId' });

    if (accounts.length !== 0 && network.toString() === '0x4') {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      setMetamaskError(true);
      console.log("No authorized account found.");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const network = await ethereum.request({ method: 'eth_chainId' });

      if (network.toString() === '0x4') {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Found an account! Address: ", accounts[0]);
        setMetamaskError(null);
        setCurrentAccount(accounts[0]);
      }

      else {
        setMetamaskError(true);
      }

    } catch (err) {
      console.log(err)
    }
  }

  const mintOneNftHandler = async () => { 
    try {

      setMineStatus('mining');

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("10") });

        console.log("Mining ... please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`);
        setMineStatus('success');
      } else {
        setMineStatus('error');
        console.log("Ethereum object does not exist.");
      }
    } catch (err) {
      setMineStatus('error');
      console.log(err);
    }
  }

  const mintTwoNftHandler = async () => { 
    try {

      setMineStatus('mining');

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(2, { value: ethers.utils.parseEther("17.5") });

        console.log("Mining ... please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`);
        setMineStatus('success');
      } else {
        setMineStatus('error');
        console.log("Ethereum object does not exist.");
      }
    } catch (err) {
      setMineStatus('error');
      console.log(err);
    }
  }

  const mintThreeNftHandler = async () => { 
    try {

      setMineStatus('mining');
      
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(3, { value: ethers.utils.parseEther("22.5") });

        console.log("Mining ... please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`);
        setMineStatus('success');
      } else {
        setMineStatus('error');
        console.log("Ethereum object does not exist.");
      }
    } catch (err) {
      setMineStatus('error');
      console.log(err);
    }
  }

  const mintFourNftHandler = async () => { 
    try {

      setMineStatus('mining');

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(4, { value: ethers.utils.parseEther("25") });

        console.log("Mining ... please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`);
        setMineStatus('success');
      } else {
        setMineStatus('error');
        console.log("Ethereum object does not exist.");
      }
    } catch (err) {
      setMineStatus('error');
      console.log(err);
    }
  }

  const mintFiveNftHandler = async () => { 
    try {

      setMineStatus('mining');

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(5, { value: ethers.utils.parseEther("25") });

        console.log("Mining ... please wait.");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`);
        setMineStatus('success');
      } else {
        setMineStatus('error');
        console.log("Ethereum object does not exist.");
      }
    } catch (err) {
      setMineStatus('error');
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <div>
        <p>Connect your Metamask wallet to get started minting Unshelved Elves!</p>
        <p>Mint 1 to 5 elves at a time. The more you mint in a single transaction, the less you pay per-elf!</p>
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
      </div>
    )
  }

  const mintNftButtons = () => {
    return (
      <div>
        <button onClick={mintOneNftHandler} className='cta-button mint-nft-button'>
          Mint 1 Unshelved Elf (10 MATIC each)
        </button>
        <button onClick={mintTwoNftHandler} className='cta-button mint-nft-button'>
          Mint 2 Unshelved Elves (8.75 MATIC each)
        </button>
        <button onClick={mintThreeNftHandler} className='cta-button mint-nft-button'>
          Mint 3 Unshelved Elves (7.5 MATIC each)
        </button>
        <button onClick={mintFourNftHandler} className='cta-button mint-nft-button'>
          Mint 4 Unshelved Elves (6.25 MATIC each)
        </button>
        <button onClick={mintFiveNftHandler} className='cta-button mint-nft-button'>
          Mint 5 Unshelved Elves (5 MATIC each)
        </button>
      </div>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();

    if (window.ethereum) {
      window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    }
  }, [])

  return (
        <Fragment>
        {metamaskError && <div className='metamask-error'>Please make sure you are connected to the Mumbai Network on Metamask!</div>}
        <div className="App">
          <div className="container">
            
            <div className="header-container">
              <div className='banner-img'>
                <img src={ElvesBanner} alt="Unshelved Elves" />
              </div>
              {currentAccount && mineStatus !== 'mining' && mintNftButtons()}
              {!currentAccount && !mineStatus && connectWalletButton()}
              <div className='mine-submission'>
                {mineStatus === 'success' && <div className={mineStatus}>
                  <p>NFT minting successful!</p>
                  <p className='success-link'>
                    <a href={`https://testnets.opensea.io/${currentAccount}/`} target='_blank' rel='noreferrer'>Click here</a>
                    <span> to view your NFT on OpenSea.</span>
                  </p>
                </div>}
                {mineStatus === 'mining' && <div className={mineStatus}>
                  <div className='loader' />
                  <span>Transaction is mining</span>
                </div>}
                {mineStatus === 'error' && <div className={mineStatus}>
                  <p>Transaction failed. Make sure you have at least 10 Polygon MATIC in your Metamask wallet and try again.</p>
                </div>}
              </div>
            </div>
            <Footer address={contractAddress} />
          </div>
        </div>
      </Fragment>
  )
}

export default App;