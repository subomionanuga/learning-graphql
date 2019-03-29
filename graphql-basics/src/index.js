import { ApolloServer } from 'apollo-server'

const users = [{
    id: '1',
    name: 'Subomi',
    email: 'subomi@subomi.com',
    age: 25
}, {
    id: '2',
    name: 'John',
    email: 'john@john.com',
    age: 78
}]

const posts = [{
    id: '1',
    title: 'First Post',
    body: 'Nothing to report',
    published: 2017
}, {
    id: '2',
    title: 'Second Post',
    body: 'Something to report',
    published: 2018
}, {
    id: '3',
    title: 'Third Post',
    body: 'Just for the sake of it',
    published: 2019
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
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
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },

        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }
            return posts.filter((post) => {
                return post.title.includes(args.query)
            })
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