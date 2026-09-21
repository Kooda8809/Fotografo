import React from 'react';
import { Gift, Heart, Calendar, PackageCheck, Send, MessageSquare, Check, Sparkles } from 'lucide-react';

interface GiftSessionPageProps {
  onNavigateContact: () => void;
  onOpenQuoteModal: () => void;
}

const GIFT_MODALITIES = [
  {
    title: 'Sesión Embarazo',
    subtitle: 'La dulce espera',
    description: 'El regalo perfecto para futuras mamás, entre las semanas 28 y 32 de gestación.'
  },
  {
    title: 'Sesión Newborn',
    subtitle: 'Primeros días (7-14 días)',
    description: 'El detalle estrella para nacimientos, baby showers o regalos de compañeros de trabajo.'
  },
  {
    title: 'Sesión Bebé / Seguimiento',
    subtitle: 'De 6 a 10 meses',
    description: 'Para cuando ya se sientan solitos, sonríen y descubren el mundo con ojos despiertos.'
  },
  {
    title: 'Sesión Smash Cake',
    subtitle: 'Primer Cumpleaños',
    description: 'Una celebración divertidísima con tarta artesanal y baño de burbujas en bañerita vintage.'
  },
  {
    title: 'Fotografía Infantil',
    subtitle: 'Cualquier edad',
    description: 'Juegos, risas y retratos sin poses forzadas tanto en estudio como al aire libre.'
  },
  {
    title: 'Fotografía Familiar',
    subtitle: 'Toda la familia',
    description: 'Padres, hijos, abuelos y mascotas juntos para guardar un tesoro emocional irrepetible.'
  },
  {
    title: 'Sesión Primera Comunión',
    subtitle: 'Un recuerdo moderno y fresco',
    description: 'El regalo soñado de padrinos o familiares que buscan alejarse de posados aburridos.'
  },
  {
    title: 'Retrato Fine Art',
    subtitle: 'Pintura pictórica fotográfica',
    description: 'Para quienes aprecian la alta fotografía de autor inspirada en maestros clásicos.'
  }
];

export const GiftSessionPage: React.FC<GiftSessionPageProps> = ({
  onNavigateContact,
  onOpenQuoteModal
}) => {
  const handleDirectWhatsAppGift = (modality?: string) => {
    const text = encodeURIComponent(
      `Hola Carlota, me gustaría solicitar una Tarjeta Regalo para una ${modality || 'sesión de fotos'}. ¿Podrías indicarme cómo tramitarla?`
    );
    window.open(`https://wa.me/34687707029?text=${text}`, '_blank');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
        
        {/* Header */}
        <div className="border-b border-neutral-200 pb-12 space-y-4 max-w-3xl">
          <h1 className="font-editorial text-4xl sm:text-6xl text-black font-normal tracking-tight">
            Regalar una Sesión
          </h1>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            Las cosas materiales se olvidan con los años, pero los recuerdos perduran para siempre. Sorprende a quienes más quieres con una experiencia emocionante en nuestro estudio de Zaragoza.
          </p>
        </div>

        {/* 4-Step Process Guide */}
        <div className="space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              CÓMO FUNCIONA EL BONO REGALO
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-black font-normal">
              Fácil, personalizado y sin prisas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-none bg-neutral-50 border border-neutral-200 space-y-3">
              <span className="text-xs font-mono text-neutral-400">PASO 01</span>
              <div className="w-10 h-10 rounded-none bg-white border border-neutral-200 flex items-center justify-center text-black">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl text-black">Elige la sesión</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Selecciona la modalidad que deseas regalar: embarazo, recién nacido, smash cake, familia o comunión.
              </p>
            </div>

            <div className="p-6 rounded-none bg-neutral-50 border border-neutral-200 space-y-3">
              <span className="text-xs font-mono text-neutral-400">PASO 02</span>
              <div className="w-10 h-10 rounded-none bg-white border border-neutral-200 flex items-center justify-center text-black">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl text-black">Mensaje especial</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Personalizamos la tarjeta regalo con una dedicatoria emotiva y el nombre de los homenajeados.
              </p>
            </div>

            <div className="p-6 rounded-none bg-neutral-50 border border-neutral-200 space-y-3">
              <span className="text-xs font-mono text-neutral-400">PASO 03</span>
              <div className="w-10 h-10 rounded-none bg-white border border-neutral-200 flex items-center justify-center text-black">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl text-black">Entrega bonita</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Te entregamos el bono en formato digital de alta resolución inmediato o en una preciosa caja regalo física lista para entregar.
              </p>
            </div>

            <div className="p-6 rounded-none bg-neutral-50 border border-neutral-200 space-y-3">
              <span className="text-xs font-mono text-neutral-400">PASO 04</span>
              <div className="w-10 h-10 rounded-none bg-white border border-neutral-200 flex items-center justify-center text-black">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl text-black">Ellos eligen fecha</h3>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Los papás o la familia nos contactan cuando deseen para fijar el día y la hora que mejor les convenga. Disponen de 6 meses de validez.
              </p>
            </div>
          </div>
        </div>

        {/* Modalidades Disponibles */}
        <div className="space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              MODALIDADES PARA REGALAR
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-black font-normal">
              Elige el regalo ideal
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GIFT_MODALITIES.map((mod, idx) => (
              <div
                key={idx}
                className="p-6 rounded-none border border-neutral-200 bg-white hover:border-black transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    {mod.subtitle}
                  </span>
                  <h3 className="font-editorial text-xl text-black group-hover:text-neutral-700 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <button
                  onClick={() => handleDirectWhatsAppGift(mod.title)}
                  className="w-full py-2.5 px-4 bg-neutral-50 border border-neutral-200 text-black text-[11px] font-semibold uppercase tracking-wider rounded-none hover:bg-black hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Solicitar este bono</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Banner CTA */}
        <div className="p-8 sm:p-12 rounded-none bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Validez de 6 meses · Presentación exclusiva</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-4xl font-normal">
              ¿Quieres preparar tu tarjeta regalo hoy?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Escríbenos directamente o déjanos tus datos. Te asesoraremos sobre el pack que mejor encaje con tu presupuesto y prepararemos una presentación inolvidable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => handleDirectWhatsAppGift()}
              className="py-3.5 px-6 bg-[#25D366] text-black text-xs font-semibold uppercase tracking-wider rounded-none hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer border border-[#25D366]"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Pedir por WhatsApp</span>
            </button>
            <button
              onClick={onNavigateContact}
              className="py-3.5 px-6 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-none hover:bg-neutral-200 transition-all cursor-pointer border border-white"
            >
              Contactar por formulario
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
