import { PizzaItem, SpecialOffer, Review } from "@/types/pizza";

export const PIZZA_MENU: PizzaItem[] = [
  {
    id: "margherita-dop",
    name: "Margherita D.O.P.",
    italianName: "La Vera Margherita Napoletana",
    description:
      "Hand-crushed San Marzano D.O.P. tomatoes, fresh Campania buffalo mozzarella, fragrant wild sweet basil, extra virgin olive oil & sea salt on 48h sourdough crust.",
    price: 18.5,
    originalPrice: 21.0,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1000&auto=format&fit=crop",
    category: "Classic",
    isVegetarian: true,
    isBestseller: true,
    ingredients: [
      "San Marzano D.O.P.",
      "Campania Buffalo Mozzarella",
      "Sweet Wild Basil",
      "Organic EVOO",
      "Trapani Sea Salt",
    ],
    calories: 780,
    prepTime: "90 sec in 450°C oven",
  },
  {
    id: "diavola-piccante",
    name: "Diavola Piccante",
    italianName: "Pizza alla Diavola con 'Nduja",
    description:
      "Spicy Calabrian soppressata salami, melted Fior di Latte mozzarella, spreadable spicy 'Nduja, organic chili-infused wildflower honey & charred chili peppers.",
    price: 21.0,
    originalPrice: 24.5,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop",
    category: "Spicy",
    isSpicy: true,
    isBestseller: true,
    ingredients: [
      "Calabrian Soppressata",
      "Fior di Latte",
      "Spicy 'Nduja Paste",
      "San Marzano Tomato",
      "Calabrian Hot Honey",
    ],
    calories: 920,
    prepTime: "90 sec in 450°C oven",
  },
  {
    id: "tartufo-porcini",
    name: "Tartufo & Wild Funghi",
    italianName: "Crema di Tartufo Nero & Porcini",
    description:
      "Velvety Umbrian black summer truffle crema, pan-roasted wild porcini & cremini mushrooms, smoked scamorza, fresh fior di latte & 24-month aged Parmigiano Reggiano.",
    price: 24.0,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
    category: "Special",
    isChefSpecial: true,
    isVegetarian: true,
    ingredients: [
      "Black Truffle Crema",
      "Wild Porcini Mushrooms",
      "Smoked Scamorza",
      "Parmigiano Reggiano 24m",
      "Fresh Thyme Sprig",
    ],
    calories: 860,
    prepTime: "90 sec in 450°C oven",
  },
  {
    id: "quattro-formaggi",
    name: "Quattro Formaggi Nobile",
    italianName: "I Quattro Grandi Formaggi",
    description:
      "A rich, bubbling harmony of Fior di Latte, aged Gorgonzola D.O.P. Dolce, melted mountain Taleggio, and salty Pecorino Romano, finished with crushed walnuts & fig balsamic.",
    price: 22.5,
    originalPrice: 25.0,
    image:
      "https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=1000&auto=format&fit=crop",
    category: "Cheese",
    isVegetarian: true,
    ingredients: [
      "Fior di Latte Mozzarella",
      "Gorgonzola D.O.P.",
      "Taleggio Mountain Cheese",
      "Pecorino Romano",
      "Toasted Walnuts & Fig Glaze",
    ],
    calories: 980,
    prepTime: "90 sec in 450°C oven",
  },
  {
    id: "prosciutto-burrata",
    name: "Prosciutto di Parma & Burrata",
    italianName: "Parma 24 Mesi & Burrata Pugliese",
    description:
      "Hand-stretched crust crowned with crushed San Marzano base, topped after baking with whole creamy Pugliese burrata, 24-month Prosciutto di Parma, baby arugula & Modena balsamic.",
    price: 25.5,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
    category: "Special",
    isChefSpecial: true,
    isBestseller: true,
    ingredients: [
      "Whole Pugliese Burrata",
      "Prosciutto di Parma 24m",
      "San Marzano D.O.P.",
      "Wild Baby Arugula",
      "Aged Balsamic of Modena",
    ],
    calories: 910,
    prepTime: "90 sec in 450°C oven",
  },
  {
    id: "capricciosa-reale",
    name: "Capricciosa Tradizionale",
    italianName: "La Ricca Capricciosa Napoletana",
    description:
      "Delicate Italian rosemary roasted ham (prosciutto cotto), tender grilled artichoke hearts, black Gaeta olives, earthy field mushrooms, crushed tomato sauce and fior di latte.",
    price: 21.5,
    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1000&auto=format&fit=crop",
    category: "Classic",
    ingredients: [
      "Rosemary Roasted Ham",
      "Roman Artichoke Hearts",
      "Gaeta Black Olives",
      "Field Mushrooms",
      "San Marzano Sauce",
    ],
    calories: 840,
    prepTime: "90 sec in 450°C oven",
  },
  {
    id: "calzone-rustico",
    name: "Calzone Farcito al Forno",
    italianName: "Il Tradizionale Calzone Napoletano",
    description:
      "Golden folded crust filled with whipped cow ricotta, smoked provola cheese, spicy salame Napoli, fresh basil, topped with warm tomato glaze and melted mozzarella.",
    price: 20.0,
    originalPrice: 23.0,
    image:
      "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1000&auto=format&fit=crop",
    category: "Special",
    ingredients: [
      "Whipped Ricotta",
      "Smoked Provola",
      "Salame Napoli",
      "San Marzano Glaze",
      "Fresh Basil Leaves",
    ],
    calories: 1020,
    prepTime: "110 sec in 450°C oven",
  },
  {
    id: "cinque-formaggi-honey",
    name: "Cinque Formaggi & Hot Honey",
    italianName: "Cinque Formaggi con Miele Piccante",
    description:
      "Five artisan cheeses: Fior di Latte, smoked Scamorza, creamy Mascarpone, sharp Fontina, and Gorgonzola, generously drizzled with habanero chili wildflower honey.",
    price: 23.0,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1000&auto=format&fit=crop",
    category: "Cheese",
    isVegetarian: true,
    isBestseller: true,
    ingredients: [
      "Fior di Latte",
      "Smoked Scamorza",
      "Italian Mascarpone",
      "Fontina Valle d'Aosta",
      "Gorgonzola & Hot Honey",
    ],
    calories: 990,
    prepTime: "90 sec in 450°C oven",
  },
  {
    id: "fuoco-di-napoli",
    name: "Fuoco di Napoli",
    italianName: "Pizza Fuoco & Peperoncino",
    description:
      "For true heat lovers: Fiery Calabrian chili sauce, spicy capocollo, roasted red bell peppers, charred habanero crisp, fresh buffalo mozzarella, and basil oil.",
    price: 22.0,
    image:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1000&auto=format&fit=crop",
    category: "Spicy",
    isSpicy: true,
    ingredients: [
      "Calabrian Chili Oil",
      "Spicy Capocollo",
      "Roasted Sweet Peppers",
      "Habanero Flakes",
      "Campania Mozzarella",
    ],
    calories: 890,
    prepTime: "90 sec in 450°C oven",
  },
  {
    id: "ortolana-giardino",
    name: "Ortolana del Giardino",
    italianName: "Verdure Grigliate & Pesto di Basilico",
    description:
      "Oven-roasted baby zucchini, tender Japanese eggplant, sweet cherry tomatoes, caramelized red onions, roasted garlic cloves, Fior di Latte, and a drizzle of emerald basil pesto.",
    price: 19.5,
    originalPrice: 22.0,
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=1000&auto=format&fit=crop",
    category: "Classic",
    isVegetarian: true,
    ingredients: [
      "Fire-Roasted Zucchini",
      "Grilled Eggplant",
      "Caramelized Tropea Onions",
      "Cherry Tomatoes",
      "Emerald Basil Pesto",
    ],
    calories: 740,
    prepTime: "90 sec in 450°C oven",
  },
  {
    id: "gamberi-pesto",
    name: "Gamberi & Pesto Genovese",
    italianName: "Gamberi al Forno e Fior di Latte",
    description:
      "Pan-roasted Mediterranean wild garlic prawns, Ligurian basil pesto, sweet datterini tomatoes, fresh Stracciatella cheese, and grated lemon zest on a crisp sourdough base.",
    price: 26.0,
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=1000&auto=format&fit=crop",
    category: "Special",
    isChefSpecial: true,
    ingredients: [
      "Mediterranean Garlic Prawns",
      "Ligurian Basil Pesto",
      "Stracciatella Cheese",
      "Sweet Datterini",
      "Sorrento Lemon Zest",
    ],
    calories: 870,
    prepTime: "90 sec in 450°C oven",
  },
  {
    id: "carnivora-suprema",
    name: "Carnivora Suprema",
    italianName: "La Grande Macelleria Italiana",
    description:
      "Cured artisan pancetta, slow-braised Italian fennel pork sausage, crispy artisanal pepperoni, smoked mozzarella, San Marzano base, and toasted crushed fennel seeds.",
    price: 23.5,
    image:
      "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=1000&auto=format&fit=crop",
    category: "Classic",
    ingredients: [
      "Artisan Pancetta",
      "Fennel Pork Sausage",
      "Crisp Pepperoni Cups",
      "Smoked Scamorza",
      "San Marzano Base",
    ],
    calories: 1060,
    prepTime: "90 sec in 450°C oven",
  },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: "offer-family-feast",
    title: "Napoli Family Feast",
    italianSubtitle: "La Grande Festa di Famiglia",
    description:
      "Select any 2 Large Signature Wood-Fired Pizzas, accompanied by our garlic & rosemary focaccia, house-made heritage Tiramisù, and 4 Italian sparkling sodas.",
    discountBadge: "SAVE 25%",
    originalPrice: 68.0,
    discountPrice: 49.5,
    image:
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1000&auto=format&fit=crop",
    code: "BELLA20",
    itemsIncluded: [
      "2x Large Signature Pizzas (Any)",
      "1x Warm Rosemary Garlic Focaccia",
      "1x Handcrafted Classic Tiramisù",
      "4x San Pellegrino Sparkling Drinks",
    ],
    tag: "Most Popular Combo",
  },
  {
    id: "offer-date-night",
    title: "Duo Date Night Special",
    italianSubtitle: "Cena Romantica a Due",
    description:
      "A romantic Italian evening featuring your choice of 2 Gourmet Pizzas, a whole fresh Pugliese Burrata with heirloom tomatoes & balsamic glaze, and 2 craft beverages.",
    discountBadge: "SAVE $15",
    originalPrice: 56.0,
    discountPrice: 41.0,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
    code: "DATENIGHT",
    itemsIncluded: [
      "2x Gourmet Artisan Pizzas",
      "1x Fresh Burrata & Heirloom Salad",
      "2x Italian Artisanal Sodas or Wine Pairing",
      "Complimentary Mini Cannoli Duo",
    ],
    tag: "Chef's Recommendation",
  },
  {
    id: "offer-fire-lunch",
    title: "Fire & Spice Express Lunch",
    italianSubtitle: "Pausa Pranzo Napoletana",
    description:
      "Available daily 11:30 AM – 4:00 PM: 1 Personal Wood-Fired Pizza of choice, crisp organic Italian garden salad with shaved parmesan, and beverage.",
    discountBadge: "LUNCH COMBO $18.99",
    originalPrice: 27.5,
    discountPrice: 18.99,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop",
    code: "LUNCH18",
    itemsIncluded: [
      "1x 10\" Wood-Fired Personal Pizza",
      "1x Organic Garden Shaved Parmigiano Salad",
      "1x Italian Blood Orange Soda / Espresso",
    ],
    tag: "Daily Express 11:30-4PM",
  },
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    icon: "Wheat",
    title: "48-Hour Sourdough Fermentation",
    subtitle: "Light, airy & easily digestible",
    description:
      "Our dough is naturally fermented for two full days using 100% Italian Caputo Tipo 00 flour and our 40-year-old sourdough starter. Crispy blistered crust with a cloud-like interior.",
  },
  {
    icon: "Flame",
    title: "450°C Volcanic Stone Oven",
    subtitle: "Fast baking in 90 seconds",
    description:
      "Handcrafted in Naples using Mount Vesuvius volcanic stone. Burning aged oak and olive wood, it flash-bakes pizzas in 90 seconds, sealing in flavors while keeping toppings vibrant.",
  },
  {
    icon: "Award",
    title: "100% Certified D.O.P. Ingredients",
    subtitle: "Imported straight from Campania",
    description:
      "Certified San Marzano tomatoes ripened in volcanic soil, creamy buffalo mozzarella from Caserta, and 24-month aged Prosciutto di Parma. We never compromise on authenticity.",
  },
  {
    icon: "Bike",
    title: "Thermal Induction Fast Delivery",
    subtitle: "Piping hot in under 30 minutes",
    description:
      "Equipped with active thermal heating transport boxes. Your pizza arrives at your doorstep with the exact same crisp crust and melted mozzarella as if served right at our bar.",
  },
  {
    icon: "ChefHat",
    title: "Certified AVPN Master Pizzaiolos",
    subtitle: "Generations of Neapolitan craft",
    description:
      "Every single pizza is hand-stretched and slung by pizzaiolos trained in Naples according to the strict traditional rules of the Associazione Verace Pizza Napoletana.",
  },
  {
    icon: "Leaf",
    title: "Zero Preservatives & Eco-Packaged",
    subtitle: "Pure, natural & sustainable",
    description:
      "No artificial flavor enhancers, GMOs, or commercial additives. All pizza boxes and containers are 100% compostable and made from recycled unbleached fiber.",
  },
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Gianluca Rossi",
    role: "Food & Wine Critic, Milano",
    rating: 5,
    comment:
      "As someone born in Napoli, I am remarkably tough on pizzerias outside Italy. Forno Antico is the real deal. The blistered 'cornicione' crust has that unmistakable smoky chew, and the San Marzano tomato sweetness is pure perfection.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    pizzaOrdered: "Margherita D.O.P. & Diavola",
    date: "2 days ago",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Elena Rostova",
    role: "Verified Local Diner",
    rating: 5,
    comment:
      "The Tartufo & Porcini pizza is worth every single penny! The aroma hit the table before the plate even touched down. The crust is light as air — you finish an entire pizza and feel energized, not weighed down.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    pizzaOrdered: "Tartufo & Wild Funghi",
    date: "1 week ago",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Marcus Sterling",
    role: "Culinary Enthusiast",
    rating: 5,
    comment:
      "Ordered the Family Feast for our anniversary dinner. Arrived at our door in 22 minutes steaming hot! The crust had that authentic woodfire crunch. The kids devoured the Margherita and my wife adored the Prosciutto e Burrata.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    pizzaOrdered: "Napoli Family Feast Combo",
    date: "3 days ago",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Sofia Marchetti",
    role: "Verified Local Diner",
    rating: 5,
    comment:
      "The hot honey with five Italian cheeses is an absolute revelation. Sweet, spicy, rich, savory all in one bite. Atmosphere inside the restaurant is stunning too with warm candlelight and jazz.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    pizzaOrdered: "Cinque Formaggi & Hot Honey",
    date: "2 weeks ago",
    verified: true,
  },
];
