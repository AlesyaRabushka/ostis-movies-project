import { client } from "../client";
import { ScAddr, ScEventParams, ScEventType, ScTemplate, ScType } from "ts-sc-client";
import { useCallback, useEffect, useReducer, useState } from "react";
import { act } from "react-dom/test-utils";



export const findFilmsAgent = async () =>{

    
    const textFilmNodeAlias = '_text_film_node'
    const textFilmNodeAliasSecond = '_text_node_alias_second'
    const textCartoonNodeAlias = '_text_cartoon_node'
    const filmNode = '_film_node'
    const filmNodeSecond = '_film_node_second'
    const concept_film = 'concept_film'
    const concept_cartoon = 'concept_cartoon'
    const cartoonNode = '_cartoon_node'
    const rating = '_rating'


    const nrelScTextTranslation = 'nrel_sc_text_translation';
    const nrelMainProducer = 'nrel_producer'
    const nrelProducer = 'nrel_producer'
    const nrelFilmCriticRating = 'nrel_film_critic_rating'
    const nrelMainActor = 'nrel_main_actor'
    const nrelTaglineOfFilm = 'nrel_tagline_of_film'
    const nrelProductionCountry = 'nrel_production_country'
    const nrelGenre = 'nrel_genre'
    const nrelReleaseYear = 'nrel_release_year'

    const resultFilmsNodeAlias = '_result_film_node'
    const resultCartoonsNodeAlias = '_result_cartoon_node'
    const resultDirectorNodeAlias = '_result_director_node'
    const resultMainActorNodeAlias = '_result_main_actor_node'
    const resultTagLineNodeAlias = '_result_tag_line'
    const resultCountryNodeAlias = '_result_country'
    const resultGenreNodeAlias = '_result_genre'
    const resultYearNodeAlias = '_result_release_year'

    const textRatingCartoonNodeAlias = '_text_rating_cartoon'
    const textRatingFimsNodeAlias = '_text_rating_film'
    const textProducerNodeAlias = '_text_producer_node_alias'
    const textMainActorNodeAlias = '_text_main_actor_node_alias'
    const textTagLineNodeAlias = '_text_tag_line_node_alias'
    const textCountryNodeAlias = '_text_country_node_alias'
    const textGenreNodeAlias = '_text_gene_node_alias'
    const textYearNodeAlias = '_text_release_year_node_alias'

    const basekeynodes = [   
            {id: nrelScTextTranslation, type: ScType.NodeConstNoRole},
            {id: filmNode, type: ScType.NodeConst},
            {id: filmNodeSecond, type: ScType.NodeConst},
            {id: cartoonNode, type: ScType.NodeConst},
            {id: concept_film, type: ScType.NodeConstNoRole},
            {id: concept_cartoon, type: ScType.NodeConstNoRole},
            {id: nrelFilmCriticRating, type: ScType.NodeNoRole},
            {id: nrelMainProducer, type: ScType.NodeConstNoRole},
            {id: nrelProducer, type: ScType.NodeConstNoRole},
            {id: nrelMainActor, type: ScType.NodeConstNoRole},
            {id:nrelTaglineOfFilm, type: ScType.NodeConstNoRole},
            {id:nrelProductionCountry, type: ScType.NodeConstNoRole},
            {id:nrelGenre, type:ScType.NodeConstNoRole},
            {id:nrelReleaseYear, type:ScType.NodeConstNoRole}
        ]

    const keynodes = await client.resolveKeynodes(basekeynodes);

    const template = new ScTemplate()
    const second_template = new ScTemplate()
    const cartoon_template = new ScTemplate()
        
    // FILMS
    template.triple(keynodes[concept_film], ScType.EdgeAccessVarPosPerm, [ScType.NodeVar, filmNode]);
    template.triple(filmNode, ScType.EdgeDCommonVar, [ScType.LinkVar, textFilmNodeAlias]);

    second_template.triple(keynodes[concept_film], ScType.EdgeAccessVarPosPerm, [ScType.NodeVar, filmNodeSecond]);
    second_template.triple(filmNodeSecond, ScType.EdgeDCommonVar, [ScType.LinkVar, textFilmNodeAliasSecond]);

    // films rating
    template.tripleWithRelation(
        [ScType.NodeVar, filmNode],   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultFilmsNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelFilmCriticRating],
        );
   
    template.triple(resultFilmsNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textRatingFimsNodeAlias]);
    // films producer
    template.tripleWithRelation(
        [ScType.NodeVar, filmNode],   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultDirectorNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelProducer],
        );
    template.triple(resultDirectorNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textProducerNodeAlias]);
    
    // films main actors
    template.tripleWithRelation(
        filmNode,   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultMainActorNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelMainActor],
        );
    template.triple(resultMainActorNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textMainActorNodeAlias]);
    
    // films tagline
    template.tripleWithRelation(
        filmNode,   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultTagLineNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelTaglineOfFilm],
        );
    template.triple(resultTagLineNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textTagLineNodeAlias]);
    

    // films genre
    second_template.tripleWithRelation(
        filmNodeSecond,   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultGenreNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelGenre],
        );
    second_template.triple(resultGenreNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textGenreNodeAlias]);
    // films country
    second_template.tripleWithRelation(
        filmNodeSecond,   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultCountryNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelProductionCountry],
        );
    second_template.triple(resultCountryNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textCountryNodeAlias]);
    // film release year
    second_template.tripleWithRelation(
        filmNodeSecond,   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultYearNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelReleaseYear],
        );
    second_template.triple(resultYearNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textYearNodeAlias]);

    


    // cartoons
    // cartoon_template.triple(keynodes[concept_cartoon], ScType.EdgeAccessVarPosPerm, [ScType.NodeVar, cartoonNode]);
    // cartoon_template.triple(cartoonNode, ScType.EdgeDCommonVar, [ScType.LinkVar, textCartoonNodeAlias]);
    // cartoon_template.tripleWithRelation(
    //     [ScType.NodeVar, filmNode],   
    //     ScType.EdgeDCommonVar,
    //     [ScType.NodeVar, resultCartoonsNodeAlias],
    //     ScType.EdgeAccessVarPosPerm,
    //     keynodes[nrelFilmCriticRating],
    //     );
    
    //     cartoon_template.triple(resultCartoonsNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textRatingCartoonNodeAlias]);


    const result = await client.templateSearch(template)
    const result_second = await client.templateSearch(second_template)
    // const resultCartoon = await client.templateSearch(cartoon_template)

    // MAIN ACTORS FILTER SEARCHBOX list
    // let films_list: Array<string> = []
    let films_list : Array<Map<string, string>> = []
    let rating_list : Array<string> = []


    let alreadtInList : Array<string> = [];
    if (!result.length){
        console.log('NO')
    }
    // if find neccesary node
    if (result.length){  
        console.log('find films', result.length, result_second.length)
        for (var index = 0; index < result.length;index++){

            const linkFilmsAddr = result[index].get(textFilmNodeAlias)
            const nameFilms = await client.getLinkContents([linkFilmsAddr])
            console.log('--- ',String(nameFilms[0].data))

            const linkFilmsRating = result[index].get(textRatingFimsNodeAlias)
            const ratingFilms = await client.getLinkContents([linkFilmsRating])

            const linkFilmsDirector = result[index].get(textProducerNodeAlias)
            const directorsFilms = await client.getLinkContents([linkFilmsDirector])
            
            const linkFilmsMaiActor = result[index].get(textMainActorNodeAlias)
            const mainActorsFilms = await client.getLinkContents([linkFilmsMaiActor])

            const linkFilmsTagLine = result[index].get(textTagLineNodeAlias)
            const tagLinesFilms = await client.getLinkContents([linkFilmsTagLine])

             // second template
            //  const linkFilmsAddrSecond = result_second[index].get(textFilmNodeAliasSecond)
            //  const nameFilmsSecond = await client.getLinkContents([linkFilmsAddrSecond])
            // console.log('+++', nameFilmsSecond[0].data)
            //  const linkFilmsGenre = result_second[index].get(textGenreNodeAlias)
            //  const genreFilms = await client.getLinkContents([linkFilmsGenre])
 
            //  const linkFilmsCountry= result_second[index].get(textCountryNodeAlias)
            //  const countryFilms = await client.getLinkContents([linkFilmsCountry])
 
            //  const linkFilmsYear= result_second[index].get(textYearNodeAlias)
            //  const yearFilms = await client.getLinkContents([linkFilmsYear])
            

            var regex = /^[а-яА-ЯёЁ0-9\s\-\,\.\:]+$/
            if (regex.test(String(nameFilms[0].data)) && !alreadtInList.includes(String(nameFilms[0].data))){
                for (var j = 0; j < result_second.length; j++){
                    const linkFilmsAddrSecond = result_second[j].get(textFilmNodeAliasSecond)
                    const nameFilmsSecond = await client.getLinkContents([linkFilmsAddrSecond])
                    // console.log('+++', nameFilmsSecond[0].data)
                    const linkFilmsGenre = result_second[j].get(textGenreNodeAlias)
                    const genreFilms = await client.getLinkContents([linkFilmsGenre])
        
                    const linkFilmsCountry= result_second[j].get(textCountryNodeAlias)
                    const countryFilms = await client.getLinkContents([linkFilmsCountry])
        
                    const linkFilmsYear= result_second[j].get(textYearNodeAlias)
                    const yearFilms = await client.getLinkContents([linkFilmsYear])
                
                    // console.log('+++',String(nameFilms[0].data))
                        if (String(nameFilms[0].data) === String(nameFilmsSecond[0].data)){
                            let movie_info = new Map<string, string>()
                            movie_info.set('name', String(nameFilms[0].data))
                            // console.log('===',String(nameFilms[0].data))
                            movie_info.set('rating', String(ratingFilms[0].data))
                            movie_info.set('producer', String(directorsFilms[0].data))
                            movie_info.set('actor', String(mainActorsFilms[0].data))
                            movie_info.set('tag_line', String(tagLinesFilms[0].data))
                            movie_info.set('genre', String(genreFilms[0].data))
                            movie_info.set('country', String(countryFilms[0].data))
                            movie_info.set('year', String(yearFilms[0].data))
                            // console.log('film', movie_info)

                            var flag = false;

                            if (!films_list.includes(movie_info)){
                                for (var film = 0; film < films_list.length; film++){
                                    // check if film is already in list
                                    if (String(nameFilms[0].data) === films_list[film].get('name')){
                                        flag = true
                                        break
                                    }
                                }
                                // if it is not
                                if (!flag){
                                        // choose only RUSSIAN words
                                        var regex = /^[а-яА-ЯёЁ0-9\s\-\,\.\:]+$/
                                        console.log(String(nameFilms[0].data))
                                        //     films_list.push(movie_info)
                                        if (regex.test(String(nameFilms[0].data)) && regex.test(String(directorsFilms[0].data)) && regex.test(String(mainActorsFilms[0].data)) && regex.test(String(genreFilms[0].data)) && regex.test(String(countryFilms[0].data))){
                                            console.log('YAS',String(nameFilms[0].data))
                                            films_list.push(movie_info)
                                            alreadtInList.push(String(nameFilms[0].data))
                                        }
                                }
                                
                            }
                        }
                }
        }

        }

        // for (var index = 0; index < result_second.length;index++){

        //     const linkFilmsAddrSecond = result[index].get(textFilmNodeAliasSecond)
        //     const nameFilmsSecond = await client.getLinkContents([linkFilmsAddrSecond])

        //     const linkFilmsGenre = result[index].get(textGenreNodeAlias)
        //     const genreFilms = await client.getLinkContents([linkFilmsGenre])

        //     const linkFilmsCountry= result[index].get(textCountryNodeAlias)
        //     const countryFilms = await client.getLinkContents([linkFilmsCountry])
            
        //     let movie_info = new Map<string, string>()
        //             movie_info.set('genre', String(genreFilms[0].data))
        //             movie_info.set('country', String(countryFilms[0].data))
        //             // console.log('genre', String(genreFilms[0].data))
                    
        //     if (!films_list.includes(movie_info) ){
        //         // choose only RUSSIAN words
        //         var regex = /^[а-яА-ЯёЁ0-9\s\-\,\.\:]+$/
        //         if (regex.test(String(genreFilms[0].data)) && regex.test(String(countryFilms[0].data))){
        //             films_list.push(movie_info)
        //         }
        //     }

        // }
        // for (var index1 = 0; index1 < resultCartoon.length; index1++){
        //     const linkCartoonsAddr = resultCartoon[index1].get(textCartoonNodeAlias)
        //     const textCartoons = await client.getLinkContents([linkCartoonsAddr])
        //     const linkCartoonsRating = result[index1].get(textRatingCartoonNodeAlias)
        //     const ratingCartoons = await client.getLinkContents([linkCartoonsRating])


        //     // if (!films_list.includes(String(textCartoons[0].data))){
        //     //     // choose only RUSSIAN words
        //     //     var regex = /^[а-яА-ЯёЁ0-9\s\-\,\.\:]+$/
        //     //     if (regex.test(String(textCartoons[0].data))){
        //     //         // console.log(String(textCartoons[0].data))
        //     //         films_list.push(String(textCartoons[0].data))
        //     //         // rating_list.push(String(ratingCartoons[0].data))
        //     //     }
        //     // }
        // }
    }
    console.log('end')
    
    return films_list;
}



