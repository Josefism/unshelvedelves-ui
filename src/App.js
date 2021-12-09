import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './styles/App.css';
import contract from './contracts/UnshelvedElvesSeries1.json';
import { Fragment } from 'react/cjs/react.production.min';
import Footer from './components/Footer';
import Header from './components/Header';
import ElvesBanner from './assets/ElvesBanner.png';
import ElvesGif from './assets/UnshelvedElves-Series1.gif';

const contractOwner = process.env.REACT_APP_UE1_CONTRACT_OWNER;
const contractAddress = "0x02c4ab6E4DB3cCb2406885E38Fa17181B6f96247";
const abi = contract.abi;

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [metamaskError, setMetamaskError] = useState(null);
  const [mineStatus, setMineStatus] = useState(null);
  let TotalPrice = "0";

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
    let networkValid = false;
    let networkChainId = network.toString();
    if (networkChainId === '0x4' || networkChainId === '0x137' || networkChainId === '0x80001' || networkChainId === '0x13881') {
      networkValid = true;
    }

    if (accounts.length !== 0 && networkValid) {
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
      let networkValid = false;
      let networkChainId = network.toString();
      if (networkChainId === '0x4' || networkChainId === '0x137' || networkChainId === '0x80001' || networkChainId === '0x13881') {
        networkValid = true;
      }
  
      if (networkValid) {
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
        TotalPrice = "10";

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
        let nftTxn = await nftContract.mintNFTs(2, { value: ethers.utils.parseEther("16") });
        TotalPrice = "16";

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
        let nftTxn = await nftContract.mintNFTs(3, { value: ethers.utils.parseEther("21") });
        TotalPrice = "21";

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
        let nftTxn = await nftContract.mintNFTs(4, { value: ethers.utils.parseEther("24") });
        TotalPrice = "24";

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
        TotalPrice = "25";

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

  const reserveNFTHandler = async () => {
    try {

        setMineStatus('mining');
  
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const nftContract = new ethers.Contract(contractAddress, abi, signer);
  
          console.log("Initialize reservation");
          let nftTxn = await nftContract.reserveNFTs(10);

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

  const withdrawHandler = async () => {
    try {
        setMineStatus('mining');
  
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const nftContract = new ethers.Contract(contractAddress, abi, signer);
  
          console.log("Processing Withdrawal");
          let nftTxn = await nftContract.withdraw();

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

  const aboutContent = () => {
    return (
      <div class="about-content">
        <p>Have you ever wondered what those ubiquitous little Christmas elves get up to throughout the year when they <em>aren't</em> wandering around your house at night and spying on your children? Obviously, they go about their normal lives doing the same things you and I do!</p>
        <p><strong>Unshelved Elves - Series 1</strong> is a collection of 20,000 Unshelved Elf NFTs living on the Polygon blockchain that imagines the elves out in the real world, living their best lives and going about their elf-business in a variety of locations.</p>
        <p>Each <em>Unshelved Elf</em> in Series 1 was generated from a Python script randomly combining elements and traits, including: 19 Locations, 3 Suit Colors, 2 Positions, 4 Skin Tones, 6 Hair Colors, and 5 Eye Types (incl. 2 Sunglasses). Some elves have one or two optional elements: 5 Masks and/or 2 Necklaces.</p>
        <p>Unshelved Elves (Series 2) is already in the works, with plans to add more locations, suit colors, overshirts, jackets, pants, shoes, and accessories! Mint your own elf today, and check back soon for more info about the next series!</p>
      </div>
    )
  }

  const connectWalletButton = () => {
    return (
      <div>
        <p>Connect your Metamask wallet to get started minting Unshelved Elves!</p>
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
      </div>
    )
  }

  const mintNftButtons = () => {
    return (
      <div>
        <h2>Minting Unshelved Elves</h2>
        <p>Mint 1 to 5 elves at a time. The more you mint in a single transaction, the less you pay per-elf!</p>
        <h3>1 Unshelved Elf @ 10 MATIC each</h3>
        <button onClick={mintOneNftHandler} className='cta-button mint-nft-button'>
          Mint 1 Unshelved Elf
        </button>
        <h3>2 Unshelved Elves @ 8 MATIC each</h3>
        <p className='discount-note'>20% off per elf!</p>
        <button onClick={mintTwoNftHandler} className='cta-button mint-nft-button'>
          Mint 2 Unshelved Elves
        </button>
        <h3>3 Unshelved Elves @ 7 MATIC each</h3>
        <p className='discount-note'>30% off per elf!</p>
        <button onClick={mintThreeNftHandler} className='cta-button mint-nft-button'>
          Mint 3 Unshelved Elves
        </button>
        <h3>4 Unshelved Elves @ 6 MATIC each</h3>
        <p className='discount-note'>40% off per elf!</p>
        <button onClick={mintFourNftHandler} className='cta-button mint-nft-button'>
          Mint 4 Unshelved Elves
        </button>
        <h3>5 Unshelved Elves @ 5 MATIC each</h3>
        <p className='discount-note'>50% off per elf! <em>Best Deal!</em></p>
        <button onClick={mintFiveNftHandler} className='cta-button mint-nft-button'>
          Mint 5 Unshelved Elves
        </button>
      </div>
    )
  }

  const ownerButtons = () => {
    try {
      console.log("Owner: " + contractOwner);
      console.log("Account: " + currentAccount);

      if (contractOwner !== currentAccount) {
        console.log("Current wallet account is not contract owner.")
        return;
      } else {
        return (
          <div>
            <h2>
              Contract Owner Functionality
            </h2>
            <p>
              <button onClick={reserveNFTHandler} className='cta-button reserve-nft-button'>
                Reserve 10 Elves
              </button>
              <button onClick={withdrawHandler} className='cta-button withdraw-button'>
                Withdraw Balance to Owner
              </button>
            </p>
          </div>
        )      
      }
    } catch (err) {
        console.log(err);
        return;
    }
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
          <Header bannerImg={ElvesBanner} />
          <div className="content">
            {aboutContent()}
            {currentAccount && mineStatus !== 'mining' && mintNftButtons() && ownerButtons()}
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
                <p>Transaction failed. Make sure you have at least {TotalPrice} Polygon MATIC in your Metamask wallet and try again.</p>
              </div>}
            </div>
          </div>
          <Footer address={contractAddress} footerImg={ElvesGif} />
        </div>
      </div>
    </Fragment>
  )
}

export default App;