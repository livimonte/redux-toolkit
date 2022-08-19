import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from './app/store';
import { ReactQueryZustand } from './pages/ReactQueryZustand';
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
              to='/react-query-zustand'
              className={({ isActive }) =>
                `border border-blue-500 text-white p-2 rounded ${
                  isActive && 'bg-blue-500 hover:filter hover:brightness-75'
                } hover:bg-blue-500 transition-all duration-200`
              }
            >
              React Query + Zustand
            </NavLink>
          </nav>
          <Routes>
            <Route path='/redux' element={<Redux />} />
            <Route path='/react-query-zustand' element={<ReactQueryZustand />} />
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}
