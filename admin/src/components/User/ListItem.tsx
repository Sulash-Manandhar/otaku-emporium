import { UserDetailSchema } from "../../schema/UserSchema";
import { useNavigate } from "react-router-dom";
import { TableActionContainer } from "../../styled-components/common";
import BanUserButton from "./BanUserButton";
import DeleteUserButton from "./DeleteUserButton";
import ViewButton from "../Buttons/ViewButton";
import EditButton from "../Buttons/EditButton";

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
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="verified"
            value={1}
          />
        </div>
      </td>
      <td>
        <span className="badge bg-light text-dark text-capitalize text-wrap me-2">
          {user.ban ? "Banned" : "Not Banned"}
        </span>
      </td>
      <TableActionContainer>
        <ViewButton redirectTo={`/user/${user._id}`} />
        <EditButton redirectTo={`/user/edit/${user._id}`} />
        <BanUserButton userId={user._id} ban={user.ban} />
        <DeleteUserButton userId={user._id} />
      </TableActionContainer>
    </tr>
  );
};

export default ListItem;
