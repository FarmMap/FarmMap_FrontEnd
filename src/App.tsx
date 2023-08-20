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
import FarmCalendarPage from "./presentations/pages/farmCalendar/FarmCalendarPage";
import IotPage from "./presentations/pages/iot/IotPage";
import ExpensePage from "./presentations/pages/Expense/ExpensePage";
import ProvidorPage from "./presentations/pages/providor/ProvidorPage";
//Style

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Route */}
        <Route element={<RedirectRoute path="/" />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* Private Route */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/nong-nghiep/trang-trai" element={<CompanyPage />} />
          <Route path="/nong-nghiep/khu-canh-tac" element={<InforPage />} />
          <Route path="/nong-nghiep/vung-canh-tac" element={<AreaPage />} />
          <Route
            path="/nong-trai/lich-canh-tac"
            element={<FarmCalendarPage />}
          />
          <Route path="/thiet-bi-iot" element={<IotPage />} />
          <Route path="/danh-sach-yeu-cau/thu-chi" element={<ExpensePage />} />
          <Route path="/lien-he" element={<ProvidorPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
