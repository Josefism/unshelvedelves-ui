import '../styles/Footer.css';
import FooterLogo from '../assets/Assembly_Studio_2021_blue.png';
import TwitterLogo from '../assets/twitter-logo.png';

function Footer(props) {
    return (
        <footer className='footer'>
            <div className='footer-img'>
                <img src={props.footerImg} alt='Unshelved Elves GIF' />
            </div>
            <p className='contract-link-box'>
                SMART CONTRACT ADDRESS:&nbsp;
                <br />
                <span>
                    <a className='contract-link' href={`https://polygonscan.com/address/${props.address}`} target='_blank' rel='noreferrer'>
                        {props.address}
                    </a>
                </span>
            </p>
            <div className='social-links'>
                <a href='https://twitter.com/UnshelvedElves' target='_blank' title='Reach Us on Twitter!'><img src={TwitterLogo} alt='Twitter logo' width='80' /></a>
            </div>
            <div className='credits'>
                <a href='https://www.assemblystudio.com' target='_blank'><img src={FooterLogo} alt='Assembly Studio logo' /></a>
                <p>Unshelved Elves is a generative NFT art project from <a href='https://www.assemblystudio.com' target='_blank'>Assembly Studio</a>.</p>
            </div>
        </footer>
    )
}

export default Footer;