import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteUser } from "../../utilities/requestAPI";

interface Props {
  userId: string;
}

const DeleteUserButton: React.FC<Props> = (props) => {
  const { userId } = props;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: () => deleteUser(userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user-list"] }),
  });

  return (
    <>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#delete-user-modal"
      >
        <AiFillDelete /> Delete
      </button>
      <div
        className="modal fade"
        id="delete-user-modal"
        tabIndex={-1}
        aria-labelledby="delete-user-modal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="delete-user-modal">
                Delete User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete user?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => mutate()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUserButton;
