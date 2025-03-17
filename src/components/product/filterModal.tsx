import { useTheme } from "@/ThemeContext";
import React, { useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";

// Enum definitions as TypeScript enums
enum ParentCategoryEnum {
  MEN = "MEN",
  WOMEN = "WOMEN",
  BOYS = "BOYS",
  GIRLS = "GIRLS",
  TODDLERS = "TODDLERS",
}

enum ProductStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SOLD = "SOLD",
}

enum StyleEnum {
  WORKWEAR = "WORKWEAR",
  WORKOUT = "WORKOUT",
  CASUAL = "CASUAL",
  PARTY_DRESS = "PARTY_DRESS",
  PARTY_OUTFIT = "PARTY_OUTFIT",
  FORMAL_WEAR = "FORMAL_WEAR",
  EVENING_WEAR = "EVENING_WEAR",
  WEDDING_GUEST = "WEDDING_GUEST",
  LOUNGEWEAR = "LOUNGEWEAR",
  VACATION_RESORT_WEAR = "VACATION_RESORT_WEAR",
  FESTIVAL_WEAR = "FESTIVAL_WEAR",
  ACTIVE_WEAR = "ACTIVE_WEAR",
  NIGHT_WEAR = "NIGHT_WEAR",
  VINTAGE = "VINTAGE",
  Y2K = "Y2K",
  BOHO = "BOHO",
  MINIMALIST = "MINIMALIST",
  GRUNGE = "GRUNGE",
  CHIC = "CHIC",
  STREETWEAR = "STREETWEAR",
  PREPPY = "PREPPY",
  RETRO = "RETRO",
  CONTAGECORE = "CONTAGECORE",
  GLAM = "GLAM",
  SUMMAR_STYLES = "SUMMAR_STYLES",
  WINTER_ESSENTIALS = "WINTER_ESSENTIALS",
  SPRING_FLORALS = "SPRING_FLORALS",
  AUTUMN_LAYERS = "AUTUMN_LAYERS",
  RAINY_DAY_WEAR = "RAINY_DAY_WEAR",
  DENIM_JEANS = "DENIM_JEANS",
  DRESSES_GOWNS = "DRESSES_GOWNS",
  JACKETS_COATS = "JACKETS_COATS",
  KNITWEAR_SWEATERS = "KNITWEAR_SWEATERS",
  SKIRTS_SHORTS = "SKIRTS_SHORTS",
  SUITS_BLAZERS = "SUITS_BLAZERS",
  TOPS_BLOUSES = "TOPS_BLOUSES",
  SHOES_FOOTWEAR = "SHOES_FOOTWEAR",
  TRAVEL_FRIENDLY = "TRAVEL_FRIENDLY",
  MATERNITY_WEAR = "MATERNITY_WEAR",
  ATHLEISURE = "ATHLEISURE",
  ECO_FRIENDLY = "ECO_FRIENDLY",
  FESTIVAL_READY = "FESTIVAL_READY",
  DATE_NIGHT = "DATE_NIGHT",
  ETHNIC_WEAR = "ETHNIC_WEAR",
  OFFICE_PARTY_OUTFIT = "OFFICE_PARTY_OUTFIT",
  COCKTAIL_ATTIRE = "COCKTAIL_ATTIRE",
  PROM_DRESSES = "PROM_DRESSES",
  MUSIC_CONCERT_WEAR = "MUSIC_CONCERT_WEAR",
  OVERSIZED = "OVERSIZED",
  SLIM_FIT = "SLIM_FIT",
  RELAXED_FIT = "RELAXED_FIT",
  CHRISMAS = "CHRISMAS",
  SCHOOL_UNIFORM = "SCHOOL_UNIFORM",
}

enum ConditionEnum {
  BRAND_NEW_WITH_TAGS = "BRAND_NEW_WITH_TAGS",
  BRAND_NEW_WITHOUT_TAGS = "BRAND_NEW_WITHOUT_TAGS",
  EXCELLENT_CONDITION = "EXCELLENT_CONDITION",
  GOOD_CONDITION = "GOOD_CONDITION",
  HEAVILY_USED = "HEAVILY_USED",
}

