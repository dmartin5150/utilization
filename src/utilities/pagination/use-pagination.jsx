import { useMemo } from "react";
export const RDOTS = "...r";
export const LDOTS = "...l";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => start + idx);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers > totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    console.log("sli", leftSiblingIndex);
    console.log("sri", rightSiblingIndex);
    console.log("sl", shouldShowLeftDots);
    console.log("sr", shouldShowRightDots);
    console.log("sc", siblingCount);
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && !shouldShowRightDots) {
      return range(1, totalPageCount);
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, RDOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, LDOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, LDOTS, ...middleRange, RDOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
