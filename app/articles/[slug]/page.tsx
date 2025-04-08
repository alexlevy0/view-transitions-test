'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { unstable_ViewTransition as ViewTransition } from 'react'
import ArticleImage from '../../components/ArticleImage'

const articles = [
  {
    id: 1,
    title: "Introduction aux View Transitions",
    description: "Découvrez comment utiliser les View Transitions dans Next.js",
    content: "Les View Transitions sont une nouvelle API qui permet de créer des transitions fluides entre les pages...",
    slug: "introduction",
    image: "/images/transition.jpg"
  },
  {
    id: 2,
    title: "Les meilleures pratiques",
    description: "Apprenez les meilleures pratiques pour créer des animations fluides",
    content: "Pour créer des animations fluides, il est important de suivre certaines bonnes pratiques...",
    slug: "pratiques",
    image: "/images/animation.jpg"
  },
  {
    id: 3,
    title: "Optimisation",
    description: "Comment optimiser les performances de votre application Next.js",
    content: "L'optimisation des performances est cruciale pour une bonne expérience utilisateur...",
    slug: "optimisation",
    image: "/images/performance.jpg"
  }
]

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const article = articles.find(a => a.slug === params.slug)

  if (!article) {
    return <div>Article non trouvé</div>
  }

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!document.startViewTransition) {
      router.push('/')
      return
    }
    document.startViewTransition(() => router.push('/'))
  }

  return (
    <ViewTransition>
      <main className="p-8">
        <Link 
          href="/" 
          onClick={handleBack}
          className="inline-block mb-8 text-blue-600 hover:text-blue-800"
        >
          ← Retour à la liste
        </Link>
        
        <div className="max-w-3xl mx-auto">
          <ViewTransition name={`title-${article.id}`}>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          </ViewTransition>
          
          <ViewTransition name={`description-${article.id}`}>
            <p className="text-xl text-gray-600 mb-8">{article.description}</p>
          </ViewTransition>

          <ViewTransition name={`image-${article.id}`}>
            <ArticleImage
              src={article.image}
              alt={article.title}
              id={article.id}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          </ViewTransition>

          <ViewTransition name={`content-${article.id}`}>
            <div className="prose max-w-none">
              <p>{article.content}</p>
            </div>
          </ViewTransition>
        </div>
      </main>
    </ViewTransition>
  )
} 