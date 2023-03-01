import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';
import AppContext from '../../context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, onOrderDone, items = [], opened }) {
    const { setCartItems, totalPrice } = useCart();
    const [isLoading, setIsLoading] = React.useState(false);

    const { isOrderCompleted, setIsOrderCompleted } =
        React.useContext(AppContext);

    const onOrderCompleted = async () => {
        setIsLoading(true);
        setIsOrderCompleted(true);
        onOrderDone();
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
        <div
            className={`${styles.overlay} ${
                opened ? `${styles.overlayVisible}` : ''
            }`}
        >
            <div className={styles.drawer}>
                <h2 className={styles.drawerTitle}>
                    Корзина
                    <img
                        onClick={onClose}
                        className={styles.cartItemRemove}
                        src="img/btn-remove.svg"
                        alt="Remove"
                    />
                </h2>
                {items.length > 0 ? (
                    <div className={styles.itemsWrapper}>
                        <div className={styles.items}>
                            {items.map((obj) => {
                                return (
                                    <div
                                        className={styles.cartItem}
                                        key={obj.id}
                                    >
                                        <div
                                            style={{
                                                backgroundImage: `url(${obj.imageUrl})`,
                                            }}
                                            className={styles.cartItemImg}
                                        ></div>

                                        <div className={styles.cartItemInfo}>
                                            <p>{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img
                                            className={styles.cartItemRemove}
                                            src="img/btn-remove.svg"
                                            alt="Remove"
                                            onClick={() => onRemove(obj.id)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.drawerBottom}>
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>
                                        {Math.round(totalPrice * 0.05 * 100) /
                                            100}{' '}
                                        руб.
                                    </b>
                                </li>
                            </ul>
                            <button
                                disabled={isLoading}
                                className={styles.greenButton}
                                onClick={onOrderCompleted}
                            >
                                Оформить заказ
                                <img src="img/arrow.svg" alt="Arrow" />
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
                                ? 'img/orderCompleted.jpg'
                                : 'img/emptyCart.png',
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
