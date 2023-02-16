function Header(props) {
    return (
        <header className="header">
            <div className="headerLeft">
                <img width={40} height={40} src="/img/logo.png" />
                <div className="headerTitle">
                    <h3>React sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="headerRight">
                <li onClick={props.onClickCart}>
                    <img width={18} height={18} src="/img/cart.svg" />
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img width={18} height={18} src="/img/user.svg" />
                </li>
            </ul>
        </header>
    );
}

export default Header;
