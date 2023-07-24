import { Badge, Switch, Td, Tr, useToast } from "@chakra-ui/react";
import { deleteUser, updateUser } from "@src/api";
import { AddressInterfce, UserDetailSchema } from "@src/schema/userSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ListActionButton from "@src/components/utils/ListActionButton";

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

  const updateMutate = useMutation({
    mutationFn: (data: Record<string, boolean>) => updateUser(user._id, data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["user-list"] });
      const previousUserList = queryClient.getQueryData(["user-list"]);

      queryClient.setQueryData(["user-list"], (prev: any) => {
        const updatedUserData = prev?.data?.users?.map(
          (item: UserDetailSchema) =>
            user._id === user._id ? { ...item, ...data } : item
        );

        return {
          ...prev,
          data: {
            ...prev.data,
            user: updatedUserData,
          },
        };
      });

      return previousUserList;
    },
    onSuccess: () => {
      toast({ status: "success", title: "Successfully updated status" });
    },
    onError: (_err, _updatedData, context: any) => {
      toast({
        status: "error",
        title: "Something went wrong",
      });
      queryClient.setQueryData(["user-list"], context.previousUserList);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-list"] });
    },
  });

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    const data = {
      [name]: checked,
    };
    updateMutate.mutate(data);
  };

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
        <Switch
          size="sm"
          name="verification"
          colorScheme="green"
          isChecked={user.verification}
          onChange={handleSwitchChange}
          isDisabled={updateMutate.isLoading}
        />
      </Td>
      <Td>
        <Switch
          size="sm"
          colorScheme="green"
          name="ban"
          isChecked={user.ban}
          onChange={handleSwitchChange}
          isDisabled={updateMutate.isLoading}
        />
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
