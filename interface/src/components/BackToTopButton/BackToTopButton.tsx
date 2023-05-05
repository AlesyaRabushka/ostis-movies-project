import React from "react";
import { useState, useEffect } from "react";
import './BackToTopButton.css'
import NorthIcon from '@mui/icons-material/North';


const BackToTopButton = () =>{
    const [backToTop, setBackToTop] = useState(false);

    // to show the button
    useEffect(()=>{
        window.addEventListener('scroll', () =>{
            if(window.scrollY > 100){
                setBackToTop(true)
            } else{
                setBackToTop(false)
            }
        })
    })


    const scrollUp = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className="scrollUpButton">
            {backToTop && (
                <NorthIcon className="button" onClick={scrollUp}/>
            )}
        </div>
    );
}

export default BackToTopButton;