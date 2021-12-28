import React, { useEffect, useState, Component } from 'react';
import ReactDOM from 'react-dom';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { ethers } from 'ethers';
import './styles/App.css';
import contract from './contracts/UnshelvedElvesSeries1.json';
import { Fragment } from 'react/cjs/react.production.min';
import Footer from './components/Footer';
import Header from './components/Header';
import ElvesBanner from './assets/ElvesBanner.png';
import ElvesGif from './assets/UnshelvedElves-Series1.gif';

const enviro = runtimeEnv();
const contractOwner = process.env.REACT_APP_UE1_CONTRACT_OWNER || enviro.REACT_APP_UE1_CONTRACT_OWNER;
const imgBase = process.env.REACT_APP_UE1_IMG_BASE || enviro.REACT_APP_UE1_IMG_BASE;
const metadataBase = process.env.REACT_APP_UE1_META_BASE || enviro.REACT_APP_UE1_META_BASE;
const contractAddress = "0xCC60B46D0959e326620eb0239D18055AEC86Af3A";
const abi = contract.abi;

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/elf' element={<Home />} />
        <Route path='/elf/:id' element={<ElfData />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

function Home() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [metamaskError, setMetamaskError] = useState(null);
  const [mineStatus, setMineStatus] = useState(null);
  let TotalPrice = "0";
  let showAdmin = false;

  if (contractOwner === currentAccount) {
    showAdmin = true;
  }

  const checkWalletIsConnected = async () => {
	  const { ethereum } = window;
	  
	  if (!ethereum) {
		  console.log("Make sure you have Metamask installed!");
		  return;
	  } else {
		  console.log("Wallet exists! We're ready to go!");
	  }

    const network = await ethereum.request({ method: 'eth_chainId' });
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    let networkValid = false;
    let networkChainId = network.toString();
    //console.log("Network ChainId: " + networkChainId);
    if (networkChainId === '0x4' || networkChainId === '0x89' || networkChainId === '0x13881') {
      networkValid = true;
    }

    if (accounts.length !== 0 && networkValid) {
      const account = accounts[0];
      //console.log("Found an authorized account: ", account);
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
      if (networkChainId === '0x4' || networkChainId === '0x89' || networkChainId === '0x13881') {
        networkValid = true;
      }
  
      if (networkValid) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        //console.log("Found an account! Address: ", accounts[0]);
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
  
          console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
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
  
          console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
          setMineStatus('withdrawsuccess');
        } else {
          setMineStatus('withdrawerror');
          console.log("Ethereum object does not exist.");
        }
      } catch (err) {
        setMineStatus('withdrawerror');
        console.log(err);
      }
  }

  const aboutContent = () => {
    return (
      <div className="about-content">
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
        <p>Connect your Metamask wallet to get started with Unshelved Elves!</p>
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
      </div>
    )
  }

  const mintNftButtons = () => {
    return (
      <div>
        <h2>Buy Unshelved Elves</h2>
        <h3>Find our collection on OpenSea!</h3>
        <p>You may have missed the presale, but there's no reason you have to remain elfless!</p>
        <p>Head over to our collection on OpenSea to grab some Unshelved Elves of your very own. Since we're on the Polygon chain, gas fees are virtually free!</p>
        <p><a href="https://opensea.io/collection/unshelved-elves-series-1" target="_blank" rel="noreferrer">https://opensea.io/collection/unshelved-elves-series-1</a></p>
        <p><strong>NOTE:</strong> Due to funtional constraints of listing Polygon NFTs on OpenSea (which only allows listing one item at a time on Polygon) we are still in the process of completing the minting and listing of all Unshelved Elves. As Unshelved Elves sell on OpenSea, we will continue listing remaining Elves until all are sold.</p>
        <p>Looking for more info or have other questions not answered here? Reach out to us on Twitter for direct responses! <a href="https://twitter.com/UnshelvedElves" target="_blank" rel="noreferrer">https://twitter.com/UnshelvedElves</a></p>
      </div>
    )
  }

  const ownerButtons = () => {
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

  useEffect(() => {
    checkWalletIsConnected();

    if (window.ethereum) {
      window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    }
  }, [])


  return (
    <Fragment>
      {metamaskError && <div className='metamask-error'>Please make sure you are connected to the Polygon Network on Metamask!</div>}
      <div className="App">
        <div className="container">
          <Header bannerImg={ElvesBanner} />
          <div className="content home-content">
            {aboutContent()}
            {currentAccount && mineStatus !== 'mining' && mintNftButtons()}
            {showAdmin && mineStatus !== 'mining' && ownerButtons()}
            {!currentAccount && !mineStatus && connectWalletButton()}
            <div className='mine-submission'>
              {mineStatus === 'success' && <div className={mineStatus}>
                <p>NFT minting successful!</p>
                <p className='success-link'>
                  <a href={`https://opensea.io/${currentAccount}/`} target='_blank' rel='noreferrer'>Click here</a>
                  <span> to view your NFT on OpenSea.</span>
                </p>
              </div>}
              {mineStatus === 'withdrawsuccess' && <div className={mineStatus}>
                <p>Withdrawal succeeded. Verify the transaction appears in MetaMask.</p>
              </div>}
              {mineStatus === 'mining' && <div className={mineStatus}>
                <div className='loader' />
                <span>Transaction is mining</span>
              </div>}
              {mineStatus === 'error' && <div className={mineStatus}>
                <p>Transaction failed. Make sure you have at least {TotalPrice} Polygon MATIC in your Metamask wallet and try again.</p>
              </div>}
              {mineStatus === 'withdrawerror' && <div className={mineStatus}>
                <p>Withdrawal failed. No funds to withdraw at this time.</p>
              </div>}
            </div>
          </div>
          <Footer address={contractAddress} footerImg={ElvesGif} />
        </div>
      </div>
      <div id="modal-root"></div>
    </Fragment>
  )
}

