import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarBlank,
  ArrowLeft,
  CaretRight,
  Clock,
  List,
  ListIcon,
} from "@phosphor-icons/react/dist/ssr";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vesobooks.in";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim().replace(/[*_`]/g, "");
    headings.push({
      id: slugify(rawText),
      text: rawText,
      level,
    });
  }

  return headings;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Article Not Found · VesoBooks" };
  }
  const title = `${post.title} · VesoBooks`;
  const description = post.excerpt || "VesoBooks Blog — guides and updates for Indian businesses.";
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = extractHeadings(post.content);

  return (
    <main className="bg-white py-12 md:py-20 text-zinc-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
            <li>
              <Link href="/" className="transition-colors hover:text-zinc-950">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <CaretRight size={12} weight="bold" className="text-zinc-400" />
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-zinc-950">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">
              <CaretRight size={12} weight="bold" className="text-zinc-400" />
            </li>
            <li className="line-clamp-1 font-semibold text-zinc-900">{post.category}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-10 border-b border-zinc-200/80 pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-[11px] font-medium text-zinc-700">
              <span className="size-1.5 rounded-full bg-mint-strong" aria-hidden />
              {post.category}
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-500">
              <Clock size={13} weight="bold" />
              {post.readTime}
            </span>
            <span className="text-zinc-300">·</span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-500">
              <CalendarBlank size={13} weight="bold" />
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl font-semibold leading-[1.12] tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {/* Author bar */}
          <div className="mt-6 flex items-center justify-between pt-5 border-t border-zinc-100 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 font-mono text-sm font-semibold text-zinc-800">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-zinc-950">{post.author.name}</p>
                <p className="text-zinc-500">{post.author.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Cover image if available */}
        {post.coverImage && (
          <div className="mb-10 overflow-hidden rounded-xl border border-zinc-200 shadow-xs">
            <img
              src={post.coverImage}
              alt={post.title}
              className="max-h-[460px] w-full object-cover"
            />
          </div>
        )}

        {/* Main Layout: Article Body + Table of Contents */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Markdown Content Surface */}
          <div className={toc.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}>
            <article className="text-zinc-800">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => {
                    const text = String(children);
                    const id = slugify(text);
                    return (
                      <h2
                        id={id}
                        className="scroll-mt-24 mt-12 mb-4 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl border-b border-zinc-100 pb-2"
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children }) => {
                    const text = String(children);
                    const id = slugify(text);
                    return (
                      <h3
                        id={id}
                        className="scroll-mt-24 mt-8 mb-3 text-xl font-semibold tracking-tight text-zinc-950"
                      >
                        {children}
                      </h3>
                    );
                  },
                  p: ({ children }) => (
                    <p className="my-4 text-[16px] leading-[1.8] text-zinc-700">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-4 ml-6 list-disc space-y-2 text-[15px] leading-relaxed text-zinc-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-4 ml-6 list-decimal space-y-2 text-[15px] leading-relaxed text-zinc-700">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="pl-1">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-zinc-950">
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-xs font-medium text-zinc-900">
                      {children}
                    </code>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-6 border-l-2 border-brand bg-zinc-50/60 py-3 pl-4 pr-3 italic text-zinc-700 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="my-6 overflow-x-auto rounded-xl border border-zinc-200">
                      <table className="w-full text-left text-sm">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 font-semibold text-zinc-900">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border-b border-zinc-100 px-4 py-3 text-zinc-700">
                      {children}
                    </td>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Back to Blog CTA */}
            <div className="mt-14 border-t border-zinc-200 pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-800 shadow-xs transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                <ArrowLeft size={14} weight="bold" />
                Back to all guides
              </Link>
            </div>
          </div>

          {/* Table of Contents Sticky Box */}
          {toc.length > 0 && (
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-5 shadow-xs">
                <div className="mb-3.5 flex items-center gap-2 border-b border-zinc-200/80 pb-3 font-sans text-xs font-semibold tracking-wider text-zinc-900">
                  <ListIcon size={15} weight="bold" className="text-zinc-600" />
                  <span>In this article</span>
                </div>
                <nav className="space-y-2.5 text-xs">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-zinc-600 transition-colors hover:text-brand ${
                        item.level === 3 ? "pl-3 text-[11px] text-zinc-500" : "font-medium"
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
