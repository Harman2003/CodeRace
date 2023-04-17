import React, { useState , useCallback, useRef} from "react";

const usePagination = (loading, setPageNumber, hasMore) => {
  
  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
        console.log('harman singh dhindsa')
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore])
  return [lastElementRef];
};

export default usePagination;

