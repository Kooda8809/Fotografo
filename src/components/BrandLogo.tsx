import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  alt?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'full',
  alt = 'Carlota Lagunas Fotografía Infantil'
}) => {
  const src = variant === 'icon' 
    ? '/carlota-lagunas-icon.png' 
    : '/carlota-lagunas-logo-trim.webp';

  const width = variant === 'icon' ? 120 : 160;
  const height = variant === 'icon' ? 120 : 88;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-contain transition-opacity ${className}`}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
};
