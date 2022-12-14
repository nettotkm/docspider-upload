import express from 'express';
import cors from "cors";
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();
const appRouter = t.router({
  documents: t.procedure.query(async (req) => {
    const documents = await prisma.document.findMany();

    return documents;
  })
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors())
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);
app.listen(4000);