import { useMutation, useQuery } from '@tanstack/react-query';
import {
  loginUser,
  logout,
  me,
  registerUser,
  TLoginUserInput,
  TLoginUserOutput,
  TLogoutOutput,
  TMeOutput,
  TRegisterUserInput,
  TRegisterUserOutput,
} from './fetch';

export function useRegisterUserMutation() {
  return useMutation<TRegisterUserOutput, Error, TRegisterUserInput>({
    mutationFn: registerUser,
  });
}

export function useLoginUserMutation() {
  return useMutation<TLoginUserOutput, Error, TLoginUserInput>({
    mutationFn: loginUser,
  });
}

// for me api
export function useMeQuery() {
    return useQuery<TMeOutput, Error>({
      queryKey: ["me"],
      queryFn: me,
    });
  }
  
  // for logout api
  export function useLogoutMutation() {
    return useMutation<TLogoutOutput, Error, object>({
      mutationFn: logout,
    });
  }