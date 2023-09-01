import React, {ReactElement} from 'react'
import './RequestCards.css'
import { RequestCardProps } from '../../Types/RequestType'
function RequestCard({request,className}:RequestCardProps):ReactElement{
    let classname:string="request-card "+className
    return(
        <div className={classname}>
                    <span className="client">Client Name Here</span>
                    <p></p>
                    <span>{request}</span>
        </div>
    );
}
export default RequestCard