import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ApolloProvider } from '@apollo/client'
import client from './utils/appoloClient'
import Router from './routes'

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </Provider>
  )
}

export default App
