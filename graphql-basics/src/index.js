import { ApolloServer } from 'apollo-server'
import uuidv4 from 'uuid/v4'

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
    body: 'This is my first comment',
    author: '1',
    onPost: '5'
}, {
    id: '12',
    body: 'This is my second comment',
    author: '2',
    onPost: '6'
}, {
    id: '13',
    body: 'This is my third comment',
    author: '1',
    onPost: '7'
}, {
    id: '14',
    body: 'This is my fourth comment',
    author: '1',
   onPost: '5'
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(name :String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Int!, author: ID!): Post!
        createComment(body: String!, author: ID!, onPost: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Int!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        body: String!
        author: User!
        onPost: Post!
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

    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email == args.email)

            if (emailTaken) {
                throw new Error('Email taken.')
            }
            const user = {
                id: uuidv4(),
                name: args.name,
                email: args.email,
                age: args.age
            }
            users.push(user)
            return user
        },

        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)

            if (!userExists) {
                throw new Error('User not found')
            }
            const post = {
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.author
            }
            posts.push(post)
            return post
        },

        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)
            const postExists = posts.some((post) => post.id === args.onPost)

            if (!userExists) {
                throw new Error('User not found')
            }
            if (!postExists) {
                throw new Error('Post not found')
            }
            const comment = {
                id: uuidv4(),
                body: args.body,
                author: args.author,
                onPost: args.onPost
            }
            comments.push(comment)
            return comment
        }
    },

    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.onPost === parent.id
            })
        }
    },

    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },

    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        onPost(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.onPost
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