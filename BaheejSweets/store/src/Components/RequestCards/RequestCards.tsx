import React, {ReactElement} from 'react'
import './RequestCards.css'
import {Request} from '../../Types/RequestType'
function RequestCard({clientName,request}:Request):ReactElement{
    
    let itemsJSX:JSX.Element[]=[]
    for (let i = 0; i < request.length; i++) {
        itemsJSX.push(<hr className='modern'></hr>)
        itemsJSX.push(
            <span key={i}>
                Name: {request[i].productName+"\n"} Price: {request[i].price.toString()+"\n"} Quantity: {request[i].quantity.toString()}
            </span>
            
        );
    }
    return(
        <div className="request-card">
                    <span className="client">{clientName}</span>

                    {itemsJSX}
        </div>
    );
}
export default RequestCard