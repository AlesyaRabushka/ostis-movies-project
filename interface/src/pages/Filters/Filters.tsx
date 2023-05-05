import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout';
import DropDown from '../../components/DropDown/DropDown';
import FilterSearchBar from '../../components/FilterSearchBar/FilterSearchBar';
import MainPageContent from '../../components/MainPageContent/MainPageContent';
import FilterPageContent from '../../components/FilterPageContent/FilterPageContent';
import { ScAddr, ScEventParams, ScEventType, ScTemplate, ScType } from "ts-sc-client";
import { useAgent } from '../../hooks/useAgents';

import './Filters.css'
import { findActorsAgent } from '../../api/sc/agents/findActorsAgent';
import { findYearsAgent } from '../../api/sc/agents/findYearsAgent';
import { findRatingAgent } from '../../api/sc/agents/findRatingAgent';
import { findCountryAgent } from '../../api/sc/agents/findCountriesAgent';
import { findDirectorAgent } from '../../api/sc/agents/findDirectorsAgent';
import { findGenreAgent } from '../../api/sc/agents/findGenresAgent';
import { findFilmsAgent } from '../../api/sc/agents/findFilmsAgents';



const Filters = () =>{

    const [selectedYear, setSelectedYear] = useState('Год');
    const [selectedCountry, setSelectedCountry] = useState('Страна');
    const [selectedDirector, setSelectedDirector] = useState('Режиссер');

    const[selectedRating, setSelectedRating] = useState('');
    const[selectedActor, setSelectedActor] = useState('');
    const[selectedGenre, setSelectedGenre] = useState('');

    const[isActiveYear, setIsActiveYear] = useState(false);
    const[isActiveCountry, setIsActiveCountry] = useState(false);
    const[isActiveDirector, setIsActiveDirector] = useState(false);

    const[isActiveRating, setIsActiveRating] = useState(false);
    const[isActiveActor, setIsActiveActor] = useState(false);
    const[isActiveGenre, setIsActiveGenre] = useState(false);
    
    // for agents
    const [actorsList, setActorsList] =useState<string[]>([])
    const [countryList, setCountryList] = useState<string[]>([])
    const [directorList, setDirectorList] = useState<string[]>([])
    const [genreList, setGenreList] = useState<string[]>([])
    // const [filmsList, setFilmsList] = useState<string[]>([])
    const [filmsList, setFilmsList] = useState<Map<string,string>[]>([])
    const [ratingList, setRatingList] = useState<string[]>([])
    
    
    ///---------------------------------
    // FILMS
    const films_list = findFilmsAgent()
    films_list.then(response => {setFilmsList(() => [...response])})
    // console.log('fin filmsx', filmsList.length)

    // ACTORS
    // const actors_list = findActorsAgent();
    // actors_list.then(response=> {setActorsList(() => [...response]) })

    // COUNTRIES
    // const countries_list = findCountryAgent();
    // countries_list.then(response=> setCountryList(() => [...response]) )

    // DIRECTORS
    // const directors_list = findDirectorAgent();
    // directors_list.then(response=> setDirectorList(() => [...response]) )

    // GENRES
    // const genres_list = findGenreAgent();
    // genres_list.then(response=> {setGenreList(() => [...response])})


    //console.log(a_l.length)
    // YEARS
    // const years_list = findYearsAgent()
    // console.log(years_list)
    // RATING
    // const rating_list = findRatingAgent();
    // console.log(rating_list)

    ///----------------------------------


    // isActive={isActiveYear} setIsActive={setIsActiveYear} 
    // isActive={isActiveCountry} setIsActive={setIsActiveCountry}
    // isActive={isActiveDirector} setIsActive={setIsActiveDirector}


    // ['Джуд Лоу', 'Натали Портман', 'Райан Гослинг','Роберт Паттинсон','Том Харди','Уиллем Дефо']
    // ['США','Нидерланды','Великобритания','Россия','Индия','Бразилия','Франция','Испания']
    // ['Джеймс Кэмерон','Дэвид Линч','Кристофер Нолан', 'Стивен Спилберг']

    return (
        <Layout>
            <div className='filters-page-component'>
                <div className='filters-logo'>Фильтры</div>
                <div className='filters'>
                    <div className='filters-dropdowns-container'>
                   <DropDown logo={'Год'} isActive={isActiveYear} setIsActive={setIsActiveYear}  selected={selectedYear} setSelected={setSelectedYear} items={['2023','2022','2021','2020','2019','2018','2017','2016']}/>
                   <DropDown logo={'Страна'} isActive={isActiveCountry} setIsActive={setIsActiveCountry} selected={selectedCountry} setSelected={setSelectedCountry} items={countryList}/>
                   <DropDown logo={'Режиссер'} isActive={isActiveDirector} setIsActive={setIsActiveDirector} selected={selectedDirector} setSelected={setSelectedDirector} items={directorList}/>
                    </div>
                    <div className='filters-searchbars-container'>
                    <FilterSearchBar isActive={isActiveRating} setIsActive={setIsActiveRating} selected={selectedRating} setSelected={setSelectedRating} logo='Рейтинг' items={['1','2','3','4','5','6','7','8','9','10']}/>
                    <FilterSearchBar isActive={isActiveActor} setIsActive={setIsActiveActor} selected={selectedActor} setSelected={setSelectedActor} logo='Актер' items={actorsList}/> 
                    <FilterSearchBar isActive={isActiveGenre} setIsActive={setIsActiveGenre} selected={selectedGenre} setSelected={setSelectedGenre} logo='Жанр' items={genreList}/>
                    </div>
                </div>
                <div className='filters-content'>
                    <FilterPageContent data={filmsList} selectedYear={selectedYear}  selectedCountry={selectedCountry}  selectedProducer = {selectedDirector}  selectedRating={selectedRating} selectedActor={selectedActor} selectedGenre={selectedGenre}/>
                </div>
                
            </div>
        </Layout>
    );
}


export default Filters;