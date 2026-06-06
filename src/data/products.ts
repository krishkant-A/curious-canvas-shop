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

const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/600`;

export const products: Product[] = [
  { id: "1", name: "Vintage Brass Compass", price: 48, image: img("compass1"), category: "bestsellers", tag: "Bestseller", seller: "OldWorldFinds", rating: 4.9, reviews: 1284 },
  { id: "2", name: "Handblown Glass Apothecary Jar", price: 62, image: img("jar2"), category: "bestsellers", tag: "Bestseller", seller: "EmberGlass", rating: 4.8, reviews: 932 },
  { id: "3", name: "Antique Pocket Watch", price: 145, image: img("watch3"), category: "bestsellers", seller: "TimeKeepers", rating: 4.7, reviews: 540 },
  { id: "4", name: "Botanical Pressed Print Set", price: 28, image: img("botanical4"), category: "bestsellers", seller: "FernAndFolk", rating: 4.9, reviews: 2210 },
  { id: "5", name: "Hand-Stitched Leather Journal", price: 54, image: img("journal5"), category: "bestsellers", seller: "InkAndHide", rating: 5.0, reviews: 870 },
  { id: "6", name: "Celestial Wall Tapestry", price: 78, image: img("tapestry6"), category: "bestsellers", seller: "MoonLoom", rating: 4.6, reviews: 412 },

  { id: "7", name: "Mushroom Ceramic Lamp", price: 96, image: img("lamp7"), category: "new", tag: "New", seller: "GlowGrove", rating: 4.8, reviews: 122 },
  { id: "8", name: "Hand-Poured Soy Candle — Library", price: 32, image: img("candle8"), category: "new", tag: "New", seller: "PaperWick", rating: 4.9, reviews: 318 },
  { id: "9", name: "Linen Embroidered Cushion", price: 44, image: img("cushion9"), category: "new", seller: "ThreadAndSeed", rating: 4.7, reviews: 88 },
  { id: "10", name: "Crystal Specimen Set", price: 38, image: img("crystal10"), category: "new", seller: "GeoMuse", rating: 4.8, reviews: 210 },
  { id: "11", name: "Carved Wooden Bookends", price: 64, image: img("bookends11"), category: "new", seller: "GrainAndChisel", rating: 5.0, reviews: 65 },
  { id: "12", name: "Vintage Travel Poster Print", price: 22, image: img("poster12"), category: "new", seller: "WanderPress", rating: 4.6, reviews: 156 },

  { id: "13", name: "Brass Telescope Replica", price: 220, image: img("telescope13"), category: "trending", tag: "Trending", seller: "StarChartCo", rating: 4.9, reviews: 402 },
  { id: "14", name: "Pressed Flower Frame", price: 36, image: img("flower14"), category: "trending", tag: "Trending", seller: "MeadowMade", rating: 4.8, reviews: 1003 },
  { id: "15", name: "Hand-Thrown Stoneware Mug", price: 28, image: img("mug15"), category: "trending", seller: "ClayCoLab", rating: 4.9, reviews: 2410 },
  { id: "16", name: "Antique Skeleton Key Set", price: 42, image: img("keys16"), category: "trending", seller: "RustAndRelic", rating: 4.7, reviews: 318 },
  { id: "17", name: "Velvet Tarot Cloth", price: 26, image: img("tarot17"), category: "trending", seller: "MoonLoom", rating: 4.8, reviews: 642 },
  { id: "18", name: "Miniature Terrarium Kit", price: 58, image: img("terrarium18"), category: "trending", seller: "FernAndFolk", rating: 4.9, reviews: 880 },
];

export const byCategory = (c: Product["category"]) => products.filter((p) => p.category === c);
export const findProduct = (id: string) => products.find((p) => p.id === id);
