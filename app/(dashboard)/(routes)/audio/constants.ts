import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Audio prompt is required"
  }),

  type: z.string().optional(),     // New
  style: z.string().optional(), 
});

 export const audioTypes = [
  { label: "Narration", value: "narration" },
  { label: "Music", value: "music" },
  { label: "Podcast", value: "podcast" },
  { label: "Character", value: "character" },
  { label: "Ad Voice", value: "ad" },
];

export const voiceStyles = [
  { label: "Calm", value: "calm" },
  { label: "Energetic", value: "energetic" },
  { label: "Deep", value: "deep" },
  { label: "Robotic", value: "robotic" },
  { label: "Childlike", value: "child" },
];
