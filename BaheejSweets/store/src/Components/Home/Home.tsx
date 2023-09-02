import React, { ReactElement } from "react";
import RequestCard from "../RequestCards/RequestCards";
import { Request } from "../../Types/RequestType";
import './Home.css'
function Home():ReactElement{
    
    
    return(
        <div className="request-grid">  
                <RequestCard  
                clientName="Clay"
                request = {
                [{price:100 ,productName:"yomama",quantity:9},
                {price:50 ,productName:"cake",quantity:2}]
                } />
                {/* <RequestCard />
                <RequestCard />
                <RequestCard  /> */}
        </div>
    );
}
export default Home