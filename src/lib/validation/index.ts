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
