/**
 * @param options: <T>[], @param delay: number
 * @returns Promise<{data: T[]}>
 */
const mockAsyncFetchData = <T>(options: T[], delay: number): Promise<{ data: T[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: options,
      });
    }, delay);
  });
};

export { mockAsyncFetchData };
