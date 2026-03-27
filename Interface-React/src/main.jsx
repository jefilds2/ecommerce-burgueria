import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyles from './styles/globalStyles';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';
import AppProvider from './hooks';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './config/stripeConfig';
import { standardTheme } from './styles/themes/standard';
import { ThemeProvider } from 'styled-components';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromise}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Elements>
        <GlobalStyles />
        <ToastContainer theme='colored' position='bottom-left' />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
);
