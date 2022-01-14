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

const mockAsyncFetchData = <T>(
  delay: number,
  options?: T[],
  isSuccess: boolean = true,
): Promise<{ data: T[] }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve({
          data: options || (defaultOptions as T[]),
        });
      } else {
        reject(new Error('错误'));
      }
    }, delay);
  });
};

export { mockAsyncFetchData };
