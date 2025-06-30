// External files
import { Routes, Route } from "react-router-dom";

// Internal files
import LoginPage from "./presentations/pages/login";
import NotFound from "./presentations/components/notFound";
import AdminPage from "./presentations/pages/admin/AdminPage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import HomePage from "./presentations/pages/home/HomePage";
//Style

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        <Route element={<PublicRoute />}>
          <Route path="/admin/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
