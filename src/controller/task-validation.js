const z = require("zod");

const updateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

module.exports = updateSchema;
