"use client"
import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Facebook,
  ArrowUpRight,
  Send,
  ChevronRight
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer = () => {
  const footerLinks = {
    Company: ['About Us', 'Careers', 'News'],
    Support: ['Contact Us', 'Shipping & Returns', 'FAQs'],
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: Twitter, color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-600' },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                Teeworld
                <span className="text-primary">.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xs">
                Elevating your style game, one tee at a time. Join the revolution.
              </p>
            </div>

            {/* Newsletter Card */}
            <Card className="border-none shadow-none bg-gray-50/50">
              <CardContent className="py-4 space-y-3">
                <p className="text-sm font-medium">Join our newsletter ✨</p>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    className="h-9"
                  />
                  <Button size="sm" className="px-3 hover:text-black">
                    <Send className="w-4 h-4 hover:text-black" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold text-muted-foreground">
                {title}
              </h3>
              <ul className="space-y-3 text-sm">
                {links.map((link) => (
                  <motion.li key={link} whileHover={{ x: 2 }}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="#"
                            className="group inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ChevronRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 transition-all" />
                            <span>{link}</span>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Visit {link}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-muted-foreground">
              Connect With Us
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ name, icon: Icon, color }) => (
                <TooltipProvider key={name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href="#"
                        whileHover={{ y: -3 }}
                        className={`p-2 rounded-md hover:bg-gray-50 ${color} transition-colors`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on {name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </motion.div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Teeworld. All rights reserved.</p>
          <div className="flex gap-6">
            <motion.a
              href="#"
              className="hover:text-foreground transition-colors"
              whileHover={{ x: 2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-foreground transition-colors"
              whileHover={{ x: 2 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;