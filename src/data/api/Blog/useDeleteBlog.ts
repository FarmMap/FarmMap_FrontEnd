import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";


interface UseDeleteBlogProps {
  blogId?: number;
}

interface ResponseError {
  code: string;
  message: string;
}

const useDeleteBlog = (props:UseDeleteBlogProps) => {
  const [isDeleted, setDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const deleteblog = useCallback(() => {
    setDeleted(false);
    setError(null);
    setLoading(true);

    let config = {
      method: "delete",
      url: `${
        process.env.REACT_APP_API_BASE_URL
      }articles/${props.blogId}`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        setDeleted(true);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          let responseError: ResponseError = error.response
            .data as ResponseError;

          setError(responseError.message);
        } else {
          let requestError = error.request;

          setError(requestError);
        }

        setLoading(false);
      });
  }, [props.blogId]);

  return { isDeleted, error, isLoading, deleteblog };
};

export default useDeleteBlog;
