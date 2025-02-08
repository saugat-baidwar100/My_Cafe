import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  TAddCategoryInput,
  TAddCategoryOutput,
  TDeleteCategoryInput,
  TDeleteCategoryOutput,
  TGetAllCategoriesOutput,
  TGetCategoryByIdInput,
  TGetCategoryByIdOutput,
  TUpdateCategoryInput,
  TUpdateCategoryOutput,
  updateCategory,
} from "./fetch";

/**
 * for add category api
 */
export function useAddCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation<TAddCategoryOutput, Error, TAddCategoryInput>({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

/**
 * for update category api
 */
export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation<TUpdateCategoryOutput, Error, TUpdateCategoryInput>({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

/**
 * for delete category api
 */
export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation<TDeleteCategoryOutput, Error, TDeleteCategoryInput>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

/**
 * for get all categories api
 */
export function useGetCategoriesQuery() {
  return useQuery<TGetAllCategoriesOutput, Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
}

/**
 * for get category by id api
 */
export function useGetCategoryByIdQuery(id: string) {
  return useQuery<TGetCategoryByIdOutput, Error, TGetCategoryByIdInput>({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById({ categoryId: id }),
  });
}
