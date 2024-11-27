import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectTaskPage from "./page/SelectTaskPage/SelectTaskPage";
import SolutionPage from "./page/SchedulePage/SolutionPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SelectTaskPage />} />
                <Route path="/solution" element={<SolutionPage />} />
            </Routes>
        </Router>
    );
}

export default App;
