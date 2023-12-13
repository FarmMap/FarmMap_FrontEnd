
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Button } from "antd";
import DocumentDetail from "./DocumentDetail";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import data from "./data";
import classNames from "classnames/bind";
import styles from "./FarmDocument.module.scss";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

const FarmDocumentBox = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [document, setDocument] = useState({
    id: 0,
    title: "",
    content: "",
    image: "",
    eye: "",
    download: "",
  });
  return (
    <Grid className={cx("wrapper")}>
      <Grid className={cx("container")}>
        {data.map((document, i) => (
          <>
            {!showDetail && (
              <Grid
                onClick={() => {
                  setShowDetail(true);
                  setDocument({ ...document });
                }}
                className={cx("document")}
                item
                lg={2}
                key={i}
              >
                <img src={document.image} alt="ITFSD-Documents" />
                <h4>{document.title}</h4>
                <Grid className={cx("btn-details")}>
                  <Grid className={cx("details")}>
                    <p>
                      <RemoveRedEyeIcon /> {document.eye} lượt xem
                    </p>
                    <p>
                      <FileDownloadIcon />
                      {document.download} lượt tải
                    </p>
                  </Grid>
                  <Button className={cx("btn-download")}>Download</Button>
                </Grid>
              </Grid>
            )}
          </>
        ))}
        <Grid>
          {showDetail && (
            <DocumentDetail
              id={document.id}
              title={document.title}
              content={document.content}
              image={document.image}
              eye={document.eye}
              download={document.download}
              setShowDetail={setShowDetail}
            />
          )}
        </Grid>
      </Grid>
    </GridrmDocumentBox;

import React from 'react'
import { Grid } from '@mui/material';
import { Button } from "antd";
import images from "../../../assets/images";
import DocumentDetail from './DocumentDetail';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import data from "./data"
// Style imports
import classNames from "classnames/bind";
import styles from "./FarmDocument.module.scss";

const cx = classNames.bind(styles);
const FarmDocumentBox = () => {
    const navigate = useNavigate(); 

  const handleDocumentClick = (documentId  :number) => {
    navigate(`/tai-lieu/${documentId}`);
  };
  return (
    <Grid className ={cx("wapper")}>
        <Grid className={cx("container")}>
            {data.map((document, i) =>(
            <Grid className ={cx("document")} 
            item lg={2} 
            key={i} 
            onClick={() => handleDocumentClick(document.id)}
            >
                <img src ={document.image} alt="ITFSD-Documents" />
                <h4>{document.title}</h4>
                <Grid className={cx("btn-details")}>
                    <Grid className={cx("details")}>
                        <p><RemoveRedEyeIcon/> {document.eye} lượt xem</p>
                        <p><FileDownloadIcon/>{document.download} lượt tải</p>
                    </Grid>
                    <Button className = {cx("btn-download")}>Download</Button>
                </Grid>
            </Grid>
            ))}
        </Grid>
    </Grid>
  )
}

export default FarmDocumentBox

