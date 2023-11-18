"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminApiExtensions = exports.shopApiExtensions = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const commonExtensions = (0, apollo_server_core_1.gql) `
  type StoreCredit implements Node {
    id: ID!
    key: String
    value: Int
    customerId: String
    isClaimed: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }

  input StoreCreditAddInput {
    key: String
    value: Int
  }

  type AccountBalance {
    customerAccountBalance: Int
    sellerAccountBalance: Int
  }

  extend type Query {
    storeCredit(id: ID!): StoreCredit!
    customerStoreCredit(id: ID!, customerId: ID!): StoreCredit!
    customerStoreCredits: [StoreCredit!]!
  }
`;
exports.shopApiExtensions = (0, apollo_server_core_1.gql) `
  ${commonExtensions}

  extend type Mutation {
    claim(key: String!): StoreCredit!
  }
`;
exports.adminApiExtensions = (0, apollo_server_core_1.gql) `
  ${commonExtensions}

  input StoreCreditUpdateInput {
    id: ID!
    key: String
    value: Int
  }

  type StoreCreditList implements PaginatedList {
    items: [StoreCredit!]!
    totalItems: Int!
  }

  input StoreCreditListOptions

  extend type Query {
    storeCredits(options: StoreCreditListOptions): StoreCreditList!

    getSellerANDCustomerStoreCredits(sellerId: ID!): AccountBalance!
  }

  extend type Mutation {
    transferCreditfromSellerToCustomer(
      value: Int!
      sellerId: ID!
    ): AccountBalance!
    createStoreCredit(input: StoreCreditAddInput!): StoreCredit!
    updateStoreCredit(input: StoreCreditUpdateInput!): StoreCredit!
    deleteSingleStoreCredit(id: ID!): DeletionResponse!
  }
`;
