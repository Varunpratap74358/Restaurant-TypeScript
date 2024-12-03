import { z } from "zod";

export const menueSchema = z.object({
  name: z.string().nonempty({ message: "Menu name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  price: z.number().min(10, { message: "Minimum price is 10" }),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size > 0, // File ho toh size check kare, warna skip kare
      { message: "Image file is required" }
    ),
});

export type MenueFormState = z.infer<typeof menueSchema>;
