export type CategoryType =
  | 'Todos'
  | 'Newborn'
  | 'Embarazo'
  | 'Bebés'
  | 'Infantil'
  | 'Familia'
  | 'Smash Cake'
  | 'Comuniones'
  | 'Fine Art';

export interface PhotoItem {
  id: string;
  title: string;
  category: Exclude<CategoryType, 'Todos'>;
  location: string;
  imageUrl: string;
  aspectRatio: 'aspect-[4/5]' | 'aspect-[16/10]' | 'aspect-[1/1]' | 'aspect-[3/4]' | 'aspect-[16/9]';
  description: string;
  year?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  year: string;
  coverImage: string;
  gallery: string[];
  summary: string;
  approach: string;
  deliverables: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string[];
  idealFor: string;
  accent: string;
  heroImage: string;
  features: string[];
}

export interface QuoteFormData {
  nombre: string;
  email: string;
  telefono: string;
  tipoProyecto: string;
  servicio: string;
  ubicacion: string;
  fechaAproximada: string;
  detalles: string;
}

export interface ContactFormData {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  aceptaPolitica: boolean;
}

export interface BlogPostItem {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  content: string[];
}

export interface PricingItem {
  id: string;
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

export interface TestimonialItem {
  name: string;
  quote: string;
  sessionType?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
