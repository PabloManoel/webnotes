import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import SaveNote from "./components/SaveNote";
import ReadNote from "./components/ReadNote";
import ListNotes from "./components/ListNotes";

function App() {

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<ListNotes />}/>
                <Route path="/read" element={<Navigate to="/" />}/>
                <Route path="/save" element={<SaveNote />}/>
                <Route path="/read/:id" element={<ReadNote />}/>
            </Routes>
        </Router>
    )
}

function NavBar() {
    const location = useLocation();
    return (
        <nav>
            {location.pathname !== "/" && <Link to="/">Voltar para lista</Link>}
        </nav>
    );
}

export default App