function ElfData() {
  let { id } = useParams();
  let elfNum;
  let elfIdErr = false;
  let imgUrl = "https://storage.googleapis.com/unshelvedelves.assemblystudio.com/images/images/";
  let metaUrl = "https://storage.googleapis.com/unshelvedelves.assemblystudio.com/metadata/metadata/";
  let openseaElfLink = "https://opensea.io/assets/matic/" + contractAddress + "/";
  let elfAttr = [];

  try {
    elfNum = parseInt(id);
    const validId = new RegExp(/^\d{1,5}$/, 'gi');

    if (!validId.test(elfNum)) {
      console.log('Too many digits in elf num');
      elfIdErr = true;
    } else {
      if (elfNum > 20000) {
        console.log('Elfnum out of range.');
        elfIdErr = true;
      }
    }

    imgUrl += elfNum + ".png";
    metaUrl += elfNum;
    openseaElfLink += elfNum;

    let elfRequest = new Request(metaUrl);

    fetch(elfRequest, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Host': 'storage.googleapis.com',
        'Content-Type': 'application/octet-stream',
        'Access-Control-Allow-Origin': 'http://localhost:8080'
      }
    })
    .then(function(response) {
      //if (!response.ok) {
      //  throw new Error(`HTTP error! status: ${response.status}`);
      //}
      console.log(response);
      let elfData = JSON.parse(response);
      return elfData
    })
    .then(function(elfData) {
      for(var i in elfData.attributes)
        elfAttr.push([i, elfData.attributes[i]]);
    });
  }
  catch{
    console.log('Elfnum is not a number.');
    elfIdErr = true;
  }

  return(
    <Fragment>
      <div className="App">
        <div className="container">
          <Header bannerImg={ElvesBanner} />
          <div className="content">
            {elfIdErr && <div><h2>Unshelved Elves</h2><h3>Oops!</h3><p>You're looking for something that isn't one of our Elves! <Link to="/">Go back to the homepage</Link> and try again.</p></div>}
            {!elfIdErr && <div>
            <div className='elf-header-block'>
              <h2>
                Unshelved Elves - Series 1
              </h2>
              <h3>
                Data about Elf #{elfNum}
              </h3>
            </div>
            <div className="elf-image-block">
              <img className="single-elf-image" src={imgUrl} alt="Unshelved Elf NFT graphic" /> 
            </div>
            <div className="elf-data-block">
              <p>
                Please be patient as we finalize our elf data output. This section will soon contain information about the attributes of each elf.
                {elfAttr}
              </p>
              <p>
                In the meantime, minted elves can be viewed on OpenSea. If Unshelved Elf #{elfNum} has been minted, you can click the link below to view their info on OpenSea.
              </p>
              <p>
                <a href={openseaElfLink} target="_blank" title="View this Unshelved Elf on OpenSea (if minted)">View on OpenSea (If Minted)</a>
              </p>
            </div>
            </div>}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

function NotFound() {
  return(
    <Fragment>
      <div className="App">
        <div className="container">
          <Header bannerImg={ElvesBanner} />
          <div className="content">
            <h2>
              Unshelved Elves
            </h2>
            <h3>
              Elf Not Found!
            </h3>
            <p>
              It appears you're looking for elves in the wrong place. You might want to <Link to="/">go back to the homepage</Link> and get on the right track.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App;