const graphql = require("graphql");
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;
const GraphQLString = graphql.GraphQLString;

let Schema = db => {
  let data = [42, 43, 44];

  let dataObj = [{ counter: 42 }, { counter: 43 }, { counter: 44 }];

  let linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
      id: { type: GraphQLString },
      title: { type: GraphQLString },
      cpu: { type: GraphQLString }
    })
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: () => ({
        data: {
          type: new GraphQLList(GraphQLInt),
          resolve: () => data
        },
        links: {
          type: new GraphQLList(linkType),
          resolve: async () =>{
                    var result = [];
                    await db.collection("links").get()
                    .then(response => response.forEach(doc => result.push(doc.data())))
                    return result
          }   
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
          resolve: () => ++counter
        }
      })
    })
  });

  return schema;
};
module.exports = Schema;
