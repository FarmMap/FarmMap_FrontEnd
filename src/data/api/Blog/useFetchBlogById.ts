import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import BlogType from "../../types/Blog/BlogType";

interface useFetchBlogByIdProps {
  page?: number;
  shouldRefesh?: boolean;
  blogId?: number;
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchBlogById = (props: useFetchBlogByIdProps) => {
  let [blogById, setBlogId] = useState<BlogType>();
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `http://118.69.126.49:3998/articles/article/${props.blogId}`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data = response.data;
        setBlogId(data);
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
  }, [props.blogId, props.page, props.shouldRefesh]);

  return { blogById, error, isLoading };
};

export default useFetchBlogById;
