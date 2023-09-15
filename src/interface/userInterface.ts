 export interface UserInterface {
    id?:string;
    userName?:string;
    email?:string;
    createdAt?:string;
    updatedAt?:string;
    message?:string

}

 export interface InputUserInterface {
    userName:string;
    email:string;
    password:string;
    confirmPassword:string;
}