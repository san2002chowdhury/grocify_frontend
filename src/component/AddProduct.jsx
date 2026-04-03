import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assest } from "../assets/asset";
import { addSingleProduct } from "../redux/features/product/productThunk";

const AddProduct = () => {
  const dispatch = useDispatch();
  const initialImages = [
    { file: null, preview: null },
    { file: null, preview: null },
    { file: null, preview: null },
    { file: null, preview: null },
  ];
  const [files, setFiles] = useState(initialImages);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState({});

  const { categories } = useSelector((state) => state?.category);

  const validate = () => {
    let newErrors = {};

    if (!files.some((file) => file)) {
      newErrors.images = "At least one image is required!";
    }

    if (!name.trim()) {
      newErrors.name = "Product name is required!";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required!";
    }

    if (!category) {
      newErrors.category = "Please select a category!";
    }

    if (!price) {
      newErrors.price = "Price is required!";
    }

    if (!offerPrice) {
      newErrors.offerPrice = "Offer price is required!";
    }

    if (offerPrice && price && Number(offerPrice) > Number(price)) {
      newErrors.offerPrice = "Offer price cannot be greater than price!";
    }

    if (!rating) {
      newErrors.rating = "Rating is required!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e, index) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const updatedFiles = [...files];
    updatedFiles[index] = {
      file: selectedFile,
      preview: URL.createObjectURL(selectedFile),
    };
    setFiles(updatedFiles);
    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("rating", rating);

    files.forEach((item) => {
      if (item.file) {
        formData.append("images", item.file);
      }
    });

    dispatch(addSingleProduct(formData));
    setFiles(initialImages);
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setOfferPrice("");
    setRating("");
    setErrors({});
  };

  return (
    <div className="flex-1 h-[95vh] flex flex-col justify-between">
      <form className="md:p-10 p-4 space-y-5 max-w-lg" onSubmit={handleSubmit}>
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {files.map((item, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id={`image${index}`}
                  onChange={(e) => handleImageChange(e, index)}
                />

                <img
                  src={item.preview || assest.uploadIcon}
                  alt="preview"
                  className="max-w-24 cursor-pointer border rounded"
                />
              </label>
            ))}
          </div>
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">Select Category</option>
            {categories?.map((item) => (
              <option key={item?._id} value={item?.name}>
                {item?.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />

            {errors.offerPrice && (
              <p className="text-red-500 text-sm">{errors.offerPrice}</p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Rating (1-5)
            </label>
            <input
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              id="rating"
              type="number"
              placeholder="0"
              min="1"
              max="5"
              step="1"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating}</p>
            )}
          </div>
        </div>
        <button
          className="px-8 py-2.5 bg-primary hover:bg-dull text-white font-medium rounded"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
