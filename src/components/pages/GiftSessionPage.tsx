import React, { useState } from 'react';
import {
  Gift,
  Calendar,
  Send,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ArrowUpRight,
  Instagram,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

interface GiftSessionPageProps {
  onNavigateContact: () => void;
  onOpenQuoteModal: (serviceName?: string) => void;
}

interface GiftModality {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const GIFT_MODALITIES: GiftModality[] = [
  {
    id: 'embarazo',
    title: 'EMBARAZO',
    subtitle: 'La dulce espera',
    description: 'La emoción de esperar a tu bebé. Sesiones íntimas y cuidadas entre las semanas 28 y 32.',
    image: '/images/real/session-real-008.webp'
  },
  {
    id: 'recien-nacido',
    title: 'RECIÉN NACIDO',
    subtitle: 'Primeros 7-14 días',
    description: 'El detalle estrella para nacimientos. Sesión sosegada respetando el sueño y la calidez del bebé.',
    image: '/images/real/session-real-001.webp'
  },
  {
    id: 'bebe',
    title: 'BEBÉ',
    subtitle: 'De 6 a 10 meses',
    description: 'Cuando se sientan solitos, regalan risas y descubren el mundo con ojos despiertos y curiosos.',
    image: '/images/real/session-real-024.webp'
  },
  {
    id: 'infantil',
    title: 'INFANTIL',
    subtitle: 'Cualquier edad',
    description: 'Juegos libres, risas sinceras y retratos llenos de luz y naturalidad sin poses forzadas.',
    image: '/images/real/session-real-020.webp'
  },
  {
    id: 'familia',
    title: 'FAMILIA',
    subtitle: 'Vínculos reales',
    description: 'Padres, hijos, abuelos y mascotas juntos para guardar un tesoro emocional para siempre.',
    image: '/images/real/session-real-012.webp'
  },
  {
    id: 'smash-cake',
    title: 'SMASH CAKE',
    subtitle: 'Primer Cumpleaños',
    description: 'Una fiesta divertidísima con tarta artesanal y baño de burbujas en bañerita vintage.',
    image: '/images/real/session-real-015.webp'
  },
  {
    id: 'mis-9-anos',
    title: 'MIS 9 AÑOS',
    subtitle: 'Comunión & Recuerdos',
    description: 'El reportaje perfecto para comuniones o celebrar la personalidad única antes de la adolescencia.',
    image: '/images/real/session-real-026.webp'
  },
  {
    id: 'fine-art',
    title: 'FINE ART',
    subtitle: 'Retrato Pictórico',
    description: 'Fotografía de autor inspirada en la pintura clásica con iluminación tenue y acabados eternos.',
    image: '/images/real/session-real-029.webp'
  }
];

const FAQS = [
  {
    question: '¿Qué incluye exactamente el vale regalo?',
    answer:
      'Incluye la sesión fotográfica elegida, el uso del atrezzo y vestuario del estudio, y el número de fotografías editadas que correspondan al pack seleccionado. Estás regalando el servicio completo, sin costes sorpresa para los agasajados.'
  },
  {
    question: '¿Cómo recibo la tarjeta regalo?',
    answer:
      'Te preparamos un Vale Regalo físico muy bonito en una cuidada presentación de papel de algodón y sobre artesanal listo para entregar en mano en Zaragoza. Si lo necesitas con urgencia para hoy mismo, también te enviamos una versión digital personalizada por email o WhatsApp.'
  },
  {
    question: '¿Se puede cambiar la sesión?',
    answer:
      '¡Sí, por supuesto! Si la familia prefiere cambiar la sesión por otra modalidad (por ejemplo, pasar de embarazo a recién nacido o a sesión de primer cumpleaños), solo tendrán que indicárnoslo al reservar y adaptaremos el vale sin ninguna complicación.'
  }
];

export const GiftSessionPage: React.FC<GiftSessionPageProps> = ({
  onNavigateContact,
  onOpenQuoteModal
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleDirectWhatsAppGift = (modalityTitle?: string) => {
    const text = encodeURIComponent(
      `Hola Carlota, me gustaría regalar un Vale Regalo para una sesión ${
        modalityTitle ? `de ${modalityTitle}` : 'de fotos'
      } en Zaragoza. ¿Podrías indicarme disponibilidad y opciones de entrega?`
    );
    window.open(`https://wa.me/34687707029?text=${text}`, '_blank');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20 sm:space-y-28">
        
        {/* Editorial Hero Header */}
        <div className="border-b border-neutral-200 pb-12 sm:pb-16 space-y-6 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
            <Gift className="w-3.5 h-3.5 text-black shrink-0" />
            <span>Tarjetas Regalo · Zaragoza</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-black font-normal tracking-tight leading-[1.05]">
              Regalar una sesión de fotos en Zaragoza:
            </h1>
            <p className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-neutral-600 font-normal italic">
              El regalo que dura para siempre
            </p>
          </div>

          <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-3xl">
            ¿Buscas un regalo original y emocionante? A veces, los mejores detalles no se guardan en un armario, sino en el corazón. Con mis tarjetas regalo de fotografía en Zaragoza, estarás regalando la oportunidad de pausar el tiempo. Ya sea para celebrar la llegada de un bebé, una dulce espera o el primer cumpleaños, un vale regalo es la llave a un recuerdo que la familia atesorará toda la vida.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleDirectWhatsAppGift()}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-none hover:bg-neutral-800 transition-colors shadow-md cursor-pointer border border-black"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white text-black" />
              <span>Pedir Vale Regalo por WhatsApp</span>
            </button>

            <button
              onClick={() => onOpenQuoteModal('Tarjeta Regalo')}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-neutral-300 hover:border-black text-black text-xs font-mono uppercase tracking-wider rounded-none transition-colors cursor-pointer bg-white"
            >
              <span>Consultar por Formulario</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Section: Un vale regalo para cada momento especial */}
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-100 pb-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                VARIEDAD DE REPORTAJES
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-black font-normal">
                Un vale regalo para cada momento especial
              </h2>
            </div>
            <p className="text-xs text-neutral-500 font-light max-w-md">
              Elige el estilo que mejor acompañe a la familia. Cada sesión se diseña a medida en nuestro estudio del Actur o en exteriores aragoneses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GIFT_MODALITIES.map((mod) => (
              <article
                key={mod.id}
                className="group flex flex-col justify-between border border-neutral-200 bg-white rounded-none hover:border-black transition-all duration-300 shadow-2xs hover:shadow-xl overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                    <img
                      src={mod.image}
                      alt={mod.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="p-6 space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      {mod.subtitle}
                    </span>
                    <h3 className="font-editorial text-xl text-black font-normal group-hover:text-neutral-700 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleDirectWhatsAppGift(mod.title)}
                    className="w-full py-2.5 px-4 bg-neutral-50 border border-neutral-200 text-black text-[11px] font-semibold uppercase tracking-wider rounded-none hover:bg-black hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Solicitar este vale</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section: Pasos a seguir (1, 2, 3) */}
        <section className="space-y-10">
          <div className="space-y-1 border-b border-neutral-100 pb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              CÓMO TRAMITARLO
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-black font-normal">
              Pasos a seguir
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Paso 1 */}
            <div className="p-8 rounded-none bg-neutral-50/70 border border-neutral-200 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-editorial text-4xl sm:text-5xl text-neutral-300 font-light block leading-none">
                  01
                </span>
                <h3 className="font-editorial text-2xl text-black font-normal">
                  Elige la sesión y el pack
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  Selecciona el tipo de reportaje que quieres regalar (Newborn, Embarazo, Smash Cake o Familia) y el pack que mejor encaje con tu presupuesto. De esta forma, la familia recibirá una experiencia completa y cerrada, lista para disfrutar sin preocuparse de nada más.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200/60 flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                <span>Experiencia cerrada y sin sorpresas</span>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="p-8 rounded-none bg-neutral-50/70 border border-neutral-200 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-editorial text-4xl sm:text-5xl text-neutral-300 font-light block leading-none">
                  02
                </span>
                <h3 className="font-editorial text-2xl text-black font-normal">
                  Personaliza tu detalle
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  Prepararé para ti un Vale Regalo muy bonito para que puedas entregarlo en mano en Zaragoza. Si lo necesitas con urgencia, también puedo enviarte una versión digital personalizada por email o WhatsApp.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200/60 flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase">
                <PackageCheck className="w-4 h-4 text-black shrink-0" />
                <span>En mano o digital urgente</span>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="p-8 rounded-none bg-neutral-50/70 border border-neutral-200 space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-editorial text-4xl sm:text-5xl text-neutral-300 font-light block leading-none">
                  03
                </span>
                <h3 className="font-editorial text-2xl text-black font-normal">
                  Un año de validez
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  Los vales tienen una validez de 12 meses desde el momento de la compra. Los afortunados solo tendrán que ponerse en contacto conmigo para consultar disponibilidad y reservar su cita en mi estudio del Actur o para su sesión en exteriores.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200/60 flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase">
                <Calendar className="w-4 h-4 text-black shrink-0" />
                <span>12 meses de margen para reservar</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Preguntas frecuentes */}
        <section className="space-y-8">
          <div className="space-y-1 border-b border-neutral-100 pb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              RESOLVEMOS TUS DUDAS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-black font-normal">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-neutral-200 rounded-none bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/70 transition-colors focus:outline-none"
                  >
                    <span className="font-editorial text-xl sm:text-2xl text-black font-normal">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-black' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed border-t border-neutral-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Direct Atelier & Instagram Contact Block */}
        <div className="p-8 sm:p-12 rounded-none bg-neutral-900 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Carlota Lagunas Fotografía · Zaragoza</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-4xl font-normal">
              ¿Quieres preparar tu tarjeta regalo hoy?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Escríbenos directamente o déjanos tus datos. Te asesoraremos personalmente sobre el pack que mejor encaja y prepararemos la tarjeta con el nombre y dedicatoria para tu sorpresa.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>Rosalía de Castro 15, local · 50018 Zaragoza</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>687 707 029</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>info@carlotalagunas.com</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => handleDirectWhatsAppGift()}
              className="py-3.5 px-6 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-none hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer border border-black"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Pedir por WhatsApp</span>
            </button>

            <a
              href="https://www.instagram.com/carlotalagunasfotografia/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-none hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white"
            >
              <Instagram className="w-4 h-4" />
              <span>Seguir en Instagram</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
