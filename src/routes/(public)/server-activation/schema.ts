import { z } from "zod";

export const activationSchema = z
	.object({
		username: z.string().trim().min(1).max(255),
		password: z.string().trim().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z.string().trim(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{ path: ["confirmPassword"], message: "Passwords do not match" }
	);
