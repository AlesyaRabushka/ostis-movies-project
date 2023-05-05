import React, { useState, useRef, useEffect } from "react";
import './FilterSearchBar.css'
import { findActorsAgent } from '../../api/sc/agents/findActorsAgent';
import { findYearsAgent } from '../../api/sc/agents/findYearsAgent';
import { findRatingAgent } from '../../api/sc/agents/findRatingAgent';
import { findCountryAgent } from '../../api/sc/agents/findCountriesAgent';
import { findDirectorAgent } from '../../api/sc/agents/findDirectorsAgent';
import { findGenreAgent } from '../../api/sc/agents/findGenresAgent';
import { findMoviesByActorAgentNode } from "../../api/sc/agents/FindMoviesByActorAgent";


//var items = require(""./filename.json")

const FilterSearchBar = ({isActive, setIsActive, selected, setSelected,logo,items}:{isActive:boolean, setIsActive:Function, selected:string, setSelected:Function, logo:string, items:any}) => {
    // const [result, setResult] = useState<string[]>([])
    // if (logo == 'Актер'){
    //     const actors_list = findActorsAgent();
    // console.log('actors_list promise', actors_list)
    // actors_list.then(response=> setResult(() => [...response]) )
    // } 
    // else if(logo == 'Жанр'){
    //     const actors_list = findGenreAgent();
    // console.log('actors_list promise', actors_list)
    // actors_list.then(response=> setResult(() => [...response]) )
    // }
    
    
    
    // const[isActive, setIsActive] = useState(false);
    // useEffect(()=>{},[isActive])
    // for input
    const onChange = (e: React.FormEvent<HTMLInputElement>) =>{
        const regex = /^[0-9\b]+$/;
        if (logo === 'Рейтинг'){
            if (e.currentTarget.value == "" || regex.test(e.currentTarget.value)){
                if (Number(e.currentTarget.value) <= 10 || e.currentTarget.value == ""){
                    setSelected(e.currentTarget.value)
                }
            }
        }
        else{
            if (!regex.test(e.currentTarget.value)){
            setSelected(e.currentTarget.value)
            }
        }
        
    }

    // to hide searched content
    const activeSearchbarRef = useRef(null)
    window.addEventListener('click', (e) => {
        if (e.target !== activeSearchbarRef.current){
            setIsActive(false)
        }
    })

    // if (!items.length) {console.log('no len')}
    // console.log('FilterSearchBar', items)

    return (
        <div className="filter-searchbar-box">
            <div className="filter-searchbar" >
            <input type='text' 
            ref={activeSearchbarRef}
            className='filter-searchbar-input' 
            placeholder={logo}
            value={selected} 
            pattern="[0-10]"
            onClick={e => setIsActive(!isActive)} 
            onChange={onChange}
            />
            </div>
            {isActive && (
                <div className='filter-search-dropdown-content'>
                 {items
                 .filter((item:string) =>{
                    const searchItem = selected.toLowerCase();
                    const itemName = item.toLowerCase();

                    return itemName.startsWith(searchItem)
                 })
                 .map((item:string) =>(
                    <div key={item} className='filter-search-dropdown-item'
                    onClick = {(e) => {
                        setSelected(item)
                        setIsActive(false)
                        // if (logo == 'Актер'){
                        //     findMoviesByActorAgentNode
                        // }
                    }}>
                        {item}    
                    </div>
                ))}
            </div>
            )}
            
        </div>
    );
}

export default FilterSearchBar;