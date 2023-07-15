import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { getUserList } from "@src/api";
import UserListItem from "@src/components/user/UserListItem";
import { TableSkeleton } from "@src/components/utils/Skeleton";
import { ListWrapper } from "@src/schema/common";
import { UserListSchema } from "@src/schema/userSchema";
import { wrapperStyle } from "@src/style/common";
import { useQuery } from "@tanstack/react-query";
import { BiChevronRight } from "react-icons/bi";
import { NavLink } from "react-router-dom";
const UserList = () => {
  const { data, isLoading } = useQuery<ListWrapper<UserListSchema>>({
    queryKey: ["user-list"],
    queryFn: () => getUserList(),
  });

  return (
    <Flex flexDir="column" gap="5">
      <Breadcrumb spacing="8px" separator={<BiChevronRight color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={NavLink} to="/">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>UserList</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size={["sm", "lg"]}>User</Heading>
        <Button size="sm" colorScheme="facebook">
          Add User
        </Button>
      </Flex>

      <Grid
        sx={wrapperStyle}
        templateColumns={["repeat(1,1fr)", "repeat(5,1fr)"]}
        gap="4"
      >
        <GridItem>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Name" size="sm" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel size="sm">Contact</FormLabel>
            <Input placeholder="Contact name" size="sm" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel size="sm">Gender</FormLabel>
            <Select placeholder="Gender" size="sm">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel size="sm">Verification</FormLabel>
            <Select placeholder="Verification" size="sm">
              <option>Verified</option>
              <option>Not verified</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel size="sm">Ban</FormLabel>
            <Select placeholder="Ban" size="sm">
              <option>Ban</option>
              <option>Not Ban</option>
            </Select>
          </FormControl>
        </GridItem>
      </Grid>

      <TableContainer sx={wrapperStyle}>
        <Table variant="simple" size={["sm", "md"]}>
          <Thead>
            <Tr>
              <Th>SN</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th>Contact</Th>
              <Th>Address </Th>
              <Th>Verification</Th>
              <Th>Ban</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          {isLoading && <TableSkeleton rows={15} cols={9} />}
          <Tbody>
            {data?.data?.users?.map((item, i) => (
              <UserListItem key={item._id} sn={++i} user={item} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default UserList;
