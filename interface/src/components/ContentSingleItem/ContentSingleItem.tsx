import React from "react";
import './ContentSingleItem.css'



const ContentSingleItem = ({items}:{items:Map<string, string>}) =>{
    return (
        <div className="item">
            <div className="film_name">{items.get('name')}</div>
            <div className="film_year">Год выхода: {items.get('year')}</div>
            <div className="film_rating">Рейтинг: {items.get('rating')}</div>
            <div className="film_director">Режиссер: {items.get('producer')}</div>
            <div className="film_main_actor">В главных ролях: {items.get('actor')}</div>
            <div className="film_country">Страна производства: {items.get('country')}</div>
            <div className="film_genre">Жанр: {items.get('genre')}</div>
            <div className="film_tag_line">Слоган: {items.get('tag_line')}</div>
        </div>
    );
}

export default ContentSingleItem;