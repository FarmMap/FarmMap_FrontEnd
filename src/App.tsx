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
import PlantPage from "./presentations/pages/plant/PlantPage";
import TodoPage from "./presentations/pages/todo/TodoPage";
import MaterialPage from "./presentations/pages/material/MaterialPage";
import BillRequestPage from "./presentations/pages/billRequest/BillRequestPage";
import VisitorPage from "./presentations/pages/visitor/VisitorPage";
import IngredientPage from "./presentations/pages/ingredient/IngredientPage";
import SalePage from "./presentations/pages/sales/SalePage";
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
          <Route path="/nong-san/cay-trong" element={<PlantPage />} />
          <Route path="/nong-san/cong-viec-trong-ngay" element={<TodoPage />} />
          <Route
            path="/kho/danh-sach-yeu-cau-vat-tu"
            element={<MaterialPage />}
          />
          <Route path="/kho/nguyen-lieu" element={<IngredientPage />} />
          <Route path="/banhang/thong-ke" element={<SalePage />} />
          <Route
            path="/danh-sach-yeu-cau/yeu-cau"
            element={<BillRequestPage />}
          />
          <Route
            path="/danh-sach-yeu-cau/khach-tham-quan"
            element={<VisitorPage />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
