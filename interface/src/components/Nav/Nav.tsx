import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import {Link} from 'react-router-dom'
import ToolTip from '../ToolTip/ToolTip'
import { findActorsAgent } from '../../api/sc/agents/findActorsAgent'
import { findDirectorAgent } from '../../api/sc/agents/findDirectorsAgent'
import { findSearchBarInformation } from '../../api/sc/agents/findSearchBarnformation'
import { useState } from 'react'

import './Nav.css'
import * as data from "./links.json"
const linksString = JSON.stringify(data)
const links = JSON.parse(linksString).links




// to navigate through pages
// const navigate = useNavigate();

const Nav: React.FC<{}> = () => {


    // const [infoList, setInfoList] = useState<string[]>([])

    
    // const info_list = findSearchBarInformation();
    // info_list.then(response => {setInfoList(() => [...response])})

    const infoList = ['mama','kiki']

    return (
        <nav className="navbar">
            <div className='logo-container'>
                <span className='logo'>Кинофильмы</span>
            </div>
            <div className='links-container'>
                {links.map((link) => {
                    return (
                        <div key ={link.href} className="link">
                            <Link to={link.href}>
                                {link.label}
                            </Link>
                        </div>
                    )
                })}

            </div>
            <div className='searchbar-container'>
                <SearchBar items = {infoList}/>
            </div>
            <div className='tooltip'>
                <ToolTip/> 
            </div>
            
            
        </nav>
    );
}

export default Nav;