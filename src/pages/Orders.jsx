import React from 'react';

import AppContext from '../context';
import Card from '../components/Card';
import InfoFavOrd from '../components/InfoFavOrd';

function Orders() {
    const { orders } = React.useContext(AppContext);
    console.log(orders);
    return (
        <div className="content favorites">
            {orders.length ? (
                <>
                    <div className="contentHeading">
                        <h1>Мои заказы</h1>
                    </div>
                    <div className="snekaersWrapper">
                        <div className="sneakers">
                            {orders.map((item) => {
                                return <Card key={item.id} {...item} />;
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <InfoFavOrd
                    title="У вас нет заказов"
                    description="Вы нищеброд? Оформите хотя бы один заказ."
                    image={{
                        src: 'img/emoji_1.png',
                        width: 70,
                        height: 70,
                    }}
                />
            )}
        </div>
    );
}

export default Orders;
