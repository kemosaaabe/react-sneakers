function Card() {
    return (
        <div className="card">
            <div className="cardFavorite">
                <img src="/img/heart-unliked.svg" alt="Unliked" />
            </div>
            <img
                className="cardImage"
                src="/img/sneakers/1.jpg"
                alt="Sneakers"
                width={133}
                height={112}
            />
            <h5 className="cardTitle">
                Мужские Кроссовки Nike Blazer Mid Suede
            </h5>
            <div className="cardBottom">
                <div className="cardPrice">
                    <span>Цена:</span>
                    <b>12 999 руб.</b>
                </div>
                <button className="cardButton">
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
