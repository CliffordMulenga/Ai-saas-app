"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

import { Open_Sans } from 'next/font/google';

import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { cn } from '@/lib/utils';

import { usePathname } from "next/navigation";
import { FreeCounter } from './free-counter';


// font for the logo only

const sans = Open_Sans({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Text Generation",
    icon: MessageSquare,
    href: "/text",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    href: "/video",
  },
  {
    label: "Audio Generation",
    icon: Music,
    color: "text-emerald-500",
    href: "/audio",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    href: "/code",
  }
];



const Sidebar = ({
   apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {

  const pathname = usePathname();
  return (
    <div className='space-y-4 py-4 flex flex-col h-full text-gray-900'>
        <div>
            <Link href={'/dashboard'} className='flex items-center pl-4 mb-7'>
              <div className='relative w-8 h-8 mr-4'>
                <Image fill alt='logo' src={'/logo.png'}/>
              </div>
              <h1 className={cn('text-2xl font-bold', sans.className)}>Ai App</h1>
            </Link>

            {/* routes */}

            <div className='space-y-1'>
               {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-500 hover:bg-gray-100 transition",
                pathname === route.href
                  ? "text-gray-900 font-bold bg-gray-100"
                  : "text-zinc-400 hover:bg-gray-200"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}

            </div>
        </div>

        <div>
          <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
          
        </div>
    </div>
  )
}

export default Sidebar
