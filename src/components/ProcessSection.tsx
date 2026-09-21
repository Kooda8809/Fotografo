import React from 'react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Reserva y Asesoramiento',
      desc: 'Hablamos sobre la fecha prevista de parto o momento de la sesión, y os enviamos nuestra guía exclusiva de vestuario y recomendaciones.'
    },
    {
      step: '02',
      title: 'Sesión sin Prisas',
      desc: 'En nuestro estudio climatizado de Actur o al atardecer en exteriores, disfrutamos de un ambiente relajado adaptado al ritmo de vuestro bebé.'
    },
    {
      step: '03',
      title: 'Galería Privada',
      desc: 'Preparamos una galería online protegida para que elijáis desde casa y con total tranquilidad vuestras fotografías preferidas.'
    },
    {
      step: '04',
      title: 'Entrega Artesanal',
      desc: 'Edición artística detallada y entrega en alta resolución digital, acompañada de cajas de madera personalizadas y álbumes en lino.'
    }
  ];

  return (
    <section
      id="proceso"
      className="py-24 sm:py-32 bg-white text-black border-t border-neutral-200"
      aria-label="Cómo se desarrolla una sesión fotográfica"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-neutral-200">
          <div className="space-y-3">
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-black font-normal tracking-tight">
              Cómo Trabajamos Vuestro Recuerdo
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md font-light leading-relaxed">
            Un método transparente, respetuoso y cuidado al detalle para que vuestra única tarea sea disfrutar de la magia en familia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          {steps.map((s, idx) => (
            <div key={idx} className="relative space-y-4">
              <div className="text-4xl sm:text-5xl font-editorial text-neutral-300 font-light">
                {s.step}
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl text-black font-normal">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {s.desc}
              </p>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 right-0 w-8 border-t border-dashed border-neutral-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
