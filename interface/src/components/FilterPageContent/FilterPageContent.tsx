import ContentSingleItem from "../ContentSingleItem/ContentSingleItem";
import BackToTopButton from "../BackToTopButton/BackToTopButton";
import React from 'react'
import './FilterPageContent.css'
import { useState } from "react";


const FilterPageContent = ({data, selectedYear, selectedCountry, selectedProducer, selectedRating, selectedActor, selectedGenre}:{data:any, selectedYear:string, selectedCountry:string, selectedProducer:string, selectedRating:string, selectedActor:string, selectedGenre:string}) => {
    // console.log('daat1', data)
    
    // filtered by given COUNTRY
    if (selectedCountry != 'Страна'){
        const filtered_data = data.filter(item => item.get('country') === selectedCountry)
        data = filtered_data
        if (filtered_data.length){
            data = filtered_data
        }
        else{
            let films_list : Array<Map<string, string>> = []
            let movie_info = new Map<string, string>()
            movie_info.set('name', 'Нет информации')
            movie_info.set('rating', '')
            movie_info.set('producer', '')
            movie_info.set('actor', '')
            movie_info.set('genre', '')
            movie_info.set('country', '')
            movie_info.set('year', '')
            movie_info.set('tag_line', '')
            films_list.push(movie_info)
            data = films_list
           
        }
    }
    // filtered by given RATING
    if (selectedRating){
        const filtered_data = data.filter(item => Number(item.get('rating')) >= Number(selectedRating))
        data = filtered_data
        if (filtered_data.length){
            data = filtered_data
        }
        else{
            let films_list : Array<Map<string, string>> = []
            let movie_info = new Map<string, string>()
            movie_info.set('name', 'Нет информации')
            movie_info.set('rating', '')
            movie_info.set('producer', '')
            movie_info.set('actor', '')
            movie_info.set('genre', '')
            movie_info.set('country', '')
            movie_info.set('year', '')
            movie_info.set('tag_line', '')
            films_list.push(movie_info)
            data = films_list
           
        }
    }
    // filtered by given YEAR
    if (selectedYear != 'Год'){
        const filtered_data = data.filter(item => Number(item.get('year')) === Number(selectedYear))
        data = filtered_data
        if (filtered_data.length){
            data = filtered_data
        }
        else{
            let films_list : Array<Map<string, string>> = []
            let movie_info = new Map<string, string>()
            movie_info.set('name', 'Нет информации')
            movie_info.set('rating', '')
            movie_info.set('producer', '')
            movie_info.set('actor', '')
            movie_info.set('genre', '')
            movie_info.set('country', '')
            movie_info.set('year', '')
            movie_info.set('tag_line', '')
            films_list.push(movie_info)
            data = films_list
           
        }
    }
    // filtered by given PRODUCER
    if (selectedProducer != 'Режиссер'){
        const filtered_data = data.filter(item => item.get('producer') === selectedProducer)
        data = filtered_data
        if (filtered_data.length){
            data = filtered_data
        }
        else{
            let films_list : Array<Map<string, string>> = []
            let movie_info = new Map<string, string>()
                    movie_info.set('name', 'Нет информации')
                    movie_info.set('rating', '')
                    movie_info.set('producer', '')
                    movie_info.set('actor', '')
                    movie_info.set('genre', '')
                    movie_info.set('country', '')
                    movie_info.set('year', '')
                    movie_info.set('tag_line', '')
            films_list.push(movie_info)
            data = films_list
           
        }
    }
    // filtered by given ACTOR
    if (selectedActor){
        // console.log(selectedActor)
        const filtered_data = data.filter(item => item.get('actor') === selectedActor)
        if (filtered_data.length){
            data = filtered_data
        } else{
            let films_list : Array<Map<string, string>> = []
            let movie_info = new Map<string, string>()
            movie_info.set('name', 'Нет информации')
            movie_info.set('rating', '')
            movie_info.set('producer', '')
            movie_info.set('actor', '')
            movie_info.set('genre', '')
            movie_info.set('country', '')
            movie_info.set('year', '')
            movie_info.set('tag_line', '')
            films_list.push(movie_info)
            data = films_list
           
        }
        
    }
// filtered by given GENRE
    if (selectedGenre){
        // console.log(selectedActor)
        const filtered_data = data.filter(item => item.get('genre') === selectedGenre)
        if (filtered_data.length){
            data = filtered_data
        } else{
            let films_list : Array<Map<string, string>> = []
            let movie_info = new Map<string, string>()
            movie_info.set('name', 'Нет информации')
            movie_info.set('rating', '')
            movie_info.set('producer', '')
            movie_info.set('actor', '')
            movie_info.set('genre', '')
            movie_info.set('country', '')
            movie_info.set('year', '')
            movie_info.set('tag_line', '')
            films_list.push(movie_info)
            data = films_list
           
        }
        
    }



    
    
    console.log('data',data)
    return (
        
        <div className='content'>
        <div className="content-item">
            {data.map(item => (
                <ContentSingleItem items = {item}/>
            ))}
                </div>
        </div>
    )
}



export default FilterPageContent;