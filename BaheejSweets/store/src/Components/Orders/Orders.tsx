import React, { ReactElement } from "react";
import RequestCard from "../RequestCards/RequestCards";
import './Orders.css'
function Orders():ReactElement{
    return(
            <div className="request-grid">
                 {/* <RequestCard  />
                <RequestCard />
                <RequestCard /> */}
            </div>
    );
}
export default Orders