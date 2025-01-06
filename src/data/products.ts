export interface Product {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  description: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Self-Refilling Coffee Cup",
    price: 299.99,
    description:
      "Never run out of coffee again! Warning: May cause excessive caffeine intake.",
    imageUrl: "/images/coffee-cup.png",
  },
  {
    id: 2,
    name: "Pocket Time Machine",
    price: 999999.99,
    salePrice: 42999.99,
    description:
      "Travel through time! Warranty void if you prevent your own birth.",
    imageUrl: "/images/time-machine.png",
  },
  {
    id: 3,
    name: "Infinite Pizza Box",
    price: 499.99,
    description:
      "A pizza box that generates a fresh, hot pizza every time you open it. Toppings randomized.",
    imageUrl: "/images/pizza-box.png",
  },
  {
    id: 4,
    name: "Cloud Storage (Literal)",
    price: 799.99,
    description:
      "Store your belongings in actual clouds! Not responsible for rain-damaged items.",
    imageUrl: "/images/cloud-storage.png",
  },
  {
    id: 5,
    name: "Universal Language Taste Buds",
    price: 1499.99,
    description:
      "Lick any text to instantly understand its meaning. Side effects may include paper cuts on tongue.",
    imageUrl: "/images/language-buds.png",
  },
  {
    id: 6,
    name: "Dream DVR",
    price: 599.99,
    description:
      "Record and replay your dreams in 4K resolution. Premium subscription required for nightmare removal.",
    imageUrl: "/images/dream-dvr.png",
  },
  {
    id: 7,
    name: "Quantum Pet Portal",
    price: 2999.99,
    description:
      "Your pet exists in multiple places simultaneously! Warning: May cause existential crisis in dogs.",
    imageUrl: "/images/pet-portal.png",
  },
];
