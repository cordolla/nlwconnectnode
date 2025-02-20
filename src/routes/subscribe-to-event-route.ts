import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'subscribe to events from the specified',
        tags: ['subscribe'],
        description: 'Subscribes the user to the specified event',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      // criação da inscrição no banco de dados

      return reply.status(201).send({
        name,
        email,
      })
    }
  )
}
