import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { trackSubmit, trackContact } from "@/lib/metaPixel";

const URGENCIAS = [
  "Preciso resolver essa semana",
  "Nos próximos 30 dias",
  "Nos próximos 90 dias",
  "Só estou pesquisando por enquanto",
] as const;

const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(100),
  tipo_negocio: z.string().trim().min(2, "Informe o tipo de negócio").max(100),
  investimento: z.string().trim().min(1, "Informe quanto investe por mês").max(50),
  whatsapp: z.string().trim().min(10, "WhatsApp inválido").max(20),
  urgencia: z.enum(URGENCIAS, { required_error: "Selecione a sua urgência" }),
});
type LeadFormData = z.infer<typeof leadSchema>;

const WHATSAPP_BASE =
  "https://api.whatsapp.com/send/?phone=554796528371&type=phone_number&app_absent=0&text=";

const buildWhatsappUrl = (data: LeadFormData) => {
  const msg = encodeURIComponent(
    `Oi Ivan, acabei de preencher o formulário do diagnóstico. Meu negócio é ${data.tipo_negocio} e invisto R$${data.investimento} por mês em tráfego.`
  );
  return `${WHATSAPP_BASE}${msg}`;
};

interface LeadFormProps {
  variant?: "dark" | "light";
}

const LeadForm = ({ variant = "dark" }: LeadFormProps) => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      nome: "",
      tipo_negocio: "",
      investimento: "",
      whatsapp: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        nome: data.nome,
        tipo_negocio: data.tipo_negocio,
        investimento: data.investimento,
        whatsapp: data.whatsapp,
        urgencia: data.urgencia,
      });
      if (error) throw error;

      // Notificação por e-mail (não bloqueia o fluxo do usuário)
      supabase.functions
        .invoke("send-lead-notification", { body: data })
        .catch((e) => console.warn("Notificação falhou:", e));

      trackSubmit("lead_form_success");

      toast.success("Recebido! Te redirecionando para o WhatsApp...", {
        duration: 3000,
      });

      setTimeout(() => {
        trackContact("post_form_redirect");
        window.open(buildWhatsappUrl(data), "_blank");
      }, 600);

      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível enviar. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    variant === "dark"
      ? "h-12 rounded-lg bg-background/50 border-primary/20 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary/60 focus-visible:border-primary/50 transition"
      : "h-12 bg-white border-gray-300 text-black";

  const labelClass =
    variant === "dark"
      ? "text-foreground/80 text-[11px] font-semibold uppercase tracking-[0.14em]"
      : "text-black font-semibold";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="mb-6 text-center">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            Garanta sua vaga no diagnóstico
          </h3>
          <p className="mt-2 text-sm font-light text-muted-foreground">
            Preencha abaixo. Retorno pessoalmente em até 24h.
          </p>
        </div>

        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Nome completo *</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tipo_negocio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Tipo de negócio *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: barbearia, restaurante, clínica..." className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="investimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Quanto investe em tráfego por mês? *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 1500" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>WhatsApp (com DDD) *</FormLabel>
              <FormControl>
                <Input placeholder="(11) 99999-9999" className={inputClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="urgencia"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Qual a sua urgência em resolver isso? *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {URGENCIAS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={submitting}
          className="h-14 w-full rounded-full bg-gradient-primary text-sm font-semibold uppercase tracking-[0.06em] text-primary-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] sm:text-base"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ENVIANDO...
            </>
          ) : (
            <>
              Quero meu diagnóstico — R$97
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <p
          className={`text-center text-xs ${
            variant === "dark" ? "text-muted-foreground" : "text-gray-600"
          }`}
        >
          Seus dados ficam com você e comigo. Retorno em até 24h no seu WhatsApp.
        </p>
      </form>
    </Form>
  );
};

export default LeadForm;
