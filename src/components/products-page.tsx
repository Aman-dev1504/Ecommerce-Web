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
import { motion } from "framer-motion";
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
  { id: "casual", label: "Casual" },
  { id: "graphic", label: "Graphic" },
  { id: "sports", label: "Sports" },
  { id: "polo", label: "Polo" },
  { id: "limited_edition", label: "Limited" },
];

const priceRanges = [
  { label: "Under $50", value: [0, 50] },
  { label: "$50 - $100", value: [50, 100] },
  { label: "$100 - $150", value: [100, 150] },
  { label: "Over $150", value: [150, 1000] },
];

interface ProductsPageProps {
  initialProducts: Product[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ProductsPage({ initialProducts }: ProductsPageProps) {
  const limit = 9;
  const [cursor, setCursor] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const fetchProducts = useCallback(async (isInitialLoad = false) => {
    // Don't fetch if we're already loading or if we're not at initial load and there's no cursor
    if (isFetchingMore || (!isInitialLoad && !cursor)) return;

    try {
      isInitialLoad ? setLoading(true) : setIsFetchingMore(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("limit", limit.toString());
      if (cursor && !isInitialLoad) params.append("cursor", cursor);

      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();

      setProducts(prev => {
        // If initial load or no products yet, replace the list
        if (isInitialLoad || prev.length === 0) return data;
        // Otherwise append new products
        return [...prev, ...data];
      });

      // Update cursor if we got results
      if (data.length > 0) {
        setCursor(data[data.length - 1]?.id);
      }

      setHasMore(data.length === limit);
    } catch (err: any) {
      setError(err.message);
    } finally {
      isInitialLoad ? setLoading(false) : setIsFetchingMore(false);
    }
  }, [cursor, limit, isFetchingMore]);


  useEffect(() => {
    if (initialProducts.length === 0) {
      fetchProducts(true);
    }
  }, [fetchProducts, initialProducts]);

  useEffect(() => {
    if (products.length === 0) return;

    setFilterLoading(true);

    const timer = setTimeout(() => {
      let result = [...products];

      if (selectedCategories.length > 0) {
        result = result.filter(product =>
          selectedCategories.includes(product.category)
        );
      }

      if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
        result = result.filter(product =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
        );
      }

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(product =>
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
        );
      }

      setFilteredProducts(result);
      setFilterLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [products, selectedCategories, priceRange, searchTerm]);

  const handleNext = useCallback(() => {
    if (!hasMore || isFetchingMore) return;
    fetchProducts();
  }, [hasMore, isFetchingMore, fetchProducts]);

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

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 500),
    []
  );

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 text-center">
        <div className="bg-gray-100 border border-gray-200 text-gray-600 p-4 rounded-lg inline-block">
          {error}
        </div>
        <Button
          onClick={() => fetchProducts(true)}
          className="mt-4 bg-gray-900 text-white hover:bg-gray-800"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 bg-white">
      {/* Noise Gradient Blurred Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-60"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
            href="/"
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 sm:ml-auto">Our Collection</h1>

          <div className="w-full sm:w-auto flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search..."
                className="pl-10 border-gray-300 focus:border-gray-400"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              className="sm:hidden relative"
              onClick={() => setMobileFilterOpen(true)}
            >
              <Filter className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gray-900 text-white">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters */}
          <motion.div
            className="hidden md:block w-56 shrink-0 sticky top-24 h-fit"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`cat-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label
                          htmlFor={`cat-${category.id}`}
                          className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                        >
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Price range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range.label} className="flex items-center">
                        <Checkbox
                          id={`price-${range.label}`}
                          checked={priceRange[0] === range.value[0] && priceRange[1] === range.value[1]}
                          onCheckedChange={() => handlePriceRangeChange(range.value as [number, number])}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label
                          htmlFor={`price-${range.label}`}
                          className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                        >
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {(selectedCategories.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 1000 || searchTerm) && (
              <motion.div
                className="mb-6 flex flex-wrap gap-2"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {selectedCategories.map(categoryId => {
                  const category = categories.find(c => c.id === categoryId);
                  return (
                    <Badge
                      key={categoryId}
                      variant="outline"
                      className="flex items-center gap-1 bg-gray-50"
                    >
                      {category?.label}
                      <button onClick={() => handleCategoryChange(categoryId)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}

                {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                    {priceRanges.find(r =>
                      r.value[0] === priceRange[0] && r.value[1] === priceRange[1]
                    )?.label || `$${priceRange[0]} - $${priceRange[1]}`}
                    <button onClick={() => setPriceRange([0, 1000])}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {searchTerm && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                    Search: `{searchTerm}`
                    <button onClick={() => setSearchTerm("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </motion.div>
            )}

            {/* Products */}
            {filterLoading ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[...Array(6)].map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))}
              </motion.div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                className="text-center py-12 text-gray-500"
                variants={itemVariants}
              >
                <p className="text-lg">No products found</p>
                <p className="text-sm mt-2">Try adjusting your filters or search term</p>
                <Button
                  onClick={resetFilters}
                  variant="ghost"
                  className="mt-4 text-gray-600 hover:text-gray-800"
                >
                  Reset all filters
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProducts.map((product) => (
                    <motion.div key={product.id} variants={itemVariants}>
                      <Product product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {hasMore && (
                  <motion.div
                    className="mt-8 flex justify-center"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Button
                      onClick={handleNext}
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
                      disabled={isFetchingMore}
                    >
                      {isFetchingMore ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></span>
                          Loading...
                        </span>
                      ) : (
                        "Load more"
                      )}
                    </Button>
                  </motion.div>
                )}
              </>
            )}

          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {
        mobileFilterOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`mob-cat-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                          className="h-5 w-5 rounded border-gray-300"
                        />
                        <label
                          htmlFor={`mob-cat-${category.id}`}
                          className="ml-3 text-gray-700"
                        >
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Price range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range.label} className="flex items-center">
                        <Checkbox
                          id={`mob-price-${range.label}`}
                          checked={priceRange[0] === range.value[0] && priceRange[1] === range.value[1]}
                          onCheckedChange={() => handlePriceRangeChange(range.value as [number, number])}
                          className="h-5 w-5 rounded border-gray-300"
                        />
                        <label
                          htmlFor={`mob-price-${range.label}`}
                          className="ml-3 text-gray-700"
                        >
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <Button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                >
                  Show {filteredProducts.length} products
                </Button>
              </div>
            </div>
          </motion.div>
        )
      }
    </div >
  );
}

function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-square rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

function ProductsPageSkeleton() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-48 sm:ml-auto" />
          <Skeleton className="h-10 w-full sm:w-64" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}