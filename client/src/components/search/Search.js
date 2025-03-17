import { useMemo, useState, useTransition } from 'react';
import './search.scss';
import symbol from '../../images/symbol/sprite.svg';

const Search = ({data}) => {
    const [textSearch, setTextSearch] = useState('');
    const [isPending, startTransition] = useTransition();
    
    const onValueChange = (value) => {
        startTransition(() => {
            setTextSearch(value.toLowerCase());
        });
    }

    const renderItems = (data) => {
        console.log(textSearch)
        console.log(data)
        let count = 0;
        const items = data.map((item, i) => {
            if (textSearch != '' &&
                (item.category.toLowerCase().includes(textSearch) ||
                item.name.toLowerCase().includes(textSearch) ||
                item.id.includes(textSearch))) {
                  
                count += 1;
                if (count > 7) return;

                return (
                    <li key={item.id}>
                        <a href={`/product/${item.name}`} className="d-flex">
                            <img src="#" alt={item.name}/>
                            <span className="name">{item.name} 
                                <span className="code">{item.id}</span>
                            </span>
                            <span className="price ">{item.price} грн</span>
                        </a>
                    </li>
                )  
            }
        });

        return items;
    }

    console.log('render Search');
    return (
        <form className="search relative">
            <input type="text" placeholder="Пошук за назвою" 
                onChange={(e) => onValueChange(e.target.value.trim())}/>
            <ul className={`search-dropdown ${textSearch != '' ? 'active' : ''}`}>{renderItems(data.products)}</ul>
            <button type="submit" className="btn-search">
                <svg className="icon-loupe">
                    <use href={`${symbol}#loupe`}></use>
                </svg>
            </button>
        </form>
    )
}

export default Search;