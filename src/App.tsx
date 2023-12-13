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
import FarmCalendarChartPage from "./presentations/pages/farmCalendarChart/FarmCalendarChartPage";
import ArgiProductPage from "./presentations/pages/argiProduct/ArgiProductPage";
import SupportPage from "./presentations/pages/support/SupportPage";
import ProfilePage from "./presentations/pages/proFile/ProfilePage";
import SchedulePage from "./presentations/pages/careSchedule/SchedulePage";
import FarmDiseasesPage from "./presentations/pages/farmDiseases/FarmDiseasesPage";
import HouseGoodsPage from "./presentations/pages/goods/HouseGoodsPage";
import ProductDeliveryPage from "./presentations/pages/productdelivery/ProductDeliveryPage";
import FarmHarvestPage from "./presentations/pages/harvest/FarmHarvestPage";
import FarmDocumentPage from "./presentations/pages/document/FarmDocumentPage";
import DocumentDetail from "./presentations/pages/document/DocumentDetail";

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
          <Route path="/nong-trai/lich-benh" element={<FarmDiseasesPage />} />
          <Route path="/nong-trai/lich-cham-soc" element={<SchedulePage />} />
          <Route
            path="/lich-canh-tac/thong-ke"
            element={<FarmCalendarChartPage />}
          />
          <Route path="/thiet-bi-iot" element={<IotPage />} />
          <Route path="/danh-sach-yeu-cau/thu-chi" element={<ExpensePage />} />

          <Route path="/nong-san/cay-trong" element={<PlantPage />} />
          <Route
            path="/nong-san/san-pham-nong-san"
            element={<ArgiProductPage />}
          />
          <Route path="/cong-viec" element={<TodoPage />} />

          <Route path="/kho/quan-ly-vat-tu" element={<MaterialPage />} />
          <Route path="/kho/nguyen-lieu" element={<IngredientPage />} />
          <Route path="/kho/xuat-kho" element={<ProductDeliveryPage />} />
          <Route path="/kho/thu-hoach" element={<FarmHarvestPage />} />
          <Route path="/kho/hang-hoa" element={<HouseGoodsPage />} />
          <Route path="/banhang/thong-ke" element={<SalePage />} />

          <Route
            path="/danh-sach-yeu-cau/yeu-cau"
            element={<BillRequestPage />}
          />
          <Route path="/so-tay" element={<ProvidorPage />} />
          <Route path="/tu-van" element={<SupportPage />} />
          <Route path="/tai-lieu" element={<FarmDocumentPage />} />

          <Route
            path="/danh-sach-yeu-cau/khach-tham-quan"
            element={<VisitorPage />}
          />
          <Route path="/trang-ca-nhan" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
