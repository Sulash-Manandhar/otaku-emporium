import {
  Avatar,
  Badge,
  Flex,
  Kbd,
  Switch,
  Tag,
  TagLabel,
  Td,
  Tr,
} from "@chakra-ui/react";
import { ApparelDetailSchema } from "@src/schema/apparelSchema";

interface Props {
  index: number;
  apparel: ApparelDetailSchema;
}
const ApparelListItem: React.FC<Props> = (props) => {
  const { index, apparel } = props;

  const size = apparel.size.small ?? +",";
  0 + apparel.size.medium ?? 0 + apparel.size.large ?? 0;

  const CategoryColor = {
    hoodie: "orange",
    "t-shirt": "yellow",
    sweatshirt: "green",
  };

  const price = `Rs. ${apparel.price} /-`;

  return (
    <Tr>
      <Td>{index}</Td>
      <Td>
        <Tag size="lg" colorScheme="blackAlpha" borderRadius="full">
          <Avatar
            src={apparel?.image[0]?.path}
            size="sm"
            name="Segun Adebayo"
            ml={-1}
            mr={2}
          />
          <TagLabel>{apparel.name}</TagLabel>
        </Tag>
      </Td>
      <Td>{price}</Td>
      <Td>{apparel.color}</Td>
      <Td>{size}</Td>
      <Td>
        <Badge colorScheme={CategoryColor[apparel.category]} variant="solid">
          {apparel.category}
        </Badge>
      </Td>
      <Td>
        <Flex gap="2" overflow="clip" maxWidth="250px">
          {apparel.keyword?.length > 0
            ? apparel.keyword.map((item) => <Kbd key={item}>{item}</Kbd>)
            : "-"}
        </Flex>
      </Td>
      <Td>
        <Switch size="sm" isChecked={apparel.status} />
      </Td>
      <Td>Action</Td>
    </Tr>
  );
};

export default ApparelListItem;
