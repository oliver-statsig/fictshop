export interface Review {
  rating: number;
  text: string;
  author: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  description: string;
  imageUrl: string;
  reviews: Review[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Self-Refilling Coffee Cup',
    price: 299.99,
    description:
      'Never run out of coffee again! Warning: May cause excessive caffeine intake.',
    imageUrl: '/images/coffee-cup.png',
    reviews: [
      {
        rating: 5,
        text: 'I used to sleep sometimes, but now I can code 24/7! My productivity is through the roof, even if my hands are a bit shaky.',
        author: 'Caffeinated Coder',
        date: 'May 15, 2023',
      },
      {
        rating: 4,
        text: 'Works as advertised, but the infinite probability drive keeps turning my coffee into an existential crisis.',
        author: 'Arthur Dent',
        date: 'Apr 1, 2023',
      },
      {
        rating: 3,
        text: "Great cup, but it keeps filling itself even when I'm not thirsty. Had to buy a second desk for all the excess coffee cups.",
        author: 'Over-Hydrated Harry',
        date: 'Jun 12, 2023',
      },
    ],
  },
  {
    id: 2,
    name: 'Pocket Time Machine',
    price: 999999.99,
    salePrice: 42999.99,
    description:
      'Travel through time! Warranty void if you prevent your own birth.',
    imageUrl: '/images/time-machine.png',
    reviews: [
      {
        rating: 5,
        text: 'This product arrived yesterday and tomorrow simultaneously. Time travel shipping is amazing!',
        author: 'Doc Brown',
        date: 'Oct 21, 2015',
      },
      {
        rating: 4,
        text: 'Went back to invest in Bitcoin, but accidentally invented the internet instead. Task failed successfully?',
        author: 'Temporal Trader',
        date: 'Jan 3, 2009',
      },
      {
        rating: 5,
        text: "Finally, something from the future that doesn't try to terminate me! Would buy again.",
        author: 'Sarah Connor',
        date: 'Aug 29, 1997',
      },
    ],
  },
  {
    id: 3,
    name: 'Infinite Pizza Box',
    price: 499.99,
    description:
      'A pizza box that generates a fresh, hot pizza every time you open it. Toppings randomized.',
    imageUrl: '/images/pizza-box.png',
    reviews: [
      {
        rating: 5,
        text: 'Got pineapple on my first try! Then anchovies and marshmallows... Maybe the randomizer needs some tuning.',
        author: 'Pizza Roulette Player',
        date: 'Mar 3, 2023',
      },
      {
        rating: 4,
        text: 'Solved world hunger in my neighborhood! But my Italian grandmother is crying about the random toppings.',
        author: 'Charitable Chewer',
        date: 'Apr 15, 2023',
      },
      {
        rating: 3,
        text: 'Box works great, but my physics professor is having a breakdown about conservation of mass.',
        author: 'Science Student',
        date: 'May 20, 2023',
      },
    ],
  },
  {
    id: 4,
    name: 'Cloud Storage (Literal)',
    price: 799.99,
    description:
      'Store your belongings in actual clouds! Not responsible for rain-damaged items.',
    imageUrl: '/images/cloud-storage.png',
    reviews: [
      {
        rating: 4,
        text: 'Perfect storage solution! Though my neighbors are complaining about the rain of socks every time I do laundry.',
        author: 'Meteorological Minimalist',
        date: 'Feb 14, 2023',
      },
      {
        rating: 5,
        text: 'Upgraded to cumulonimbus for extra storage space. Best decision ever, even if it caused a small thunderstorm.',
        author: 'Weather Wizard',
        date: 'Mar 22, 2023',
      },
      {
        rating: 3,
        text: 'Lost my keys in a cloud drift. Found them two states over after a windy day.',
        author: 'Airheaded Alex',
        date: 'Apr 5, 2023',
      },
    ],
  },
  {
    id: 5,
    name: 'Universal Language Taste Buds',
    price: 1499.99,
    description:
      'Lick any text to instantly understand its meaning. Side effects may include paper cuts on tongue.',
    imageUrl: '/images/language-buds.png',
    reviews: [
      {
        rating: 5,
        text: 'Finally finished reading War and Peace in original Russian! Though my tongue is a bit sore.',
        author: 'Literary Licker',
        date: 'Jan 30, 2023',
      },
      {
        rating: 4,
        text: 'Works great on ancient texts! But accidentally licked a stop sign and now I cant stop thinking in octagon.',
        author: 'Historical Historian',
        date: 'Feb 28, 2023',
      },
      {
        rating: 3,
        text: 'The hieroglyphics taste like chicken. Not sure if working as intended.',
        author: 'Confused Curator',
        date: 'Mar 15, 2023',
      },
    ],
  },
  {
    id: 6,
    name: 'Dream DVR',
    price: 599.99,
    description:
      'Record and replay your dreams in 4K resolution. Premium subscription required for nightmare removal.',
    imageUrl: '/images/dream-dvr.png',
    reviews: [
      {
        rating: 5,
        text: 'Finally proved to my wife that I really did dream about doing the dishes!',
        author: 'Vindicated Victor',
        date: 'May 1, 2023',
      },
      {
        rating: 4,
        text: 'Great for studying! Though watching my math exam anxiety dreams on repeat might be counterproductive.',
        author: 'Sleepy Student',
        date: 'Jun 15, 2023',
      },
      {
        rating: 3,
        text: 'The ads in the free version are getting weird. My dreams now have sponsorship segments.',
        author: 'Dreamy Dan',
        date: 'Jul 1, 2023',
      },
    ],
  },
  {
    id: 7,
    name: 'Quantum Pet Portal',
    price: 2999.99,
    description:
      'Your pet exists in multiple places simultaneously! Warning: May cause existential crisis in dogs.',
    imageUrl: '/images/pet-portal.png',
    reviews: [
      {
        rating: 4,
        text: "Great product, but the quantum entanglement causes my cat to exist in two states simultaneously. She's both happy and angry about it.",
        author: 'Schrödinger',
        date: 'May 15, 2023',
      },
      {
        rating: 5,
        text: 'My dog can now chase its own tail in multiple dimensions! The vet bills are interdimensional though.',
        author: 'Quantum Canine Owner',
        date: 'Jun 20, 2023',
      },
      {
        rating: 3,
        text: 'Fish tank works great with this, but now my goldfish is questioning the nature of reality.',
        author: 'Philosophical Fish Parent',
        date: 'Jul 4, 2023',
      },
    ],
  },
];
