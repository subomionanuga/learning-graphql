import { ApolloServer } from 'apollo-server'
import { Agent } from 'https';
import { getPackedSettings } from 'http2';

const typeDefs = `
    type Query {
       id: ID!
       name: String!
       age: Int!
       employedN: Boolean!
       gpa: Float
       title: String!
       price: Float!
       releaseYear: Int
       rating: Float
       inStock: Boolean!
    }
`

const resolvers = {
    Query: {
       id() {
            return "abc123"
       },
       name() {
            return "Subomi"
       },
       age() {
            return 25
       },
       employedN() {
            return true
       },
       gpa() {
            return null
       },
       title() {
           return "Rainbow Ring"
       },
       price()  {
           return 5000.00
       },
       releaseYear() {
           return 2018
       },
       rating() {
           return null
       },
       inStock() {
           return true
       }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen({ port: 3000 }, () => {
    console.log('The server is up');
    
})