const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const ApartmentType = new GraphQLObjectType({
  name: "Apartment",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    rating: { type: GraphQLInt },
    price: { type: GraphQLInt },
    location: {
      type: LocationType,
      resolve({ locationName }, args) {
        return Location.findById(locationName);
      },
    },
    owner: {
      type: OwnerType,
      resolve({ ownerName }, args) {
        return Owner.findById(ownerName);
      },
    },
  }),
});

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    city: { type: GraphQLString },
  }),
});

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    name: { type: GraphQLString },
    phone: { type: GraphQLInt },
    email: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    apartment: {
      type: ApartmentType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {},
    },
  }),
});

module.exports = new GraphQLSchema({
  query: Query,
});
