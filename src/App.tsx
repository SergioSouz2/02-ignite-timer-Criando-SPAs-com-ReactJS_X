import { ThemeProvider } from "styled-components";
import { BrowserRouter } from 'react-router-dom'

import { defaultTheme } from "./styles/theme/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./routes/Router";
import { CycleContextProvider } from "./context/CycleContext";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router/>
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle/>
    </ThemeProvider>
  )
}


