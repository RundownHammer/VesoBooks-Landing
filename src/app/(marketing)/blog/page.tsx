import React from "react";
import Link from "next/link";
import { CalendarBlank, ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vesobooks.in";

export const metadata: Metadata = {
  title: "Blog & Guides — GST Compliance, Inventory & Billing for Indian Businesses",
  description:
    "Practical guides, tax compliance insights, and multi-store inventory tutorials for businesses using VesoBooks.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "VesoBooks Blog & Guides",
    description:
      "Practical guides, tax compliance insights, and multi-store inventory tutorials.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default async function BlogListPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="bg-white py-16 md:py-24 text-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            The VesoBooks Journal
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
            Guides, Compliance &amp; Growth
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
            Actionable insights on Indian GST rules, e-Invoicing, counter POS setups, and multi-godown distribution.
          </p>
        </div>

        {/* 2-Column Grid for Blog Posts */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs transition-all hover:border-zinc-300 hover:shadow-md"
            >
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-[11px] font-medium text-zinc-700">
                    <span className="size-1.5 rounded-full bg-mint-strong" aria-hidden />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-500">
                    <Clock size={13} weight="bold" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold leading-snug text-zinc-950 transition-colors group-hover:text-brand">
                    {post.title}
                  </h2>
                </Link>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5 text-xs">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
                  <CalendarBlank size={14} weight="bold" />
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-zinc-900 transition-colors group-hover:text-brand"
                >
                  Read guide <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
