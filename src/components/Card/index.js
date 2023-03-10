import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';
import AppContext from '../../context';

function Card({
    imageUrl,
    title,
    price,
    onFavorite,
    onPlus,
    id,
    loading = false,
}) {
    const { isItemAdded, isItemFavorite } = React.useContext(AppContext);
    const obj = { title, price, imageUrl, id, parentId: id };

    const onClickPlus = () => {
        onPlus(obj);
    };

    const onClickFavorite = () => {
        onFavorite(obj);
    };

    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={169}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
                    <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
                    <rect
                        x="118"
                        y="155"
                        rx="8"
                        ry="8"
                        width="32"
                        height="32"
                    />
                </ContentLoader>
            ) : (
                <>
                    <div className={styles.cardFavorite}>
                        {onFavorite && (
                            <img
                                src={
                                    isItemFavorite(id)
                                        ? 'img/heart-liked.svg'
                                        : 'img/heart-unliked.svg'
                                }
                                alt="Unliked"
                                onClick={onClickFavorite}
                            />
                        )}
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
                            <span>????????:</span>
                            <b>{price} ??????.</b>
                        </div>
                        {onPlus && (
                            <img
                                className={styles.cardButton}
                                width={32}
                                height={32}
                                src={
                                    isItemAdded(id)
                                        ? 'img/btn-checked.svg'
                                        : 'img/btn-plus.svg'
                                }
                                alt="Plus"
                                onClick={onClickPlus}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
