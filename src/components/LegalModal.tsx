import React from 'react';
import { X } from 'lucide-react';

export type LegalDocType = 'privacidad' | 'cookies' | 'aviso' | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docType, onClose }) => {
  if (!docType) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white border border-neutral-200 rounded-none w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative text-neutral-700 font-light text-xs sm:text-sm leading-relaxed space-y-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-none transition-colors focus:outline-none cursor-pointer border border-neutral-200"
          aria-label="Cerrar documento legal"
        >
          <X className="w-5 h-5" />
        </button>

        {docType === 'aviso' && (
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl text-black font-normal">
              Aviso Legal
            </h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular:
            </p>
            <ul className="space-y-1 list-disc pl-5 text-neutral-600 font-mono text-xs">
              <li><strong>Razón Social:</strong> CARLOTA LAGUNAS FOTOGRAFIA SL</li>
              <li><strong>NIF:</strong> 17740336E</li>
              <li><strong>Representante:</strong> Carlota Lagunas Laín</li>
              <li><strong>Domicilio Social:</strong> C/ Rosalía de Castro, 15, local, 50018 Zaragoza, Aragón, España</li>
              <li><strong>Teléfono de contacto:</strong> +34 687 707 029</li>
              <li><strong>Correo electrónico:</strong> info@carlotalagunas.com</li>
              <li><strong>Actividad:</strong> Fotografía profesional infantil, de recién nacidos, maternidad, eventos familiares y comuniones.</li>
            </ul>
            <h3 className="font-editorial text-lg text-black font-normal pt-2">
              Propiedad Intelectual e Industrial
            </h3>
            <p>
              Todas las fotografías de bebés, familias y niños, textos, logotipos y designs exhibidos en este sitio web son propiedad exclusiva de CARLOTA LAGUNAS FOTOGRAFIA SL y están protegidos por la legislación española e internacional sobre propiedad intelectual. Queda expresamente prohibida su copia, distribución, reproducción o uso comercial o publicitario no autorizado sin el consentimiento expreso y por escrito de su autora y de los tutores legales de los menores.
            </p>
          </div>
        )}

        {docType === 'privacidad' && (
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl text-black font-normal">
              Política de Privacidad y Protección de Datos
            </h2>
            <p>
              De conformidad con el Reglamento General de Protección de Datos (RGPD UE 2016/679) y la Ley Orgánica 3/2018 (LOPDGDD), se le informa de que los datos facilitados a través del formulario de contacto o solicitudes de reserva serán tratados bajo la responsabilidad de <strong>CARLOTA LAGUNAS FOTOGRAFIA SL</strong> (NIF: 17740336E).
            </p>
            <h3 className="font-editorial text-lg text-black font-normal pt-2">
              Finalidad del Tratamiento
            </h3>
            <p>
              Gestionar las consultas recibidas, coordinar citas y fechas para sesiones fotográficas de embarazo, recién nacido o familia, y remitir la información de tarifas y presupuestos solicitados. No se cederán datos a terceros, salvo expresa obligación legal.
            </p>
            <h3 className="font-editorial text-lg text-black font-normal pt-2">
              Fotografía de Menores
            </h3>
            <p>
              El tratamiento de imágenes de recién nacidos y menores de edad se realiza únicamente bajo la previa autorización expresa, por escrito y firmada por sus padres o tutores legales antes o durante la sesión.
            </p>
            <h3 className="font-editorial text-lg text-black font-normal pt-2">
              Derechos del Usuario
            </h3>
            <p>
              Puede ejercer sus derechos de acceso, rectificación, supresión, limitación y oposición en cualquier momento remitiendo un correo electrónico a <strong>info@carlotalagunas.com</strong>, adjuntando acreditación de su identidad.
            </p>
          </div>
        )}

        {docType === 'cookies' && (
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl text-black font-normal">
              Política de Cookies
            </h2>
            <p>
              Este sitio web utiliza cookies técnicas esenciales y de analítica anónima para permitir una navegación fluida, recordar sus preferencias y garantizar la seguridad del sitio web.
            </p>
            <h3 className="font-editorial text-lg text-black font-normal pt-2">
              Tipos de cookies utilizadas
            </h3>
            <ul className="space-y-1 list-disc pl-5 text-neutral-600">
              <li><strong>Cookies técnicas esenciales:</strong> Necesarias para el correcto funcionamiento de formularios interactivos, galería modal (lightbox) y navegación del sitio.</li>
              <li><strong>Cookies de preferencias:</strong> Almacenan el estado de aceptación del aviso legal y cookies en su navegador.</li>
            </ul>
            <p>
              Puede configurar o revocar el consentimiento de cookies en cualquier momento a través de las opciones de configuración de su navegador (Chrome, Safari, Firefox, Edge).
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-semibold rounded-none hover:bg-neutral-800 transition-colors cursor-pointer border border-black"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
