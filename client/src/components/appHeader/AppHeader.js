import {Link, NavLink} from 'react-router-dom';
import './appHeader.scss';
import symbol from '../../images/symbol/sprite.svg';

const AppHeader = ({count}) => {
    console.log('render AppHeader');
    
    return (
        <header className="header">
            <div className="container-full flex-center-between">
                <div className="align-items-center">
                    <Link className="logo" href="/"></Link>
                    <nav className="navtop">
                        <ul className="menu flex-lg-center">
                            <li className="menu-item">
                                <NavLink 
                                    className="menu-link"
                                    end 
                                    style={({isActive}) => ({'fontWeight': isActive ? '700' : 'inherit'})} 
                                    to="/" >головна
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink 
                                    className="menu-link"
                                    end 
                                    style={({isActive}) => ({'fontWeight': isActive ? '700' : 'inherit'})} 
                                    to="/catalog" >магазин
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink 
                                    className="menu-link"
                                    end 
                                    style={({isActive}) => ({'fontWeight': isActive ? '700' : 'inherit'})} 
                                    to="/payment-and-delivery" >Оплата та Доставка  
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink 
                                    className="menu-link"
                                    end 
                                    style={({isActive}) => ({'fontWeight': isActive ? '700' : 'inherit'})} 
                                    to="/contact" >контакти
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="items-center">
                    <div className="header_basket" type="button">
                        <div data-modal-item="popup-basket">
                            <svg className="icon-basket">
                                <use href={`${symbol}#basket`}></use>
                            </svg>
                            <div className="circle">{count}</div>
                        </div>
                        <div className="modal-basket"></div>
                    </div>
                    <button className="phone relative" type="button">
                        <svg className="icon-phone-call">
                            <use href={`${symbol}#phone-call`}></use>
                        </svg>
                        {/* <img src={call} alt="call icon" className="icon-phone-call"/> */}
                        <div className="tooltipe">
                            <a className="phone-item" href="tel:380954085108">+38 (095) 408 51 08</a>
                            <a className="phone-item" href="tel:"></a>
                        </div>
                    </button>
                    <button className="burger" type="button">
                        <span className="burger-line burger-line-top"></span>
                        <span className="burger-line burger-line-center"></span>
                        <span className="burger-line burger-line-bottom"></span>
                    </button>
                </div>
            </div>
        </header>

       
    )
}

export default AppHeader;