import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.post('/subscriptions', {
  schema: {
    body: z.object({
      name: z.string(),
      email: z.string().email()
    }),
    response: {
      201: z.object({
        name: z.string(),
        email: z.string().email()
      })
    }
  },

}, async (request, reply) => {
  const { name, email } = request.body;

  // criação da inscrição no banco de dados

  return reply.status(201).send({
    name,
    email
  })
})
app.listen({ port:3337 }).then(() => {
  console.log("Server is running on port 3337");
})
