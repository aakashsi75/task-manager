const { z } = require("zod");

const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1,"Name must be provided")
        .max(20,"Name cannot be more than 20 characters"),
    email: z
        .string()
        .trim()
        .regex(/^[a-z]+[0-9\._%+-]*@[a-z]+\.com$/,"Please enter a valid email"),
    password: z
        .string()
        .trim()
        .min(8,"Password must be atleast of 8 letters")
        .max(20,"Password cannot exceed more than 20 characters")
        .regex(/[A-Z]/,"Password must contain an uppercase letter")
        .regex(/[a-z]/,"Password must contain a lowercase letter")
        .regex(/\d/,"Password must contain a digit")
        .regex(/[!@#$%^&*]/,"Password must contain a special character")
});

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .regex(/^[a-z]+[0-9\._%+-]*@[a-z]+\.com$/,"Please enter a valid email"),
    password: z
        .string()
        .trim()
        .min(8,"Password must be atleast of 8 letters")
        .max(20,"Password cannot exceed more than 20 characters")
        .regex(/[A-Z]/,"Password must contain an uppercase letter")
        .regex(/[a-z]/,"Password must contain a lowercase letter")
        .regex(/\d/,"Password must contain a digit")
        .regex(/[!@#$%^&*]/,"Password must contain a special character")
});

module.exports = {
    registerSchema,
    loginSchema
};