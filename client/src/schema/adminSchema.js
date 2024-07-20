import { z } from "zod";

export const adminLogin = z.object({
  email: z.string().email("Enter your email address."),
  password: z
    .string({ message: "Enter your password." })
    .min(6, "Password should atleast 6 characters.")
    .max(20, "Password should less than 20 characters."),
});

export const adminSignup = z
  .object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    phone: z.string().min(1, "Required"),
    username: z.string().min(1, "Required"),
    email: z.string().email("Enter your email address."),
    password: z
      .string({ message: "Enter your password." })
      .min(6, "Password should atleast 6 characters.")
      .max(20, "Password should less than 20 characters."),
    repassword: z
      .string({ message: "Enter your password." })
      .min(6, "Password should atleast 6 characters.")
      .max(20, "Password should less than 20 characters."),
    role: z.enum(["Administrative", "Employee"], { message: "Select your role." }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Password doesn't match!",
    path: ["repassword"],
  });
