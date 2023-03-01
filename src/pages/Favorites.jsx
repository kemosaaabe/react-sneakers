import React from 'react';
import AppContext from '../context';

import Card from '../components/Card';
import InfoFavOrd from '../components/InfoFavOrd';

function Favorites() {
    const { favorites, onAddToFavorite, onAddToCart } =
        React.useContext(AppContext);

    return (
        <div className="content favorites">
            {favorites.length ? (
                <>
                    <div className="contentHeading">
                        <h1>Мои закладки</h1>
                    </div>
                    <div className="sneakersWrapper">
                        <div className="sneakers favorites">
                            {favorites.map((item) => {
                                return (
                                    <Card
                                        key={item.id}
                                        onFavorite={(obj) =>
                                            onAddToFavorite(obj)
                                        }
                                        onPlus={(obj) => onAddToCart(obj)}
                                        {...item}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <InfoFavOrd
                    title="Закладок нет :("
                    description="Вы ничего не добавляли в закладки"
                    image={{
                        src: 'img/emoji_2.png',
                        width: 70,
                        height: 70,
                    }}
                />
            )}
        </div>
    );
}

export default Favorites;
