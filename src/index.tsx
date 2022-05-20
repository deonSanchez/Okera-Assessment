import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Characters from 'pages/Characters';
import CharacterDetails from 'pages/CharacterDetails';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/character" replace />} />
            <Route path="/character">
              <Route index element={<Characters />} />
              <Route path=":page" element={<Characters />} />
              <Route path=":page/details" element={<CharacterDetails />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
