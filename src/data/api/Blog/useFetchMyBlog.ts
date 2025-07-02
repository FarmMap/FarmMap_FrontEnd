import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import BlogType from "../../types/Blog/BlogType";
import Meta from "../../types/Meta/Meta";

interface UseFetchMyBlogProps {
  page?: number;
  shouldRefesh?: boolean;
  search?: string;
  //   productCategoryId?: number;
}

interface BlogTypeResponse {
  meta: Meta;
  data: BlogType[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchMyBlog = (props: UseFetchMyBlogProps) => {
  let [myBlogs, setMyBlogs] = useState<BlogType[]>([]);
  let [page, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `http://118.69.126.49:3998/articles/me?search=${
        props.search ?? ""
      }&order=ASC&page=${props.page}&take=10`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: BlogTypeResponse = response.data;
        setMyBlogs(data.data);
        setPages(data.meta.pageCount ?? 0);
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
  }, [props.page, props.search, props.shouldRefesh]);

  return { myBlogs, page, error, isLoading };
};

export default useFetchMyBlog;
