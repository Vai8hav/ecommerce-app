import { v4 as uuid } from "uuid";

import airpods from '../../images/audio/airpods.jpg';
import bose from '../../images/audio/bose.jpg';
import jbl from '../../images/audio/jbl.jpg';
import sennheiser from '../../images/audio/sennheiser.png';
import sony from '../../images/audio/sony.jpg';

import apple from '../../images/laptops/apple.jpg';
import asus from '../../images/laptops/asus.jpg';
import dell from '../../images/laptops/dell.jpg';
import hp from '../../images/laptops/hp.jpg';
import lenovo from '../../images/laptops/lenovo.jpeg';

import applemob from '../../images/mobiles/applemob.jpg';
import oneplus from '../../images/mobiles/oneplus.jpg';
import pixel from '../../images/mobiles/pixel.jpg';
import samsung from '../../images/mobiles/samsung.jpg';
import xiaomi from '../../images/mobiles/xiaomi.jpg';

import applewatch from '../../images/wearables/applewatch.jpg';
import fitbit from '../../images/wearables/fitbit.jpg';
import garmin from '../../images/wearables/garmin.jpg';
import samsungwatch from '../../images/wearables/samsungwatch.jpg';
import xiaomiwatch from '../../images/wearables/xiaomiwatch.jpg';

export const products = [
  // Laptops
  {
    _id: uuid(),
    category_name: "Laptops",
    title: "HP Spectre x360",
    brand: "HP",
    price: 1499,
    discounted_price: 1299,
    image: hp,
    description: "Powerful convertible laptop with a sleek design and high-performance features.",
    rating: 4.2,
    reviews: 120,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Laptops",
    title: "Dell XPS 13",
    brand: "Dell",
    price: 1399,
    discounted_price: 1099,
    image: dell,
    description: "Ultra-portable laptop with a stunning display and long battery life.",
    rating: 4.6,
    reviews: 95,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Laptops",
    title: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    price: 1699,
    discounted_price: 1349,
    image: lenovo,
    description: "Business-focused laptop with a durable build and exceptional performance.",
    rating: 2.8,
    reviews: 80,
    availability: false,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Laptops",
    title: "Apple MacBook Pro",
    brand: "Apple",
    price: 1999,
    discounted_price: 1849,
    image: apple,
    description: "Premium laptop with a stunning Retina display and powerful performance.",
    rating: 4.8,
    reviews: 150,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Laptops",
    title: "Asus ROG Zephyrus G14",
    brand: "Asus",
    price: 1699,
    discounted_price: 1485,
    image: asus,
    description: "Gaming laptop with a compact design and high-performance gaming capabilities.",
    rating: 3.9,
    reviews: 200,
    availability: true,
    delivery_time: 2
  },
  
  // Mobiles
  {
    _id: uuid(),
    category_name: "Phones",
    title: "Samsung Galaxy S21",
    brand: "Samsung",
    price: 899,
    discounted_price: 789,
    image: samsung,
    description: "Premium Android phone with a stunning display and versatile camera system.",
    rating: 4.1,
    reviews: 80,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Phones",
    title: "iPhone 13 Pro",
    brand: "Apple",
    price: 1099,
    discounted_price: 990,
    image: applemob,
    description: "Flagship smartphone with advanced camera capabilities and powerful performance.",
    rating: 4.8,
    reviews: 150,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Phones",
    title: "Google Pixel 6",
    brand: "Google",
    price: 799,
    discounted_price: 699,
    image: pixel,
    description: "Cutting-edge Android phone with a superb camera and seamless software experience.",
    rating: 3.7,
    reviews: 90,
    availability: false,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Phones",
    title: "OnePlus 9 Pro",
    brand: "OnePlus",
    price: 899,
    discounted_price: 779,
    image: oneplus,
    description: "High-performance phone with a smooth display and fast charging capabilities.",
    rating: 2.7,
    reviews: 75,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Phones",
    title: "Xiaomi Mi 11",
    brand: "Xiaomi",
    price: 699,
    discounted_price: 535,
    image: xiaomi,
    description: "Feature-packed smartphone with a competitive price and impressive specs.",
    rating: 2.5,
    reviews: 100,
    availability: true,
    delivery_time: 2
  },
  
  // Audio Devices
  {
    _id: uuid(),
    category_name: "Audio Devices",
    title: "Sony WH-1000XM4",
    brand: "Sony",
    price: 349,
    discounted_price: 299,
    image: sony,
    description: "Premium noise-canceling headphones with exceptional sound quality.",
    rating: 4.4,
    reviews: 200,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Audio Devices",
    title: "Apple AirPods Pro",
    brand: "Apple",
    price: 249,
    discounted_price: 229,
    image: airpods,
    description: "Wireless earbuds with active noise cancellation and a comfortable fit.",
    rating: 4.1,
    reviews: 150,
    availability: false,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Audio Devices",
    title: "Bose SoundLink Revolve",
    brand: "Bose",
    price: 199,
    discounted_price: 147,
    image: bose,
    description: "Portable Bluetooth speaker with 360-degree sound and long battery life.",
    rating: 3.6,
    reviews: 120,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Audio Devices",
    title: "JBL Flip 5",
    brand: "JBL",
    price: 119,
    discounted_price: 105,
    image: jbl,
    description: "Compact waterproof speaker with powerful audio and versatile connectivity.",
    rating: 1.9,
    reviews: 100,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Audio Devices",
    title: "Sennheiser HD 660 S",
    brand: "Sennheiser",
    price: 499,
    discounted_price: 439,
    image: sennheiser,
    description: "Open-back headphones with high-fidelity sound and comfortable design.",
    rating: 4.2,
    reviews: 250,
    availability: true,
    delivery_time: 2
  },
  
  // Wearables
  {
    _id: uuid(),
    category_name: "Wearables",
    title: "Apple Watch Series 7",
    brand: "Apple",
    price: 399,
    discounted_price: 359,
    image: applewatch,
    description: "Advanced smartwatch with a larger display and comprehensive health tracking.",
    rating: 4.6,
    reviews: 180,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Wearables",
    title: "Samsung Galaxy Watch 4",
    brand: "Samsung",
    price: 349,
    discounted_price: 299,
    image: samsungwatch,
    description: "Feature-rich smartwatch with extensive fitness tracking and stylish design.",
    rating: 4.2,
    reviews: 150,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Wearables",
    title: "Fitbit Charge 5",
    brand: "Fitbit",
    price: 179,
    discounted_price: 145,
    image: fitbit,
    description: "Advanced fitness tracker with built-in GPS and health monitoring features.",
    rating: 3.8,
    reviews: 120,
    availability: true,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Wearables",
    title: "Garmin Fenix 6 Pro",
    brand: "Garmin",
    price: 549,
    discounted_price: 520,
    image: garmin,
    description: "Multisport GPS watch with rugged construction and comprehensive activity tracking.",
    rating: 3.6,
    reviews: 200,
    availability: false,
    delivery_time: 2
  },
  {
    _id: uuid(),
    category_name: "Wearables",
    title: "Xiaomi Mi Band 6",
    brand: "Xiaomi",
    price: 49,
    discounted_price: 45,
    image: xiaomiwatch,
    description: "Affordable fitness tracker with a vibrant display and long battery life.",
    rating: 1.5,
    reviews: 100,
    availability: true,
    delivery_time: 2
  },
];

