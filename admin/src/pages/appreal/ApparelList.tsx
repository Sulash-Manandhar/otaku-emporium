import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { getApparelList } from "@src/api";
import ApparelListItem from "@src/components/apparels/ApparelListItem";
import { TableSkeleton } from "@src/components/utils/Skeleton";
import { ApparelSchemaList } from "@src/schema/apparelSchema";
import { ListWrapper } from "@src/schema/common";
import { wrapperStyle } from "@src/style/common";
import { useQuery } from "@tanstack/react-query";
import { BiChevronRight } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const ApparelList = () => {
  const { isLoading, data } = useQuery<ListWrapper<ApparelSchemaList>>({
    queryKey: ["apparel-list"],
    queryFn: () => getApparelList(),
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
          <BreadcrumbLink>ApparelList</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size={["sm", "lg"]}>Apparel</Heading>
        <Button size="sm" colorScheme="facebook">
          Add Apparel
        </Button>
      </Flex>

      <Grid sx={wrapperStyle} templateColumns={["repeat(4,1fr)"]} gap="4">
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
            <Select placeholder="Gender">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel size="sm">Verification</FormLabel>
            <Select placeholder="Verification">
              <option>Verified</option>
              <option>Not verified</option>
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
              <Th>Price</Th>
              <Th>Color</Th>
              <Th>Size</Th>
              <Th>Category </Th>
              <Th>Keyword</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          {isLoading && <TableSkeleton rows={15} cols={9} />}
          <Tbody>
            {data?.data?.apparels?.map((item, index) => (
              <ApparelListItem key={item._id} apparel={item} index={++index} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ApparelList;
