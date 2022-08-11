import { Provider } from 'react-redux'
import { store } from './app/store'
import { Home } from './home'

export function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}
