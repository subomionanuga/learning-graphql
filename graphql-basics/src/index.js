import { ApolloServer } from 'apollo-server'

const typeDefs = `
    type Query {
        greeting(name: String): String!
        add(a: Float!, b: Float!): Float!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Int!
    }
`

const resolvers = {
    Query: {
        greeting() {
            return "Hello"
        },
        add(parent, args) {
            // console.log(parent);
            // console.log(ctx);
            // console.log(info);
            // console.log(args);
            return args.a + args.b
        },
        me() {
            return {
                id: "123abc",
                name: "Subomi",
                email: "subomi@subomi.com",
                age: 25
            }
        },

        post() {
            return{
                id: "post1",
                title: "My first post",
                body: "This is the first post created using GraphQL",
                published: 2019
            }
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