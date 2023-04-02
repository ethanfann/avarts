import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  concat,
} from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createUploadLink } from 'apollo-upload-client'
import { offsetLimitPagination } from '@apollo/client/utilities'

const uri = process.env.REACT_APP_SERVER_URL

const uploadLink = createUploadLink({
  uri: uri,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : '',
    },
  }))
  return forward(operation)
})

export const client = new ApolloClient({
  link: concat(authMiddleware, uploadLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          myActivities: offsetLimitPagination(),
        },
      },
    },
  }),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
