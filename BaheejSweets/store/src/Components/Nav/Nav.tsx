import React, { ReactElement,useState } from "react";
import {ReactComponent as Home} from'../../Icons/home-solid.svg'
import {ReactComponent as List} from '../../Icons/list.svg'
import {ReactComponent as Cake} from'../../Icons/cake-sharp.svg'
import './Nav.css'
function Nav():ReactElement {
    const [activeButton, setActiveButton] = useState<string>("home");

    return (
        <nav>
            <button 
                title="Home" 
                className={activeButton === "home" ? "active" : ""} 
                onClick={() => setActiveButton("home")}
            >
                <Home />
            </button>
            <button 
                title="Past Orders" 
                className={activeButton === "orders" ? "active" : ""} 
                onClick={() => setActiveButton("orders")}
            >
                <List />
            </button>
            <button 
                title="Items" 
                className={activeButton === "items" ? "active" : ""} 
                onClick={() => setActiveButton("items")}
            >
                <Cake />
            </button>
        </nav>
    );
}
export default Nav