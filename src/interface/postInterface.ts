
export  interface PostInterface {
    id?:number;
    userId?:number;
    description?:string;

}
export interface GetAllPostInterface {
    user:number
}

export interface CreatePostInterface {
    description:string
}

export interface UpdatePostInterface {
    id:number;
    description:string
}
export interface DeletePostInterface {
    id:number

}
