import styles from './Card.module.scss';

function Card(props) {
    return (
        <div className={styles.card}>
            <div className={styles.cardFavorite}>
                <img src="/img/heart-unliked.svg" alt="Unliked" />
            </div>
            <img
                className={styles.cardImage}
                src={props.imageUrl}
                alt="Sneakers"
                width={133}
                height={112}
            />
            <h5 className={styles.cardTitle}>{props.title}</h5>
            <div className={styles.cardBottom}>
                <div className={styles.cardPrice}>
                    <span>Цена:</span>
                    <b>{props.price} руб.</b>
                </div>
                <button className={styles.cardButton}>
                    <img
                        width={11}
                        height={11}
                        src="/img/plus.svg"
                        alt="Plus"
                    />
                </button>
            </div>
        </div>
    );
}

export default Card;
