import React, { ReactElement,useState } from "react";
import {ReactComponent as Home} from'../../Icons/home-solid.svg'
import {ReactComponent as List} from '../../Icons/list.svg'
import {ReactComponent as Cake} from'../../Icons/cake-sharp.svg'
import './Nav.css'
import { Navigate, useNavigate } from "react-router-dom";
function Nav():ReactElement {
    const [activeButton, setActiveButton] = useState<string>("home");
    const  navigate = useNavigate();
    function handleClck(button: string): void {
        setActiveButton(button);
        
        switch (button) {
            case 'home':
                navigate("/");
                break;
            case 'orders':
                navigate("/orders");
                break;
            default:
                break;
        }
    }

    return (
        <nav>
            <button 
                title="Home" 
                className={activeButton === "home" ? "active" : ""} 
                onClick={() => handleClck("home")}
            >
                <Home />
            </button>
            <button 
                title="Past Orders" 
                className={activeButton === "orders" ? "active" : ""} 
                onClick={() => handleClck("orders")}
            >
                <List />
            </button>
            <button 
                title="Items" 
                className={activeButton === "items" ? "active" : ""} 
                onClick={() => handleClck("items")}
            >
                <Cake />
            </button>
        </nav>
    );
}
export default Nav