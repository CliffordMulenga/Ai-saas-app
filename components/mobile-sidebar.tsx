"use client";

import React from 'react'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet'
import Sidebar from '@/components/Sidebar'


const MobileSidebar = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size={"icon"} className='md:hidden'>
                        <Menu />
                    </Button>
                </SheetTrigger>

                {/* side bar content */}
                <SheetContent side='left' className='p-0'>
                    <SheetTitle className="sr-only">Sidebar</SheetTitle> {/* hidden from view, visible to screen readers */}
                    <Sidebar />
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default MobileSidebar
