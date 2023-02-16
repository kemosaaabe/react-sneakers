import { useEffect, useState } from 'react';
import styles from './Card.module.scss';

function Card({ imageUrl, title, price, onFavorite, onPlus }) {
    const [isAdded, setIsAdded] = useState(false);

    const onClickPlus = () => {
        onPlus({ title, price, imageUrl });
        setIsAdded(!isAdded);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardFavorite}>
                <img src="/img/heart-unliked.svg" alt="Unliked" />
            </div>
            <img
                className={styles.cardImage}
                src={imageUrl}
                alt="Sneakers"
                width={133}
                height={112}
            />
            <h5 className={styles.cardTitle}>{title}</h5>
            <div className={styles.cardBottom}>
                <div className={styles.cardPrice}>
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img
                    className={styles.cardButton}
                    width={32}
                    height={32}
                    src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                    alt="Plus"
                    onClick={onClickPlus}
                />
            </div>
        </div>
    );
}

export default Card;
