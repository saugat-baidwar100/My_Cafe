const categories = [
  { id: 1, name: 'Beverages', imageUrl: '/images/beverages.jpg' },
  { id: 2, name: 'Fast Food', imageUrl: '/images/fast-food.jpg' },
  { id: 3, name: 'Desserts', imageUrl: '/images/desserts.jpg' },
  { id: 4, name: 'Healthy', imageUrl: '/images/healthy.jpg' },
];

const Category = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-100 p-3 rounded-lg shadow">
            <img
              src={category.imageUrl}
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
