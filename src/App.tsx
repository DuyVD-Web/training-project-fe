import './App.css'
import {Router} from "./router.tsx";
import {BrowserRouter} from "react-router";
import {AppProvider} from "./layouts/AppProvider.tsx";


function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </AppProvider>
    )
}

export default App
