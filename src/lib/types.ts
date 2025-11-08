export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  details: string[];
  reviews: Review[];
};

export type Review = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  videoUrl?: string;
};
