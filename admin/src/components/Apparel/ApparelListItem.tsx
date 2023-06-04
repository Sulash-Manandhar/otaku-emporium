import { ApparelDetailsSchema } from "../../schema/ApparelSchema";
import { TableActionContainer } from "../../styled-components/common";
import EditButton from "../Buttons/EditButton";
import ViewButton from "../Buttons/ViewButton";
import DeleteApparelButton from "./DeleteApparelButton";

interface Props {
  index: number;
  apparel: ApparelDetailsSchema;
}

const ApparelListItem: React.FC<Props> = (props) => {
  const { index, apparel } = props;
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td className="fw-bold">{apparel.name}</td>
      <td>{apparel.price}</td>
      <td className="text-capitalize">{apparel.color}</td>
      <td>{apparel.size.small}</td>
      <td>{apparel.size.medium}</td>
      <td>{apparel.size.large}</td>
      <td className="text-capitalize">{apparel.category}</td>
      <td>
        {apparel.status ? (
          <span className="badge bg-success text-capitalize text-wrap">
            Active
          </span>
        ) : (
          <span className="badge bg-danger text-capitalize text-wrap">
            Inactive
          </span>
        )}
      </td>
      <TableActionContainer>
        <ViewButton redirectTo={`/apparels/${apparel._id}`} />
        <EditButton redirectTo={`/apparels/edit/${apparel._id}`} />
        <DeleteApparelButton id={apparel._id} />
      </TableActionContainer>
    </tr>
  );
};

export default ApparelListItem;
