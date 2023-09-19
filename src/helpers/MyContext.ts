import { authenticate } from "../middleware";

export async function MyContext({req}:{req:any}){
    try{
        if(req.headers.authorization){
            const{token,user}= await authenticate(req.headers.authorization)

            return {token,user}

        }
        return {}

    }catch(error:any){
        throw new Error(error.message)
    }
}