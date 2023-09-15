import { InputUserInterface, UserInterface } from "../../interface/userInterface";
import { User } from "../../models/user";

export const userResolvers = {
  Query: {
    users: async () => {
        console.log("hello")
        return "hello";
    },
},

Mutation:{
    register: async(parents:any,args:{input:InputUserInterface})=>{

     const {userName,email}= args.input
        
     const newUser:any = await User.create({
        userName,
        email
     })


    }
}
}