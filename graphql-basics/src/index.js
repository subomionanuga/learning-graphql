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
    id: '5',
    title: 'First Post',
    body: 'Nothing to report',
    published: 2017,
    author: '1'
}, {
    id: '6',
    title: 'Second Post',
    body: 'Something to report',
    published: 2018,
    author: '1'
}, {
    id: '7',
    title: 'Third Post',
    body: 'Just for the sake of it',
    published: 2019,
    author: '2'
}]

const comments =[{
    id: '11',
    body: 'This is my first comment'
}, {
    id: '12',
    body: 'This is my second comment'
}, {
    id: '13',
    body: 'This is my third comment'
}, {
    id: '14',
    body: 'This is my fourth comment'
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Int!
        author: User!
    }

    type Comment {
        id: ID!
        body: String!
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

        comments(parent, args, ctx, info) {
            return comments
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
    },

    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },

    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
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