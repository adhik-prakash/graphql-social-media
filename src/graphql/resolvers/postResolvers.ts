
import {Post} from '../../models/post'

export const postResolver = {
    Query: {
        getAllPosts:async (parent:any,args:any)=>{
            try{

            
            const allPosts = await Post.findAll()

        return  allPosts
            }catch(error){
                throw new Error ("Cannot fetch post ")
            }
       
            
        }
    }
}
