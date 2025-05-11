import { useDispatch, useSelector } from 'react-redux';
import { setItemTitle, setItemDescription, setCategory } from './sellItemSlice';

function ItemInformation() {
  const dispatch = useDispatch();
  const { item_title, item_description, category } = useSelector(
    (state) => state.sellItem,
  );

  const handleTitleChange = (e) => dispatch(setItemTitle(e.target.value));
  const handleDescriptionChange = (e) =>
    dispatch(setItemDescription(e.target.value));
  const handleCategoryChange = (e) => dispatch(setCategory(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', { item_title, item_description, category });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-84 flex-col justify-center space-y-6"
    >
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Item Title
          <span className="group relative ml-2 cursor-pointer text-gray-500">
            <i className="fas fa-info-circle"></i>
            <span className="absolute bottom-full left-0 mb-1 hidden w-48 rounded-md bg-gray-700 p-2 text-sm text-white shadow-lg group-hover:block">
              Enter the title of the item you are selling.
            </span>
          </span>
        </label>
        <input
          name="title"
          value={item_title}
          onChange={handleTitleChange}
          className="input input-bordered w-full rounded-md border-2 border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
          placeholder="Enter item title"
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Item Description
          <span className="group relative ml-2 cursor-pointer text-gray-500">
            <i className="fas fa-info-circle"></i>
            <span className="absolute bottom-full left-0 mb-1 hidden w-48 rounded-md bg-gray-700 p-2 text-sm text-white shadow-lg group-hover:block">
              Provide a detailed description of the item.
            </span>
          </span>
        </label>
        <textarea
          name="description"
          value={item_description}
          onChange={handleDescriptionChange}
          className="textarea textarea-bordered w-full rounded-md border-2 border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
          placeholder="Enter item description"
        />
      </div>
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Category
          <span className="group relative ml-2 cursor-pointer text-gray-500">
            <i className="fas fa-info-circle"></i>
            <span className="absolute bottom-full left-0 mb-1 hidden w-48 rounded-md bg-gray-700 p-2 text-sm text-white shadow-lg group-hover:block">
              Specify the category of the item.
            </span>
          </span>
        </label>
        <select
          name="category"
          value={category}
          onChange={handleCategoryChange}
          className="input input-bordered h-11 w-full cursor-pointer rounded-md border-2 border-gray-300 p-3 focus:border-indigo-500 focus:outline-none"
        >
          <option value="">Select a category</option>
          <option value="Explore">Explore</option>
          <option value="Trending">Trending</option>
          <option value="MOUSE">MOUSE</option>
          <option value="Clothes">Clothes</option>
          <option value="Furniture">Furniture</option>
          <option value="Sports">Sports</option>
          <option value="Electronics">Electronics</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Art">Art</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Watches">Watches</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Collectibles">Collectibles</option>
        </select>
      </div>
      {/* <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button> */}
    </form>
  );
}

export default ItemInformation;
