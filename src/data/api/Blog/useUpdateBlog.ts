import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import BlogType from "../../types/Blog/BlogType";

interface UseUpdateBlogProps {
  blogId?: number;
}

// Dữ liệu gửi đi có thể là một phần của BlogType
type UpdatePayload = Partial<Omit<BlogType, "id">>;

interface ResponseError {
  code: string;
  message: string;
}

const useUpdateBlog = (props: UseUpdateBlogProps) => {
  const [isUpdated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  // Hàm updateBlog sẽ nhận dữ liệu cần cập nhật
  const updateBlog = useCallback(
    (data: UpdatePayload) => {
      setUpdated(false);
      setError(null);
      setLoading(true);

      let config = {
        method: "patch", // Hoặc "patch" tùy vào API của bạn
        url: `http://118.69.126.49:3998/articles/${props.blogId}`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
        data: data, // Gửi dữ liệu cần cập nhật trong body
      };

      axios(config)
        .then((response: AxiosResponse) => {
          setUpdated(true);
          setLoading(false);
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            let responseError: ResponseError = error.response
              .data as ResponseError;
            setError(responseError.message);
          } else {
            setError(error.message);
          }
          setLoading(false);
        });
    },
    [props.blogId]
  );

  return { isUpdated, error, isLoading, updateBlog };
};

export default useUpdateBlog;
