import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
  type: z.string().optional(), // Add type
});

export const textTypes = [
  { label: "General", value: "general" },
  { label: "Summarize", value: "summarize" },
  { label: "Explain like I'm 5", value: "explain-simple" },
  { label: "Formal Email", value: "formal-email" },
  { label: "Blog Intro", value: "blog-intro" },
  { label: "Creative Writing", value: "creative" },
];