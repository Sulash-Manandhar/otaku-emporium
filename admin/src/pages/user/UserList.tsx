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
  Button,
} from "@chakra-ui/react";
import { getUserList } from "@src/api";
import UserFilterSearch from "@src/components/user/UserFilterSearch";
import UserListItem from "@src/components/user/UserListItem";
import ListPagination from "@src/components/utils/ListPagination";
import { TableSkeleton } from "@src/components/utils/Skeleton";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  USER_FILTER_PARAMS,
} from "@src/constant/filterConstant";
import { ListWrapper } from "@src/schema/common";
import { UserFilterParamsType } from "@src/schema/filterSchema";
import { UserListSchema } from "@src/schema/userSchema";
import { wrapperStyle } from "@src/style/common";
import convertSearchParamsToBoolean from "@src/utils/convertSearchParamsToBoolean";
import { removeEmptyKeys } from "@src/utils/removeEmptyKeys";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const UserList = () => {
  const [searchPrams, setSearchParams] = useSearchParams();

  const [filterParams, setFilterParams] = useState<UserFilterParamsType>({
    name: searchPrams.get("name") ?? "",
    contact: searchPrams.get("contact") ?? "",
    gender: searchPrams.get("gender") ?? "",
    verification: convertSearchParamsToBoolean(searchPrams.get("verification")),
    ban: convertSearchParamsToBoolean(searchPrams.get("ban")),
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
  });

  const { data, isLoading } = useQuery<ListWrapper<UserListSchema>>({
    queryKey: ["user-list", filterParams],
    queryFn: async () => {
      const queryData: Partial<UserFilterParamsType> = {
        limit: filterParams?.limit,
        page: filterParams?.page,
      };
      if (filterParams?.name) queryData.name = filterParams.name;
      if (filterParams?.contact) queryData.contact = filterParams.contact;
      if (filterParams?.ban) queryData.ban = filterParams.ban;
      if (filterParams?.gender) queryData.gender = filterParams.gender;
      if (filterParams?.verification)
        queryData.verification = filterParams.verification;
      return getUserList(queryData);
    },
  });

  const handleFilterReset = () => {
    setFilterParams(USER_FILTER_PARAMS);
  };

  useEffect(() => {
    const query: any = removeEmptyKeys(filterParams);
    if (query) setSearchParams(query);
  }, [filterParams]);

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

      <UserFilterSearch
        filterParams={filterParams}
        setFilterParams={setFilterParams}
        handleFilterReset={handleFilterReset}
      />

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
              <UserListItem
                key={item._id}
                sn={++i}
                user={item}
                filterParams={filterParams}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {data?.data && (
        <ListPagination
          filterPrams={filterParams}
          setFilterParams={setFilterParams}
          meta={data?.data?.meta}
        />
      )}
    </Flex>
  );
};

export default UserList;
