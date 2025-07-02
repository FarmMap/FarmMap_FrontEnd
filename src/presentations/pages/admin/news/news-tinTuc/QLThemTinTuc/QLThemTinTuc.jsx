import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Grid } from "@mui/material";

import { Upload, Dropdown, Space } from "antd";
import { toast } from "react-toastify";
import { DownOutlined } from "@ant-design/icons";
import useCreateBlog from "../../../../../../data/api/Blog/useCreateBlog";
import useFetchBlogCategories from "../../../../../../data/api/BlogCategory/useFetchBlogCategories";
// Styles
import classNames from "classnames/bind";
import styles from "./QLThemTinTuc.module.scss";
import DefaultAdminLayOut from "../../../../../components/defaultAdminLayOut";
const cx = classNames.bind(styles);

const QLThemTinTuc = () => {
  const props = {
    action: "http://localhost:3000/",
    listType: "picture",
    beforeUpload(file) {
      setBlog({ ...blog, image: file });
      return false;
    },
  };
  const [blog, setBlog] = useState({});

  const { isCreated, error, createBlog } = useCreateBlog({});

  const [refresh, setRefresh] = useState(false);

  // menuprops
  const { blogCategories } = useFetchBlogCategories({});
  console.log(blogCategories);
  // dropdown danh mục bài viết
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const items = blogCategories.map((item) => ({
    label: item.name,
    key: item.id !== undefined ? item.id.toString() : "", // Convert to string if id is defined
  }));

  // You need a function to get the category name based on the ID
  const getCategoryNameById = (categoryId) => {
    // Logic to get category name based on the ID, replace this with your actual logic
    const category = blogCategories.find((item) => item.id === categoryId);
    return category?.name || "";
  };

  const handleMenuClick = (info) => {
    const categoryId = parseInt(info.key || "", 10); // Convert string to number
    if (!isNaN(categoryId)) {
      setBlog({ ...blog, articleCategories: categoryId });

      // Assuming you get the name from another source, modify this part accordingly
      const categoryName = getCategoryNameById(categoryId);
      setSelectedCategoryName(categoryName || ""); // Set the selected category name
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  // submit
  const handleSubmitBlog = () => {
    // Thêm hình ảnh vào object blog trước khi gửi đi
    createBlog({ blogs: blog });
  };

  useEffect(() => {
    if (isCreated) {
      toast.success("Thêm bài viết thành công");
      setBlog({});
      setRefresh((refresh) => !refresh);
    } else if (error) {
      toast.error(error);
    }
  }, [isCreated, error, setRefresh]);

  return (
    <DefaultAdminLayOut>
      <div className="App">
        <div className="container">
          <div className="row">
            <form className="update__forms">
              <div className="form-row">
                <div className="form-group col-md-12 editor">
                  <label htmlFor="title">Tiêu đề</label>
                  <Input
                    placeholder="Tiêu đề..."
                    style={{ margin: "0.2rem 0 1.2rem 0", borderRadius: "2px" }}
                    id="title"
                    value={blog.title || ""}
                    onChange={(e) => {
                      setBlog({ ...blog, title: e.target.value });
                    }}
                  />

                  <label htmlFor="description">Mô tả</label>
                  <Input
                    placeholder="Mô tả..."
                    style={{ margin: "0.2rem 0 1.2rem 0", borderRadius: "2px" }}
                    id="description"
                    value={blog.description || ""}
                    onChange={(e) => {
                      setBlog({ ...blog, description: e.target.value });
                    }}
                  />

                  <label htmlFor="description">Danh mục bài viết</label>
                  <br />
                  <Dropdown menu={menuProps}>
                    <Button className={cx("dropdown")}>
                      <Space className={cx("title-category")}>
                        {selectedCategoryName || "Chọn danh mục"}
                        <DownOutlined rev={undefined} />
                      </Space>
                    </Button>
                  </Dropdown>
                  <Grid mt={"8px"} display={"flex"} flexDirection={"column"}>
                    <label htmlFor="">Ảnh bìa</label>
                    <Upload {...props}>
                      <Button
                        style={{ margin: "0.6rem 0 0 0" }}
                        variant="outlined"
                        startIcon={<UploadOutlined />}
                      >
                        Upload
                      </Button>
                    </Upload>
                  </Grid>
                  <Grid mt={"1.2rem"}>
                    <label htmlFor="title">Nội dung</label>
                    <EditorToolbar toolbarId={"t1"} />
                    <ReactQuill
                      theme="snow"
                      value={blog.content || ""}
                      onChange={(value) => {
                        setBlog({ ...blog, content: value });
                      }}
                      placeholder={"Write something awesome..."}
                      modules={modules("t1")}
                      formats={formats}
                    />
                  </Grid>
                </div>
                <br />

                <br />
                <Grid textAlign={"right"}>
                  <Button
                    style={{ marginRight: "0.8rem" }}
                    variant="outlined"
                    type="submit"
                    onClick={() => ({})}
                  >
                    {" "}
                    Quay lại
                  </Button>
                  <Button
                    style={{ boxShadow: "none" }}
                    variant="contained"
                    onClick={handleSubmitBlog}
                    type="button"
                  >
                    {" "}
                    Hoàn tất
                  </Button>
                </Grid>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultAdminLayOut>
  );
};

export default QLThemTinTuc;
