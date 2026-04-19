import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    materials: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["Men", "Women"];

  const colors = [
    "Red", "Blue", "Black", "Green", "Yellow",
    "Gray", "White", "Pink", "Beige", "Navy",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton", "Wool", "Denim", "Polyester",
    "Silk", "Linen", "Viscose", "Fleece",
  ];

  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  // ✅ Sync URL → State
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      materials: params.materials ? params.materials.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });

    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  // ✅ Handle change
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;

    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...newFilters[name], value];
      } else {
        newFilters[name] = newFilters[name].filter(
          (item) => item !== value
        );
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  // ✅ Update URL (NO navigate)
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key];

      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (value !== "" && value !== 0) {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  // ✅ Price change
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;

    const newFilters = {
      ...filters,
      minPrice: 0,
      maxPrice: newPrice,
    };

    setPriceRange([0, newPrice]);
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>

      {/* CATEGORY */}
      <div className="mb-6">
        <p className="font-medium mb-2">Category</p>
        {categories.map((cat) => (
          <label key={cat} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filters.category === cat}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* GENDER */}
      <div className="mb-6">
        <p className="font-medium mb-2">Gender</p>
        {genders.map((g) => (
          <label key={g} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={filters.gender === g}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {g}
          </label>
        ))}
      </div>

      {/* COLOR */}
      <div className="mb-6">
        <p className="font-medium mb-2">Color</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => {
                const newFilters = { ...filters, color };
                setFilters(newFilters);
                updateURLParams(newFilters);
              }}
              className={`w-8 h-8 rounded-full border ${
                filters.color === color ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div className="mb-6">
        <p className="font-medium mb-2">Size</p>
        {sizes.map((size) => (
          <label key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              checked={filters.size.includes(size)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {size}
          </label>
        ))}
      </div>

      {/* MATERIAL */}
      <div className="mb-6">
        <p className="font-medium mb-2">Material</p>
        {materials.map((mat) => (
          <label key={mat} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="materials"
              value={mat}
              checked={filters.materials.includes(mat)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {mat}
          </label>
        ))}
      </div>

      {/* BRAND */}
      <div className="mb-6">
        <p className="font-medium mb-2">Brand</p>
        {brands.map((b) => (
          <label key={b} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={b}
              checked={filters.brand.includes(b)}
              onChange={handleFilterChange}
              className="mr-2"
            />
            {b}
          </label>
        ))}
      </div>

      {/* PRICE */}
      <div>
        <p className="font-medium mb-2">Price</p>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;