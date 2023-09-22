import { DeleteReplyInterface, MyContext, ReplyInterface, UpdateReplyInterface } from "../../interface";
import { Reply,Comment } from "../../models";

export const ReplyResolver = {
  Query: {
  commentWithReply:async(parent:any,args:any,context:MyContext)=>{
    const{commentId } = args.input;
    try {
      if (!context.user) {
        throw new Error("Authorization header is missing");
      }
      const comment = await Comment.findAll({
        where: { id: commentId },
        include: [
          {
            model: Reply,
            as: "replies"
          }
        ]
      });

      if(comment.length<=0)
      {
        throw new Error("no comment found for post")
      }
      // console.log(comment);
      return {
        data: comment,
      };
  }

  catch(error:any)
  {
    throw new Error(error.message);
  }
  }
    
  },
  Mutation:{
    addReply:async(parent:any,args:any,context:MyContext)=>{
        console.log("hello ")
        try{
            if(!context.user){
                throw new Error("Authorization header is missing")
        }
        const {description,commentId} = args.input
        const checkCommentId = await Comment.findByPk(commentId);
        if(!checkCommentId)
        {
            throw new Error(`Comment with id ${commentId} not Found`);
        }

        const newReply = await Reply.create({
            description,
            userId:context.user.id,
            commentId
        })
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

