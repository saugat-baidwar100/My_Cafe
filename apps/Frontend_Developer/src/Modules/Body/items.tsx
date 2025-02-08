const foodItems = [
    {
      id: 1,
      name: "Chicken Burger",
      imageUrl: "/images/burger.jpg",
      deliveryTime: "30 min",
      price: "$5.99",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      imageUrl: "/images/pizza.jpg",
      deliveryTime: "40 min",
      price: "$8.99",
    },
    {
      id: 3,
      name: "French Fries",
      imageUrl: "/images/fries.jpg",
      deliveryTime: "20 min",
      price: "$3.49",
    },
    {
      id: 4,
      name: "Chocolate Shake",
      imageUrl: "/images/shake.jpg",
      deliveryTime: "25 min",
      price: "$4.99",
    },
  ];
  
  const FoodItem = () => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {foodItems.map((item) => (
            <div key={item.id} className="bg-gray-100 p-3 rounded-lg shadow">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-24 object-cover rounded"
              />
              <h3 className="text-center mt-2 font-semibold">{item.name}</h3>
              <p className="text-center text-sm text-gray-600">{item.deliveryTime}</p>
              <p className="text-center font-bold text-lg">{item.price}</p>
              <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FoodItem;
  