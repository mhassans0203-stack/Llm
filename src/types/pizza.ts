export interface PizzaItem {
  id: string;
  name: string;
  italianName: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "Classic" | "Special" | "Cheese" | "Spicy";
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  ingredients: string[];
  calories?: number;
  prepTime?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  italianSubtitle: string;
  description: string;
  discountBadge: string;
  originalPrice: number;
  discountPrice: number;
  image: string;
  code: string;
  itemsIncluded: string[];
  tag: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  pizzaOrdered: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  id: string; // unique cart line id (includes custom options)
  pizzaId: string;
  name: string;
  italianName: string;
  price: number;
  image: string;
  quantity: number;
  size: "12 inch" | "16 inch";
  crust: "Classic Neapolitan" | "Gluten-Free (+ $3.00)" | "Stuffed Mozzarella Crust (+ $4.00)";
  extraToppings: string[];
  spiceLevel: "Mild" | "Medium" | "Hot Calabrian 🔥";
  notes?: string;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: "Main Dining Hall" | "Veranda & Garden" | "Chef's Counter" | "Private Wine Room";
  specialNotes?: string;
}
