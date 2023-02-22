import React from 'react';
import AppContext from '../context';
import axios from 'axios';
import Info from './Info';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const { setCartItems } = React.useContext(AppContext);

    const onOrderCompleted = async () => {
        setIsLoading(true);
        setIsOrderCompleted(true);
        setCartItems([]);

        for (let i = 0; i < items.length; i++) {
            await axios.delete(
                `https://63d9058a5a330a6ae172e9ed.mockapi.io/cart/${items[i].id}`
            );

            await delay(1000);
        }

        setIsLoading(false);
    };

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="drawerTitle">
                    Корзина
                    <img
                        onClick={onClose}
                        className="cartItemRemove"
                        src="/img/btn-remove.svg"
                        alt="Remove"
                    />
                </h2>
                {items.length > 0 ? (
                    <div className="itemsWrapper">
                        <div className="items">
                            {items.map((obj) => {
                                return (
                                    <div className="cartItem" key={obj.id}>
                                        <div
                                            style={{
                                                backgroundImage: `url(${obj.imageUrl})`,
                                            }}
                                            className="cartItemImg"
                                        ></div>

                                        <div className="cartItemInfo">
                                            <p>{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img
                                            className="cartItemRemove"
                                            src="/img/btn-remove.svg"
                                            alt="Remove"
                                            onClick={() => onRemove(obj.id)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="drawerBottom">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>21 498 руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>1074 руб.</b>
                                </li>
                            </ul>
                            <button
                                disabled={isLoading}
                                className="greenButton"
                                onClick={onOrderCompleted}
                            >
                                Оформить заказ
                                <img src="/img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={
                            isOrderCompleted
                                ? 'Заказ оформлен!'
                                : 'Корзина пустая'
                        }
                        description={
                            isOrderCompleted
                                ? 'Ваш заказ #18 скоро будет передан курьерской доставке'
                                : `Добавьте хотя бы одну пару кроссовок, чтобы
                        сделать заказ.`
                        }
                        image={{
                            src: isOrderCompleted
                                ? '/img/orderCompleted.jpg'
                                : '/img/emptyCart.png',
                            width: isOrderCompleted ? 83 : 120,
                            height: 120,
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default Drawer;
