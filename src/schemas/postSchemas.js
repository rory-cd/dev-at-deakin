import * as z from "zod";   // Client side validation

// Schema for all posts
const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  abstract: z.string().min(1, "Abstract is required"),
  imgUrl: z.string().min(1, "Image is required"),
  content: z.string().min(1, "Content is required")
});

// Sub-schema specifically for questions
export const QuestionSchema = PostSchema.pick({
  title: true,
  description: true,
  type: true
});

// Sub-schema specifically for articles
export const ArticleSchema = PostSchema.pick({
  title: true,
  abstract: true,
  content: true,
  imgUrl: true
});