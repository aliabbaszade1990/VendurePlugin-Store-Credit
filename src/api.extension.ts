import { gql } from 'apollo-server-core';

const commonExtensions = gql`
    type StoreCredit implements Node {
        id: ID!
        value: Int
        perUserLimit: Int!
        createdAt: DateTime
        updatedAt: DateTime
    }

    input StoreCreditListOptions

    type StoreCreditList implements PaginatedList {
        items: [StoreCredit!]!
        totalItems: Int!
    }

    type AccountBalance {
        customerAccountBalance: Int
        sellerAccountBalance: Int
    }

    extend type Query {
        storeCredits(options: StoreCreditListOptions): StoreCreditList!
        storeCredit(id: ID!): StoreCredit
    }
`;

export const shopApiExtensions = gql`
    ${commonExtensions}

    extend type StoreCredit {
        variantId: ID!
        variant: ProductVariant!
    }

    type ClaimResult {
        success: Boolean!
        message: String!
        addedCredit: Int
        currentBalance: Int
    }

    extend type Query {
        getSellerANDCustomerStoreCredits: AccountBalance!
    }

    extend type Mutation {
        addCreditToOrder(creditId: ID!, quantity: Int!): UpdateOrderItemsResult
        claim(key: String!): ClaimResult!
    }
`;

export const adminApiExtensions = gql`
    ${commonExtensions}

    extend type StoreCredit {
        variantId: ID
        variant: ProductVariant
        key: String
        customer: Customer
        customerId: ID
    }

    input StoreCreditAddInput {
        name: String
        value: Int!
        price: Int
        perUserLimit: Int!
    }

    input StoreCreditUpdateInput {
        id: ID!
        name: String
        value: Int
        perUserLimit: Int
    }

    extend type Query {
        getSellerANDCustomerStoreCredits(sellerId: ID!): AccountBalance!
    }

    extend type Mutation {
        transferCreditfromSellerToCustomer(value: Int!, sellerId: ID!): AccountBalance!
        createStoreCredit(input: StoreCreditAddInput!): StoreCredit!
        updateStoreCredit(input: StoreCreditUpdateInput!): StoreCredit!
        deleteSingleStoreCredit(id: ID!): DeletionResponse!
    }
`;
