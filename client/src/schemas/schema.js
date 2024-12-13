import * as z from "zod";

export const skillsList = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "DevOps",
  "UI/UX Design",
  "Data Science",
  "Machine Learning",
];

export const interestsList = [
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "Artificial Intelligence",
  "Blockchain",
  "Cybersecurity",
  "Game Development",
  "IoT",
  "Open Source",
  "Technical Writing",
];

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["mentee", "mentor"], {
    required_error: "Please select a role",
  }),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  skills: z.array(z.enum(skillsList)).min(1, "Select at least one skill"),
  interests: z
    .array(z.enum(interestsList))
    .min(1, "Select at least one interest"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least one letter and one number"
    ),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});
