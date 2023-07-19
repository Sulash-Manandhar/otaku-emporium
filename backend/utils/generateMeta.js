export const generateMeta = ({ page, limit, count }) => {
  const totalPage = Math.ceil(count / limit);
  const nextPage = page < totalPage ? page + 1 : null;
  const prevPage = page === 1 ? null : page - 1;
  return {
    totalCount: count,
    currentPage: page,
    totalPage,
    nextPage,
    prevPage,
  };
};
