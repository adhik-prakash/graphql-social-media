import { INTEGER } from "@sequelize/core/_non-semver-use-at-your-own-risk_/dialects/abstract/data-types.js";


export  interface PostInterface {
    id?:number;
    userId?:number;
    description?:string;
    createdAt?:Date;
    updatedAt?:Date;
    message?:string
}

export interface GetAllPostInterface {
    user:number
}