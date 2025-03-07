import { z } from "zod";

const dataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
});

export default dataSchema;
