// External files
import { Routes, Route } from "react-router-dom";

// Internal files
import LoginPage from "./presentations/pages/login";
import NotFound from "./presentations/components/notFound";
import AdminPage from "./presentations/pages/admin/AdminPage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import HomePage from "./presentations/pages/home/HomePage";
import QLTinTucPage from "./presentations/pages/admin/news/news-tinTuc/QLTinTucPage";
import QLThemTinTuc from "./presentations/pages/admin/news/news-tinTuc/QLThemTinTuc/QLThemTinTuc";
import NewsPage from "./presentations/pages/news/NewsPage";
import NewsPageDetail from "./presentations/pages/news/NewsPageDetail";
//Style

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/tin-tuc/:id" element={<NewsPageDetail />} />
        <Route element={<PublicRoute />}>
          <Route path="/admin/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPage />} />
          {/* Quan ly bai viet - tin tuc */}
          <Route path="/admin/news/tin-tuc" element={<QLTinTucPage />} />
          <Route path="/admin/news/tin-tuc/them" element={<QLThemTinTuc />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
