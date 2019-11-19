import { NextPageContext } from 'next';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

export interface MyContext extends NextPageContext {
    apolloClient: ApolloClient<NormalizedCacheObject>
}