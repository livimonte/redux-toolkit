import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './app/store'

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import { ReactQueryZustand } from './pages/ReactQueryZustand'
import { Redux } from './pages/Redux'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <nav className="flex justify-center items-center gap-4 py-5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `rounded py-2 px-4 transition-colors bg-slate-500 text-white hover:bg-slate-400 ${
                    isActive && 'bg-slate-400'
                  }`
                }>
                Redux
              </NavLink>
              <NavLink
                to="/react-query-zustand"
                className={({ isActive }) =>
                  `rounded py-2 px-4 transition-colors bg-slate-500 text-white hover:bg-slate-400 ${
                    isActive && 'bg-slate-400'
                  }`
                }>
                React Query + Zustand
              </NavLink>
            </nav>
            <Routes>
              <Route path="/" element={<Redux />} />
              <Route path="/react-query-zustand" element={<ReactQueryZustand />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}
