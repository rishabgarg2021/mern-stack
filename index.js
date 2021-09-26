const { ApolloServer } = require("apollo-server");

const gql = require("graphql-tag");

//orm library which helps us to communicate with mongodb
const mongoose = require("mongoose");
//config of db
const { MONGODB } = require("./config");

//export all models
const Post = require("./models/Post");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
  }
`;
const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected successfully");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server listening at ${res.url}`);
  });
