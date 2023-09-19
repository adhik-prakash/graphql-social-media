import { User } from './../../models/user';
export const userTypeDefs = `#graphql
scalar Date
type User {
    id:Int
    userName:String
    email:String
    createdAt:Date
    message:String
}
type Query {
    users:[User]
}
input RegisterInput{
    userName:String!
    email:String!
    password:String!
    confirmPassword:String!
}

input RegisterResponse{
    userName:String
    email:String

}
input LoginInput{
    email:String!
    password:String!
    }

    type LoginResponse{
        email: String
        token: String
        message: String
  }

type Mutation {
    register(input:RegisterInput):User
    login(input:LoginInput):LoginResponse
    
}

`;
