import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

// Import các custom hook và types
import useFetchBlogById from "../../../data/api/Blog/useFetchBlogById";
import useFetchMyBlog from "../../../data/api/Blog/useFetchMyBlog"; // Hook bạn đã cung cấp

// Styles
import classNames from "classnames/bind";
import styles from "./NewsPageDetail.module.scss";
import DefaultWebLayOutPage from "../../components/defautWebLayOut/DefaultWebLayOutPage";

const cx = classNames.bind(styles);

const BlogDetailPage = () => {
  // 1. Lấy ID của bài viết hiện tại từ URL
  const { id } = useParams();
  const [currentBlogId, setCurrentBlogId] = useState();

  useEffect(() => {
    // Scroll lên đầu trang mỗi khi vào bài viết mới
    window.scrollTo(0, 0);
    if (id) {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        setCurrentBlogId(parsedId);
      }
    }
  }, [id]);

  // 2. Gọi hook để lấy dữ liệu chi tiết của bài viết hiện tại
  const {
    blogById,
    isLoading: isLoadingCurrent,
    error: errorCurrent,
  } = useFetchBlogById({
    blogId: id,
  });

  // 3. Gọi hook để lấy danh sách các bài viết khác cho sidebar
  // Lấy 5 bài viết mới nhất, có thể tùy chỉnh
  const { myBlogs: otherBlogs, isLoading: isLoadingOthers } = useFetchMyBlog({
    page: 1,
  });

  // Lọc ra bài viết hiện tại khỏi danh sách "Bài viết khác"
  const filteredOtherBlogs = otherBlogs.filter(
    (blog) => blog.id !== currentBlogId
  );

  if (isLoadingCurrent) {
    return <div>Đang tải...</div>;
  }

  if (errorCurrent) {
    return <div>Lỗi: {errorCurrent}</div>;
  }

  return (
    <DefaultWebLayOutPage>
      <section className={cx("wrapper")}>
        <div className={cx("container")}>
          <Grid container spacing={2} display={"flex"}>
            {/* CỘT TRÁI: NỘI DUNG BÀI VIẾT */}
            <Grid item style={{ width: "70%" }} xs={12} md={8}>
              <div className={cx("main-content")}>
                <h1 className={cx("article-title")}>{blogById.title}</h1>
                <div className={cx("table-of-contents")}>
                  <div className={cx("toc-header")}>
                    <FontAwesomeIcon icon={faList} />
                    <span>MỤC LỤC</span>
                  </div>
                  {/* Phần thân mục lục có thể thêm sau */}
                </div>
                <div
                  className={cx("article-body")}
                  dangerouslySetInnerHTML={{ __html: blogById.content ?? "" }}
                />
              </div>
            </Grid>

            {/* CỘT PHẢI: BÀI VIẾT KHÁC */}
            <Grid overflow={"hidden"} width={"20%"} item lg={4} xs={12} md={4}>
              <aside className={cx("sidebar")}>
                <h3 className={cx("sidebar-title")}>BÀI VIẾT KHÁC</h3>
                <div className={cx("related-post-list")}>
                  {isLoadingOthers ? (
                    <p>Đang tải...</p>
                  ) : (
                    filteredOtherBlogs.map((blog) => (
                      <NavLink
                        key={blog.id}
                        to={`/tin-tuc/${blog.id}`}
                        className={cx("related-post-item")}
                      >
                        <div className={cx("post-image")}>
                          <img
                            src={
                              blog.image
                                ? `http://118.69.126.49:3998/${blog.image}`
                                : "https://placehold.co/150x100"
                            }
                            alt={blog.title}
                          />
                        </div>
                        <div className={cx("post-info")}>
                          <h4 className={cx("post-title")}>{blog.title}</h4>
                          <p className={cx("post-description")}>
                            {blog.description}
                          </p>
                        </div>
                      </NavLink>
                    ))
                  )}
                </div>
              </aside>
            </Grid>
          </Grid>
        </div>
      </section>
    </DefaultWebLayOutPage>
  );
};

export default BlogDetailPage;
