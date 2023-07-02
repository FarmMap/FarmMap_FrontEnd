// External
import { ReactElement, useState } from "react";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";

// Styles
import classNames from "classnames/bind";
import styles from "./DefaultTitleLayOut.module.scss";
const cx = classNames.bind(styles);

interface DefaultManagerBodyProps {
  searchs?: {
    searchLabel: string;
    searchPlaceholder: string;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
  }[];
  onSearchSubmit?: (query: string) => void;
  filters?: ReactElement[];
}

const DefaultFilterLayOut: React.FC<DefaultManagerBodyProps> = (props) => {
  // const [query, setQuery] = useState("");

  return (
    <div className={cx("body")}>
      <div className={cx("function-list")}>
        {/* Search */}
        {props.searchs?.map((search, index) => (
          <div key={index} className={cx("search-wrapper")}>
            <label htmlFor="search">{search.searchLabel}</label>
            <Grid item xs={4} className={cx("search-input-wrapper")}>
              <input
                type="text"
                id="search"
                placeholder={search.searchPlaceholder}
                value={search.query}
                onChange={(event) => search.setQuery(event.currentTarget.value)}
              />
              <Button
                className={cx("search-btn")}
                variant="contained"
                color="success"
                disableElevation={true}
                onClick={() =>
                  props.onSearchSubmit !== undefined
                    ? props.onSearchSubmit(search.query)
                    : {}
                }
              >
                <SearchIcon />
              </Button>
            </Grid>
          </div>
        ))}

        {/* Status */}
        {props.filters?.map((element, index) => (
          <div key={index} className={cx("search-wrapper")}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefaultFilterLayOut;
