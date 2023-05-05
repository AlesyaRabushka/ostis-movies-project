import { client } from "../client";
import { ScAddr, ScEventParams, ScEventType, ScTemplate, ScType } from "ts-sc-client";
import { useCallback, useEffect, useReducer, useState } from "react";
import { act } from "react-dom/test-utils";



// interface for each item
interface IActor{
    addr: ScAddr;
    text: string | number;
    movie: ScAddr;
}


export const findCountryAgent = async () =>{

    const nrelScTextTranslation = 'nrel_sc_text_translation';
    const nrelProductionCountry = 'nrel_production_country'
    const textNodeAlias = '_text_node'
    const filmNode = '_film_node'
    const conceptFilm = 'concept_film'
    const langRu = 'lang_ru';

    // const [actors, setActors] = useState<IActor[]>([]);



    const basekeynodes = [   
            {id: nrelScTextTranslation, type: ScType.NodeConstNoRole},
            {id: filmNode, type: ScType.NodeConst},
            {id: nrelProductionCountry, type: ScType.NodeConstNoRole},
            {id:langRu, type:ScType.NodeConst}
        ]

    const keynodes = await client.resolveKeynodes(basekeynodes);

    const resultNodeAlias = '_result_node'
    const template = new ScTemplate()
    template.tripleWithRelation(
        [ScType.NodeVar, filmNode],   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelProductionCountry],
        );

    // template.triple(langRu, ScType.EdgeDCommonVar, [ScType.LinkVar, textNodeAlias]);
    template.triple(resultNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textNodeAlias]);
    

    const result = await client.templateSearch(template)

    // MAIN ACTORS FILTER SEARCHBOX list
    let country_list: Array<string> = []

    // if (!result.length){    
    //     console.log('no countries')
    // } 
    // if find neccesary node
    if (result.length) {
        console.log('find countries', result.length)
        
        for (var index = 0; index < result.length;index++){

            const linkAddr = result[index].get(textNodeAlias)
            const text = await client.getLinkContents([linkAddr])

            if (!country_list.includes(String(text[0].data))){
                // choose only RUSSIAN words
                var regex = /^[а-яА-ЯёЁ\s]+$/
                if (regex.test(String(text[0].data))){
                    // console.log(String(text[0].data))
                    country_list.push(String(text[0].data))
                }
            }
        }
    }
    
    return country_list;
}



