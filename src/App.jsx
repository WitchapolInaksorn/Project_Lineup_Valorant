import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/publicRoute";
import Maps from "./pages/map";
import Agents from "./pages/agent";
import Lineup from "./pages/lineup";
import LineupDetail from "./pages/lineupDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/maps"
          element={
            <ProtectedRoute>
              <Maps />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agents/:mapName"
          element={
            <ProtectedRoute>
              <Agents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lineup/create/:mapName/:agentName"
          element={
            <ProtectedRoute>
              <Lineup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lineup/:mapName/:agentName"
          element={
            <ProtectedRoute>
              <Lineup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lineup/detail/:id"
          element={
            <ProtectedRoute>
              <LineupDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
