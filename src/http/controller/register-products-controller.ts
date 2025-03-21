import { providers } from "@/providers";
import { StoreWithAccountNotExist } from "@/useCases/error/store-with-account-not-exist";
import { makeGetStoreUseCase } from "@/useCases/factories/make-get-store-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export const registerProducts = async (req: FastifyRequest, res: FastifyReply) => {
  const registerProductsSchema = z.object({
    account: z.string().min(1, "A conta é obrigatória"),
  });

  // Esquema para validar os arquivos (Excel)
  const fileSchema = z.object({
    filename: z.string().min(1, "O nome do arquivo é obrigatório"),
    mimetype: z.enum(
      [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
      ],
      {
        message: "O arquivo deve ser um Excel (.xlsx ou .xls)",
      }
    ),
    file: z.instanceof(Buffer).refine(
      (buffer) => buffer.length > 0 && buffer.length <= 5 * 1024 * 1024, // Máximo 5MB
      "O arquivo deve ter entre 1 byte e 5MB"
    ),
  });

  // Esquema para validar múltiplos arquivos
  const filesSchema = z.array(fileSchema).min(1, "Pelo menos um arquivo deve ser enviado");

  // Verifica se o Fastify Multipart está ativo
  if (!req.isMultipart()) {
    return res.status(400).send({ error: "A requisição deve ser multipart/form-data" });
  }

  // Processa os campos do multipart (arquivos + body)
  const parts = req.parts();
  let accountParse: string | null = null;
  const files: any[] = [];

  for await (const part of parts) {
    if (part.type === "field" && part.fieldname === "account") {
      accountParse = part.value as any;
    } else if (part.type === "file") {
      files.push({
        filename: part.filename,
        mimetype: part.mimetype,
        file: await part.toBuffer(),
      });
    }
  }

  // Validação dos campos
  const { account } = registerProductsSchema.parse({ account: accountParse });
  filesSchema.parse(files);

  try {
    const registerStoreUseCase = makeGetStoreUseCase();
    const { store } = await registerStoreUseCase.execute({ account });

    const storeProviderSchema = z.object({
      appKey: z.string(),
      appToken: z.string(),
      plataform: z.string(),
    });

    const { appKey, appToken, plataform } = storeProviderSchema.parse(store);

    const provider = providers[plataform]({ account, appKey, appToken });
    const allProducts = await provider.getAllProducts(files);

    return res.status(201).send({ allProducts });
  } catch (err: any) {
    if (err instanceof StoreWithAccountNotExist) {
      return res.status(409).send({ message: err.message });
    }

    return res.status(500).send({ message: err.message });
  }
};
