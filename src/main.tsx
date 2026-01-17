import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { Home } from './screens/home'
import { Layout } from './components/Layout'

 import './index.css'

createRoot(document.getElementById('root')!).render( // ! non-null assertion
  <StrictMode>
    <BrowserRouter>
    <Routes >
      <Route
        element={<Layout />}
      >
        <Route 
          path="/"
          element={<Home />}
        />
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
