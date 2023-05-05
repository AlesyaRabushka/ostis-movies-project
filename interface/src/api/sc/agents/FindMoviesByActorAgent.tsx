import { ScAddr, ScTemplate, ScType } from "ts-sc-client";
import {client} from "../../sc/client"


const nrelMainActor = "nrel_main_actor";
const actor = 'robert_pattinson';
const nrelScTextTranslation = "nrel_sc_text_translation";


export const findMoviesByActorAgentNode = async (node: ScAddr, keynodes: Record<string, ScAddr>) =>{
    const template = new ScTemplate();


    // const baseKeynodes = [
    //     {id: nrelMainActor, type: ScType.NodeConstNoRole},
    //     {id: actor, type: ScType.NodeConstNoRole},
    //     {id: nrelScTextTranslation, type: ScType.NodeConstNoRole}
    // ]

    // // generate keynodes (find ScAddrs)
    // const keynodes = await client.resolveKeynodes(baseKeynodes);

    // create? new node for all movies to use later
    const movieNode = '_movie_node';
    // node for text
    const textNode = '_text_node';

    // movie? ---> actor
    template.tripleWithRelation(
        [ScType.NodeVar, movieNode],
        ScType.EdgeDCommonConst,
        keynodes[actor],
        ScType.EdgeAccessConstPosPerm,
        keynodes[nrelMainActor],
    )

    // movie? ---> text
    template.triple(
        movieNode,
        ScType.EdgeAccessVarPosPerm,
        [ScType.LinkVar, textNode],
    )

    // find all constructions for the given template
    const result = await client.templateSearch(template);

    const linkNode = result[0].get(textNode)
    const resultText = await client.getLinkContents([linkNode])
    const text = resultText[0].data
    const movie = result[0].get(movieNode)
    
    
    console.log("Find movies agent")
    console.log(text)


    return {addr:movieNode ,text:text, movie:movie};
}


// const getInfoItem = async (itemNode: ScAddr, keynodes: Record<string, ScAddr>) =>{
//     const template = new ScTemplate();

//     template.tripleWithRelation(
//         [ScType.NodeVar, ]
//     )
// }