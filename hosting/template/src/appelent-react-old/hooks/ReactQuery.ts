import { useState } from 'react';
import { useQuery as useQueryDefault, QueryFunction, QueryOptions, QueryKey, QueryObserverResult } from 'react-query';
import { useMutation as useMutationDefault, UseMutationOptions, UseMutationResult } from 'react-query';
import { useAppSettings, useSession } from './';

interface QueryOptionsExtended extends QueryOptions {
  postProcess?: any;
}

export const useQuery = (queryKey: QueryKey, queryFn?: QueryFunction | QueryOptionsExtended, queryOptions?: QueryOptionsExtended): QueryObserverResult => {
    if(typeof queryFn !== 'function'){
      queryOptions = queryFn
      queryFn = undefined
    }

    if(!queryOptions) queryOptions = {}
    const { postProcess, ...options } = queryOptions;

    const { user } = useSession();
    const { appSettings } = useAppSettings();
    const queryFnDefault = async ({queryKey}: any) => {
        const token = await user.getIdToken();
        const url = appSettings.apiUrl + queryKey;
        return fetch(url, {
          method: 'GET',
          headers: {
            Authorization: 'Firebase ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }) //.catch(error => console.error(error))
          .then(async response => {
            if (!response.ok) {
              throw await response.json();
            }
            return response;
          })
          .then(response =>
            response
              .clone()
              .json()
              .catch(() => response.text()),
          )
          .then(async result => {
            if(queryOptions?.postProcess) return await queryOptions.postProcess(result);
            return result;
          })
      }

    const querydata = useQueryDefault(queryKey, queryFn ?? queryFnDefault, options);

    return querydata;
}

interface MutateOptions {
  url: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: {}
}

export const useMutation = (method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE'): UseMutationResult => {
  const { user } = useSession();
  const { appSettings } = useAppSettings();

  const actionFn = async (mutateOptions: any) => {
    const token = await user.getIdToken();
    const url = appSettings.apiUrl + mutateOptions.url;
    const response = await fetch(url, {
      method: mutateOptions.method ?? 'POST',
      headers: {
        Authorization: 'Firebase ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: mutateOptions.data
    });
    if (!response.ok) {
      throw await response.json();
    }
    try{
      return await response.clone().json();
    }catch{
      return await response.text();
    }
  }

  

  const mutation = useMutationDefault(actionFn);

  return mutation;
}