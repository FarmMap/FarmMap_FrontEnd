// External files
import { Routes, Route } from "react-router-dom";

// Internal files
import LoginPage from "./presentations/pages/login";
import NotFound from "./presentations/components/notFound";
import HomePage from "./presentations/pages/home/HomePage";
import InforPage from "./presentations/pages/farm/infor/InforFarmPage";
import PrivateRoute from "./routes/PrivateRoute";
import RedirectRoute from "./routes/RedirectRoute";
import AreaPage from "./presentations/pages/farm/area/AreaPage";
import CompanyPage from "./presentations/pages/company/CompanyPage";
//Style

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Route */}
        <Route element={<RedirectRoute path="/" />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Private Route */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/nong-nghiep/trang-trai" element={<CompanyPage />} />
          <Route path="/nong-nghiep/khu-canh-tac" element={<InforPage />} />
          <Route path="/nong-trai/vung-canh-tac" element={<AreaPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
