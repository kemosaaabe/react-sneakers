import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        axios
            .get('https://63d9058a5a330a6ae172e9ed.mockapi.io/items')
            .then((res) => setItems(res.data));

        axios
            .get('https://63d9058a5a330a6ae172e9ed.mockapi.io/cart')
            .then((res) => setCartItems(res.data));
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://63d9058a5a330a6ae172e9ed.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://63d9058a5a330a6ae172e9ed.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className="wrapper">
            {cartOpened && (
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                />
            )}
            <Header onClickCart={() => setCartOpened(true)} />
            <div className="content">
                <div className="contentHeading">
                    <h1>
                        {searchValue
                            ? `Поиск по запросу: ${searchValue}`
                            : 'Все кроссовки'}
                    </h1>
                    <div className="contentSearchBlock">
                        <img alt="Search" src="/img/search.svg" />
                        <input
                            onChange={onChangeSearchInput}
                            value={searchValue}
                            type="text"
                            placeholder="Поиск..."
                        />
                    </div>
                </div>
                <div className="sneakers">
                    {items
                        .filter((item) =>
                            item.title
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                        )
                        .map((item) => {
                            return (
                                <Card
                                    title={item.title}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    id={item.id}
                                    key={item.id}
                                    onPlus={(obj) => onAddToCart(obj)}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default App;
