import { z } from "zod";

export const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  telefone: z.string().trim().min(10, "Telefone inválido").max(20),
  empresa: z.string().trim().min(2, "Informe o nome da empresa").max(150),
  segmento: z.enum([
    "Delivery",
    "Restaurante",
    "Imobiliária",
    "Clínica/Estética",
    "E-commerce",
    "Serviços",
    "Outro",
  ]),
  faturamento: z.enum([
    "Até R$ 10k",
    "R$ 10k a R$ 30k",
    "R$ 30k a R$ 100k",
    "R$ 100k a R$ 300k",
    "Acima de R$ 300k",
  ]),
  investe_trafego: z.enum(["Sim", "Não", "Já investi e parei"]),
  ticket_medio: z.string().trim().max(100).optional().or(z.literal("")),
  desafio: z.string().trim().min(10, "Conte um pouco mais sobre seu desafio").max(1000),
});

export type LeadFormData = z.infer<typeof leadSchema>;