// Interface for the filter values
interface FilterValues {
  name: string;
  brand: string;
  category: string;
  parentCategory: string;
  size: string;
  customBrand: string;
  minPrice: string;
  maxPrice: string;
  status: string;
  style: string;
  condition: string;
  discountPrice: boolean;
  hashtags: string[];
  colors: string[];
}

// Interface for processed filters (after type conversion)
interface ProcessedFilters {
  name?: string;
  brand?: number;
  category?: number;
  parentCategory?: string;
  size?: number;
  customBrand?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  style?: string;
  condition?: string;
  discountPrice?: boolean;
  hashtags?: string[];
  colors?: string[];
}

// Props interface for the FilterModal component
interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: ProcessedFilters) => void;
  initialFilters?: Partial<FilterValues>;
}

// Modal component that contains the filter form
export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    name: initialFilters.name || "",
    brand: initialFilters.brand || "",
    category: initialFilters.category || "",
    parentCategory: initialFilters.parentCategory || "",
    size: initialFilters.size || "",
    customBrand: initialFilters.customBrand || "",
    minPrice: initialFilters.minPrice || "",
    maxPrice: initialFilters.maxPrice || "",
    status: initialFilters.status || "",
    style: initialFilters.style || "",
    condition: initialFilters.condition || "",
    discountPrice: initialFilters.discountPrice || false,
    hashtags: initialFilters.hashtags || [],
    colors: initialFilters.colors || [],
  });

  const [currentHashtag, setCurrentHashtag] = useState<string>("");
  const [currentColor, setCurrentColor] = useState<string>("");
  const { theme } = useTheme();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addHashtag = (): void => {
    if (
      currentHashtag.trim() !== "" &&
      !filters.hashtags.includes(currentHashtag.trim())
    ) {
      setFilters({
        ...filters,
        hashtags: [...filters.hashtags, currentHashtag.trim()],
      });
      setCurrentHashtag("");
    }
  };

  const removeHashtag = (tag: string): void => {
    setFilters({
      ...filters,
      hashtags: filters.hashtags.filter((t) => t !== tag),
    });
  };

  const addColor = (): void => {
    if (
      currentColor.trim() !== "" &&
      !filters.colors.includes(currentColor.trim())
    ) {
      setFilters({
        ...filters,
        colors: [...filters.colors, currentColor.trim()],
      });
      setCurrentColor("");
    }
  };

  const removeColor = (color: string): void => {
    setFilters({
      ...filters,
      colors: filters.colors.filter((c) => c !== color),
    });
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    callback: () => void
  ): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      callback();
    }
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | React.MouseEvent
  ): void => {
    if (e.type === "submit") {
      e.preventDefault();
    }

    // Convert string values to appropriate types
    const processedFilters: ProcessedFilters = {};

    // Copy string values directly
    if (filters.name) processedFilters.name = filters.name;
    if (filters.customBrand) processedFilters.customBrand = filters.customBrand;
    if (filters.parentCategory)
      processedFilters.parentCategory = filters.parentCategory;
    if (filters.status) processedFilters.status = filters.status;
    if (filters.style) processedFilters.style = filters.style;
    if (filters.condition) processedFilters.condition = filters.condition;

    // Convert numeric values
    if (filters.brand) processedFilters.brand = parseInt(filters.brand);
    if (filters.category)
      processedFilters.category = parseInt(filters.category);
    if (filters.size) processedFilters.size = parseInt(filters.size);
    if (filters.minPrice)
      processedFilters.minPrice = parseFloat(filters.minPrice);
    if (filters.maxPrice)
      processedFilters.maxPrice = parseFloat(filters.maxPrice);

    // Boolean and array values
    processedFilters.discountPrice = filters.discountPrice;
    if (filters.hashtags.length > 0)
      processedFilters.hashtags = filters.hashtags;
    if (filters.colors.length > 0) processedFilters.colors = filters.colors;

    console.log("Submitting filters:", processedFilters);
    // Here you would typically call your API with these filters
    if (onApplyFilters) {
      onApplyFilters(processedFilters);
    }
    onClose();
    resetForm();
  };

  const resetForm = (): void => {
    setFilters({
      name: "",
      brand: "",
      category: "",
      parentCategory: "",
      size: "",
      customBrand: "",
      minPrice: "",
      maxPrice: "",
      status: "",
      style: "",
      condition: "",
      discountPrice: false,
      hashtags: [],
      colors: [],
    });
    setCurrentHashtag("");
    setCurrentColor("");
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl max-h-screen">
        {/* Modal content */}
        <div
          className={` ${
            theme === "dark" ? "bg-black/90 " : "bg-white"
          }  rounded-lg border-2 shadow-xl overflow-hidden`}
        >
          {/* Modal header */}
          <div
            className={` ${
              theme === "dark"
                ? "bg-[#0f0f0ff6] text-white"
                : "border-gray-200 text-gray-800"
            } px-6 py-4 border-b   flex justify-between items-center`}
          >
            <h2 className="text-xl font-bold ">Filter Products</h2>
            <button
              onClick={onClose}
              className={`${
                theme === "dark" ? " text-white" : " text-gray-500"
              } hover:text-gray-700 focus:outline-none`}
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          {/* Modal body with scrollable content */}
          <div className="overflow-y-auto max-h-[calc(100vh-14rem)]">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* String inputs */}
                <div>
                  <label
                    className={`block ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }  mb-2`}
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={filters.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                    placeholder="Product name"
                  />
                </div>

                <div>
                  <label
                    className={`block ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }  mb-2`}
                    htmlFor="customBrand"
                  >
                    Custom Brand
                  </label>
                  <input
                    type="text"
                    id="customBrand"
                    name="customBrand"
                    value={filters.customBrand}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                    placeholder="Custom brand name"
                  />
                </div>

                {/* Integer inputs */}
                {/* <div>
                  <label className={`block text-gray-700 mb-2`} htmlFor="brand">
                    Brand ID
                  </label>
                  <input
                    type="number"
                    id="brand"
                    name="brand"
                    value={filters.brand}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                    placeholder="Brand ID"
                  />
                </div> */}

                {/* <div>
                  <label
                    className={`block text-gray-700 mb-2`}
                    htmlFor="category"
                  >
                    Category ID
                  </label>
                  <input
                    type="number"
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                    placeholder="Category ID"
                  />
                </div> */}

                <div>
                  <label
                    className={`block ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }  mb-2`}
                    htmlFor="size"
                  >
                    Size
                  </label>
                  <input
                    type="number"
                    id="size"
                    name="size"
                    value={filters.size}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                    placeholder="Size"
                  />
                </div>

                {/* Float inputs */}
                <div>
                  <label
                    className={`block ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }  mb-2`}
                    htmlFor="minPrice"
                  >
                    Min Price
                  </label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                    placeholder="Minimum price"
                    step="0.01"
                  />
                </div>

                <div>
                  <label
                    className={`block ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }  mb-2`}
                    htmlFor="maxPrice"
                  >
                    Max Price
                  </label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                    placeholder="Maximum price"
                    step="0.01"
                  />
                </div>

                {/* Enum selects */}
                <div>
                  <label
                    className={`block ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }  mb-2`}
                    htmlFor="parentCategory"
                  >
                    Parent Category
                  </label>
                  <select
                    id="parentCategory"
                    name="parentCategory"
                    value={filters.parentCategory}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                  >
                    <option
                      className={` ${
                        theme === "dark"
                          ? "bg-black text-white"
                          : "text-gray-800"
                      }`}
                      value=""
                    >
                      Select Parent Category
                    </option>
                    {Object.entries(ParentCategoryEnum).map(([key, value]) => (
                      <option
                        className={` ${
                          theme === "dark"
                            ? "bg-black text-white"
                            : "text-gray-800"
                        }`}
                        key={key}
                        value={value}
                      >
                        {key.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className={`block ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }  mb-2`}
                    htmlFor="status"
                  >
                    Product Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                  >
                    <option
                      className={` ${
                        theme === "dark"
                          ? "bg-black text-white"
                          : "text-gray-800"
                      }`}
                      value=""
                    >
                      Select Status
                    </option>
                    {Object.entries(ProductStatusEnum).map(([key, value]) => (
                      <option
                        className={` ${
                          theme === "dark"
                            ? "bg-black text-white"
                            : "text-gray-800"
                        }`}
                        key={key}
                        value={value}
                      >
                        {key.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className={`block ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }  mb-2`}
                    htmlFor="style"
                  >
                    Style
                  </label>
                  <select
                    id="style"
                    name="style"
                    value={filters.style}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                  >
                    <option
                      className={` ${
                        theme === "dark"
                          ? "bg-black text-white"
                          : "text-gray-800"
                      }`}
                      value=""
                    >
                      Select Style
                    </option>
                    {Object.entries(StyleEnum).map(([key, value]) => (
                      <option
                        className={` ${
                          theme === "dark"
                            ? "bg-black text-white"
                            : "text-gray-800"
                        }`}
                        key={key}
                        value={value}
                      >
                        {key.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className={`block ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }  mb-2`}
                    htmlFor="condition"
                  >
                    Condition
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={filters.condition}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border border-gray-300 ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    } rounded-md focus:outline-none focus:ring-2 `}
                  >
                    <option
                      className={` ${
                        theme === "dark"
                          ? "bg-black text-white"
                          : "text-gray-800"
                      }`}
                      value=""
                    >
                      Select Condition
                    </option>
                    {Object.entries(ConditionEnum).map(([key, value]) => (
                      <option
                        className={` ${
                          theme === "dark"
                            ? "bg-black text-white"
                            : "text-gray-800"
                        }`}
                        key={key}
                        value={value}
                      >
                        {key.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Boolean checkbox */}
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="discountPrice"
                    checked={filters.discountPrice}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-gray-800 focus:ring-gray-600 border-gray-300 rounded"
                  />
                  <span
                    className={`block ${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }  ml-2`}
                  >
                    Discount Price
                  </span>
                </label>
              </div>

              {/* Array inputs */}
              <div className="mt-6">
                <label
                  className={`block ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  }  mb-2`}
                >
                  Hashtags
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={currentHashtag}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCurrentHashtag(e.target.value)
                    }
                    className={` ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    }
                     flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500`}
                    placeholder="Add a hashtag"
                    onKeyPress={(e) => handleKeyPress(e, addHashtag)}
                  />
                  <button
                    type="button"
                    onClick={addHashtag}
                    className="px-4 py-2  bg-gray-800 hover:bg-gray-600 text-white rounded-r-md  focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {filters.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeHashtag(tag)}
                        className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={`Remove ${tag}`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label
                  className={`block ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  }  mb-2`}
                >
                  Colors
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={currentColor}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCurrentColor(e.target.value)
                    }
                    className={` ${
                      theme === "dark"
                        ? "text-white focus:ring-gray-400 bg-[#D9D9D966]"
                        : "text-black  focus:ring-gray-500 bg-white"
                    }
                     flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500`}
                    placeholder="Add a color"
                    onKeyPress={(e) => handleKeyPress(e, addColor)}
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="px-4 py-2  bg-gray-800 hover:bg-gray-600 text-white rounded-r-md  focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {filters.colors.map((color) => (
                    <span
                      key={color}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => removeColor(color)}
                        className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={`Remove ${color}`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Modal footer */}
          <div
            className={`px-6 py-4 border-t ${
              theme === "dark"
                ? "bg-[#0f0f0ff6] text-white"
                : "border-gray-200 text-gray-700"
            } flex justify-end space-x-4`}
          >
            <button
              type="button"
              onClick={resetForm}
              className={`px-6 py-2 border border-gray-300 rounded-md ${
                theme === "dark"
                  ? "hover:bg-gray-600 hover:text-black"
                  : "hover:bg-gray-50"
              }  focus:outline-none focus:ring-2 focus:ring-gray-500`}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-2 border border-gray-300 rounded-md ${
                theme === "dark"
                  ? "hover:bg-gray-600 hover:text-black"
                  : "hover:bg-gray-50"
              }  focus:outline-none focus:ring-2 focus:ring-gray-500`}
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
