import React, { useState } from 'react';
import { blogPosts } from '../../data/blog';
import { BlogPostItem } from '../../types';
import { ArrowUpRight, Clock, BookOpen, X, ArrowLeft } from 'lucide-react';

interface BlogPageProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenQuoteModal, onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="border-b border-neutral-200 pb-12 space-y-4 max-w-3xl">
          <h1 className="font-editorial text-4xl sm:text-6xl text-black font-normal tracking-tight">
            Blog & Consejos de Fotografía
          </h1>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            Recomendaciones para preparar tu sesión de recién nacido, momentos clave para el reportaje de embarazo e ideas para guardar recuerdos inolvidables en Zaragoza.
          </p>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between border border-neutral-200 rounded-none overflow-hidden bg-neutral-50/50 hover:bg-white hover:border-black transition-all duration-300 shadow-2xs hover:shadow-xl"
            >
              <div>
                <div
                  onClick={() => setSelectedPost(post)}
                  className="relative aspect-[16/10] overflow-hidden bg-neutral-900 cursor-pointer"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-none bg-black/70 backdrop-blur-sm text-[10px] font-mono text-white uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>

                  <h2
                    onClick={() => setSelectedPost(post)}
                    className="font-editorial text-xl sm:text-2xl text-black font-normal leading-snug group-hover:text-neutral-700 transition-colors cursor-pointer"
                  >
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black group-hover:text-neutral-600 transition-colors cursor-pointer pt-3"
                >
                  <span>Leer artículo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Box */}
        <div className="p-8 sm:p-12 rounded-none bg-neutral-50 border border-neutral-200 text-center space-y-4">
          <h3 className="font-editorial text-2xl sm:text-3xl text-black font-normal">
            ¿Quieres preparar una sesión fotográfica para tu familia?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto">
            Te asesoramos desde la primera llamada sobre vestuario, atrezzo, iluminación y fechas ideales para tu recuerdo.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal('Asesoría y Sesión')}
              className="px-8 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-none hover:bg-neutral-800 transition-colors cursor-pointer border border-black"
            >
              Consultar Disponibilidad
            </button>
          </div>
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="bg-white border border-neutral-200 rounded-none w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-12 shadow-2xl relative space-y-8 text-neutral-900">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-neutral-200 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  <span>{selectedPost.category}</span>
                  <span>·</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-4xl text-black font-normal leading-tight">
                  {selectedPost.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2.5 rounded-none bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 transition-colors focus:outline-none cursor-pointer border border-neutral-200"
                aria-label="Cerrar artículo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Image */}
            <div className="relative aspect-[16/9] rounded-none overflow-hidden bg-neutral-900">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
              {selectedPost.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Footer inside Reader */}
            <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-neutral-400">
                Carlota Lagunas Fotografía · Zaragoza
              </span>
              <button
                onClick={() => {
                  setSelectedPost(null);
                  onOpenQuoteModal(`Sesión relacionada con: ${selectedPost.title}`);
                }}
                className="px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-none hover:bg-neutral-800 transition-colors cursor-pointer border border-black"
              >
                Consultar Disponibilidad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
