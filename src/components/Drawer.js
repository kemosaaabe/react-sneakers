function Drawer({ onClose, items = [] }) {
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
                <div className="items">
                    {items.map((obj) => {
                        return (
                            <div className="cartItem">
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
        </div>
    );
}

export default Drawer;
