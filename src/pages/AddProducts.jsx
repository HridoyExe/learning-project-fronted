import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../services/auth-api-client";
import apiClient from "../services/api-client";

const AddProducts = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiClient.get("categories/").then(res => setCategories(res.data));
  }, []);

  const handleAddProduct = async (data) => {
    try {
      const productRes = await authApiClient.post('products/', data);
      setProductId(productRes.data.id);
    } catch (error) {
      console.log("Adding Product Error", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleImageUpload = async () => {
    if (!images.length) return alert("Please select images");
    setLoading(true);
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        await authApiClient.post(`products/${productId}/images/`, formData);
      }
    } catch (error) {
      console.log("Error Uploading Images", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>

      {!productId ? (
        <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input {...register("name", { required: "Product Name is required" })} className="input input-bordered w-full" placeholder="Product Name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea {...register("description", { required: "Description is required" })} className="textarea textarea-bordered w-full" placeholder="Description" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Price</label>
            <input {...register("price", { required: "Price is required", validate: v => !isNaN(parseFloat(v)) || "Enter a valid number" })} className="input input-bordered w-full" placeholder="Price" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Stock Quantity</label>
            <input {...register("stock", { required: "Stock Quantity is required" })} type="number" className="input input-bordered w-full" placeholder="Stock Quantity" />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select {...register("category", { required: "Category is required" })} className="select select-bordered w-full">
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">Add Product</button>
          </div>
        </form>
      ) : (
        <div>
          <h3>Upload Product Images</h3>
          <input type="file" multiple accept="image/*" className="file-input file-input-bordered w-full mt-2" onChange={handleImageChange} />
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, idx) => <img key={idx} src={src} alt="Preview" className="w-16 h-16 rounded-md object-cover" />)}
            </div>
          )}
          <button
            disabled={loading}
            onClick={handleImageUpload}
            className="btn btn-primary w-full mt-2"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Upload Images"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProducts;
