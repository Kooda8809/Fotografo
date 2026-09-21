const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', 'public', 'images', 'real', 'full-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const categories = [
  'Newborn',
  'Embarazo',
  'Bebés',
  'Infantil',
  'Familia',
  'Smash Cake',
  'Comuniones',
  'Fine Art'
];

const categoryData = {
  'Newborn': {
    titles: [
      'Primeros Días en Calma',
      'Ternura y Paz en el Estudio',
      'Pequeños Detalles Únicos',
      'Descanso Sereno en Nido',
      'Arrullo y Calidez Pura',
      'Primeras Expresiones de Vida',
      'Fragilidad y Amor Infinito',
      'Dormir entre Algodones',
      'El Milagro de sus Primeros Días',
      'Manitas Diminutas y Gestos',
      'Luz Cálida para el Recién Nacido',
      'Serenidad en Cesta Artesanal',
      'Piel con Piel y Ternura',
      'El Sueño Más Dulce',
      'Posado Natural y Seguro',
      'Respiraciones Lentas y Paz',
      'Suaves Envolturas de Lino',
      'Bienvenida al Mundo, Pequeño'
    ],
    locations: [
      'Estudio Actur, Zaragoza',
      'Zaragoza, Aragón',
      'Estudio Carlota Lagunas',
      'Zaragoza Capital'
    ],
    descriptions: [
      'Sesión de recién nacido realizada con máxima seguridad postural, temperatura cuidada y luz tenue en nuestro estudio de Zaragoza.',
      'Detalles de pestañas, deditos y expresiones serenas en los primeros 15 días de vida del bebé.',
      'Un ambiente íntimo, tranquilo y acogedor para inmortalizar la etapa más frágil y pura de tu hijo.'
    ]
  },
  'Embarazo': {
    titles: [
      'Dulce Espera al Atardecer',
      'Luz Natural y Maternidad Serena',
      'La Magia de Crear Vida',
      'Vínculo Infinito y Siluetas',
      'Esperando tu Llegada',
      'Curvas Llenas de Vida',
      'El Inicio de la Mayor Historia',
      'Amor en Cada Latido',
      'Reflejo de una Espera Feliz',
      'Luz Dorada en el Soto del Ebro',
      'Complicidad en Pareja y Maternidad',
      'Paz Interior y Esperanza',
      'El Latido Más Especial',
      'Conexión Madre e Hijo',
      'Miradas Llenas de Futuro',
      'Paredes Blancas y Luz Etérea',
      'Sensibilidad y Fortaleza Femenina',
      'Antes de Abrazarte por Fin'
    ],
    locations: [
      'Soto del Ebro, Zaragoza',
      'Parque Grande José Antonio Labordeta',
      'Estudio Actur, Zaragoza',
      'Galacho de Juslibol, Zaragoza'
    ],
    descriptions: [
      'Reportaje de maternidad en Zaragoza que celebra la belleza natural, la fortaleza y la emoción de la dulce espera.',
      'Sesión de embarazo al aire libre con la luz dorada del atardecer aragonés o en la intimidad de nuestro estudio.',
      'Recuerdos cargados de amor y delicadeza para revivir siempre la mágica espera de tu bebé.'
    ]
  },
  'Bebés': {
    titles: [
      'Risas y Miradas Curiosas',
      'Primeros Balbuceos en el Estudio',
      'Descubriendo el Mundo con Alegría',
      'Inocencia en Ojos Grandes',
      'Pequeñas Manitas y Gestos Traviesos',
      'Aventuras de los Seis Meses',
      'Sonrisas Espontáneas y Dientes Nuevos',
      'Curiosidad Sin Filtros',
      'Gateo y Primeros Pasitos',
      'Ojitos Brillantes y Despiertos',
      'Texturas Suaves y Sonrisas',
      'Momentos de Puro Asombro',
      'Juegos Sencillos y Magia',
      'El Encanto de los Primeros Meses',
      'Expresiones que Conquistan',
      'Días Felices en el Estudio',
      'Ternura que Crece Cada Día',
      'La Belleza de la Infancia Temprana'
    ],
    locations: [
      'Estudio Actur, Zaragoza',
      'Zaragoza, Aragón',
      'Estudio Carlota Lagunas',
      'Zaragoza Centro'
    ],
    descriptions: [
      'Sesiones de seguimiento de bebés entre los 4 y 10 meses, capturando sus risas francas, sus primeros gestos y su curiosidad.',
      'Luz natural y decorados orgánicos para destacar la frescura e inocencia de esta etapa irrepetible.',
      'Fotografía de bebés en Zaragoza pensada para divertirse jugando sin poses forzadas.'
    ]
  },
  'Infantil': {
    titles: [
      'Miradas que Iluminan la Tarde',
      'Espontaneidad y Risas Desenfadadas',
      'Juegos y Correrías de Infancia',
      'Retrato Infantil Contemporáneo',
      'Luz y Personalidad Propia',
      'Fantasía, Creatividad e Inocencia',
      'El Encanto Incomparable de Ser Niño',
      'Saltos y Alegría en Pleno Parque',
      'Ojos que Cuentan Secretos',
      'Pequeños Grandes Aventureros',
      'Retrato con Alma en Zaragoza',
      'Risas Compartidas entre Hermanos',
      'Descubriendo Nuevos Rincones',
      'Luz Bohemia y Espontaneidad',
      'Miradas Llenas de Ilusión',
      'Instantes Vivos de la Niñez',
      'La Magia de Imaginar Mundos',
      'Creciendo Libres y Felices'
    ],
    locations: [
      'Parque del Agua Luis Buñuel, Zaragoza',
      'Parque Grande, Zaragoza',
      'Estudio Actur, Zaragoza',
      'Ribera del Ebro, Zaragoza'
    ],
    descriptions: [
      'Retratos infantiles vivos, alegres y espontáneos en exteriores de Zaragoza o con luz de estudio.',
      'Una sesión donde los niños juegan y son ellos mismos, logrando recuerdos auténticos y llenos de frescura.',
      'Fotografía infantil pensada para preservar la esencia y personalidad de tus hijos en cada edad.'
    ]
  },
  'Familia': {
    titles: [
      'Abrazos que Reconfortan el Alma',
      'Complicidad Incondicional en Familia',
      'Risas Compartidas al Sol de la Tarde',
      'Generaciones de Cariño Verdadero',
      'Historias de Amor que Perduran',
      'Momentos Íntimos Fuera del Tiempo',
      'Unión y Afecto Genuino de Hogar',
      'Paseos y Caricias en el Ebro',
      'La Risa de Todos Juntos',
      'Vínculos que Nos Hacen Fuertes',
      'Abrazos Infinitos de Mamá y Papá',
      'Miradas de Amor Entre Padres e Hijos',
      'Tardes de Campo en Familia',
      'Juegos que Dejan Huella',
      'La Fuerza de Estar Juntos',
      'El Refugio Más Dulce: Tu Familia',
      'Instantes Sencillos pero Eternos',
      'Generaciones Unidas en Zaragoza'
    ],
    locations: [
      'Soto de Cantalobos, Zaragoza',
      'Parque Grande Labordeta, Zaragoza',
      'Estudio Actur, Zaragoza',
      'Canal Imperial de Aragón, Zaragoza'
    ],
    descriptions: [
      'Fotografía de familia en Zaragoza que huye del posado rígido para plasmar abrazos sinceros, miradas cómplices y felicidad compartida.',
      'Sesiones dinámicas en exteriores o en estudio para celebrar la unión de padres, hijos y abuelos.',
      'Un tesoro visual para que vuestros hijos recuerden cómo era sentirse abrazados en su infancia.'
    ]
  },
  'Smash Cake': {
    titles: [
      'Celebrando el Primer Gran Añito',
      'Diversión, Texturas Dulces y Tarta',
      'Sonrisas y Travesuras con Merengue',
      'La Gran Fiesta del Pastel de Cumple',
      'Baño de Burbujas Calentito y Risas',
      'Un Año Lleno de Magia y Aventuras',
      'Explosión de Sabor, Color y Juegos',
      'Primeros Mordiscos Curiosos',
      'Pringue Divertido y Manitas Dulces',
      'Globos, Fiesta y Alegría Desbordada',
      'La Coronita del Primer Cumpleaños',
      'Chapoteo en la Bañerita Vintage',
      'Descubriendo la Textura del Pastel',
      'Festejo Especial de Cumpleaños',
      'La Carita al Probar el Dulce',
      'Decorado Personalizado y Festivo',
      'Risas Inolvidables del Primer Año',
      'Un Recuerdo Inolvidable para Toda la Vida'
    ],
    locations: [
      'Estudio Actur, Zaragoza',
      'Estudio Carlota Lagunas',
      'Zaragoza Capital'
    ],
    descriptions: [
      'Celebramos el primer o segundo cumpleaños con tarta artesanal ecológica, decoración personalizada y baño de burbujas final.',
      'Una experiencia llena de diversión y anécdotas donde los peques experimentan sabores y texturas.',
      'Sesión Smash Cake en nuestro estudio de Zaragoza para guardar el mejor recuerdo de su primer aniversario.'
    ]
  },
  'Comuniones': {
    titles: [
      'Ilusión en su Primera Comunión',
      'Elegancia, Delicadeza y Naturalidad',
      'Recuerdos de un Día Soñado y Único',
      'Luz Dorada en Exteriores Aragoneses',
      'Retrato Ceremonial Íntimo en Estudio',
      'Momentos Especiales para el Recuerdo',
      'Frescura y Tradición Renovada',
      'Detalles de Vestido y Flores Naturales',
      'La Sonrisa Previa al Gran Día',
      'Mirada Serena entre Espigas Doradas',
      'Traje de Marinero con Luz de Tarde',
      'Elegancia Clásica sin Artificios',
      'La Belleza de Crecer con Ilusión',
      'Coronas de Flores y Miradas Nobles',
      'Comunión al Aire Libre en Zaragoza',
      'Retrato Editorial Infantil de Comunión',
      'Sesión Previa y Post-Comunión',
      'Un Recuerdo de Comunión Inolvidable'
    ],
    locations: [
      'Monasterio de Piedra / Alrededores Zaragoza',
      'Soto del Ebro, Zaragoza',
      'Estudio Actur, Zaragoza',
      'Parque del Agua, Zaragoza'
    ],
    descriptions: [
      'Reportajes de comunión emotivos y elegantes en Zaragoza, combinando tomas de estudio y exteriores al atardecer.',
      'Fotografías sin poses acartonadas que respetan la personalidad de cada niño o niña en su gran día.',
      'Álbumes y recuerdos de comunión cuidados al milímetro con encuadernación artesanal.'
    ]
  },
  'Fine Art': {
    titles: [
      'Retrato Pictórico Clásico de Autor',
      'Estética de Pintura Flamenca y Europea',
      'Atmósfera Envolvente y Claroscuro',
      'Composición de Autor con Luz Maestra',
      'Poesía Visual Atemporal en Lienzo',
      'Luz Dramática y Delicada en Estudio',
      'El Arte de la Mirada Profunda',
      'Texturas Nobiles y Paleta Barroca',
      'Intensidad y Serenidad en el Rostro',
      'Elegancia Victoriana Contemporánea',
      'Retrato de Inspiración Renacentista',
      'Sombras Suaves y Carácter Pictórico',
      'Belleza Clásica Inmune al Paso del Tiempo',
      'El Misterio de los Tonos Óleo',
      'Ropajes Clásicos y Flores Marchitas',
      'Retrato de Galería de Arte',
      'La Calma del Lienzo Fotográfico',
      'Obra de Arte Familiar para Generaciones'
    ],
    locations: [
      'Estudio Actur, Zaragoza',
      'Estudio Carlota Lagunas Fine Art',
      'Zaragoza, Aragón'
    ],
    descriptions: [
      'Retrato Fine Art inspirado en la pintura de los grandes maestros, con iluminación pictórica y paleta cromática sofisticada.',
      'Una sesión artística exclusiva para familias que buscan una pieza de arte atemporal para presidir su hogar.',
      'Fotografía de autor con cuidada edición artística y acabados dignos de una galería de arte.'
    ]
  }
};

