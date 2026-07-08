const { z } = require("zod");

const taskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1,"Title is required")
        .max(100,"Title cannot exceed 100 characters")
});

module.exports = { taskSchema };