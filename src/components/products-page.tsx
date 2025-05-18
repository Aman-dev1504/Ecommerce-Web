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

interface FilterContentProps {
  selectedCategories: string[];
  setSelectedCategories: (selectedCategories: string[]) => void,
  handleCategoryChange: (categoryId: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
  isMobile?: boolean;
  activeFilterCount: number;
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, selectedCategories, priceRange, searchTerm]);

  // Count active filters for badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count++;
    if (priceRange[0] !== 0 || priceRange[1] !== 1000) count++;
    if (searchTerm) count++;
    return count;
  }, [selectedCategories, priceRange, searchTerm]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
      setFilterLoading(true);
      setTimeout(() => setFilterLoading(false), 300);
    }, 500),
    []
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();
      setProducts(products);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      setFilterLoading(true);
      setTimeout(() => setFilterLoading(false), 300);
      return prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId];
    });
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    setFilterLoading(true);
    setTimeout(() => setFilterLoading(false), 300);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSearchTerm("");
    setFilterLoading(true);
    setTimeout(() => setFilterLoading(false), 300);
  };

  if (loading) {
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
      <div className="flex flex-col md:flex-row gap-8 relative">
        {mobileFilterOpen && (
          <div className="md:hidden fixed z-50 inset-0 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-sm"
                  >
                    Clear all
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  <X />
                </Button>
              </div>
            </div>
            <FilterContent
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              handleCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              setPriceRange={handlePriceRangeChange}
              searchTerm={searchTerm}
              setSearchTerm={debouncedSearch}
              resetFilters={resetFilters}
              isMobile
              activeFilterCount={activeFilterCount}
            />
          </div>
        )}

        <aside className="hidden md:block w-1/4">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm border sticky top-4">
            <FilterContent
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              handleCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              setPriceRange={handlePriceRangeChange}
              searchTerm={searchTerm}
              setSearchTerm={debouncedSearch}
              resetFilters={resetFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>
        </aside>

        <main className="w-full md:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {filteredProducts.length} products found
            </p>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-primary"
              >
                Clear all filters
              </Button>
            )}
          </div>

          {filterLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Product product={product} key={product.id} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={resetFilters}>Reset filters</Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function FilterContent({
  selectedCategories,
  setSelectedCategories,
  handleCategoryChange,
  priceRange,
  setPriceRange,
  searchTerm,
  setSearchTerm,
  resetFilters,
  isMobile = false,
  activeFilterCount
}: FilterContentProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            id="search"
            placeholder="Search t-shirts..."
            value={localSearchTerm}
            onChange={handleSearchChange}
            className="w-full pl-9"
          />
          {localSearchTerm && (
            <button
              onClick={() => {
                setLocalSearchTerm("");
                setSearchTerm("");
              }}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 flex items-center justify-between">
          <span>Categories</span>
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="text-sm font-normal text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center w-full p-2 rounded-lg transition-colors ${selectedCategories.includes(category.id)
                ? "bg-primary/10 text-primary"
                : "hover:bg-gray-100"
                }`}
            >
              <span className="mr-3 text-lg">{category.icon}</span>
              <span className="text-sm">{category.label}</span>
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                className="ml-auto h-4 w-4"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setPriceRange(range.value as [number, number])}
              className={`flex items-center w-full p-2 rounded-lg transition-colors ${priceRange[0] === range.value[0] && priceRange[1] === range.value[1]
                ? "bg-primary/10 text-primary"
                : "hover:bg-gray-100"
                }`}
            >
              <span className="text-sm">{range.label}</span>
              {priceRange[0] === range.value[0] && priceRange[1] === range.value[1] && (
                <Checkbox checked className="ml-auto h-4 w-4" />
              )}
            </button>
          ))}
        </div>
        <div className="mt-4">


        </div>
      </div>

      {activeFilterCount > 0 && !isMobile && (
        <Button
          onClick={resetFilters}
          variant="outline"
          className="w-full"
        >
          Reset Filters
        </Button>
      )}
    </>
  );
}

function ProductsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link
          href="/"
          className="flex items-center text-sm md:text-base text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <Skeleton className="h-8 w-48 ml-auto" />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md sticky top-4">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="mb-6">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="mb-6">
              <Skeleton className="h-5 w-24 mb-2" />
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
            <div className="mb-6">
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </aside>
        <main className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <Skeleton className="h-60 w-full mb-4 rounded-lg" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}