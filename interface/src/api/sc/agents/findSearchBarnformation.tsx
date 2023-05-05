import { client } from "../client";
import { ScAddr, ScEventParams, ScEventType, ScTemplate, ScType } from "ts-sc-client";




export const findSearchBarInformation = async () =>{

    const nrelScTextTranslation = 'nrel_sc_text_translation';
    const nrelMainProducer = 'nrel_producer'
    const nrelMainActor = 'nrel_main_actor'

    const filmNode = '_film_node'
    const filmNameNode = '_film_name_node'
    const conceptFilm = 'concept_film'
    const langRu = 'lang_ru';


    const resultProducersNodeAlias = '_result_node'
    const resultActorsNodeAlias = '_result_actors_node'

    const textNodeAlias = '_text_node'
    const textActorsNodeAlias = '_text_actors_node'
    const textFilmNodeAlias = '_text_name_node'


    const basekeynodes = [   
            {id: nrelScTextTranslation, type: ScType.NodeConstNoRole},
            {id: filmNode, type: ScType.NodeConst},
            {id: filmNameNode, type: ScType.NodeConst},
            {id: nrelMainActor, type: ScType.NodeConstNoRole},
            {id: nrelMainProducer, type: ScType.NodeConstNoRole},
            {id:conceptFilm, type:ScType.NodeConstNoRole}
        ]

    const keynodes = await client.resolveKeynodes(basekeynodes);

    
    const template = new ScTemplate()
    // film name
    // template.triple(keynodes[conceptFilm], ScType.EdgeAccessVarPosPerm, [ScType.NodeVar, filmNameNode]);
    // template.triple(filmNameNode, ScType.EdgeDCommonVar, [ScType.LinkVar, textFilmNodeAlias]);
    // producers
    template.tripleWithRelation(
        [ScType.NodeVar, filmNode],   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultProducersNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelMainProducer],
        );

    template.triple(resultProducersNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textNodeAlias]);

    // actors
    template.tripleWithRelation(
        [ScType.NodeVar, filmNode],   
        ScType.EdgeDCommonVar,
        [ScType.NodeVar, resultActorsNodeAlias],
        ScType.EdgeAccessVarPosPerm,
        keynodes[nrelMainActor],
        );

    template.triple(resultActorsNodeAlias, ScType.EdgeDCommonVar, [ScType.LinkVar, textActorsNodeAlias]);
    

    const result = await client.templateSearch(template)

    // MAIN ACTORS FILTER SEARCHBOX list
    let director_list: Array<string> = []

    if (!result.length){    
        console.log('no directors')
    } 
    // if find neccesary node
    else {
        console.log('find search bar', result.length)
        
        for (var index = 0; index < result.length;index++){

            // const linkAddrName = result[index].get(textFilmNodeAlias)
            // const textName = await client.getLinkContents([linkAddrName])

            const linkAddr = result[index].get(textNodeAlias)
            const text = await client.getLinkContents([linkAddr])

            const linkAddrActors = result[index].get(textActorsNodeAlias)
            const textActors = await client.getLinkContents([linkAddrActors])

            if (!director_list.includes(String(text[0].data))){
                // choose only RUSSIAN words
                var regex = /^[а-яА-ЯёЁ\s]+$/
                if (regex.test(String(text[0].data)) && regex.test(String(textActors[0].data))){
                    // console.log(String(text[0].data))
                    // director_list.push(String(textName[0].data))
                    director_list.push(String(text[0].data))
                    director_list.push(String(textActors[0].data))
                }
            }
        }
    }
    
    return director_list;
}

