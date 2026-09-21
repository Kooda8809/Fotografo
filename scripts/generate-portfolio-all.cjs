const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', 'public', 'images', 'real', 'catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const categories = [
  'Newborn', 'Embarazo', 'Bebés', 'Familia', 'Smash Cake', 'Infantil', 'Comuniones', 'Fine Art'
];

const titlesByCat = {
  'Newborn': [
    'Primeros Días en Calma',
    'Ternura y Paz en el Estudio',
    'Pequeños Detalles Únicos',
    'Descanso Sereno',
    'Arrullo y Calidez',
    'Primeras Sonrisas de Vida',
    'Fragilidad y Amor Puro'
  ],
  'Embarazo': [
    'Dulce Espera al Atardecer',
    'Luz Natural y Maternidad',
    'La Magia de Dar Vida',
    'Vínculo Infinito',
    'Siluetas de Esperanza',
    'Emoción y Dulzura',
    'El Inicio de Todo'
  ],
  'Bebés': [
    'Risas y Miradas Curiosas',
    'Primeros Balbuceos',
    'Descubriendo el Mundo',
    'Inocencia en su Mirada',
    'Pequeñas Manitas y Gestos',
    'Aventuras de los Seis Meses',
    'Alegría Espontánea'
  ],
  'Familia': [
    'Abrazos que Reconfortan',
    'Complicidad Incondicional',
    'Risas Compartidas en Familia',
    'Generaciones de Cariño',
    'Historias que Perduran',
    'Momentos Fuera de Tiempo',
    'Unión y Afecto Genuino'
  ],
  'Smash Cake': [
    'Celebrando el Primer Añito',
    'Diversión, Texturas y Tarta',
    'Sonrisas y Travesuras Dulces',
    'La Gran Fiesta del Pastel',
    'Baño de Burbujas y Risas',
    'Un Año Lleno de Magia',
    'Explosión de Sabor y Color'
  ],
  'Infantil': [
    'Miradas que Iluminan',
    'Espontaneidad y Alegría',
    'Juegos y Risas de Infancia',
    'Retrato Infantil Contemporáneo',
    'Luz y Personalidad Propia',
    'Fantasía e Inocencia',
    'El Encanto de Ser Niño'
  ],
  'Comuniones': [
    'Ilusión en su Primera Comunión',
    'Elegancia y Naturalidad',
    'Recuerdos de un Día Soñado',
    'Luz Dorada en Exteriores',
    'Retrato Ceremonial Íntimo',
    'Momentos para el Recuerdo',
    'Frescura y Tradición'
  ],
  'Fine Art': [
    'Retrato Pictórico Clásico',
    'Estética de Pintura Europea',
    'Atmósfera y Claroscuro',
    'Composición de Autor',
    'Poesía Visual Atemporal',
    'Luz Magistral en Estudio',
    'El Arte de la Mirada'
  ]
};

const photos = catalog.map((item, index) => {
  const cat = categories[index % categories.length];
  const list = titlesByCat[cat];
  const title = list[Math.floor(index / categories.length) % list.length];
  const numStr = String(index + 1).padStart(2, '0');

  return {
    id: `p-${numStr}`,
    title: `${title} #${numStr}`,
    category: cat,
    location: 'Zaragoza, Aragón',
    imageUrl: item.webpFile,
    aspectRatio: item.aspectRatio || 'aspect-[4/5]',
    description: `Reportaje fotográfico profesional de ${cat.toLowerCase()} realizado con luz natural y sensibilidad en Zaragoza.`,
    year: '2025'
  };
});

const fileContent = `import { PhotoItem } from '../types';

export const portfolioPhotos: PhotoItem[] = ${JSON.stringify(photos, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'portfolio.ts'), fileContent, 'utf8');
console.log(`Generated portfolioPhotos with ${photos.length} real photos!`);
