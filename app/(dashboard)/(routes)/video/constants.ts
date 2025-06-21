import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),

  type: z.string().optional(),
  resolution: z.string().optional(),
  duration: z.string().optional(),
});

export const videoTypes = [
  { label: "Realistic", value: "realistic" },
  { label: "Animated", value: "animated" },
  { label: "Cartoon", value: "cartoon" },
  { label: "Stylized", value: "stylized" },
];

export const videoResolutions = [
  { label: "720p", value: "720p" },
  { label: "1080p", value: "1080p" },
  { label: "4K", value: "4k" },
];

export const videoDurations = [
  { label: "5 seconds", value: "5" },
  { label: "10 seconds", value: "10" },
  { label: "15 seconds", value: "15" },
  { label: "30 seconds", value: "30" },

  { label: "custom", value: "0" },
];
