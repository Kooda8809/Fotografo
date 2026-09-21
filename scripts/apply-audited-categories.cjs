const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', 'public', 'images', 'real', 'full-catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Exact audited category map based on visual inspection of each photo
const auditedCategories = {
  1: 'Bebés',
  2: 'Newborn',
  3: 'Infantil',
  4: 'Infantil',
  5: 'Comuniones',
  6: 'Embarazo',
  7: 'Comuniones',
  8: 'Newborn',
  9: 'Comuniones',
  10: 'Comuniones',
  11: 'Embarazo',
  12: 'Newborn',
  13: 'Embarazo',
  14: 'Smash Cake',
  15: 'Smash Cake',
  16: 'Newborn',

  17: 'Smash Cake',
  18: 'Comuniones',
  19: 'Embarazo',
  20: 'Comuniones',
  21: 'Comuniones',
  22: 'Newborn',
  23: 'Comuniones',
  24: 'Newborn',
  25: 'Smash Cake',
  26: 'Smash Cake',
  27: 'Comuniones',
  28: 'Comuniones',
  29: 'Comuniones',
  30: 'Newborn',
  31: 'Newborn',
  32: 'Embarazo',

  33: 'Comuniones',
  34: 'Newborn',
  35: 'Comuniones',
  36: 'Embarazo',
  37: 'Comuniones',
  38: 'Bebés',
  39: 'Infantil',
  40: 'Comuniones',
  41: 'Comuniones',
  42: 'Fine Art',
  43: 'Familia',
  44: 'Newborn',
  45: 'Embarazo',
  46: 'Comuniones',
  47: 'Fine Art',
  48: 'Smash Cake',

  49: 'Comuniones',
  50: 'Infantil',
  51: 'Newborn',
  52: 'Smash Cake',
  53: 'Infantil',
  54: 'Comuniones',
  55: 'Embarazo',
  56: 'Comuniones',
  57: 'Embarazo',
  58: 'Fine Art',
  59: 'Newborn',
  60: 'Bebés',
  61: 'Smash Cake',
  62: 'Embarazo',
  63: 'Fine Art',
  64: 'Familia',

  65: 'Bebés',
  66: 'Comuniones',
  67: 'Newborn',
  68: 'Familia',
  69: 'Familia',
  70: 'Fine Art',
  71: 'Newborn',
  72: 'Comuniones',
  73: 'Fine Art',
  74: 'Fine Art',
  75: 'Newborn',
  76: 'Newborn',
  77: 'Embarazo',
  78: 'Infantil',
  79: 'Comuniones',
  80: 'Bebés',

  81: 'Infantil',
  82: 'Familia',
  83: 'Bebés',
  84: 'Infantil',
  85: 'Newborn',
  86: 'Familia',
  87: 'Comuniones',
  88: 'Embarazo',
  89: 'Embarazo',
  90: 'Bebés',
  91: 'Comuniones',
  92: 'Comuniones',
  93: 'Smash Cake',
  94: 'Newborn',
  95: 'Bebés',
  96: 'Comuniones',

  97: 'Comuniones',
  98: 'Comuniones',
  99: 'Smash Cake',
  100: 'Embarazo',
  101: 'Newborn',
  102: 'Smash Cake',
  103: 'Comuniones',
  104: 'Comuniones',
  105: 'Fine Art',
  106: 'Fine Art',
  107: 'Familia',
  108: 'Embarazo',
  109: 'Smash Cake',
  110: 'Fine Art',
  111: 'Comuniones',
  112: 'Comuniones',

  113: 'Embarazo',
  114: 'Newborn',
  115: 'Smash Cake',
  116: 'Comuniones',
  117: 'Smash Cake',
  118: 'Newborn',
  119: 'Familia',
  120: 'Comuniones',
  121: 'Comuniones',
  122: 'Newborn',
  123: 'Embarazo',
  124: 'Smash Cake',
  125: 'Fine Art',
  126: 'Comuniones',
  127: 'Comuniones',
  128: 'Familia',

  129: 'Bebés',
  130: 'Embarazo',
  131: 'Newborn',
  132: 'Smash Cake',
  133: 'Comuniones',
  134: 'Familia',
  135: 'Embarazo',
  136: 'Comuniones',
  137: 'Newborn',
  138: 'Embarazo',
  139: 'Smash Cake',
  140: 'Comuniones',
  141: 'Comuniones',
  142: 'Comuniones',
  143: 'Newborn',
  144: 'Embarazo'
};

