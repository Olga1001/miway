import { useCallback, useMemo, useState } from 'react';
import { createPortal } from "react-dom";
import symbol from '../../images/symbol/sprite.svg';
import noImage from '../../images/no-image-svgrepo-com.svg';

import './card.scss';

const Card = ({data, popular, sale, sortSelected, setCart}) => {
    const  {id, name, price, count} = data;
    const [quantity, setQuantity] = useState(1);
    const [messageQuantity, setMessageQuantity] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    
    const onChangeQuantity = (value, max) => {
        let qty = value;
        let error = null;
        if (max === 0)  {
            qty = 0;
        } else if (value > max) {
            qty = max;
            error = `максимальна кількість: ${max}`
          
        } else if (value <= 0) {
            qty = 1;
        }
        setMessageQuantity(error);
        setQuantity(qty)
    }

    const onClickQuantity = (value, max) => {
        if (max === 0) return;

        if (quantity < max && value === 1) {
            setQuantity(quantity + value)
        }

        if (quantity > 1 && value === -1) {
            setQuantity(quantity + value)
        }

        setMessageQuantity(null);
    }

    const status = useMemo(() => {
        if (count === 0) {
            return (
                <div className="item__status item__status--red" 
                    data-status="Закінчився">
                     Закінчився</div>
            )
        } else {
            return (
                <div className="item__status item__status--green" 
                    data-status="В наявності">
                    В наявності                            
                </div>
            )
        }
    }, [count]);

    const renderPopularTab = useMemo(() => {
        if (Array.isArray(popular) && popular.includes(id) ) {
            return <div className="item-tab item-tab--popular">Топ</div> 
        }
    }, [data, sortSelected])
    
    const renderSaleTab = useMemo(() => {
        if (Array.isArray(sale) && sale.includes(id) ) { 
            return <div className="item-tab item-tab--sale">Акція</div> 
        }
    }, [data, sortSelected])
 
    const addCart = useCallback((data, qty) => {
        setCart(prevCart => {
            const existingItem = prevCart.items.find(item => item.id === data.id);

            let updatedItems;
            if (existingItem) {
                updatedItems = prevCart.items.map(item =>
                    item.id === data.id ? { ...item, qty: item.qty + qty } : item
                );
            } else {
                updatedItems = [...prevCart.items, { ...data, qty }];
            }

            let subtotal = 0;
            updatedItems.forEach((item, index) => {
                subtotal += item.price * item.qty;
            });

            const cart = { 
                ...prevCart, 
                items: updatedItems, 
                qty: prevCart.qty + qty,
                totals: {
                    ...prevCart.totals,
                    grand_total: subtotal + prevCart.totals.shipping - prevCart.totals.discount,
                    subtotal: subtotal - prevCart.totals.discount
                }
            };

            localStorage.setItem("cart", JSON.stringify(cart));
            setAddedToCart(true)

            setTimeout(() => {
                setAddedToCart(false);
            }, 4000)
            return cart;
        });
    }, [])

    return (
        <div className="item"> 
            {addedToCart ? createPortal(<MsgAddedItem name={name} />, document.body) : null}
      
            <div className="item-tabs items-center"> 
                {renderPopularTab}
                {renderSaleTab}
            </div>
            <a className="item-link_img" href={`/product/${name}`}>
                <img src={noImage} alt={name} className="item-noimage"/>
            </a>
            <div className="p-3 relative">
                <div className="flex-center-between mb-16">
                    Код: {id}
                    {status}
                </div>
                <div>
                    <a className="text-up fs-13 c-dark fw-bold line-clamp-2 line-clamp" 
                        href={`/product/${name}`}>{name}</a>
                </div>
                <div className="item-block">
                    <div>
                        <p className="fs-18 c-black">{price} грн</p>
                        <div className="item-row mt-20">
                            <div className="quantity">
                                <button className="c-minus" type="button"
                                     onClick={() => onClickQuantity(-1)}>-</button>
                                <input className="quantity-count-catalog" 
                                    type="number" 
                                    value={quantity} 
                                    onChange={(e) => onChangeQuantity(e.target.value, count)}/>
                                <button className="c-plus" max={count} type="button"
                                    onClick={() => onClickQuantity(1, count)}>+</button>
                            </div>

                            {messageQuantity !== null ? 
                                <p className="item-error">{messageQuantity}</p> :
                                null
                            }
                           
                            {/* <p className="c-orange fs-13 py-1">Усього: {count} шт.</p> */}
                        </div>
                    </div>
                    <button 
                        className="btn" 
                        type="button" 
                        data-id={id} 
                        disabled={count === 0 ? 'disabled' : null}
                        onClick={() => addCart(data, quantity)}
                    >
                        <svg className="icon-basket">
                            <use href={`${symbol}#basket`}></use>
                        </svg>До Кошика
                    </button>
                </div>
            </div>
        </div>
    )
}

const MsgAddedItem = ({name}) => {
    return (
        <div className="toast-message items-center">
            <svg width="20" height="20" fill="#fff">
                <use href={`${symbol}#info`}></use>
            </svg>
            <p>Товар <b>{name}</b> Додан в кошик</p></div>
    );
};

export default Card;