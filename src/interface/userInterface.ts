 export interface UserInterface {
    id?:string;
    userName?:string;
    email?:string;
 
}
 export interface InputUserInterface {
    userName:string;
    email:string;
    password:string;
    confirmPassword:string;
}
export interface LoginUserInterface {
    id:string | undefined;
    email:string|undefined
    password:string|undefined

}