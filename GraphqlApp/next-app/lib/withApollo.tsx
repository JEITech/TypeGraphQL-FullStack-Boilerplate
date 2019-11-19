import React from 'react'
import PropTypes from 'prop-types'
import cookie from 'cookie'
import Head from 'next/head'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import redirect from './redirect'
import { onError } from "apollo-link-error";
import Router from 'next/router'

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent: any, { ssr = true } = {}) {
  //@ts-ignore
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState, { getToken })
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`

    WithApollo.propTypes = {
      apolloClient: PropTypes.object,
      apolloState: PropTypes.object,
    }
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const { AppTree } = ctx

      const apolloClient = (ctx.apolloClient = initApolloClient(
        {},
        {
          getToken: () => getToken(ctx.req),
        }
      ))

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {}

      if (typeof window === 'undefined') {

        if (ctx.res && ctx.res.finished) {
          return {}
        }

        if (ssr) {
          try {
            const { getDataFromTree } = await import('@apollo/react-ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            )
          } catch (error) {
            console.error('Error while running `getDataFromTree`', error)
            if (error.message.includes('not authenticated')) {
              redirect(ctx, '/login');
            }
          }
        }


        Head.rewind()
      }

      const apolloState = apolloClient.cache.extract()

      return {
        ...pageProps,
        apolloState,
      }
    }
  }

  return WithApollo
}

let apolloClient: any = null

function initApolloClient(...args: Array<any>) {
  if (typeof window === 'undefined') {
    //@ts-ignore
    return createApolloClient(...args)
  }
  if (!apolloClient) {
    //@ts-ignore
    apolloClient = createApolloClient(...args)
  }
  return apolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */
//@ts-ignore
function createApolloClient(initialState = {}, { getToken }) {
  const fetchOptions = {}

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message }) => {
        if(typeof window !== 'undefined' && message.includes('not authenticated')) {
          Router.replace('/login');
        }
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    fetch,
    fetchOptions,
  })

  //@ts-ignore
  const authLink = setContext((request, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        cookie: token ? `qid=${token}` : '',
      },
    }
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache().restore(initialState),
  })
}

/**
 * Get the user token from cookie
 * @param {Object} req
 */
function getToken(req: any): any {
  const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie)
  return cookies.token
}