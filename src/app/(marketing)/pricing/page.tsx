import { Suspense } from "react";
import { PricingContent } from "@/components/pricing/pricing-content";
import { PricingQueryProvider } from "@/components/pricing/pricing-query-provider";

export const metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for VesoBooks. Free, Pro, Business and Enterprise plans for every business. All prices in INR.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "VesoBooks Pricing — Free, Pro, Business & Enterprise",
    description:
      "Simple, transparent pricing for VesoBooks. Free, Pro, Business and Enterprise plans for every business.",
  },
};

function PricingContentSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="animate-pulse space-y-8 px-4 py-16 max-w-6xl mx-auto w-full">
          <div className="h-8 bg-zinc-100 rounded-full w-1/3 mx-auto" />
          <div className="grid gap-6 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4 p-6 border border-zinc-200 rounded-xl bg-white">
                <div className="h-6 bg-zinc-100 rounded w-1/2" />
                <div className="h-10 bg-zinc-100 rounded w-1/3" />
                <div className="space-y-3 pt-4">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="h-4 bg-zinc-100 rounded w-3/4" />
                  ))}
                </div>
                <div className="h-10 bg-zinc-100 rounded-full mt-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PricingQueryProvider>
        <Suspense fallback={<PricingContentSkeleton />}>
          <PricingContent />
        </Suspense>
      </PricingQueryProvider>
    </div>
  );
}
