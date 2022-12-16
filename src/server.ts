import express from 'express';
import formidable from "formidable"
import path from "path";
import fs from "fs"
import cors from "cors";
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { Prisma, PrismaClient } from '@prisma/client'
import { z, ZodError } from "zod";

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
  }),
  document: t.procedure.input((val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  }).query(async (req) => {
    const input = Number(req.input);

    const document = await prisma.document.findUnique({
      where: { id: input }
    });

    return document;
  }),
  createDocument: t.procedure.input(z.object({
    title: z.string().max(100, { message: "Título deve ter no máximo 100 caracteres"}),
    description: z.string().max(2000, { message: "Descrição deve ter no máximo 2000 caracteres"}),
    filename: z.string().optional(),
    filepath: z.string().optional()
  })).mutation(async (req) => {
    const { title, description, filename, filepath } = req.input;

    try {
      const document = await prisma.document.create({
        data: { title, description, filename, filepath }
      });
  
      return { success: true, document, error: null } ;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return { success: false, document: null, error: error };
      }

      
      throw error;
    }    
  }),
  editDocument: t.procedure.input(z.object({
    id: z.number(),
    title: z.string().max(100, { message: "Título deve ter no máximo 100 caracteres"}),
    description: z.string().max(2000, { message: "Descrição deve ter no máximo 2000 caracteres"}),
    filename: z.string().optional()
  })).mutation(async (req) => {
    const { id, title, description, filename } = req.input;

    const document = await prisma.document.update({
      where: { id  },
      data: { title, description, filename }
    });

    return document;
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
app.get('/:filefolder/:filename/download', (req, res) => {
  const uploadFolder = path.join(__dirname, '../uploads')
  res.download(path.join(uploadFolder, req.params.filefolder, req.params.filename))
})
// app.post('/:filefolder/:filename/rename', (req, res) => {

// })
app.post('/upload', (req, res) => {
  const uploadFolder = path.join(__dirname, '../uploads')
  // create an incoming form object
  const form = new formidable.IncomingForm({
    multiples: false,
    uploadDir: uploadFolder
  });

  form.parse(req, async (err, fields, files) => {
    console.log(fields);
    if (err) {
      console.log("Error parsing the files");
      return res.status(400).json({
        status: "Fail",
        message: "There was an error parsing the files",
        error: err,
      });
    }

    if (files.file) {
      const file = files.file as formidable.File;
      const originalName = (typeof fields.filename  === "string"  ?  fields.filename : null ) || file.originalFilename;
      
      if (originalName) {
        try {
          // renames the file in the directory
          fs.mkdirSync(path.join(uploadFolder, "f-" + file.newFilename));
          fs.renameSync(file.filepath, path.join(uploadFolder, "f-" + file.newFilename ,originalName));
          return res.status(200).json({
            status: "success",
            file: { path: path.join("f-" + file.newFilename ,originalName) },
          });
        } catch (error) {
          console.log(error);
          res.json({
            error,
          });
        }
      }
      
    }
  });
});
app.listen(4000);