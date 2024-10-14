import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client instead of react-dom
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './App';
import "./index.css"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {  baseSepolia } from "wagmi/chains";
import { Wagmiconfig } from './components/coinbase/wagmi';
import { BrowserRouter as Router } from 'react-router-dom';

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "cfec78e4-8eb3-4efc-a177-8d0cbd6ef273",
  chains: [ baseSepolia],
  ssr: true,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WagmiProvider config={config}>
          <WagmiProvider config={Wagmiconfig}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                <Router>
                  <App />
                </Router>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </WagmiProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
