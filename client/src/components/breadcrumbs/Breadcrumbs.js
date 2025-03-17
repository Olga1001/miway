import useBreadcrumbs from "use-react-router-breadcrumbs";
import {Link, NavLink} from 'react-router-dom';
import './breadcrumbs.scss';

// const userNamesById = { 1: "John" };

// const DynamicUserBreadcrumb = ({ match }) => (
//   <span>{userNamesById[match.params.userId]}</span>
// );

// const CustomPropsBreadcrumb = ({ someProp }) => <span>{someProp}</span>;

const routes = [
    // { path: "/users/:userId", breadcrumb: DynamicUserBreadcrumb },
    { 
        path: "/", 
        breadcrumb: 'Головна' 
    },
    { 
        path: "/catalog", 
        breadcrumb: "Магазин" 
    },
    {
        path: "/payment-and-delivery",
        breadcrumb: "Оплата та Доставка",
    },
    {
        path: "/contact",
        breadcrumb: "Контакти",
    },
    // {
    //     path: "/payment-and-delivery",
    //     breadcrumb: CustomPropsBreadcrumb,
    //     props: { someProp: "Hi" },
    // },
];

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs(routes);

    let items = breadcrumbs.map(({ match, breadcrumb }) => {
        if (window.location.pathname === '/') return;

        return (
            <li className="breadcrumbs__item"
                key={match.pathname} >
                <NavLink 
                    to={match.pathname} 
                    className="breadcrumbs__link">
                        {breadcrumb}
                </NavLink>
            </li>
        )
    })

    console.log('render Breadcrumbs');

    return (
        <ul className="breadcrumbs">{items}</ul>
    );
};

export default Breadcrumbs;