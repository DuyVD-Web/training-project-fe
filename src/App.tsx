import "@/App.css";
import { Router } from "@/router";
import { BrowserRouter } from "react-router";
import AppProvider from "./layouts/AppProvider";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
