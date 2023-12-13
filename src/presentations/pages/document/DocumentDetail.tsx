
import React from "react";

interface DocumentDetailProps {
  id?: number;
  title?: string;
  content?: string;
  image?: string;
  eye?: string; // Add eye and download properties if not present in your data structure
  download?: string;
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentDetail = (props: DocumentDetailProps) => {
  return (
    <div>
      {props.id}
      <button onClick={() => props.setShowDetail(false)}>quay ve</button>
    </div>

    // get props.field ra

// DocumentDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import data from "./data"
import { Grid } from '@mui/material';
import { Button } from "antd";
import DefaultWebLayOut from '../../components/defaultWebLayOut';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
// Style imports
import classNames from "classnames/bind";
import styles from "./FarmDocument.module.scss";

const cx = classNames.bind(styles);

interface Document {
  id: number;
  title: string;
  content: string;
  image : string;
  
}

const DocumentDetail: React.FC = () => {
  const { id } = useParams();
  const documentId = id ? parseInt(id, 10) : 0; // Provide a default value, such as 0

  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    // Simulate fetching data from data.ts
    const fetchData = async () => {
      try {
        // Tìm document có id trùng với documentId
        const selectedDocument = data.find((doc) => doc.id === documentId);

        if (selectedDocument) {
          setDocument(selectedDocument);
        } else {
          console.error('Document not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [documentId]);

  if (!document) {
    return <p>Loading...</p>;
  }
  return (
    <DefaultWebLayOut>
        <Grid>
          <h2>{document.title}</h2>
          <p>{document.content}</p>
          <img src={document.image} alt={`Image for ${document.title}`} />
          <Grid className={cx("btn-details")}>
                <Grid className={cx("details")}>
                  <p><RemoveRedEyeIcon/> lượt xem</p>
                  <p><FileDownloadIcon/> lượt tải</p>
                </Grid>
                <Button className = {cx("btn-download")}>Download</Button>
          </Grid>     
        </Grid>
    </DefaultWebLayOut>

  );
};

export default DocumentDetail;
