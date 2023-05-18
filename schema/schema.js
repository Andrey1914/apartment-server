const graphql = require("graphql");

const Apartments = require("../models/apartment");
const Owners = require("../models/owner");
const Locations = require("../models/location");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  // GraphQLNonNull,
  GraphQLList,
} = graphql;

const ApartmentType = new GraphQLObjectType({
  name: "Apartment",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    rating: { type: GraphQLInt },
    price: { type: GraphQLInt },
    location: {
      type: LocationType,
      resolve({ locationId }, args) {
        return Locations.findById(locationId);
      },
    },
    owner: {
      type: OwnerType,
      resolve({ ownerId }, args) {
        return Owners.findById(ownerId);
      },
    },
  }),
});

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    id: { type: GraphQLID },
    city: { type: GraphQLString },
    apartments: {
      type: ApartmentType,
      resolve({ id }, args) {
        return Apartments.find({ locationId: id });
      },
    },
  }),
});

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    apartments: {
      type: ApartmentType,
      resolve({ id }, args) {
        return Apartments.find({ ownerId: id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOwner: {
      type: OwnerType,
      args: {
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, { name, phone, email }) {
        const owner = new Owners({
          name,
          phone,
          email,
        });
        return owner.save();
      },
    },

    addLocation: {
      type: LocationType,
      args: {
        city: { type: GraphQLString },
        ownerId: { type: GraphQLID },
      },
      resolve(parent, { city, ownerId }) {
        const locatoin = new Locations({
          city,
          ownerId,
        });
        return locatoin.save();
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    apartment: {
      type: ApartmentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Apartments.findById(args.id);
      },
    },

    owner: {
      type: OwnerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Owners.findById(args.id);
      },
    },

    location: {
      type: LocationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Locations.findById(args.id);
      },
    },

    apartments: {
      type: new GraphQLList(ApartmentType),
      args: { title: { type: GraphQLString } },
      // resolve(parent, { title }) {
      //   return Apartments.find({
      //     title: { title, $regex: title, $options: "i" },
      //   });
      // },
      resolve(parent, args) {
        return Apartments.find({});
      },
    },

    owners: {
      type: new GraphQLList(OwnerType),
      args: { name: { type: GraphQLString } },
      // resolve(parent, { name }) {
      //   return Owners.find({
      //     name: { name, $regex: "name", $options: "i" },
      //   });
      // },
      resolve(parent, args) {
        return Owners.find({});
      },
    },

    locations: {
      type: new GraphQLList(LocationType),
      args: { city: { type: GraphQLString } },
      // resolve(parent, { city }) {
      //   return Locations.find({
      //     city: { city, $regex: "city", $options: "i" },
      //   });
      // },
      resolve(parent, args) {
        return Locations.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
