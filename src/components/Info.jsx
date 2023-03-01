import React from 'react';
import AppContext from '../context';

const Info = ({ image, title, description }) => {
    const { setCartOpened, setIsOrderCompleted } = React.useContext(AppContext);

    return (
        <div className="emptyCart">
            <div className="emptyCartImg">
                <img
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt=""
                />
            </div>
            <div className="emptyCartText">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <button
                onClick={() => {
                    setCartOpened(false);
                    setTimeout(() => setIsOrderCompleted(false), 100);
                }}
                className="greenButton"
            >
                Вернуться назад
                <img src="img/arrow.svg" alt="Arrow" />
            </button>
        </div>
    );
};

export default Info;
