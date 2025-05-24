"use client"
import React, { useEffect, useState, useTransition } from "react";
import Container from "@/components/Container";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { logout } from "@/actions/logout";
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingBag, User as UserIcon, X } from "lucide-react";
import { Cart } from "@/actions/redis";
import SparklesText from "./ui/sparkles-text";
import ShimmerButton from "./ui/shimmer-button";

function Navbar({ user, cart }: { user: User; cart: Cart | null }) {
  const [hidden, setHidden] = useState(false);
  const [pending, startTransition] = useTransition();
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleLogout = () => startTransition(() => logout());

  const totalItems = cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/our-products", label: "Shop" },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
  ];

  return (
    <motion.header
      className="fixed w-full z-50 bg-white px-4 sm:px-6 box-border overflow-hidden"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="relative">
        {/* Blur Background */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-md shadow-sm" />

        <Container>
          <nav className="relative flex items-center justify-between h-16 md:h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <SparklesText text="TeeWorld" className="text-lg md:text-xl font-bold" sparklesCount={3} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-sm font-medium text-gray-700 hover:text-primary transition-colors group"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link href={!user ? "/auth/login" : "/cart"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative hover:bg-primary/5"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User Menu - Desktop */}
              <div className="hidden md:block">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-primary/5"
                      >
                        <UserIcon className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/auth/login">
                    <ShimmerButton
                    // size="sm"
                    // className="bg-primary hover:bg-primary/90 text-white hover:text-black"
                    >
                      Sign in
                    </ShimmerButton>
                  </Link>
                )}
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:bg-primary/5">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-full max-w-full sm:max-w-sm p-0 bg-white border-none overflow-y-aut"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-full bg-white"
                    >
                      <div className="p-4 border-b">
                        <div className="flex items-center justify-between">
                          <SparklesText text="TeeWorld" className="text-lg font-bold" sparklesCount={2} />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-primary/5"
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      <motion.div
                        className="flex-1 overflow-y-auto py-4 px-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                      >
                        <div className="space-y-2">
                          {navLinks.map((link, index) => (
                            <motion.div
                              key={link.label}
                              variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                              }}
                            >
                              <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-2 py-3 text-lg font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                              >
                                {link.label}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <div className="mt-auto border-t p-4 bg-gray-50">
                        {user ? (
                          <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="px-2">
                              <div className="text-sm font-medium">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                            <Button
                              variant="ghost"
                              onClick={handleLogout}
                              className="w-full justify-start px-2 hover:bg-primary/5"
                            >
                              Sign out
                            </Button>
                          </motion.div>
                        ) : (
                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                                Sign in
                              </Button>
                            </Link>
                            <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                              <Button variant="outline" className="w-full">
                                Create account
                              </Button>
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav>
        </Container>
      </div>
    </motion.header>
  );
}

export default Navbar;