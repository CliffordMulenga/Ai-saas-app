import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";

import {
  Settings
} from "lucide-react";

export const FreeCounter = ({
  isPro = false,
  apiLimitCount = 0,
}: {
  isPro: boolean,
  apiLimitCount: number
}) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  

  if (isPro) {
    return null;
  }

  const settings = [
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
] 

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-gray-500 mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
          </div>
          <Button onClick={proModal.onOpen} variant="premium" className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>

          {/* settings */}

          <div className="mt-4">
          {
            settings.map((route) =>(
             <Link 
             key={route.href}
              href={route.href}>
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3")} />
                {route.label}
              </div>
             </Link>
            ))
          }
        </div>
        </CardContent>
      </Card>
    </div>
  )
}