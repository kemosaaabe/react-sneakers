import React from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../context';

const InfoFavOrd = ({ image, title, description }) => {
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
            <Link to="">
                <button className="greenButton">
                    Вернуться назад
                    <img src="img/arrow.svg" alt="Arrow" />
                </button>
            </Link>
        </div>
    );
};

export default InfoFavOrd;
