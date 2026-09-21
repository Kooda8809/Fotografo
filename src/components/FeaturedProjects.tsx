import React, { useState } from 'react';
import { featuredProjects } from '../data/projects';
import { ProjectItem } from '../types';
import { ArrowUpRight, MapPin, X, CheckCircle2, Images } from 'lucide-react';

interface FeaturedProjectsProps {
  onOpenLightboxWithUrls: (urls: string[], initialIndex: number) => void;
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onOpenLightboxWithUrls,
  onOpenQuoteModal
}) => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const openProjectModal = (project: ProjectItem) => {
    setActiveProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setActiveProject(null);
    document.body.style.overflow = '';
  };

  return (
    <section
      id="proyectos"
      className="py-24 sm:py-32 bg-white text-black border-t border-neutral-200"
      aria-label="Reportajes destacados de fotografía infantil y familiar"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-neutral-200">
          <div className="space-y-3">
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-black font-normal tracking-tight">
              Reportajes Destacados
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md font-light leading-relaxed">
            Sesiones completas en Zaragoza donde la ternura, el juego libre y la complicidad familiar se convierten en recuerdos tangibles para toda la vida.
          </p>
        </div>

        {/* Projects List with Editorial Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 pt-12">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between border-b border-neutral-200 pb-10"
            >
              <div
                className="relative overflow-hidden aspect-[16/10] bg-neutral-100 rounded-none cursor-pointer mb-6 border border-neutral-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
                onClick={() => openProjectModal(project)}
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white pointer-events-none">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-none bg-white/20 backdrop-blur-sm text-white">
                      <Images className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-xs font-mono tracking-widest uppercase">
                    Ver reportaje ({project.gallery.length} tomas)
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline justify-between text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  <span>{project.category}</span>
                  <span>{project.location} · {project.year}</span>
                </div>

                <h3
                  className="font-editorial text-2xl sm:text-3xl text-black font-normal hover:text-neutral-700 transition-colors cursor-pointer leading-tight"
                  onClick={() => openProjectModal(project)}
                >
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-2">
                  {project.subtitle}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => openProjectModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black hover:text-neutral-600 transition-colors cursor-pointer group-hover:underline underline-offset-4"
                  >
                    <span>Explorar reportaje completo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="bg-white border border-neutral-200 rounded-none w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative space-y-8 text-neutral-900">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-neutral-200 pb-6">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Reportaje Completo · Zaragoza
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-black font-normal">
                  {activeProject.title}
                </h3>
                <p className="text-sm text-neutral-500 font-light">
                  {activeProject.subtitle}
                </p>
              </div>

              <button
                onClick={closeProjectModal}
                className="p-2.5 rounded-none bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors focus:outline-none cursor-pointer border border-neutral-200"
                aria-label="Cerrar reportaje"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scope / Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-none bg-neutral-50 border border-neutral-200 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block uppercase tracking-wider mb-1">Localización</span>
                <span className="text-neutral-900 font-medium">{activeProject.location}</span>
              </div>
              <div>
                <span className="text-neutral-500 block uppercase tracking-wider mb-1">Año de Realización</span>
                <span className="text-neutral-900 font-medium">{activeProject.year}</span>
              </div>
              <div>
                <span className="text-neutral-500 block uppercase tracking-wider mb-1">Modalidad</span>
                <span className="text-neutral-900 font-medium">{activeProject.category}</span>
              </div>
            </div>

            {/* Narrative & Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                <p>{activeProject.summary}</p>
                <p className="text-xs sm:text-sm text-neutral-600">{activeProject.approach}</p>
                <div className="pt-2">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-500 mb-3">
                    Qué se entregó a la familia
                  </h4>
                  <ul className="space-y-2">
                    {activeProject.deliverables.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-none bg-neutral-50 border border-neutral-200 space-y-4">
                <h4 className="font-editorial text-lg text-black font-normal">
                  ¿Te gustaría un recuerdo así?
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  Consúltanos disponibilidad y resolveremos todas tus dudas para reservar vuestra fecha en Zaragoza.
                </p>
                <button
                  onClick={() => {
                    closeProjectModal();
                    onOpenQuoteModal(`Sesión similar a: ${activeProject.title}`);
                  }}
                  className="w-full py-3 px-4 bg-black text-white hover:bg-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-none transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm border border-black"
                >
                  <span>Consultar Disponibilidad</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                  Galería del Reportaje ({activeProject.gallery.length} tomas)
                </h4>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Haz clic en cualquier foto para ampliar en alta definición
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activeProject.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      onOpenLightboxWithUrls(activeProject.gallery, i);
                    }}
                    className="relative aspect-[16/10] bg-neutral-100 rounded-none overflow-hidden cursor-pointer group border border-neutral-200 shadow-sm"
                  >
                    <img
                      src={imgUrl}
                      alt={`${activeProject.title} toma ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 bg-black/60 rounded-none">
                        Ampliar #{i + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
