// External files
import { Routes, Route } from "react-router-dom";

// Internal files
import LoginPage from "./presentations/pages/login";
import NotFound from "./presentations/components/notFound";
import HomePage from "./presentations/pages/home/HomePage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
//Style

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Route */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
