'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { unstable_ViewTransition as ViewTransition } from 'react'
import ArticleImage from './components/ArticleImage'

const articles = [
  {
    id: 1,
    title: "Introduction aux View Transitions",
    description: "Découvrez comment utiliser les View Transitions dans Next.js",
    slug: "introduction",
    image: "/images/transition.jpg"
  },
  {
    id: 2,
    title: "Les meilleures pratiques",
    description: "Apprenez les meilleures pratiques pour créer des animations fluides",
    slug: "pratiques",
    image: "/images/animation.jpg"
  },
  {
    id: 3,
    title: "Optimisation",
    description: "Comment optimiser les performances de votre application Next.js",
    slug: "optimisation",
    image: "/images/performance.jpg"
  }
]

export default function Home() {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault()
    if (!document.startViewTransition) {
      router.push(`/articles/${slug}`)
      return
    }
    document.startViewTransition(() => router.push(`/articles/${slug}`))
  }

  return (
    <ViewTransition>
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-8">Mon Blog</h1>
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="flex gap-6 p-6 border rounded-lg hover:bg-gray-50"
              onClick={(e) => handleClick(e, article.slug)}
            >
              <ArticleImage
                src={article.image}
                alt={article.title}
                id={article.id}
              />
              <div>
                <ViewTransition name={`title-${article.id}`}>
                  <h2 className="text-2xl font-semibold">{article.title}</h2>
                </ViewTransition>
                <ViewTransition name={`description-${article.id}`}>
                  <p className="text-gray-600 mt-2">{article.description}</p>
                </ViewTransition>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </ViewTransition>
  )
}
