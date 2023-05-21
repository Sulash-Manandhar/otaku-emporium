import { User } from "../../schema/UserSchema";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { TableActionContainer } from "../../styled-components/common";

interface Props {
  index: number;
  user: User;
}

const ListItem: React.FC<Props> = (props) => {
  const { user, index } = props;

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>9841476797</td>
      <td>
        <span className="badge bg-primary">Male</span>
      </td>
      <TableActionContainer>
        <AiOutlineEye className="view" />
        <AiOutlineEdit className="edit" />
        <AiOutlineDelete className="delete" />
      </TableActionContainer>
    </tr>
  );
};

export default ListItem;
