/**
 * @param options: <T>[], @param delay: number
 * @returns Promise<{data: T[]}>
 */
const defaultOptions: any = [
  {
    label: '小明 👦🏻',
    value: 1,
  },
  {
    label: '小红 👧🏻',
    value: 2,
  },
  {
    label: '小丑 🤡',
    value: 3,
  },
];

const mockAsyncFetchData = <T>(delay: number, options?: T[]): Promise<{ data: T[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: options || (defaultOptions as T[]),
      });
    }, delay);
  });
};

export { mockAsyncFetchData };