const categorySpecifics = {
  'Newborn': {
    location: 'Estudio Actur, Zaragoza',
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
      'Bienvenida al Mundo, Pequeño',
      'Inocencia en Estado Puro',
      'Luz Tenue en el Estudio',
      'Suave Manta de Punto',
      'Dormitar en Manos de Mamá',
      'Paz Absoluta en Zaragoza',
      'Los Primeros 15 Días'
    ],
    desc: 'Sesión newborn profesional realizada con temperatura cálida, seguridad postural y delicadeza en el Actur, Zaragoza.'
  },
  'Embarazo': {
    location: 'Zaragoza, Aragón',
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
      'Antes de Abrazarte por Fin',
      'La Poesía de la Maternidad',
      'Ilusión Compartida'
    ],
    desc: 'Reportaje de maternidad que celebra la belleza, ternura y emoción de la espera en estudio o exteriores aragoneses.'
  },
  'Bebés': {
    location: 'Estudio Actur, Zaragoza',
    titles: [
      'Risas y Miradas Curiosas',
      'Primeros Balbuceos en el Estudio',
      'Descubriendo el Mundo con Alegría',
      'Inocencia en Ojos Grandes',
      'Pequeñas Manitas y Gestos Traviesos',
      'Aventuras de los Seis Meses',
      'Sonrisas Espontáneas',
      'Curiosidad Sin Filtros',
      'Gateo y Primeros Pasitos',
      'Ojitos Brillantes y Despiertos',
      'Texturas Suaves y Sonrisas'
    ],
    desc: 'Sesión de seguimiento infantil para capturar los gestos espontáneos, risas y descubrimientos del primer año.'
  },
  'Infantil': {
    location: 'Parque Grande / Estudio Zaragoza',
    titles: [
      'Miradas que Iluminan la Tarde',
      'Espontaneidad y Risas Desenfadadas',
      'Juegos y Correrías de Infancia',
      'Retrato Infantil Contemporáneo',
      'Luz y Personalidad Propia',
      'Fantasía, Creatividad e Inocencia',
      'El Encanto Incomparable de Ser Niño',
      'Saltos y Alegría al Aire Libre',
      'Ojos que Cuentan Secretos'
    ],
    desc: 'Fotografía infantil espontánea y natural en Zaragoza, capturando la alegría genuina de crecer jugando.'
  },
  'Familia': {
    location: 'Zaragoza, Aragón',
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
      'Miradas de Amor Entre Hermanos'
    ],
    desc: 'Sesiones familiares llenas de afecto sincero, conexión y abrazos sin poses artificiales en Zaragoza.'
  },
  'Smash Cake': {
    location: 'Estudio Actur, Zaragoza',
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
      'Decorado Personalizado y Festivo'
    ],
    desc: 'Celebración fotográfica del primer o segundo cumpleaños con tarta artesanal personalizada y sesión de baño.'
  },
  'Comuniones': {
    location: 'Zaragoza / Exteriores Aragoneses',
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
      'Sesión en el Columpio de Flores',
      'Recuerdos Imborrables de Comunión',
      'Luz Cálida de Primavera Aragonesa',
      'Detalles Artesanales del Vestido',
      'Espontaneidad en su Gran Día',
      'Mirada Clara hacia el Futuro',
      'Tardes de Campo y Celebración',
      'La Dulzura de los Diez Años',
      'Retrato Clásico en Sillón Vintage',
      'Juegos de Luces y Sombras',
      'La Risa Más Pura en el Estudio',
      'Bordados y Encajes de Comunión',
      'Ilusión Reflejada en el Agua',
      'Retrato Ceremonial Contemporáneo',
      'Serenidad junto al Bosque',
      'Viento Suave y Flores Silvestres',
      'Caminos de Tierra y Espigas',
      'La Magia de la Primera Comunión',
      'Elegancia Atemporal en Zaragoza',
      'Mirada Noble en el Parque',
      'El Columpio Mágico en el Bosque',
      'Sonrisas Inocentes y Festivas',
      'Día de Sol en Familia',
      'Recuerdo Eterno para el Álbum',
      'Paseo al Atardecer de Comunión',
      'La Belleza de un Momento Único'
    ],
    desc: 'Reportajes de primera comunión naturales y distinguidos en Zaragoza, combinando exterior al atardecer y estudio.'
  },
  'Fine Art': {
    location: 'Estudio Carlota Lagunas Fine Art, Zaragoza',
    titles: [
      'Retrato Pictórico Clásico de Autor',
      'Estética de Pintura Flamenca y Europea',
      'Atmósfera Envolvente y Claroscuro',
      'Composición de Autor con Luz Maestra',
      'Poesía Visual Atemporal en Lienzo',
      'Luz Dramática y Delicada en Estudio',
      'El Arte de la Mirada Profunda',
      'Texturas Nobles y Paleta Barroca',
      'Intensidad y Serenidad en el Rostro',
      'Elegancia Victoriana Contemporánea',
      'Retrato de Inspiración Renacentista'
    ],
    desc: 'Fotografía Fine Art de autor inspirada en la pintura clásica europea, con iluminación dramática y edición artística.'
  }
};

const categoryCounters = {};

const photos = catalog.map((item) => {
  const cat = auditedCategories[item.index] || 'Infantil';
  categoryCounters[cat] = (categoryCounters[cat] || 0) + 1;
  const count = categoryCounters[cat];

  const spec = categorySpecifics[cat];
  const titleList = spec ? spec.titles : ['Fotografía de Autor'];
  const title = titleList[(count - 1) % titleList.length];
  const loc = spec ? spec.location : 'Zaragoza, Aragón';
  const desc = spec ? spec.desc : `Reportaje profesional de ${cat} en Zaragoza.`;

  const idNum = String(item.index).padStart(3, '0');

  return {
    id: `p-${idNum}`,
    title: `${title} #${String(count).padStart(2, '0')}`,
    category: cat,
    location: loc,
    imageUrl: item.webpFile,
    aspectRatio: item.aspectRatio || 'aspect-[4/5]',
    description: desc,
    year: '2025'
  };
});

const fileContent = `import { PhotoItem } from '../types';

export const portfolioPhotos: PhotoItem[] = ${JSON.stringify(photos, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'portfolio.ts'), fileContent, 'utf8');

console.log('Successfully audited and updated portfolio.ts!');
console.log('Category Counts:', categoryCounters);
