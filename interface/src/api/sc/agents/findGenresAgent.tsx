import { client } from "../client";
import { ScAddr, ScEventParams, ScEventType, ScTemplate, ScType } from "ts-sc-client";
import { useCallback, useEffect, useReducer, useState } from "react";
import { act } from "react-dom/test-utils";



export const findGenreAgent = async () =>{

    const nrelScTextTranslation = 'nrel_sc_text_translation';
    const nrelGenre = 'nrel_genre'
    const textNodeAlias = '_text_node'
    const filmNode = '_film_node'
    const genreDescription = 'genre_description'
    const genreNodeAlias = '_genre_node'
    const nrelMainIdtf = 'nrel_main_idtf'

    const basekeynodes = [   
            {id: nrelScTextTranslation, type: ScType.NodeConstNoRole},
            {id: filmNode, type: ScType.NodeConst},
            {id: nrelGenre, type: ScType.NodeConstNoRole},
        ]

    const keynodes = await client.resolveKeynodes(basekeynodes);

    const resultNodeAlias = '_result_node'
    const template = new ScTemplate()
    template.tripleWithRelation(
        [ScType.NodeVar, filmNode],   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelGenre],
        );


    template.triple(resultNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textNodeAlias]);

    // template.tripleWithRelation(
    //     resultNodeAlias,
    //     ScType.EdgeDCommonVar,
    //     [ScType.NodeVar, genreNodeAlias],
    //     ScType.EdgeAccessVarPosPerm,
    //     keynodes[nrelMainIdtf],
    // )

    // template.triple(genreNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textNodeAlias]);
    

    const result = await client.templateSearch(template)

    // MAIN ACTORS FILTER SEARCHBOX list
    let director_list: Array<string> = []

    if (!result.length){    
        console.log('no genres')
    } 
    // if find neccesary node
    else {
        console.log('find genres', result.length)
        
        for (var index = 0; index < result.length;index++){

            const linkAddr = result[index].get(textNodeAlias)
            const text = await client.getLinkContents([linkAddr])
            // console.log('genre', String(text[0].data))
                    // director_list.push(String(text[0].data))

            if (!director_list.includes(String(text[0].data))){
                // choose only RUSSIAN words
                var regex = /^[а-яА-ЯёЁ\s]+$/
                if (regex.test(String(text[0].data))){
                    // console.log(String(text[0].data))
                    director_list.push(String(text[0].data))
                }
            }
        }
    }
    
    return director_list;
}



