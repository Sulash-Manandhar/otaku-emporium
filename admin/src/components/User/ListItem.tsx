import { UserDetailSchema } from "../../schema/UserSchema";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { TableActionContainer } from "../../styled-components/common";
import BanUserButton from "./BanUserButton";
import DeleteUserButton from "./DeleteUserButton";

interface Props {
  index: number;
  user: UserDetailSchema;
}

const ListItem: React.FC<Props> = (props) => {
  const { user, index } = props;
  const navigate = useNavigate();

  function formatAddress() {
    return `${user.address.city} (${user.address.state})`;
  }

  return (
    <tr>
      <th scope="row">{index}</th>
      <td className="fw-bold">{user.name}</td>
      <td>{user.email}</td>
      <td>{user.contact}</td>
      <td>{formatAddress()}</td>
      <td>
        <span className="badge bg-primary text-capitalize">{user.gender}</span>
      </td>
      <td>
        <span className="badge bg-light text-dark text-capitalize text-wrap me-2">
          {user.ban ? "Banned" : "Not Banned"}
        </span>
        <span className="badge bg-light text-dark text-capitalize text-wrap ">
          {user.verification ? "Verified" : "Not Verified"}
        </span>
      </td>
      <TableActionContainer>
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => navigate("/user/" + user._id)}
        >
          <AiFillEye /> View
        </button>
        <button type="button" className="btn btn-primary btn-sm">
          <AiFillEdit color="white" /> Edit
        </button>
        <BanUserButton userId={user._id} ban={user.ban} />
        <DeleteUserButton userId={user._id} />
      </TableActionContainer>
    </tr>
  );
};

export default ListItem;
