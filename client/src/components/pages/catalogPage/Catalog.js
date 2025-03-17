import { useState,  useEffect, useCallback } from 'react';

import { useHttp } from '../../../hooks/http.hook';
import Search from '../../search/Search';
import Sidebar from '../../sidebar/Sidebar';
import Sort from '../../sort/Sort';
import ProductsList from '../../productsList/ProductsList';
import Spinner from '../../spinner/Spinner';
import './catalog.scss';

const Catalog = ({setCart}) => {
    const [category, setCategory] = useState(null);
    const [sortSelected, setSortSelected] = useState({});
    const [data, setData] = useState({});
    const {request} = useHttp();

    console.log(sortSelected)
    // useEffect(() => {
    //     request("http://localhost:4001/data")
    //     .then((response) => {
    //         const selected = response.sort.filter(item => item.selected)
    //         setSortSelected(selected[0]);

    //         setData({
    //             products: response.products,
    //             sale: response.sale,
    //             popular: response.popular,
    //             category: response.category,
    //             sort: response.sort
    //         });

    //     })
    //     .catch((err) => console.log(err))
    // }, [])

    const onCategorySelected = useCallback((nameCategory) => {
        setCategory(nameCategory)
    }, [category]);

    if (Object.keys(data).length === 0) {
        return <Spinner/>
    }

    console.log('render Catalog', data);
    return (
       <>
            <div className="flex-md-center-between mb-16">
                <h2 className="py-10">Магазин</h2>
                {/* <Search data={data}/> */}
            </div>
            <div className="flex-wrap w-100">
                <Sidebar onCategorySelected={onCategorySelected} categories={data.category}/>
                <div className="main-right">
                    <div className="d-flex flex-sm-center-between flex-sm-row flex-column-reverse">
                        <div className="d-md-none d-flex btns">
                            <button className="btn-2 mb-16 w-100" id="btn-catalog" type="button" data-modal-item="catalog">Каталог</button>
                        </div>
                        <Sort setSortSelected={setSortSelected} sortSelected={sortSelected} dataSort={data.sort}/>
                    </div>
                    <ProductsList 
                        setCart={setCart}
                        data={data}
                        category={category}
                        sortSelected={sortSelected.action}/>
                </div>
            </div>
       </>
    )
}

export default Catalog;