import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import DashboardPage from "./pages/dashboard";
import CoinPage from "./pages/coin";
import ComparePage from "./pages/compare";
import WatchListPage from "./pages/watchlist";
import AnimCursor from "./components/AnimCursor";

function App() {
  return (
    <div>
    <AnimCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/watchlist" element={<WatchListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
