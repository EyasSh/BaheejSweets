import React, { ReactElement } from "react";
import {ReactComponent as Home} from'../../Icons/home-solid.svg'
import {ReactComponent as List} from '../../Icons/list.svg'
import {ReactComponent as Cake} from'../../Icons/cake-sharp.svg'
import './Nav.css'
function Nav():ReactElement{
    return(
        
                <nav>
                    <button title="Home"><Home /></button>
                    <button title="Past Orders"><List /></button>
                    <button title="Items"><Cake /></button>
                </nav>
        

    );
}
export default Nav