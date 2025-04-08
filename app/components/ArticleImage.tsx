'use client'

import Image from 'next/image'
import { unstable_ViewTransition as ViewTransition } from 'react'

interface ArticleImageProps {
  src: string
  alt: string
  id: number
  className?: string
}

export default function ArticleImage({ src, alt, id, className = '' }: ArticleImageProps) {
  return (
    <ViewTransition name={`image-${id}`}>
      <Image
        src={src}
        alt={alt}
        width={200}
        height={150}
        className={`rounded-lg ${className}`}
      />
    </ViewTransition>
  )
} 