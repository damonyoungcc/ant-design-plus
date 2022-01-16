import { useRequest as useAsyncRequest } from 'ahooks';
import { ActionType, DefaultValueType } from './async-select';

export const useRequest = <T extends DefaultValueType = any>(
  request: () => Promise<T[] | undefined>,
  trigger: ActionType,
) => {
  const { data, loading, run } = useAsyncRequest(request, {
    manual: trigger !== 'auto',
  });
  return {
    data,
    loading,
    run,
  };
};
