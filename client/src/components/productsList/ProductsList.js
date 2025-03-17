import { useState,  useEffect, useCallback, useMemo } from 'react';

import Card from '../card/Card';
import Paginator from 'react-hooks-paginator';

import './productsList.scss';

const ProductsList = ({data, sortSelected, category, setCart}) => {
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {products, popular, sale} = data;

    const filteredProducts = useMemo(() => {
        if (!data || !data.products) {
            console.error("Data is invalid:", data);
            return [];
        }

        let arrProducts = [...products];

        if (sortSelected) {
            if (sortSelected === "fromExpensiveOnes") {
                arrProducts.sort((a, b) => b.price - a.price);
            } else if (sortSelected === "fromCheapOnes") {
                arrProducts.sort((a, b) => a.price - b.price);
            } else if (sortSelected === "popular") {
                arrProducts.sort((a, b) => {
                    const isA_Popular = popular.includes(a.id) ? 0 : 1;
                    const isB_Popular = popular.includes(b.id) ? 0 : 1;
                    return isA_Popular - isB_Popular;
                });
            } else if (sortSelected === "sale") {
                arrProducts.sort((a, b) => {
                    const isA_Sale = sale.includes(a.id) ? 0 : 1;
                    const isB_Sale = sale.includes(b.id) ? 0 : 1;
                    return isA_Sale - isB_Sale;
                });
            }
        }

        if (category) {
            setCurrentPage(1);
            return arrProducts.filter(item => item.category === category);
        } 
        

        return arrProducts;
    }, [products, popular, sale, sortSelected, category]) 

    const renderItems = (arr) => {
        return arr.map((item, index) => {
            if (index >= (currentPage - 1) * 20 && index < currentPage * 20) {
                return <Card 
                    setCart={setCart}
                    data={item} 
                    popular={popular} 
                    sale={sale}
                    sortSelected={sortSelected}
                    key={index}/>
            }
        })
    };

    console.log('render ProductsList: ', filteredProducts);

    return (
        <div id="product-list">
            <Paginator 
                pageContainerClass="pagination items-center mb-16"
                pageItemClass="pagination__item"
                pageActiveClass="active"
                totalRecords={filteredProducts.length}
                pagePrevText="Назад"
                pageNextText="Вперед"
                pageLimit={20}
                pageNeighbours={2}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>

            <div className="flex-wrap shop"> {renderItems(filteredProducts)}</div>

            <Paginator 
                pageContainerClass="pagination items-center mb-16"
                pageItemClass="pagination__item"
                pageActiveClass="active"
                totalRecords={filteredProducts.length}
                pagePrevText="Назад"
                pageNextText="Вперед"
                pageLimit={20}
                pageNeighbours={2}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </div>
    )    
}

export default ProductsList;