import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useEffect, useState } from 'react';

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        fetch('https://63d9058a5a330a6ae172e9ed.mockapi.io/items')
            .then((res) => res.json())
            .then((json) => setItems(json));
    }, []);

    const onAddToCart = (obj) => {
        setCartItems((prev) => {
            const uniquePrev = prev.filter(
                (item) =>
                    !(
                        JSON.stringify(Object.entries(item).sort()) ==
                        JSON.stringify(Object.entries(obj).sort())
                    )
            );
            return [...uniquePrev, obj];
        });
    };

    return (
        <div className="wrapper">
            {cartOpened && (
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                />
            )}
            <Header onClickCart={() => setCartOpened(true)} />
            <div className="content">
                <div className="contentHeading">
                    <h1>Все кроссовки</h1>
                    <div className="contentSearchBlock">
                        <img alt="Search" src="/img/search.svg" />
                        <input type="text" placeholder="Поиск..." />
                    </div>
                </div>
                <div className="sneakers">
                    {items.map((item) => {
                        return (
                            <Card
                                title={item.title}
                                price={item.price}
                                imageUrl={item.imageUrl}
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
