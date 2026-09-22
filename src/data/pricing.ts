import { PricingItem } from '../types';

export interface ServicePricing {
  category: string;
  subtitle: string;
  description: string;
  packs: PricingItem[];
}

export const PRICING_EMBARAZO: PricingItem[] = [
  {
    id: 'emb-digital',
    name: 'Pack Digital',
    price: '190 €',
    features: [
      '12 fotografías digitales en alta resolución',
      'Galería privada online para selección cómoda',
      'Hasta 2 cambios de vestuario y estilismo',
      'Edición y procesado artesanal en alta calidad',
      'Posibilidad de adquirir fotografías adicionales'
    ]
  },
  {
    id: 'emb-madera',
    name: 'Pack Madera',
    price: '270 €',
    highlight: true,
    features: [
      '20 fotografías digitales en alta resolución',
      'Caja de madera personalizada y grabada',
      '20 copias impresas 15x20 en papel algodón Fine Art',
      'Hasta 3 cambios de vestuario y atrezzo exclusivo',
      'Galería privada online con descarga directa'
    ]
  },
  {
    id: 'emb-album',
    name: 'Pack Álbum',
    price: '300 €',
    features: [
      'Sesión completa de embarazo en estudio o exterior',
      'Álbum artesanal en lino natural 20x20 cm (20 páginas)',
      'Maquetación editorial exclusiva y personalizada',
      'Todas las fotografías del álbum en alta resolución digital',
      'Galería privada protegida con contraseña'
    ]
  }
];

export const PRICING_NEWBORN: PricingItem[] = [
  {
    id: 'new-digital',
    name: 'Pack Digital',
    price: '190 €',
    features: [
      '10 fotografías digitales editadas minuciosamente',
      'Galería online privada para selección y descarga',
      'Poses naturales y seguras respetando el ritmo del bebé',
      'Acceso a vestuario y atrezzo artesanal del estudio',
      'Fotografías con papás y hermanitos incluidas'
    ]
  },
  {
    id: 'new-recuerdos',
    name: 'Pack Recuerdos',
    price: '300 €',
    highlight: true,
    features: [
      '20 fotografías digitales en máxima resolución',
      'Caja de madera natural personalizada artesanalmente',
      '20 copias impresas en papel fotográfico Fine Art 15x20',
      'Sesión pausada de 2 a 3 horas en estudio climatizado',
      'Variedad de escenarios, mantitas de lana y tejidos orgánicos'
    ]
  },
  {
    id: 'new-deluxe',
    name: 'Pack Álbum Deluxe',
    price: '380 €',
    features: [
      'Sesión completa sin prisas (3 a 4 horas respetando tomas y sueño)',
      'Álbum artesanal de lujo 25x25 cm encuadernado a mano',
      'Todas las fotografías seleccionadas y editadas en digital',
      'Caja de madera o bolsa de lino a juego para guardar el álbum',
      'Atención prioritaria y asesoramiento prémium para el recuerdo'
    ]
  }
];

export const CAJA_MARCO_ADDON = {
  name: 'Complemento Caja Marco',
  price: '65 €',
  description: 'Preciosa caja marco de madera natural con 10 fotografías impresas en papel Fine Art 15x20 cm. Ideal para lucir en cualquier rincón del hogar o regalar a los abuelos.'
};

export const PRICING_DISCLAIMER = 'Todos los precios incluyen IVA. Se requiere una señal del 30% para formalizar y asegurar la reserva de fecha en agenda.';
