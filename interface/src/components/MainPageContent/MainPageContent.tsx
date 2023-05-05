import React from "react";
import ContentSingleItem from "../ContentSingleItem/ContentSingleItem";
import BackToTopButton from "../BackToTopButton/BackToTopButton";



import './MainPageContent.css';



const MainPageContent = ({data}:{data:Map<string,string>[]}) => {
    return(
        <div className="content">
                {data.map((item, rating, genre)=>(
                    <div className="content-item">
                        <ContentSingleItem items = {item}/>
                    </div>
                ))}
                <BackToTopButton/>
        </div>
    );
}

export default MainPageContent;