import { Badge, Switch, Td, Tr } from "@chakra-ui/react";
import { AddressInterfce, UserDetailSchema } from "@src/schema/userSchema";

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
      <Td>action</Td>
    </Tr>
  );
};

export default UserListItem;
