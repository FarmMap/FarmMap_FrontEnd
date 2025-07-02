import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import BlogCategoryType from "../../types/Blog/BlogCategoryType";

interface ResponseError {
  code: string;
  message: string;
}

interface useFetchBlogCategoriesProps {
  shouldRefesh?: boolean;
}

const useFetchBlogCategories = (props: useFetchBlogCategoriesProps) => {
  let [blogCategories, setBlogCategories] = useState<BlogCategoryType[]>([]);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `http://118.69.126.49:3998/article-categories`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data = response.data;
        setBlogCategories(data);

        setLoading(false);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          let responseError: ResponseError = error.response
            .data as ResponseError;

          setError(responseError.message[0]);
        } else {
          let requestError = error.request;

          setError(requestError);
        }
        setLoading(false);
      });
  }, [props.shouldRefesh]);

  return { blogCategories, error, isLoading };
};

export default useFetchBlogCategories;
