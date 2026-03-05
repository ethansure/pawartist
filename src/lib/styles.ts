export interface ArtStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: StyleCategory;
  preview: string;
  popular?: boolean;
  new?: boolean;
}

export type StyleCategory = 
  | "classic"
  | "modern"
  | "fantasy"
  | "cartoon"
  | "seasonal"
  | "artistic";

export const styleCategories: Record<StyleCategory, { name: string; description: string }> = {
  classic: {
    name: "Classic & Royal",
    description: "Timeless elegance and regal portraits",
  },
  modern: {
    name: "Modern Art",
    description: "Contemporary artistic styles",
  },
  fantasy: {
    name: "Fantasy & Adventure",
    description: "Magical and adventurous themes",
  },
  cartoon: {
    name: "Cartoon & Animation",
    description: "Fun animated and cartoon styles",
  },
  seasonal: {
    name: "Seasonal & Holiday",
    description: "Festive and seasonal themes",
  },
  artistic: {
    name: "Fine Art Styles",
    description: "Inspired by famous artists and movements",
  },
};

export const artStyles: ArtStyle[] = [
  // Classic & Royal
  {
    id: "royal-portrait",
    name: "Royal Portrait",
    description: "Transform your pet into Renaissance royalty",
    prompt: "A majestic royal portrait of a pet wearing ornate royal clothing with a golden crown, Renaissance oil painting style, regal pose, rich colors, detailed fabric textures, palace background with red velvet curtains",
    category: "classic",
    preview: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    popular: true,
  },
  {
    id: "military-general",
    name: "Military General",
    description: "Noble military commander with medals",
    prompt: "Distinguished military portrait of a pet as a decorated general, wearing military uniform with gold epaulettes and medals, formal pose, classical oil painting style, dignified expression",
    category: "classic",
    preview: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
  },
  {
    id: "victorian-noble",
    name: "Victorian Noble",
    description: "Elegant Victorian era aristocrat",
    prompt: "Victorian era portrait of a pet as an English noble, wearing formal Victorian attire with high collar, monocle, distinguished pose, sepia-toned classical painting style",
    category: "classic",
    preview: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
  },
  
  // Modern Art
  {
    id: "pop-art",
    name: "Pop Art",
    description: "Andy Warhol inspired vibrant pop art",
    prompt: "Bold pop art portrait of a pet in Andy Warhol style, vibrant contrasting colors, halftone dots, comic book aesthetic, high contrast, four panel style",
    category: "modern",
    preview: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
    popular: true,
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean, simple line art portrait",
    prompt: "Minimalist portrait of a pet, single continuous line drawing, clean white background, simple elegant strokes, modern art gallery style",
    category: "modern",
    preview: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
  },
  {
    id: "geometric",
    name: "Geometric",
    description: "Low-poly geometric art style",
    prompt: "Geometric low-poly portrait of a pet, triangular facets, vibrant gradient colors, modern digital art style, sharp edges, crystalline appearance",
    category: "modern",
    preview: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400",
    new: true,
  },
  
  // Cartoon & Animation
  {
    id: "disney-pixar",
    name: "Disney/Pixar",
    description: "Adorable 3D animated movie style",
    prompt: "3D animated portrait of a pet in Disney Pixar animation style, big expressive eyes, soft fur texture, warm lighting, heartwarming expression, movie poster quality",
    category: "cartoon",
    preview: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400",
    popular: true,
  },
  {
    id: "anime",
    name: "Anime/Manga",
    description: "Japanese anime art style",
    prompt: "Anime style portrait of a pet, large sparkling eyes, kawaii expression, soft pastel colors, manga illustration style, cherry blossom background",
    category: "cartoon",
    preview: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400",
    popular: true,
  },
  {
    id: "cartoon-classic",
    name: "Classic Cartoon",
    description: "Vintage cartoon character style",
    prompt: "Classic cartoon portrait of a pet in vintage animation style, bold outlines, expressive face, retro color palette, 1950s cartoon aesthetic",
    category: "cartoon",
    preview: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400",
  },
  {
    id: "chibi",
    name: "Chibi Style",
    description: "Cute oversized head anime style",
    prompt: "Chibi style portrait of a pet, oversized cute head, tiny body, big sparkly eyes, kawaii aesthetic, pastel background, adorable expression",
    category: "cartoon",
    preview: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400",
  },
  
  // Fine Art Styles
  {
    id: "oil-painting",
    name: "Oil Painting",
    description: "Classical oil painting technique",
    prompt: "Classical oil painting portrait of a pet, rich textured brushstrokes, dramatic lighting, warm earth tones, museum quality, Renaissance painting technique",
    category: "artistic",
    preview: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400",
    popular: true,
  },
  {
    id: "watercolor",
    name: "Watercolor",
    description: "Soft, flowing watercolor painting",
    prompt: "Delicate watercolor portrait of a pet, soft color washes, wet-on-wet technique, flowing paint edges, artistic splashes, dreamy pastel palette",
    category: "artistic",
    preview: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400",
  },
  {
    id: "van-gogh",
    name: "Van Gogh Style",
    description: "Swirling brushstrokes like Starry Night",
    prompt: "Portrait of a pet in Vincent van Gogh style, swirling expressive brushstrokes, vibrant colors, thick impasto technique, starry night background, post-impressionist",
    category: "artistic",
    preview: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400",
    popular: true,
  },
  {
    id: "impressionist",
    name: "Impressionist",
    description: "Monet-inspired soft impressionism",
    prompt: "Impressionist portrait of a pet, soft dappled light, loose brushwork, garden setting with flowers, Monet-inspired color palette, atmospheric quality",
    category: "artistic",
    preview: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=400",
  },
  {
    id: "sketch",
    name: "Pencil Sketch",
    description: "Detailed graphite pencil drawing",
    prompt: "Detailed pencil sketch of a pet, realistic graphite drawing, fine shading and hatching, textured paper background, artist study quality",
    category: "artistic",
    preview: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
  },
  {
    id: "stained-glass",
    name: "Stained Glass",
    description: "Medieval stained glass window",
    prompt: "Stained glass window art of a pet, vibrant jewel-toned colors, black lead outlines, cathedral light effect, Art Nouveau influence, glowing translucent appearance",
    category: "artistic",
    preview: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400",
    new: true,
  },
  
  // Fantasy & Adventure
  {
    id: "wizard",
    name: "Wizard",
    description: "Mystical wizard with magic powers",
    prompt: "Fantasy portrait of a pet as a powerful wizard, wearing wizard robes and hat, magical staff, glowing spell effects, mystical library background, enchanted atmosphere",
    category: "fantasy",
    preview: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400",
    popular: true,
  },
  {
    id: "knight",
    name: "Medieval Knight",
    description: "Brave knight in shining armor",
    prompt: "Medieval portrait of a pet as a noble knight, wearing gleaming plate armor, sword and shield, castle background, heroic pose, dramatic lighting",
    category: "fantasy",
    preview: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400",
  },
  {
    id: "fairy",
    name: "Fairy Tale",
    description: "Enchanted fairy tale character",
    prompt: "Magical fairy tale portrait of a pet with delicate fairy wings, surrounded by sparkles and flowers, enchanted forest background, dreamy soft lighting",
    category: "fantasy",
    preview: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
  },
  {
    id: "space-explorer",
    name: "Space Explorer",
    description: "Astronaut exploring the galaxy",
    prompt: "Sci-fi portrait of a pet as an astronaut, wearing detailed space suit, floating in space, Earth in background, stars and nebulae, cinematic lighting",
    category: "fantasy",
    preview: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
    new: true,
  },
  {
    id: "superhero",
    name: "Superhero",
    description: "Caped crusader saving the day",
    prompt: "Comic book style portrait of a pet as a superhero, wearing cape and mask, dynamic action pose, city skyline background, dramatic lighting, comic panel style",
    category: "fantasy",
    preview: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
  },
  
  // Seasonal & Holiday
  {
    id: "christmas",
    name: "Christmas",
    description: "Festive holiday portrait",
    prompt: "Cozy Christmas portrait of a pet, wearing Santa hat, surrounded by presents and Christmas tree, warm fireplace glow, snow falling outside window, festive atmosphere",
    category: "seasonal",
    preview: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
  },
  {
    id: "halloween",
    name: "Halloween",
    description: "Spooky Halloween costume",
    prompt: "Fun Halloween portrait of a pet, vampire or witch costume, pumpkins and bats, full moon background, spooky but cute atmosphere, purple and orange lighting",
    category: "seasonal",
    preview: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400",
  },
  {
    id: "beach-vacation",
    name: "Beach Vacation",
    description: "Tropical beach paradise",
    prompt: "Tropical beach portrait of a pet, wearing sunglasses and Hawaiian shirt, palm trees and ocean, sunset colors, vacation vibes, relaxed happy expression",
    category: "seasonal",
    preview: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
  },
  {
    id: "spring-garden",
    name: "Spring Garden",
    description: "Beautiful spring flower garden",
    prompt: "Spring garden portrait of a pet surrounded by blooming flowers, butterflies, soft pastel colors, golden hour lighting, fresh and joyful atmosphere",
    category: "seasonal",
    preview: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400",
  },
];

export const petTypes = [
  { id: "dog", name: "Dog", emoji: "🐕" },
  { id: "cat", name: "Cat", emoji: "🐱" },
  { id: "bird", name: "Bird", emoji: "🐦" },
  { id: "rabbit", name: "Rabbit", emoji: "🐰" },
  { id: "hamster", name: "Hamster", emoji: "🐹" },
  { id: "fish", name: "Fish", emoji: "🐠" },
  { id: "reptile", name: "Reptile", emoji: "🦎" },
  { id: "horse", name: "Horse", emoji: "🐴" },
  { id: "other", name: "Other", emoji: "🐾" },
];

export const backgroundOptions = [
  { id: "style-default", name: "Style Default", description: "Use the style's default background" },
  { id: "studio", name: "Studio", description: "Clean professional studio background" },
  { id: "nature", name: "Nature", description: "Beautiful outdoor nature scene" },
  { id: "home", name: "Home", description: "Cozy indoor home setting" },
  { id: "fantasy", name: "Fantasy", description: "Magical fantasy landscape" },
  { id: "transparent", name: "Transparent", description: "No background (PNG)" },
];
