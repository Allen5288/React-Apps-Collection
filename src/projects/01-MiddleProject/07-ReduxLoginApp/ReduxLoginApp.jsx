import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App'
import { AuthProvider } from './context/AuthContext'

const ReduxLoginApp = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  )
}

export default ReduxLoginApp