import { useEffect, useState } from 'react';

function Drawer({ onClose, onRemove, items = [] }) {
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
                            <button className="greenButton">
                                Оформить заказ
                                <img src="/img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="emptyCart">
                        <div className="emptyCartImg">
                            <img src="/img/emptyCart.png" alt="emptyBox" />
                        </div>
                        <div className="emptyCartText">
                            <h2>Корзина пустая</h2>
                            <p>
                                Добавьте хотя бы одну пару кроссовок, чтобы
                                сделать заказ.
                            </p>
                        </div>
                        <button onClick={onClose} className="greenButton">
                            Вернуться назад
                            <img src="/img/arrow.svg" alt="Arrow" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drawer;
