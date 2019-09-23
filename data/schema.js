const graphql = require("graphql");
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLInt = graphql.GraphQLInt;
const GraphQLList = graphql.GraphQLList;
const GraphQLString = graphql.GraphQLString;
const GraphQLID = graphql.GraphQLID;
const GraphQLNonNull = graphql.GraphQLNonNull;

let Schema = db => {
  let data = [42, 43, 44];

  let dataObj = [{ counter: 42 }, { counter: 43 }, { counter: 44 }];

  let ayaList = new GraphQLObjectType({
    name: "AyatList",
    fields: () => ({
      aya: { type: ayaType }
    })
  });

  let ayaType = new GraphQLObjectType({
    name: "Aya",
    fields: () => ({
      ayaFarsi: { type: GraphQLString },
      ayaHezb: { type: GraphQLString },
      ayaJoze: { type: GraphQLString },
      ayaNumber: { type: GraphQLString },
      ayaSojda: { type: GraphQLString },
      ayaText: { type: GraphQLString }
    })
  });

  // QuranType
  let quranType = new GraphQLObjectType({
    name: "Quran",
    fields: () => ({
      //sura(suraNumber: GraphQLString): {type: suraType}
      suraNumber: { type: GraphQLString },
      suraName: { type: GraphQLString },
      ayat: { type: ayaType }
    })
  });

  // SuraYpe
  let suraType = new GraphQLObjectType({
    name: "Sura",
    fields: () => ({
      suraName: { type: GraphQLString },
      suraNumber: { type: GraphQLString },
      ayat: { type: ayaType }
    })
  });

  //Main Schema
  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: () => ({
        data: {
          type: new GraphQLList(GraphQLInt),
          resolve: () => data
        },
        quran: {
          type: new GraphQLList(quranType),
          args: { id: { type: GraphQLString } },
          resolve: async () => {
            var result = [];
            await db
              .collection("quran")
              .get()
              .then(response =>
                response.forEach(doc => result.push(doc.data()))
              );
            return result;
          }
        },
        sura: {
          type: new GraphQLList(suraType),
          args: { id: { type: GraphQLString } },
          resolve: async (source, { id }) => {
            var sura = [];

            await db
              .collection("quran")
              .doc(id)
              .get()
              .then(
                doc => sura.push(doc.data())

                //      sura.aya.forEach(e => sura.aya.push(e.data().aya));
              );

            console.log(sura[0]);
            return sura;
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
