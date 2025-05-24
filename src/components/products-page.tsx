"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Filter, X, Search } from "lucide-react";
import Link from "next/link";
import { Product } from "./product";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import { debounce } from "lodash";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: string;
  sizes: string[];
  gender: string;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const categories = [
  { id: "casual", label: "Casual", icon: "👕" },
  { id: "graphic", label: "Graphic", icon: "🎨" },
  { id: "sports", label: "Sports", icon: "🏃" },
  { id: "polo", label: "Polo", icon: "👔" },
  { id: "limited_edition", label: "Limited", icon: "🌟" },
];

const priceRanges = [
  { label: "Under $50", value: [0, 50] },
  { label: "$50 - $100", value: [50, 100] },
  { label: "$100 - $150", value: [100, 150] },
  { label: "Over $150", value: [150, 1000] },
];

export function ProductsPage() {
  const limit = 9; // number of items per page
  const [cursor, setCursor] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fetch products with pagination
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("limit", limit.toString());
      if (cursor) params.append("cursor", cursor);

      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();

      if (cursor) {
        // Append new products for pagination
        setProducts(prev => [...prev, ...data]);
      } else {
        // Initial load
        setProducts(data);
      }

      // Simple check for more items - might need adjustment based on your API
      setHasMore(data.length === limit);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [cursor, limit]);

  // Load products on first render and when cursor changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Apply filters client-side
  useEffect(() => {
    if (products.length === 0) return;

    setFilterLoading(true);

    let result = [...products];

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price range filter
    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      result = result.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(result);
    setFilterLoading(false);
  }, [products, selectedCategories, priceRange, searchTerm]);

  // Handlers for pagination
  const handleNext = () => {
    if (!hasMore) return;
    setCursor(products[products.length - 1]?.id || null);
  };

  // Filter handlers
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSearchTerm("");
  };

  // Debounced search input
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 500),
    []
  );

  // Count active filters for badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count++;
    if (priceRange[0] !== 0 || priceRange[1] !== 1000) count++;
    if (searchTerm) count++;
    return count;
  }, [selectedCategories, priceRange, searchTerm]);

  if (loading && products.length === 0) {
    return <ProductsPageSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg inline-block">
          {error}
        </div>
        <Button onClick={fetchProducts} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link
          href="/"
          className="flex items-center text-sm md:text-base text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-xl md:text-3xl font-bold ml-auto">Our T-Shirts</h1>
        <Button
          variant="outline"
          className="md:hidden ml-4 relative"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filters and Product List */}
      <div className="flex flex-col md:flex-row gap-8 relative">
        {mobileFilterOpen && (
          <div className="md:hidden fixed z-50 inset-0 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={resetFilters}>
                  Clear All
                </Button>
                <Button variant="ghost" onClick={() => setMobileFilterOpen(false)}>
                  <X />
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`flex items-center gap-2 rounded-md p-2 transition-colors ${selectedCategories.includes(category.id)
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100"
                      }`}
                    onClick={() => handleCategoryChange(category.id)}
                    aria-pressed={selectedCategories.includes(category.id)}
                    type="button"
                  >
                    <span role="img" aria-label={category.label}>
                      {category.icon}
                    </span>
                    <span>{category.label}</span>
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      aria-readonly
                      className="ml-auto h-4 w-4"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="flex flex-col gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => handlePriceRangeChange(range.value as [number, number])}
                    className={`flex items-center w-full p-2 rounded-lg transition-colors ${priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100"
                      }`}
                    aria-pressed={
                      priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                    }
                    type="button"
                  >
                    <span className="text-sm">{range.label}</span>
                    <Checkbox
                      id={range.label}
                      checked={
                        priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                      }
                      className="ml-auto h-4 w-4"
                      aria-readonly
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Filters */}
        <div className="hidden md:block w-64 sticky top-24 h-fit border rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Clear All
            </Button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Categories</h4>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`flex items-center gap-2 rounded-md p-2 transition-colors ${selectedCategories.includes(category.id)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100"
                    }`}
                  onClick={() => handleCategoryChange(category.id)}
                  aria-pressed={selectedCategories.includes(category.id)}
                  type="button"
                >
                  <span role="img" aria-label={category.label}>
                    {category.icon}
                  </span>
                  <span>{category.label}</span>
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    aria-readonly
                    className="ml-auto h-4 w-4"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-semibold mb-2">Price Range</h4>
            <div className="flex flex-col gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => handlePriceRangeChange(range.value as [number, number])}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors ${priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100"
                    }`}
                  aria-pressed={
                    priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                  }
                  type="button"
                >
                  <span className="text-sm">{range.label}</span>
                  <Checkbox
                    id={range.label}
                    checked={
                      priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                    }
                    className="ml-auto h-4 w-4"
                    aria-readonly
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          {/* Search input */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filterLoading ? (
              [...Array(limit)].map((_, idx) => <Skeleton key={idx} className="h-60 rounded-md" />)
            ) : filteredProducts.length === 0 ? (
              <div className="text-center col-span-full text-gray-500">
                No products found matching your criteria.
              </div>
            ) : (
              filteredProducts.map((product) => <Product key={product.id} product={product} />)
            )}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <Button
          onClick={() => {
            setCursor(null);
            setProducts([]);
          }}
          disabled={!cursor || filterLoading}
          variant="outline"
        >
          Reset
        </Button>
        <Button
          onClick={handleNext}
          disabled={!hasMore || filterLoading}
          variant="outline"
        >
          Load More
        </Button>
      </div>
    </div>
  );
}

function ProductsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <Skeleton key={i} className="h-60 rounded-md" />
        ))}
      </div>
    </div>
  );
}