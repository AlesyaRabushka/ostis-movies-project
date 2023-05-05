import Layout from '../../layout/Layout';
import MainPageContent from '../../components/MainPageContent/MainPageContent';
import "./Home.css"
import { client } from '../../api/sc/client';
import { findFilmsAgent } from '../../api/sc/agents/findFilmsAgents';
import { useState } from 'react';

const Home = () => {
    const [filmsList, setFilmsList] = useState<Map<string,string>[]>([])
   
    // FILMS
    const films_list = findFilmsAgent()
    films_list.then(response => setFilmsList(() => [...response]))

    return (
        <Layout>
            <div className='home-page'>
                <div className='home-logo'>
                    Лучшие фильмы
                </div>
                <div className='home-content-box'>
                    <MainPageContent data={filmsList}/>
                </div>
            </div>
        </Layout>
    );
}

export default Home;