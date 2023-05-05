import { client } from "../client";
import { ScAddr, ScEventParams, ScEventType, ScTemplate, ScType } from "ts-sc-client";
import { useCallback, useEffect, useReducer, useState } from "react";



export const findRatingAgent = async () =>{

    const nrelFilmCriticRating = 'nrel_film_critic_rating';
    const resultNodeAlias = '_result_node'
    const filmNode = '_film_node'
    const ratingNode = '_rating_node'


    const basekeynodes = [   
            {id: nrelFilmCriticRating, type: ScType.NodeConstNoRole},
            {id: filmNode, type: ScType.NodeConst}
        ]

    const keynodes = await client.resolveKeynodes(basekeynodes)

    const template = new ScTemplate()

    template.tripleWithRelation(
        filmNode, 
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelFilmCriticRating],
        );

    // template.triple(langRu, ScType.EdgeDCommonVar, [ScType.LinkVar, textNodeAlias]);
    template.triple(resultNodeAlias, ScType.EdgeDCommonVar, [ScType.NodeVar, ratingNode]);
    

    const result = await client.templateSearch(template)

    // MAIN ACTORS FILTER SEARCHBOX list
    let actors_list: Array<string> = []

    if (!result.length){    
        console.log('no rating')
    } 
    // if find neccesary node
    else {
        console.log('find', result.length)
        
        for (var index = 0; index < result.length;index++){

            const linkAddr = result[index].get(ratingNode)
            const text = await client.getLinkContents([linkAddr])

            console.log(text[0].data)
                    actors_list.push(String(text[0].data))
        }
    }
    
    return actors_list;
}



