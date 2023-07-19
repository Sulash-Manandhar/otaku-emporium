export type PageLimit = {
  page: number;
  limit: number;
};

export interface UserFilterParamsType extends PageLimit {
  name: string;
  contact: string;
  gender: string;
  verification: boolean | null;
  ban: boolean | null;
}
