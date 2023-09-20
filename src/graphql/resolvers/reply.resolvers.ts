import { DeleteReplyInterface, MyContext, ReplyInterface, UpdateReplyInterface } from "../../interface";
import { Reply } from "../../models";

export const ReplyResolver = {
  Query: {
    getRepliesByCommentId: async (
      parent: any,
      args: any,
      context: MyContext
    ) => {
        const {commentId} = args.input
        try{
            if(!context.user){
                throw new Error("Authorization header is missing")
            }
            const reply = await Reply.findAll({
                where:{commentId}
            })
        return{ 
        data:reply
        }
        }catch(error:any){
            throw new Error(error.message)
        }
    },
  },
  Mutation:{
    addReply:async(parent:any,args:any,context:MyContext)=>{
        console.log("hello ")
        try{
            if(!context.user){
                throw new Error("Authorization header is missing")
        }
        const {description,commentId} = args.input
        const newReply = await Reply.create({
            description,
            userId:context.user.id,
            commentId
        })
        console.log(newReply)
        return{
            data:newReply,
            message:"new reply is added"
        }
        
    }catch(error:any){
        throw new Error(error.message)
    }
},
updateReply:async(parent:any,args:{input: UpdateReplyInterface},context:MyContext)=>{
    try{
        if(!context.user){
            throw new Error("Authorization header is missing")
        }
        const {replyId,description} = args.input;
        const newData = {
            description
        }

        const reply = await Reply.findByPk(replyId)

        if(!reply){
            throw new Error(`reply of id ${replyId} not found`)
        }
        if(reply.dataValues.userId!==context.user.id)
        {
            throw new Error(`User is not Authirized to udate this reply`)
        }
        await reply.update(newData,{where:{id:replyId}})
        return{
            data:reply,
            message:`reply of if ${replyId} has been updated`
        }  
    }catch(error:any){
        throw new  Error(error.message)
    }
},
deleteReply: async(parent:any,args:{input: DeleteReplyInterface},context:MyContext)=>{
    try{
        if(!context.user)
        throw new Error("Authorization header is missing")

        const {replyId} = args.input
        const deletereply = await Reply.findByPk(replyId);
        console.log(deletereply);

        if(!deletereply){
            throw new Error(`reply of id ${replyId} not found`)
        }

        if(deletereply.dataValues.userId!== context?.user?.id)
        {
            throw new Error(`User is not authorized to delete this Reply`);
        }
        await deletereply.destroy()
        return {
            data:deletereply,
            message:`Reply with id ${replyId} is deleted `
        }

    }catch(error:any){
        throw new Error(error.message)

    }
}
}
}

