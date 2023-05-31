import { useQuery } from "@tanstack/react-query";
import ListItem from "../../../components/User/ListItem";
import { PageHeader } from "../../../styled-components/common";
import { getUserList } from "../../../utilities/requestAPI";
import { UserListSchema } from "../../../schema/UserSchema";

const UserList = () => {
  const { data } = useQuery<UserListSchema>({
    queryKey: ["user-list"],
    queryFn: () => getUserList(),
  });

  return (
    <div>
      <PageHeader>User</PageHeader>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">SN</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Address</th>
            <th scope="col">Gender</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user, index) => (
            <ListItem key={user._id} index={index + 1} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;