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
type Mutation {
    register(input:RegisterInput):User
}

`;
