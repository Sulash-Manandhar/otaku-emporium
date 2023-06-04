import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Props {
  redirectTo: string;
}

const EditButton: React.FC<Props> = (props) => {
  const { redirectTo } = props;
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={() => navigate(redirectTo)}
    >
      <AiFillEdit color="white" /> Edit
    </button>
  );
};

export default EditButton;
