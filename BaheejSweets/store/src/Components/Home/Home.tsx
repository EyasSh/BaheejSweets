import React, { ReactElement } from "react";
import RequestCard from "../RequestCards/RequestCards";
import './Home.css'


function Home():ReactElement{
    return(
        <div className="request-grid">  
                <RequestCard request="potato" />
                <RequestCard request="tomato"/>
                <RequestCard request="yomama"/>
                <RequestCard request="papi" />
        </div>
    );
}
export default Home