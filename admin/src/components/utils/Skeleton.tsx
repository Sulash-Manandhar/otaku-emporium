import { Skeleton, Tbody, Td, Tr } from "@chakra-ui/react";

interface TableSkeletonProps {
  rows: number;
  cols: number;
}
export const TableSkeleton = (props: TableSkeletonProps) => {
  const { rows, cols } = props;
  return (
    <Tbody>
      {Array.from(Array(rows)).map((_item, i) => (
        <Tr key={i}>
          {Array.from(Array(cols)).map((_item1, j) => (
            <Td key={j}>
              <Skeleton height="16px" />
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};
