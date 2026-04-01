/**
 * Utilitários para agendamento de postagens
 */

export const SchedulingStatus = {
  DRAFT: "draft",
  SCHEDULED: "scheduled",
  PUBLISHED: "published",
  FAILED: "failed",
} as const;

export type SchedulingStatusType =
  (typeof SchedulingStatus)[keyof typeof SchedulingStatus];

/**
 * Formata uma data para exibição legível
 */
export const formatScheduledDate = (
  date: string | null | undefined,
): string => {
  if (!date) return "Não agendado";

  try {
    const d = new Date(date);
    return d.toLocaleString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return "Data inválida";
  }
};

/**
 * Retorna em quanto tempo o agendamento será publicado
 */
export const getTimeUntilScheduled = (
  scheduledAt: string | null | undefined,
): string => {
  if (!scheduledAt) return "";

  try {
    const scheduled = new Date(scheduledAt);
    const now = new Date();
    const diff = scheduled.getTime() - now.getTime();

    if (diff < 0) return "Atrasado";

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `em ${days}d ${hours % 24}h`;
    if (hours > 0) return `em ${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `em ${minutes}m`;
    return "agora";
  } catch {
    return "";
  }
};

/**
 * Valida se a data agendada é válida
 */
export const isValidScheduleDate = (date: string | null): boolean => {
  if (!date) return true; // Opcional é válido

  try {
    const scheduled = new Date(date);
    const now = new Date();

    // Data deve ser no futuro
    if (scheduled <= now) {
      return false;
    }

    // Data não pode ser muito distante (ex: mais de 1 ano)
    const maxDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    if (scheduled > maxDate) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

/**
 * Retorna sugestões de horários imediatos
 */
export const getSuggestedSchedules = (): Array<{
  label: string;
  date: string;
}> => {
  const now = new Date();

  return [
    {
      label: "15 minutos",
      date: new Date(now.getTime() + 15 * 60 * 1000).toISOString(),
    },
    {
      label: "1 hora",
      date: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
    },
    {
      label: "Amanhã (8h)",
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        8,
        0,
        0,
      ).toISOString(),
    },
    {
      label: "Próxima semana (segunda 9h)",
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + ((8 - now.getDay()) % 7) + 1,
        9,
        0,
        0,
      ).toISOString(),
    },
  ];
};
