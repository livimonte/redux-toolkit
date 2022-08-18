import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from './app/store';
import { ReactQuery } from './pages/ReactQuery';
import { Redux } from './pages/Redux';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <nav className='flex justify-center items-center gap-4 py-5'>
            <NavLink
              to='/redux'
              className={({ isActive }) =>
                `border border-blue-500 text-white p-2 rounded ${
                  isActive && 'bg-blue-500 hover:filter hover:brightness-75'
                } hover:bg-blue-500 transition-all duration-200`
              }
            >
              Redux
            </NavLink>
            <NavLink
              to='/react-query'
              className={({ isActive }) =>
                `border border-blue-500 text-white p-2 rounded ${
                  isActive && 'bg-blue-500 hover:filter hover:brightness-75'
                } hover:bg-blue-500 transition-all duration-200`
              }
            >
              React Query
            </NavLink>
          </nav>
          <Routes>
            <Route path='/redux' element={<Redux />} />
            <Route path='/react-query' element={<ReactQuery />} />
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}
