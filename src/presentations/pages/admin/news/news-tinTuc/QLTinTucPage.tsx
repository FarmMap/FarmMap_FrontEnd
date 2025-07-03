import React, { useState, useEffect, useCallback } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Import các components và hooks cần thiết
import DefaultAdminLayOut from "../../../../components/defaultAdminLayOut";
import useFetchBlogs from "../../../../../data/api/Blog/useFetchBlogs"; // Hook lấy danh sách
import useDeleteBlog from "../../../../../data/api/Blog/useDeleteBlog"; // Hook xóa
import BlogType from "../../../../../data/types/Blog/BlogType";
const cx = classNames.bind(styles);

// --- Component con: ToggleSwitch (Giữ nguyên) ---
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (newCheckedState: boolean) => void;
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => (
  <label className={cx("toggle-switch")}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className={cx("slider")}></span>
  </label>
);

// --- Component con: BlogRow (Tách ra để quản lý logic xóa) ---
interface BlogRowProps {
  post: BlogType;
  isSelected: boolean;
  onSelect: (id: number, isSelected: boolean) => void;
  onDeleteSuccess: () => void; // Callback để báo cho cha biết cần refresh
}

const BlogRow: React.FC<BlogRowProps> = ({
  post,
  isSelected,
  onSelect,
  onDeleteSuccess,
}) => {
  // Mỗi dòng sẽ có hook xóa riêng, truyền vào blogId của dòng đó
  const {
    deleteblog,
    isDeleted,
    error: deleteError,
  } = useDeleteBlog({ blogId: post.id });

  const handleDelete = () => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa bài viết "${post.title}" không?`
      )
    ) {
      deleteblog();
    }
  };

  // Lắng nghe kết quả từ hook xóa
  useEffect(() => {
    if (isDeleted) {
      toast.success("Xóa bài viết thành công!");
      onDeleteSuccess(); // Gọi callback để refresh danh sách
    }
    if (deleteError) {
      toast.error(`Lỗi khi xóa: ${deleteError}`);
    }
  }, [isDeleted, deleteError, onDeleteSuccess]);

  function handleToggleChange(
    id: number | undefined,
    arg1: string,
    value: boolean
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={cx("list-row")}>
      <div className={cx("cell", "cell-check")}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(post.id!, e.target.checked)}
        />
      </div>
      <div className={cx("cell", "cell-stt")}>
        <input
          type="text"
          defaultValue={post.id || ""}
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
        <img
          src={
            post.image
              ? `http://118.69.126.49:3998/${post.image}`
              : "https://placehold.co/100x60"
          }
          alt={post.title}
        />
      </div>
      <div className={cx("cell", "cell-featured")}>
        <ToggleSwitch
          checked={!!post.isFeatured}
          onChange={(value) => handleToggleChange(post.id, "isFeatured", value)}
        />
      </div>
      <div className={cx("cell", "cell-visible")}>
        <ToggleSwitch
          checked={!!post.isVisible}
          onChange={(value) => handleToggleChange(post.id, "isVisible", value)}
        />
      </div>
      <div className={cx("cell", "cell-actions")}>
        <button className={cx("icon-btn")}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button className={cx("icon-btn", "danger")} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
};

// --- Component chính: QLTinTucPage ---
const QLTinTucPage: React.FC = () => {
  const [shouldRefesh, setShouldRefesh] = useState(false);
  const { blogs, isLoading, error } = useFetchBlogs({ shouldRefesh, page: 1 }); // Gọi hook để fetch dữ liệu
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = new Set(blogs.map((p) => p.id!));
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

  const isAllSelected = selectedIds.size === blogs.length && blogs.length > 0;

  const handleChangeAddPosts = () => {
    navigate("/admin/news/tin-tuc/them");
  };

  // Hàm callback để trigger việc fetch lại dữ liệu
  const handleRefresh = useCallback(() => {
    setShouldRefesh((prev) => !prev);
  }, []);

  return (
    <DefaultAdminLayOut>
      <div className={cx("wrapper")}>
        <div style={{ marginBottom: "10px" }}>Quản lý bài viết/ Tin tức</div>
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

        <div className={cx("list-container")}>
          <div className={cx("list-header")}>
            <div className={cx("cell", "cell-check")}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </div>
            <div className={cx("cell", "cell-stt")}>STT</div>
            <div className={cx("cell", "cell-title")}>TIÊU ĐỀ</div>
            <div className={cx("cell", "cell-image")}>HÌNH ẢNH</div>
            <div className={cx("cell", "cell-featured")}>NỔI BẬT</div>
            <div className={cx("cell", "cell-visible")}>HIỂN THỊ</div>
            <div className={cx("cell", "cell-actions")}>THAO TÁC</div>
          </div>

          <div className={cx("list-body")}>
            {isLoading && <p>Đang tải dữ liệu...</p>}
            {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
            {!isLoading &&
              !error &&
              blogs.map((post) => (
                <BlogRow
                  key={post.id}
                  post={post}
                  isSelected={selectedIds.has(post.id!)}
                  onSelect={handleSelectOne}
                  onDeleteSuccess={handleRefresh} // Truyền callback xuống
                />
              ))}
          </div>
        </div>
      </div>
    </DefaultAdminLayOut>
  );
};

export default QLTinTucPage;
