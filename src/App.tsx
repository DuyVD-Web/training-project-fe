import './App.css'
import {Router} from "./router.tsx";
import {BrowserRouter} from "react-router";


function App() {
    return (
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    )
}

export default App