// 144 photos total in catalog
// We distribute into 8 categories: 144 / 8 = 18 photos per category!
const photos = [];
const numPerCat = Math.floor(catalog.length / categories.length); // 18

catalog.forEach((item, index) => {
  const catIndex = index % categories.length;
  const cat = categories[catIndex];
  const catInfo = categoryData[cat];
  const insideIdx = Math.floor(index / categories.length);

  const title = catInfo.titles[insideIdx % catInfo.titles.length];
  const loc = catInfo.locations[insideIdx % catInfo.locations.length];
  const desc = catInfo.descriptions[insideIdx % catInfo.descriptions.length];
  const idNum = String(index + 1).padStart(3, '0');

  photos.push({
    id: `p-${idNum}`,
    title: `${title} #${String(insideIdx + 1).padStart(2, '0')}`,
    category: cat,
    location: loc,
    imageUrl: item.webpFile,
    aspectRatio: item.aspectRatio || 'aspect-[4/5]',
    description: desc,
    year: '2025'
  });
});

const fileContent = `import { PhotoItem } from '../types';

export const portfolioPhotos: PhotoItem[] = ${JSON.stringify(photos, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'portfolio.ts'), fileContent, 'utf8');

console.log(`Generated portfolioPhotos with ${photos.length} real photos across ${categories.length} categories (${numPerCat} photos per category)!`);

// Also update catalog count summary
const catCounts = {};
photos.forEach(p => {
  catCounts[p.category] = (catCounts[p.category] || 0) + 1;
});
console.log('Category distribution:', catCounts);
