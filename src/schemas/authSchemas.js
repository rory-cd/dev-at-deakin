import * as z from "zod";   // Client side validation

// Schema used for all User data
const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[0-9]/, "Password must include at least one number"),
  confirmPassword: z.string().min(6, "Password confirmation is required"),
});

// Sub-schema used for logging in
export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

// Sub-schema for resetting password
export const ResetPasswordSchema = UserSchema.pick({
  email: true
});

// Sub-schema for signing up
export const SignupSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
  confirmPassword: true,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});