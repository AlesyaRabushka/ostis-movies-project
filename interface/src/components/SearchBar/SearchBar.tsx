import React from 'react'
import { useState, useRef } from 'react';
import {FaSearch} from 'react-icons/fa'
import Search from '@mui/icons-material/Search'
import { IconButton } from '@mui/material';


import './SearchBar.css'

const SearchBar = ({items}:{items:any}) => {

    const [userSearchHistory, addUserSearchHistory] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState("");

    

    // for input
    const onChange = (e: React.FormEvent<HTMLInputElement>) =>{
            
        setSelected(e.currentTarget.value)
        
    }

    const addIntoHistory = () =>{
        var flag = false
        for (var i = 0; i < items.length; i++){
            if(items[i] == selected){
                flag = true
            }
        }
        if (flag == false){
            items.push(selected)
        }
    }

    // to hide searched content
    const activeSearchbarRef = useRef(null)
    window.addEventListener('click', (e) => {
        if (e.target !== activeSearchbarRef.current){
            setIsActive(false)
        }
    })


    return (
        <div>
            <div className='searchbar'>
                <input placeholder='Роберт Паттинсон'
                className='searchbar-input'
                ref={activeSearchbarRef}
                value={selected} 
                onClick={e => setIsActive(!isActive)} 
                onChange={onChange}
                />
                <IconButton>
                    <Search className='searchbar-icon' onClick={addIntoHistory}/>
                </IconButton>
                
            </div>
                {isActive && (
                    <div className='search-dropdown-content'>
                        
                    {items.filter((item:string) =>{
                        const searchItem = selected.toLowerCase();
                        const itemName = item.toLowerCase();

                        return itemName.startsWith(searchItem)
                    })
                    .map((item:string) =>(
                        <div key={item} className='search-dropdown-item'
                        onClick = {(e) => {
                            setSelected(item)
                            setIsActive(false)
                        }}>
                            {item}    
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;