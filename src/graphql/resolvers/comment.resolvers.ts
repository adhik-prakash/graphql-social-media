import { Comment } from "../../models/comment";

export const CommentResolver = {
    Query: {
        getComments:async(parent:any,args:any,context:any)=>{
            try{
                if(!context.user){
                    throw new Error ("Authorization is missing")
                }
              const allComments = await Comment.findAll()
                return allComments
            }
            catch(error:any){
                throw new Error('Error occured')
            }
        }
    },
    Mutation:{
        addComment:async(parent:any,args:any,context:any)=>{
            try{
               if (!context.user) {
                throw new Error("Authorization missing")
            }
            const{description} = args.input

            const newComment = await Comment.create({
                description,
                userId:context.user.id,
            })
            console.log(newComment)
            return {
                data:newComment,
                message:"New comment added"
            }

        }catch(error:any){
            throw new Error(error.message)
        }
    
    }
    }
}
