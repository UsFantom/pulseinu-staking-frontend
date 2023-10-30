import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './pages/dashboard';
import Stake from './pages/stake';
import Burn from './pages/burn';

import './App.css';
import ReferClaim from './pages/referclaim';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      retryDelay: 1000,
      refetchOnMount: false
    }
  }
});

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  return library;
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <QueryClientProvider client={queryClient}>
        <React.Fragment>
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path={'/stake'} element={<Stake />} />
              <Route path={'/referrals/:referrer'} element={<Stake />} />
              <Route path="/burn" element={<Burn />} />
              <Route path="/referclaim" element={<ReferClaim />} />
            </Routes>
          </Router>
        </React.Fragment>
      </QueryClientProvider>
    </Web3ReactProvider>
  );
}

export default App;
