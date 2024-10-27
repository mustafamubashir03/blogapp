const { z } = require("zod");

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be no more than 20 characters long" }),
  email: z.string().email({ message: "Email must be a valid email address" }),
  password: z.string(),
  image: z.string().optional(),
});

const userLoginSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username must be no more than 20 characters long" }),
    password: z.string(),
  });

const postSchema = z.object({
  username:z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
});
const categorySchema = z.object({
  name: z.string(),
});



module.exports = {userSchema,userLoginSchema,categorySchema,postSchema}