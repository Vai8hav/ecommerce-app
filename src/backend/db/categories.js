import { v4 as uuid } from "uuid";

import audio from '../../images/category/audio.jpg'
import mobiles from '../../images/category/mobiles.jpg'
import laptops from '../../images/category/laptops.jpg'
import wearables from '../../images/category/wearables.png'

export const categories = [
  {
    _id: uuid(),
    categoryName: "Phones",
    categoryImage: mobiles,
    description:
      "Latest smartphones with stunning displays, advanced cameras, and powerful processors for immersive mobile experiences.",
  },
  {
    _id: uuid(),
    categoryName: "Laptops",
    categoryImage: laptops,
    description:
      "Power-packed devices for work, gaming, and entertainment, with cutting-edge features and impressive performance.",
  },
  {
    _id: uuid(),
    categoryName: "Audio Devices",
    categoryImage: audio,
    description:
      "High-quality audio selection with crystal-clear sound, wireless connectivity, and stylish designs for exceptional listening.",
  },
  {
    _id: uuid(),
    categoryName: "Wearables",
    categoryImage: wearables,
    description:
      " Stylish smart accessories for notifications, health tracking, and seamless integration with daily activities.",
  },
];
