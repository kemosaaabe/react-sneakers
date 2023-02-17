import { useState } from 'react';
import styles from './Card.module.scss';

function Card({
    imageUrl,
    title,
    price,
    onFavorite,
    onPlus,
    id,
    favorited = false,
}) {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        setIsAdded(!isAdded);
        onPlus({ title, price, imageUrl, id }, isAdded);
    };

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
        onFavorite({ title, price, imageUrl, id });
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardFavorite}>
                <img
                    src={
                        isFavorite
                            ? '/img/heart-liked.svg'
                            : '/img/heart-unliked.svg'
                    }
                    alt="Unliked"
                    onClick={onClickFavorite}
                />
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
