import { useMemo } from 'react';
import './sidebar.scss';

const Sidebar = ({categories, onCategorySelected}) => {
    const renderCategory = useMemo(() => {
        return categories.map((item, i) => {
            return (
                <li className="list-item"
                    key={i}>
                    <a className="list-link" href="#" onClick={() => onCategorySelected(item)}>{item}</a>
                </li>
            )
        })
    }, [categories]) 
    
    console.log('render Sidebar');
    return (
        <div className="sidebar">
            <div className="catalog" data-modal="catalog">
                <button className="close d-md-none" type="button"></button>
                <ul className="catalog-list">
                    <li className="list-item">
                        <a className="list-link" href="#" 
                            onClick={() => onCategorySelected(null)}>Всі</a>
                    </li>
                    {renderCategory}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;