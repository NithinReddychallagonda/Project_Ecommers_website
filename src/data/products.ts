import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import product7 from '@/assets/product-7.jpg';
import product8 from '@/assets/product-8.jpg';
import product9 from '@/assets/product-9.jpg';
import product10 from '@/assets/product-10.jpg';
import product11 from '@/assets/product-11.jpg';
import product12 from '@/assets/product-12.jpg';
import product13 from '@/assets/product-13.jpg';
import product14 from '@/assets/product-14.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'co-ords' | 'streetwear' | 'essentials';
  tag?: 'Best Seller' | 'Limited Stock' | 'New Drop';
  stock: number;
  rating: number;
  reviewCount: number;
  sizes: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Noir Oversized Co-ord Set',
    price: 4999,
    originalPrice: 6999,
    image: product1,
    category: 'co-ords',
    tag: 'Best Seller',
    stock: 3,
    rating: 4.8,
    reviewCount: 124,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium heavyweight cotton co-ord set featuring an oversized tee and wide-leg pants. Relaxed silhouette with a structured drape. Perfect for elevated everyday wear.',
  },
  {
    id: '2',
    name: 'Sand Dune Hoodie Set',
    price: 5499,
    originalPrice: 7499,
    image: product2,
    category: 'streetwear',
    tag: 'Limited Stock',
    stock: 5,
    rating: 4.9,
    reviewCount: 89,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Ultra-soft brushed fleece hoodie paired with matching joggers. Relaxed oversized fit with ribbed cuffs. The perfect weekend uniform.',
  },
  {
    id: '3',
    name: 'Cloud Nine Sweat Set',
    price: 3999,
    image: product3,
    category: 'essentials',
    tag: 'New Drop',
    stock: 12,
    rating: 4.7,
    reviewCount: 56,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Minimal crew neck sweatshirt paired with tailored shorts. Clean aesthetic with premium terry fabric. Effortless comfort meets refined style.',
  },
  {
    id: '4',
    name: 'Tactical Cargo Set',
    price: 6499,
    originalPrice: 8999,
    image: product4,
    category: 'streetwear',
    tag: 'Best Seller',
    stock: 2,
    rating: 4.9,
    reviewCount: 201,
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Military-inspired cargo set in olive drab. Features utility pockets, adjustable waist, and cropped jacket. Commanding street presence.',
  },
  {
    id: '5',
    name: 'Shadow Blazer Co-ord',
    price: 7999,
    image: product5,
    category: 'co-ords',
    stock: 8,
    rating: 4.6,
    reviewCount: 43,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Oversized blazer with matching wide-leg trousers in deep charcoal. Deconstructed tailoring for the modern minimalist. From boardroom to bar.',
  },
  {
    id: '6',
    name: 'Ivory Knit Polo Set',
    price: 5999,
    originalPrice: 7999,
    image: product6,
    category: 'co-ords',
    tag: 'Limited Stock',
    stock: 4,
    rating: 4.8,
    reviewCount: 67,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ribbed knit polo with matching pleated trousers in warm ivory. Refined luxury meets effortless cool. A weekend essential elevated.',
  },
  {
    id: '7',
    name: 'Beige Minimal Co-ord Set',
    price: 2499,
    image: product7,
    category: 'co-ords',
    tag: 'New Drop',
    stock: 15,
    rating: 4.5,
    reviewCount: 32,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Clean beige co-ord set with relaxed shirt and matching trousers. Lightweight breathable fabric perfect for warm days. Effortlessly put-together.',
  },
  {
    id: '8',
    name: 'Cream Relaxed Fit Set',
    price: 2599,
    image: product8,
    category: 'co-ords',
    stock: 10,
    rating: 4.6,
    reviewCount: 28,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Off-white relaxed fit co-ord set with open collar shirt and wide-leg trousers. Resort-ready luxury meets everyday ease.',
  },
  {
    id: '9',
    name: 'Oversized Graphic Hoodie',
    price: 1999,
    originalPrice: 2999,
    image: product9,
    category: 'streetwear',
    tag: 'Best Seller',
    stock: 7,
    rating: 4.8,
    reviewCount: 156,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Heavy-weight oversized hoodie with subtle tonal graphic. Drop shoulders and kangaroo pocket. The ultimate streetwear statement.',
  },
  {
    id: '10',
    name: 'Cargo Pants Street Fit',
    price: 1799,
    image: product10,
    category: 'streetwear',
    tag: 'New Drop',
    stock: 20,
    rating: 4.7,
    reviewCount: 94,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Olive cargo pants with utility pockets and tapered ankle. Relaxed through the thigh with a jogger-style cuff. Street-ready versatility.',
  },
  {
    id: '11',
    name: 'Urban Drop Shoulder Tee',
    price: 999,
    image: product11,
    category: 'streetwear',
    stock: 25,
    rating: 4.4,
    reviewCount: 78,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Oversized drop shoulder tee in muted grey. Heavy 240gsm cotton with a boxy relaxed fit. The everyday essential redefined.',
  },
  {
    id: '12',
    name: 'Plain White Tee Premium',
    price: 799,
    image: product12,
    category: 'essentials',
    tag: 'Best Seller',
    stock: 30,
    rating: 4.9,
    reviewCount: 312,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'The perfect white tee. 200gsm Supima cotton, pre-shrunk, with a refined fit. Your wardrobe foundation starts here.',
  },
  {
    id: '13',
    name: 'Minimal Black Tee',
    price: 799,
    image: product13,
    category: 'essentials',
    stock: 28,
    rating: 4.8,
    reviewCount: 267,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Deep black premium tee that stays dark wash after wash. Same legendary Supima cotton fit as our white. The dark essential.',
  },
  {
    id: '14',
    name: 'Slim Fit Neutral Shirt',
    price: 1499,
    originalPrice: 1999,
    image: product14,
    category: 'essentials',
    tag: 'Limited Stock',
    stock: 6,
    rating: 4.7,
    reviewCount: 45,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Neutral beige button-up shirt in a modern slim fit. Soft cotton twill with a subtle structure. Dress it up or down effortlessly.',
  },
];

export const reviews = [
  { name: 'Arjun M.', text: 'Insane quality. The fit is chef\'s kiss. Already ordered my second set.', rating: 5 },
  { name: 'Priya K.', text: 'Wore the Noir set to a party — got compliments all night. Premium fabric.', rating: 5 },
  { name: 'Rahul S.', text: 'Best co-ords I\'ve ever owned. The tailoring is unreal for this price.', rating: 4 },
  { name: 'Sneha D.', text: 'The Sand Dune set is literally the softest thing I own. Living in it.', rating: 5 },
  { name: 'Karan V.', text: 'The white tee is genuinely the best I\'ve owned. Bought 3 more.', rating: 5 },
  { name: 'Meera T.', text: 'Cargo pants fit perfectly. Great quality for the price. Will buy again.', rating: 4 },
];
