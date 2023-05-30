// External files
import { Routes, Route } from "react-router-dom";

// Internal files
import LoginPage from "./presentations/pages/login";
import NotFound from "./presentations/components/notFound";
import HomePage from "./presentations/pages/home/HomePage";
import InforPage from "./presentations/pages/farm/infor/InforFarmPage";
//Style

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
        {/* Private Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/nong-trai/thong-tin" element={<InforPage />} />
      </Routes>
    </div>
  );
};

export default App;
