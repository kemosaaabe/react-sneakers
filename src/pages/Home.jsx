import React from 'react';
import Card from '../components/Card';

function Home({
    items,
    searchValue,
    onAddToCart,
    onChangeSearchInput,
    onAddToFavorite,
    isLoading,
}) {
    const renderItems = () => {
        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        return (isLoading ? [...Array(8)] : filteredItems).map((item) => {
            return (
                <Card
                    key={item?.id}
                    onPlus={(obj) => onAddToCart(obj)}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    loading={isLoading}
                    {...item}
                />
            );
        });
    };
    return (
        <div className="content">
            <div className="contentHeading">
                <h1>
                    {searchValue
                        ? `Поиск по запросу: ${searchValue}`
                        : 'Все кроссовки'}
                </h1>
                <div className="contentSearchBlock">
                    <img alt="Search" src="img/search.svg" />
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        type="text"
                        placeholder="Поиск..."
                    />
                </div>
            </div>
            <div className="sneakersWrapper">
                <div className="sneakers">{renderItems()}</div>
            </div>
        </div>
    );
}

export default Home;
