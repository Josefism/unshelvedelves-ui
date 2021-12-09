import '../styles/Header.css';

function Header(props) {
    return (
        <header>
            <h1 className="heading">
                Unshelved Elves - Series 1
            </h1>
            <div className='banner-img'>
                <img src={props.bannerImg} alt="Unshelved Elves" />
            </div>
        </header>
    )
}

export default Header;