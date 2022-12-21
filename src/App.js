import { createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./context/UserContext";
import Home from "./view/Home";

function App() {
  return (
    <ThemeProvider theme={createTheme({})}>
      <CssBaseline />
      <AppProvider>
        <Home />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
