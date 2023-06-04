import React from "react";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Props {
  redirectTo: string;
}

const ViewButton: React.FC<Props> = (props) => {
  const { redirectTo } = props;
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-success btn-sm"
      onClick={() => navigate(redirectTo)}
    >
      <AiFillEye /> View
    </button>
  );
};

export default ViewButton;
