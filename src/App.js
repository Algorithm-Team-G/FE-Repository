import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectTaskPage from "./page/SelectTaskPage/SelectTaskPage";
import SolutionPage from "./page/SchedulePage/SolutionPage";
import TeamSchedulePage from "./page/TeamSchedulePage/TeamSchedulePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TeamSchedulePage/>}/>
                <Route path="/select" element={<SelectTaskPage />} />
                <Route path="/solution" element={<SolutionPage />} />
            </Routes>
        </Router>
    );
}

export default App;
