import { cloneElement } from 'react';
import { isValidValue } from '../../utils';

export const LoadableContent = ({ query, fallback, children }) => {
  const queries = Array.isArray(query) ? query : [query];

  const isLoading = queries.some((q) => q.isFetching);
  const hasInvalidData = queries.some((q) => !isValidValue(q.data));

  if (Array.isArray(query) && (!queries.length || isLoading || hasInvalidData)) {
    return fallback;
  }

  if (!Array.isArray(query) && (isLoading || !isValidValue(query.data))) {
    return fallback;
  }

  if (typeof children === 'function') {
    const data = Array.isArray(query) ? queries.map((q) => q.data) : query.data;
    return children({ data });
  }

  const dataProps = Array.isArray(query) ? queries.map((q) => q.data) : query.data;
  return cloneElement(children, { data: dataProps });
};
