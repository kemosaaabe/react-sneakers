import { Link } from 'react-router-dom';
import React from 'react';
import { useCart } from '../hooks/useCart';

function Header(props) {
    const { totalPrice } = useCart();

    return (
        <header className="header">
            <Link to="" className="headerLogoLink">
                <div className="headerLeft">
                    <img
                        width={40}
                        height={40}
                        src="img/logo.png"
                        alt="Logo"
                    />
                    <div className="headerTitle">
                        <h3>React sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="headerRight">
                <li onClick={props.onClickCart}>
                    <img
                        width={18}
                        height={18}
                        src="img/cart.svg"
                        alt="Cart"
                    />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to="favorites">
                        <img
                            src="img/favorite.svg"
                            alt="Favorite"
                            width={18}
                            height={18}
                        />
                    </Link>
                </li>
                <li>
                    <Link to="orders">
                        <img
                            width={18}
                            height={18}
                            src="img/user.svg"
                            alt="User"
                        />
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;
