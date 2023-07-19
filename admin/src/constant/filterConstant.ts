import { UserFilterParamsType } from "@src/schema/filterSchema";
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 15;

export const USER_FILTER_PARAMS: UserFilterParamsType = {
  name: "",
  contact: "",
  gender: "",
  verification: null,
  ban: null,
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
};
