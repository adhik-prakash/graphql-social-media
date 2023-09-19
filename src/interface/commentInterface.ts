import { Model } from "sequelize";

export interface CommentInterface extends Model{
    id:number,
    userId:number,
    description:string
}