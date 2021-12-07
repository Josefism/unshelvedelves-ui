import './Footer.css';

function Footer(props) {
    return (
        <footer className='footer'>
            <p>
                SMART CONTRACT ADDRESS:&nbsp;
                <br />
                <span>
                    <a className='contract-link' href={`https://mumbai.polygonscan.com/address/${props.address}`} target='_blank' rel='noreferrer'>
                        {props.address}
                    </a>
                </span>
            </p>
        </footer>
    )
}

export default Footer;