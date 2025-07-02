import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import BlogType from "../../types/Blog/BlogType";
import Meta from "../../types/Meta/Meta";

interface UseFetchBlogsProps {
  page?: number;
  shouldRefesh?: boolean;
  search?: string;
}

interface BlogTypeResponse {
  meta: Meta;
  data: BlogType[];
}

interface ResponseError {
  code: string;
  message: string;
}

const useFetchBlogs = (props: UseFetchBlogsProps) => {
  let [blogs, setBlogs] = useState<BlogType[]>([]);
  let [page, setPages] = useState(1);
  let [error, setError] = useState<string | null>(null);
  let [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);

    var config = {
      method: "GET",
      url: `http://118.69.126.49:3998/articles?order=ASC&page=${
        props.page
      }&take=10&search=${props.search ?? ""}&`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((response: AxiosResponse) => {
        let data: BlogTypeResponse = response.data;
        setBlogs(data.data);
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

  return { blogs, page, error, isLoading };
};

export default useFetchBlogs;
