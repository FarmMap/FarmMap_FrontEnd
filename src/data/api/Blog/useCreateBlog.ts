import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import BlogType from "../../types/Blog/BlogType";

interface ResponseError {
  code: string;
  message: string;
}

interface ParamsBlogType {
  blogs?: BlogType | undefined;
}

const useCreateBlog = () => {
  const [isCreated, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const createBlog = useCallback((params: ParamsBlogType) => {
    setCreated(false);
    setError(null);
    setLoading(true);
    const FormData = require("form-data");
    var data = new FormData();
    data.append("title", params.blogs?.title);
    data.append("content", params.blogs?.content);
    data.append("description", params.blogs?.description);
    data.append("articleCategories", params.blogs?.articleCategories);
    if (params.blogs?.image?.name !== undefined) {
      data.append("image", params.blogs?.image);
    } else {
      data.append("image", "");
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://118.69.126.49:3998/articles`,
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios(config)
      .then((response: AxiosResponse) => {
        setCreated(true);

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
  }, []);

  return { isCreated, setCreated, error, isLoading, createBlog };
};

export default useCreateBlog;
