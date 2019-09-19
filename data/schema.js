const graphql = require("graphql");
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLInt = graphql.GraphQLInt;

let data = [42,43,44]

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      counter: {
        type: GraphQLInt,
        resolve: () => 42
      },
      message: {
        type: graphql.GraphQLString,
        resolve: () => "Hello GraphQL"
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      incrementCounter: {
        type: GraphQLInt,
        resolve: () => ++counter }
    })
  })
});

module.exports = schema;
