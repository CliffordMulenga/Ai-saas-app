/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Volume2 } from "lucide-react";

import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema, audioTypes, voiceStyles } from "./constants";

const AudioPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [audio, setAudio] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setAudio(undefined);

      const response = await axios.post('/api/audio', values); 
      console.log(response);

      setAudio(response.data.audio);
      form.reset();
    } catch (error) {
      const err = error as { response?: { status?: number } };
      if (err?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  }



  return (
    <div>
      <Heading
        title="Audio Generation"
        description="Turn your prompt into audio content."
        icon={Volume2}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
          > 
            {/* input options */}

            <FormField
  control={form.control}
  name="type"
  render={({ field }) => (
    <FormItem className="col-span-6 md:col-span-3">
      <FormControl>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select audio type" />
          </SelectTrigger>
          <SelectContent>
            {audioTypes.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="style"
  render={({ field }) => (
    <FormItem className="col-span-6 md:col-span-3">
      <FormControl>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select voice style" />
          </SelectTrigger>
          <SelectContent>
            {voiceStyles.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  )}
/>

            {/* input form */}
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Generate a podcast intro about AI in 2025..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!audio && !isLoading && (
          <Empty label="No audio generated." />
        )}
        {audio && (
          <audio controls className="w-full mt-8">
            <source src={audio} />
          </audio>
        )}
      </div>
    </div>
  );
}

export default AudioPage;
