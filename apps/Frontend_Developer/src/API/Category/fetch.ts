import { env } from '../../config';

// Define Category types

export type TCategory = {
  imageUrl: string | undefined;
  _id: string;
  name: string;
  description: string;
  created_at: string;
};

// Add Category API
export type TAddCategoryInput = {
  name: string;
  description: string;
};

export type TAddCategoryOutput = {
  message: string;
  isSuccess: boolean;
  data: TCategory;
};

export async function addCategory(
  input: TAddCategoryInput
): Promise<TAddCategoryOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/categories/allcategory`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

// Update Category API
export type TUpdateCategoryInput = {
  categoryId: string;
  name: string;
  description: string;
};

export type TUpdateCategoryOutput = {
  message: string;
  isSuccess: boolean;
  data: TCategory;
};

export async function updateCategory(
  input: TUpdateCategoryInput
): Promise<TUpdateCategoryOutput> {
  const res = await fetch(
    `${env.BACKEND_URL}/api/categories/${input.categoryId}`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

// Delete Category API
export type TDeleteCategoryInput = {
  categoryId: string;
};

export type TDeleteCategoryOutput = {
  message: string;
  isSuccess: boolean;
};

export async function deleteCategory(
  input: TDeleteCategoryInput
): Promise<TDeleteCategoryOutput> {
  const res = await fetch(
    `${env.BACKEND_URL}/api/categories/${input.categoryId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

// Get All Categories API
export type TGetAllCategoriesOutput = {
  message: string;
  isSuccess: boolean;
  data: TCategory[];
};

export async function getAllCategories(): Promise<TGetAllCategoriesOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/category/allcategory`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

// Get Category by ID API
export type TGetCategoryByIdInput = {
  categoryId: string;
};

export type TGetCategoryByIdOutput = {
  message: string;
  isSuccess: boolean;
  data: TCategory;
};

export async function getCategoryById(
  input: TGetCategoryByIdInput
): Promise<TGetCategoryByIdOutput> {
  const res = await fetch(
    `${env.BACKEND_URL}/api/categories/${input.categoryId}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
