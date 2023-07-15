import { Badge, Switch, Td, Tr, useToast } from "@chakra-ui/react";
import { deleteUser } from "@src/api";
import { AddressInterfce, UserDetailSchema } from "@src/schema/userSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ListActionButton from "../utils/ListActionButton";

interface Props {
  sn: number;
  user: UserDetailSchema;
}

const genderColor = {
  male: "blue",
  female: "orange",
  other: "yellow",
};

const formatAddress = (obj: AddressInterfce) => {
  const { country, city, street_name, street_number } = obj;
  return `${street_number} ${street_name},${city},(${country})`;
};

const UserListItem: React.FC<Props> = (props) => {
  const { sn, user } = props;

  const toast = useToast();
  const queryClient = useQueryClient();

  const deleteMutate = useMutation({
    mutationFn: () => deleteUser(user._id),
    onSuccess: () => {
      toast({
        status: "success",
        title: "User has been successfully delete",
      });
      queryClient.invalidateQueries({
        queryKey: ["user-list"],
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: "Something went wrong",
      });
    },
  });

  return (
    <Tr>
      <Td>{sn}</Td>
      <Td textTransform="capitalize">{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>
        <Badge colorScheme={genderColor[user.gender]} variant="solid">
          {user.gender}
        </Badge>
      </Td>
      <Td>{user.contact}</Td>
      <Td>{formatAddress(user.address)}</Td>
      <Td>
        <Switch size="sm" isChecked={user.verification} colorScheme="green" />
      </Td>
      <Td>
        <Switch size="sm" isChecked={user.ban} colorScheme="green" />
      </Td>
      <Td>
        <ListActionButton
          viewPath={`/user/${user._id}`}
          editPath={`/user/edit/${user._id}`}
          deleteMutation={deleteMutate}
        />
      </Td>
    </Tr>
  );
};

export default UserListItem;
