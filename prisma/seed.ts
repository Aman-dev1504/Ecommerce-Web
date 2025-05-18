import { db } from "../src/lib/db";
import { Size, Category, Gender } from "@prisma/client";

async function main() {
  const products = [
    {
      title: "Classic Cotton Crew Neck",
      description:
        "A timeless crew neck t-shirt made from 100% organic cotton. Perfect for everyday wear with a comfortable fit and breathable fabric.",
      price: 24.99,
      imageUrls: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      ],
      category: "CASUAL",
      sizes: ["S", "M", "L", "XL"],
      gender: "UNISEX",

      featured: true,
      isActive: true,
    },
    {
      title: "Vintage Graphic Print Tee",
      description:
        "Retro-inspired graphic t-shirt featuring classic artwork. Made from soft cotton blend for ultimate comfort.",
      price: 29.99,
      imageUrls: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        "https://images.unsplash.com/photo-1503342394128-c104d54dba01",
      ],
      category: "GRAPHIC",
      sizes: ["S", "M", "L", "XL", "XXL"],
      gender: "UNISEX",

      featured: false,
      isActive: true,
    },
    {
      title: "Performance Sport Tee",
      description:
        "High-performance athletic t-shirt with moisture-wicking technology. Perfect for workouts and active lifestyle.",
      price: 34.99,
      imageUrls: [
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820",
        "https://images.unsplash.com/photo-1581655504306-47d13d427a58",
      ],
      category: "SPORTS",
      sizes: ["S", "M", "L", "XL"],
      gender: "MEN",

      featured: true,
      isActive: true,
    },
    {
      title: "Women's Fitted Sports Tee",
      description:
        "Specially designed sports t-shirt for women with a flattering fit and quick-dry fabric.",
      price: 34.99,
      imageUrls: [
        "https://images.unsplash.com/photo-1515774004412-9c1eb0ad49c9",
        "https://images.unsplash.com/photo-1515774004412-9c1eb0ad49c8",
      ],
      category: "SPORTS",
      sizes: ["XS", "S", "M", "L", "XL"],
      gender: "WOMEN",

      featured: true,
      isActive: true,
    },
    {
      title: "Premium Polo Shirt",
      description:
        "Classic polo shirt with a modern fit. Perfect for both casual and semi-formal occasions.",
      price: 44.99,
      imageUrls: [
        "https://images.unsplash.com/photo-1585856431232-801e1e8aee83",
        "https://images.unsplash.com/photo-1585856431231-444c5784f410",
      ],
      category: "POLO",
      sizes: ["S", "M", "L", "XL", "XXL"],
      gender: "MEN",

      featured: false,
      isActive: true,
    },
    {
      title: "Limited Edition Artist Series",
      description:
        "Exclusive collection featuring unique artwork from local artists. Each piece is numbered and comes with a certificate.",
      price: 49.99,
      imageUrls: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f28",
      ],
      category: "LIMITED_EDITION",
      sizes: ["S", "M", "L", "XL"],
      gender: "UNISEX",

      featured: true,
      isActive: true,
    },

    {
      title: "Eco-Friendly Bamboo Tee",
      description:
        "Soft, sustainable t-shirt made from bamboo fibers. Naturally breathable and antibacterial.",
      price: 32.99,
      imageUrls: [
        "https://images.unsplash.com/photo-1593032465171-b1efcb8c5e3d",
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8c",
      ],
      category: "CASUAL",
      sizes: ["S", "M", "L", "XL"],
      gender: "UNISEX",
      featured: false,
      isActive: true,
    },
    {
      title: "Tie-Dye Summer Tee",
      description:
        "Colorful tie-dye t-shirt, perfect for festivals and summer outings. Made from soft cotton.",
      price: 27.99,
      imageUrls: [
        "https://images.unsplash.com/photo-1629385967033-e7a5b60c2556",
        "https://images.unsplash.com/photo-1618354691330-df0df0995c82",
      ],
      category: "GRAPHIC",
      sizes: ["M", "L", "XL"],
      gender: "UNISEX",
      featured: true,
      isActive: true,
    },
    {
      title: "Slim Fit Henley Tee",
      description:
        "Modern henley-style tee with a three-button placket. Ideal for layering or solo wear.",
      price: 38.99,
      imageUrls: [
        "https://images.unsplash.com/photo-1520975698519-59b1d4b8e0c6",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      ],
      category: "CASUAL",
      sizes: ["S", "M", "L"],
      gender: "MEN",
      featured: false,
      isActive: true,
    },
    {
      title: "Seamless Workout Tee",
      description:
        "Engineered seamless t-shirt designed to reduce chafing. Stretchable and ideal for performance training.",
      price: 36.99,
      imageUrls: [
        "https://images.unsplash.com/photo-1600185365584-55c8eb4a3561",
        "https://images.unsplash.com/photo-1600185365527-3a6f6b3df8bb",
      ],
      category: "SPORTS",
      sizes: ["XS", "S", "M", "L", "XL"],
      gender: "WOMEN",
      featured: true,
      isActive: true,
    },
  ];
  // Insert data into the database
  for (const product of products) {
    await db.product.create({
      data: {
        ...product,
        sizes: product.sizes as Size[],
        category: product.category as Category,
        gender: product.gender as Gender,
      },
    });
  }

  console.log("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
