import { QueryFunction, QueryOptions, QueryKey, QueryObserverResult } from 'react-query';
import { UseMutationResult } from 'react-query';
interface QueryOptionsExtended extends QueryOptions {
    postProcess?: any;
}
export declare const useQuery: (queryKey: QueryKey, queryFn?: QueryFunction<unknown> | QueryOptionsExtended | undefined, queryOptions?: QueryOptionsExtended | undefined) => QueryObserverResult;
export declare const useMutation: () => UseMutationResult;
export {};
