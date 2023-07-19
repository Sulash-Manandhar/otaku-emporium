import {
  usePagination,
  Pagination,
  PaginationContainer,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationPage,
  PaginationNext,
  PaginationSeparator,
} from "@ajna/pagination";
import { Box, Flex, Select, filter } from "@chakra-ui/react";
import { Meta } from "@src/schema/common";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

interface Props {
  meta: Meta;
  filterPrams: any;
  setFilterParams: any;
}

// constants
const outerLimit = 2;
const innerLimit = 2;

const ListPagination: React.FC<Props> = (props) => {
  const { meta, filterPrams, setFilterParams } = props;

  const {
    pages,
    pagesCount,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination({
    total: meta.totalCount,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: filterPrams?.limit,
      currentPage: filterPrams?.page,
    },
  });

  const handlePageChange = (nextPage: number): void => {
    setFilterParams((prev: any) => ({
      ...prev,
      page: nextPage,
    }));
    setCurrentPage(nextPage);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const pageSize = Number(event.target.value);
    setFilterParams((prev: any) => ({
      ...prev,
      limit: pageSize,
    }));
    setPageSize(pageSize);
  };

  return (
    <Flex justifyContent="flex-end" gap="5">
      <Box>
        <Select
          placeholder="Select limit option"
          variant="filled"
          onChange={handlePageSizeChange}
          size="md"
          value={pageSize}
        >
          <option value={5}>Limit 5</option>
          <option value={15}>Limit 15</option>
          <option value={30}>Limit 30</option>
          <option value={50}>Limit 50</option>
          <option value={100}>Limit 100</option>
        </Select>
      </Box>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      >
        <PaginationContainer>
          <PaginationPrevious p="0" mr={4}>
            <AiFillCaretLeft />
          </PaginationPrevious>
          <PaginationPageGroup
            separator={<PaginationSeparator variant="outline" mx={2} />}
          >
            {pages.map((page: number) => (
              <PaginationPage
                key={`pagination_page_${page}`}
                page={page}
                padding={4}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext ml={4} p={0}>
            <AiFillCaretRight />
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Flex>
  );
};

export default ListPagination;
