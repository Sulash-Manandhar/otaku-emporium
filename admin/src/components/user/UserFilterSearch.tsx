import {
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  filter,
} from "@chakra-ui/react";
import { UserFilterParamsType } from "@src/schema/filterSchema";
import { wrapperStyle } from "@src/style/common";
import { Dispatch, SetStateAction } from "react";

interface Props {
  filterParams: UserFilterParamsType;
  setFilterParams: Dispatch<SetStateAction<UserFilterParamsType>>;
  handleFilterReset: () => void;
}

const UserFilterSearch: React.FC<Props> = (props) => {
  const { filterParams, setFilterParams, handleFilterReset } = props;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.currentTarget;
    setFilterParams((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleBooleanSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget;
    setFilterParams((prev) => ({
      ...prev,
      [id]: value === "true" ? true : false,
    }));
  };

  const banValue = String(filterParams?.ban);
  const verificationValue = String(filterParams?.verification);

  return (
    <Grid
      sx={wrapperStyle}
      templateColumns={["repeat(1,1fr)", "repeat(5,1fr)"]}
      gap="4"
    >
      <GridItem>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            size="sm"
            id="name"
            value={filterParams.name}
            onChange={handleInputChange}
          />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl>
          <FormLabel size="sm">Contact</FormLabel>
          <Input
            placeholder="Contact name"
            size="sm"
            id="contact"
            value={filterParams.contact}
            onChange={handleInputChange}
          />
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl>
          <FormLabel size="sm">Gender</FormLabel>
          <Select
            placeholder="Gender"
            size="sm"
            id="gender"
            value={filterParams.gender}
            onChange={handleInputChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl>
          <FormLabel size="sm">Verification</FormLabel>
          <Select
            placeholder="Choose verification option"
            size="sm"
            id="verification"
            value={verificationValue}
            onChange={handleBooleanSwitch}
          >
            <option value="true">Verified</option>
            <option value="false">Not verified</option>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem>
        <FormControl>
          <FormLabel size="sm">Ban</FormLabel>
          <Select
            placeholder="Choose ban option"
            size="sm"
            id="ban"
            value={banValue}
            onChange={handleBooleanSwitch}
          >
            <option value="true">Banned</option>
            <option value="false">Not Banned</option>
          </Select>
        </FormControl>
      </GridItem>
      <GridItem>
        <Button
          variant="outline"
          colorScheme="red"
          size="sm"
          onClick={handleFilterReset}
        >
          Reset
        </Button>
      </GridItem>
    </Grid>
  );
};

export default UserFilterSearch;
