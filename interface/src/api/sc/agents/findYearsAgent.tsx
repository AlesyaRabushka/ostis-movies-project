import { client } from "../client";
import { ScAddr, ScEventParams, ScEventType, ScTemplate, ScType } from "ts-sc-client";
import { useCallback, useEffect, useReducer, useState } from "react";



export const findYearsAgent = async () =>{

    const nrelScTextTranslation = 'nrel_sc_text_translation';
    const nrelMainActor = 'nrel_main_actor'
    const textNodeAlias = '_text_node'
    const filmNode = 'Twilight'
    const conceptFilm = 'concept_film'
    const langRu = 'lang_ru';



    const basekeynodes = [   
            {id: nrelScTextTranslation, type: ScType.NodeConstNoRole},
            {id: filmNode, type: ScType.NodeConst},
            {id: nrelMainActor, type: ScType.NodeConstNoRole},
            {id:langRu, type:ScType.NodeConst}
        ]

    const keynodes = await client.resolveKeynodes(basekeynodes)

    const resultNodeAlias = '_result_node'
    const template = new ScTemplate()
    template.tripleWithRelation(
        filmNode,   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelMainActor],
        );

    // template.triple(langRu, ScType.EdgeDCommonVar, [ScType.LinkVar, textNodeAlias]);
    template.triple(resultNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textNodeAlias]);
    

    const result = await client.templateSearch(template)

    // MAIN ACTORS FILTER SEARCHBOX list
    let actors_list: Array<string> = []

    if (!result.length){    
        console.log('no')
    } 
    // if find neccesary node
    else {
        console.log('find', result.length)
        
        for (var index = 0; index < result.length;index++){

            const linkAddr = result[index].get(textNodeAlias)
            const text = await client.getLinkContents([linkAddr])

            if (!actors_list.includes(String(text[0].data))){
                // choose only RUSSIAN words
                var regex = /^[а-яА-ЯёЁ\s]+$/
                if (regex.test(String(text[0].data))){
                    console.log(text[0].data)
                    actors_list.push(String(text[0].data))
                }
            }
        }
    }
    
    return actors_list;
}



