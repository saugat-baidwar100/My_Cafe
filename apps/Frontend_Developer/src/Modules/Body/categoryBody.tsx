//

import { useGetCategoriesQuery } from '../../API/Category/query';

const Category = () => {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.data.map((category) => (
          <div key={category._id} className="bg-gray-100 p-3 rounded-lg shadow">
            <img
              src={category.imageUrl} // Assuming the imageUrl is in the category data
              alt={category.name}
              className="w-full h-24 object-cover rounded"
            />
            <h3 className="text-center mt-2 font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
