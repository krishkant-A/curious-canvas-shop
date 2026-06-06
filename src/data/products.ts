export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "bestsellers" | "new" | "trending";
  tag?: string;
  seller: string;
  rating: number;
  reviews: number;
};

import mushroomLamp from "@/assets/mushroom-lamp.jpg";
import libraryCandle from "@/assets/library-candle.jpg";

// Curated Unsplash photos matched to each product
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

export const products: Product[] = [
  { id: "1", name: "Vintage Brass Compass", price: 48, image: u("1518562180175-34a163b1a9a6"), category: "bestsellers", tag: "Bestseller", seller: "OldWorldFinds", rating: 4.9, reviews: 1284 },
  { id: "2", name: "Handblown Glass Apothecary Jar", price: 62, image: u("1610701596007-11502861dcfa"), category: "bestsellers", tag: "Bestseller", seller: "EmberGlass", rating: 4.8, reviews: 932 },
  { id: "3", name: "Antique Pocket Watch", price: 145, image: u("1509048191080-d2984bad6ae5"), category: "bestsellers", seller: "TimeKeepers", rating: 4.7, reviews: 540 },
  { id: "4", name: "Botanical Pressed Print Set", price: 28, image: u("1493515322954-4fa727e97985"), category: "bestsellers", seller: "FernAndFolk", rating: 4.9, reviews: 2210 },
  { id: "5", name: "Hand-Stitched Leather Journal", price: 54, image: u("1531346878377-a5be20888e57"), category: "bestsellers", seller: "InkAndHide", rating: 5.0, reviews: 870 },
  { id: "6", name: "Celestial Wall Tapestry", price: 78, image: u("1532634922-8fe0b757fb13"), category: "bestsellers", seller: "MoonLoom", rating: 4.6, reviews: 412 },

  { id: "7", name: "Mushroom Ceramic Lamp", price: 96, image: mushroomLamp, category: "new", tag: "New", seller: "GlowGrove", rating: 4.8, reviews: 122 },
  { id: "8", name: "Hand-Poured Soy Candle — Library", price: 32, image: libraryCandle, category: "new", tag: "New", seller: "PaperWick", rating: 4.9, reviews: 318 },
  { id: "9", name: "Linen Embroidered Cushion", price: 44, image: u("1584100936595-c0654b55a2e2"), category: "new", seller: "ThreadAndSeed", rating: 4.7, reviews: 88 },
  { id: "10", name: "Crystal Specimen Set", price: 38, image: u("1611425143678-08fc480cafde"), category: "new", seller: "GeoMuse", rating: 4.8, reviews: 210 },
  { id: "11", name: "Carved Wooden Bookends", price: 64, image: u("1512820790803-83ca734da794"), category: "new", seller: "GrainAndChisel", rating: 5.0, reviews: 65 },
  { id: "12", name: "Vintage Travel Poster Print", price: 22, image: u("1528459801416-a9e53bbf4e17"), category: "new", seller: "WanderPress", rating: 4.6, reviews: 156 },

  { id: "13", name: "Brass Telescope Replica", price: 220, image: u("1532968961962-8a0cb3a2d4f5"), category: "trending", tag: "Trending", seller: "StarChartCo", rating: 4.9, reviews: 402 },
  { id: "14", name: "Pressed Flower Frame", price: 36, image: u("1490750967868-88aa4486c946"), category: "trending", tag: "Trending", seller: "MeadowMade", rating: 4.8, reviews: 1003 },
  { id: "15", name: "Hand-Thrown Stoneware Mug", price: 28, image: u("1514228742587-6b1558fcca3d"), category: "trending", seller: "ClayCoLab", rating: 4.9, reviews: 2410 },
  { id: "16", name: "Antique Skeleton Key Set", price: 42, image: u("1582139329536-e7284fece509"), category: "trending", seller: "RustAndRelic", rating: 4.7, reviews: 318 },
  { id: "17", name: "Velvet Tarot Cloth", price: 26, image: u("1601024445121-e5b82f020549"), category: "trending", seller: "MoonLoom", rating: 4.8, reviews: 642 },
  { id: "18", name: "Miniature Terrarium Kit", price: 58, image: u("1545241047-6083a3684587"), category: "trending", seller: "FernAndFolk", rating: 4.9, reviews: 880 },
];

export const byCategory = (c: Product["category"]) => products.filter((p) => p.category === c);
export const findProduct = (id: string) => products.find((p) => p.id === id);
