import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./QLTinTucPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faCopy,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import DefaultAdminLayOut from "../../../../components/defaultAdminLayOut";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

// --- Định nghĩa Types ---

// 1. Định nghĩa cấu trúc cho một bài viết
interface Post {
  id: number;
  order: string;
  title: string;
  imageUrl: string;
  isFeatured: boolean;
  isVisible: boolean;
}

// 2. Định nghĩa props cho component ToggleSwitch
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (newCheckedState: boolean) => void;
}

// --- Dữ liệu mẫu ---
const initialPosts: Post[] = [
  {
    id: 1,
    order: "1",
    title:
      "Bốc Xếp Khu Vực Long Khánh – Khang Thịnh Logistic Giải Pháp Chuyên Nghiệp Cho KCN",
    imageUrl: "https://placehold.co/100x60/a3b18a/white",
    isFeatured: true,
    isVisible: true,
  },
  {
    id: 2,
    order: "1",
    title:
      "Công Ty Bốc Xếp Tại Long Khánh – Quy Trình Bốc Xếp Hàng Hóa Chuyên Nghiệp",
    imageUrl: "https://placehold.co/100x60/dad7cd/white",
    isFeatured: true,
    isVisible: true,
  },
  {
    id: 3,
    order: "1",
    title: "Bốc Xếp Khu Công Nghiệp Long Khánh Lợi Ích Khi Thuê Dịch Vụ",
    imageUrl: "https://placehold.co/100x60/588157/white",
    isFeatured: false,
    isVisible: true,
  },
];

// --- Component con ---
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <label className={cx("toggle-switch")}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={cx("slider")}></span>
    </label>
  );
};

// --- Component chính ---
const QLTinTucPage: React.FC = () => {
  // 3. Gán type cho state
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // 4. Gán type cho các tham số của hàm
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = new Set(posts.map((p) => p.id));
      setSelectedIds(allIds);
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: number, isSelected: boolean) => {
    const newSelectedIds = new Set(selectedIds);
    if (isSelected) {
      newSelectedIds.add(id);
    } else {
      newSelectedIds.delete(id);
    }
    setSelectedIds(newSelectedIds);
  };

  // Hàm xử lý khi toggle thay đổi
  const handleToggleChange = (
    id: number,
    field: "isFeatured" | "isVisible",
    value: boolean
  ) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === id ? { ...post, [field]: value } : post
      )
    );
  };

  const isAllSelected = selectedIds.size === posts.length && posts.length > 0;

  const navigate = useNavigate();
  const handleChangeAddPosts = () => {
    navigate("/admin/news/tin-tuc/them");
  };

  return (
    <DefaultAdminLayOut>
      <div className={cx("wrapper")}>
        <div style={{ marginBottom: "10px" }}>Quản lý bài viết/ Tin tức</div>
        {/* Các nút hành động chính */}
        <div className={cx("main-actions")}>
          <button
            onClick={handleChangeAddPosts}
            className={cx("btn", "btn-primary")}
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm bài viết
          </button>
          <button
            className={cx("btn", "btn-danger")}
            disabled={selectedIds.size === 0}
          >
            <FontAwesomeIcon icon={faTrashCan} /> Xóa tất cả ({selectedIds.size}
            )
          </button>
        </div>

        {/* Bảng danh sách */}
        <div className={cx("list-container")}>
          {/* Header của bảng */}
          <div className={cx("list-header")}>
            <div className={cx("cell", "cell-check")}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </div>
            {/* ... các header cell khác ... */}
            <div className={cx("cell", "cell-stt")}>STT</div>
            <div className={cx("cell", "cell-title")}>TIÊU ĐỀ</div>
            <div className={cx("cell", "cell-image")}>HÌNH ẢNH</div>
            <div className={cx("cell", "cell-featured")}>NỔI BẬT</div>
            <div className={cx("cell", "cell-visible")}>HIỂN THỊ</div>
            <div className={cx("cell", "cell-actions")}>THAO TÁC</div>
          </div>

          {/* Thân bảng */}
          <div className={cx("list-body")}>
            {posts.map((post) => (
              <div key={post.id} className={cx("list-row")}>
                <div className={cx("cell", "cell-check")}>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(post.id)}
                    onChange={(e) => handleSelectOne(post.id, e.target.checked)}
                  />
                </div>
                <div className={cx("cell", "cell-stt")}>
                  <input
                    type="text"
                    defaultValue={post.order}
                    className={cx("stt-input")}
                  />
                </div>
                <div className={cx("cell", "cell-title")}>
                  <p className={cx("post-title")}>{post.title}</p>
                  <div className={cx("post-actions")}>
                    <a href="#">
                      <FontAwesomeIcon icon={faEye} /> View
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </a>
                    <a href="#">
                      <FontAwesomeIcon icon={faCopy} /> Copy
                    </a>
                  </div>
                </div>
                <div className={cx("cell", "cell-image")}>
                  <img src={post.imageUrl} alt={post.title} />
                </div>
                <div className={cx("cell", "cell-featured")}>
                  <ToggleSwitch
                    checked={post.isFeatured}
                    onChange={(value) =>
                      handleToggleChange(post.id, "isFeatured", value)
                    }
                  />
                </div>
                <div className={cx("cell", "cell-visible")}>
                  <ToggleSwitch
                    checked={post.isVisible}
                    onChange={(value) =>
                      handleToggleChange(post.id, "isVisible", value)
                    }
                  />
                </div>
                <div className={cx("cell", "cell-actions")}>
                  <button className={cx("icon-btn")}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button className={cx("icon-btn", "danger")}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultAdminLayOut>
  );
};

export default QLTinTucPage;
