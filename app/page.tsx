import { Button } from "@/components/ui/button";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Button className="cursor-pointer"  variant={'destructive'} size={'lg'}>Name</Button>
    </div>
      
  );
}
