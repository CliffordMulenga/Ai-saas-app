"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { tools } from "@/constants";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-10 py-10">
      {/* Header */}
      <div className="mb-10 space-y-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Unlock Next-Level Productivity with AI
        </h2>
        <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
          Discover tools designed to simplify your workflow, supercharge creativity, and elevate decision-making. Welcome to Charles AI — your intelligent productivity suite.
        </p>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            onClick={() => router.push(tool.href)}
            className="p-5 bg-gray-200 border border-zinc-400 hover:border-zinc-500 hover:font-medium rounded-xl transition hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-lg", tool.bgColor)}>
                  <tool.icon className={cn("h-6 w-6", tool.color)} />
                </div>
                <div className="text-gray-700 text-lg">
                  {tool.label}
                </div>
              </div>
              <ArrowRight className="text-zinc-400 hover:text-white h-4 w-4 transition" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
