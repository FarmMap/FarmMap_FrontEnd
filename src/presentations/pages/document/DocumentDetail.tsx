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
  );
};

export default DocumentDetail;
