import './sort.scss';
import symbol from '../../images/symbol/sprite.svg';
import { useMemo, useState } from 'react';

const sort = [
    {
        "name": "Популярні",
        "action": "popular"
    },
    {
        "name": "Від дешевих до дорогих",
        "action": "fromCheapOnes"
    },
    {
        "name": "Від дорогих до дешевих",
        "action": "fromExpensiveOnes"
    },
    {
        "name": "Акційні",
        "action": "sale"
    }
]

const Sort = ({setSortSelected, sortSelected, dataSort}) => {
    
    console.log(sortSelected, dataSort)

    const [toggleDrop, setToggleDrop] = useState();

    const toggleDropdown = () => {
        setToggleDrop(!toggleDrop);
    }

    const renderOption = useMemo(() => {
        console.log(dataSort)
        return dataSort.map((item, i) => {
            return (
                <li 
                    className="select-option" 
                    key={i} 
                    onClick={() => {
                        setSortSelected((prev) => {
                            return {name: item.name, action: item.action, selected: true}
                            // return {name, action: item.action, selected: !selected}
                        }); 
                        setToggleDrop(false);
                    }}>{item.name}</li> 

            )
        })
    }, [dataSort]);

    // if (dataSort.length < 1) return;

    return (
        <div className="mb-16 align-items-center ml-auto">
            <p className="c-gray fw-light ml-20 d-md-block d-none">Сортувати: </p>
            <div className={`select ml-20 ${toggleDrop ? 'active' : ''}`}>
                <div className="select-item" onClick={() => toggleDropdown(toggleDrop)}>{sortSelected.name}</div>
                <div className="select-drop">
                    <ul className="select-list">
                        {renderOption}
                    </ul>
                </div>
            </div>
            <div className="d-flex ml-20 sorting-grid">
                <label className="sorting-grid__item sorting-grid__item--list">
                    <input className="checkbox check-shop-view" type="radio" name="name"/>
                    <svg className="icon-checklist">
                        <use href={`${symbol}#checklist`}></use>
                    </svg>
                </label>
                <label className="sorting-grid__item sorting-grid__item--grid">
                    <input className="checkbox check-shop-view" type="radio" name="name" defaultChecked/>
                    <svg className="icon-apps">
                        <use href={`${symbol}#apps`}></use>
                    </svg>
                </label>
            </div>
        </div>
    )
}

export default Sort;