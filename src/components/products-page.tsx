"use client";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Filter, X } from "lucide-react";
import Link from "next/link";
import { Product } from "./product";
import { Skeleton } from "./ui/skeleton";

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
  { id: "casual", label: "Casual" },
  { id: "graphic", label: "Graphic" },
  { id: "sports", label: "Sports" },
  { id: "polo", label: "Polo" },
  { id: "limited_edition", label: "Limited" },
];
interface FilterContentProps {
  selectedCategories: string[];
  handleCategoryChange: (categoryId: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
  isMobile?: boolean;
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const fetchProducts = async () => {
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      setFilterLoading(true);
      setTimeout(() => setFilterLoading(false), 500);
      return prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId];
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSearchTerm("");
    setFilterLoading(true);
    setTimeout(() => setFilterLoading(false), 500);
  };

  if (loading) {
    return <ProductsPageSkeleton />;
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
        <h1 className="text-xl md:text-3xl font-bold ml-auto">Our Products</h1>
        <Button
          variant="outline"
          className="md:hidden ml-4"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        >
          {mobileFilterOpen ? <X /> : <Filter />}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-8 relative">
        {mobileFilterOpen && (
          <div className="md:hidden absolute z-10 inset-0 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button
                variant="ghost"
                onClick={() => setMobileFilterOpen(false)}
              >
                <X />
              </Button>
            </div>
            <FilterContent
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              resetFilters={resetFilters}
              isMobile
            />
          </div>
        )}

        <aside className="hidden md:block w-1/4">
          <div className="bg-gray-50 p-6 rounded-xl shadow-lg sticky top-4">
            <FilterContent
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              resetFilters={resetFilters}
            />
          </div>
        </aside>

        <main className="w-full md:w-3/4">
          {filterLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                  No products found matching your criteria.
                </p>
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
  handleCategoryChange,
  priceRange,
  setPriceRange,
  searchTerm,
  setSearchTerm,
  resetFilters,
  isMobile = false
}: FilterContentProps) {
  return (
    <>
      <div className="mb-6">
        <Label
          htmlFor="search"
          className="text-sm font-medium mb-2 block"
        >
          Search
        </Label>
        <Input
          type="text"
          id="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <label
                htmlFor={category.id}
                className="ml-2 text-sm font-medium cursor-pointer"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <Button
        onClick={resetFilters}
        variant="outline"
        className="w-full"
      >
        Reset Filters
      </Button>
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
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}