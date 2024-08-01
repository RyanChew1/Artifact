import * as z from "zod";

export const SignupValidation = z.object({
  first: z.string().min(1, { message: "Name cannot be blank." }),
  last: z.string().min(1, { message: "Name cannot be blank." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords do not match",
      path: ['confirmPassword']
    });
  }
  });

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const UploadProductValidation = z.object({
  title: z.string().min(1, { message: "Product title cannot be blank." }),
  description: z.string(),
  imageUrl: z.any(),
  price: z.coerce.number().multipleOf(0.01, {message: "Invalid Price"})
}).superRefine(({ price, imageUrl}, ctx) => {
  if (price < 0) {
    ctx.addIssue({
      code: "custom",
      message: "Invalid Price",
      path: ['price']
    })
    
    ;
  }
  if (imageUrl==undefined) {
    ctx.addIssue({
      code: imageUrl,
      message: "Upload an Image",
      path: ['imageUrl']
      });
      }
  });