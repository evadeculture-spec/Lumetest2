import { Database, Trash2, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { STORAGE_KEYS } from "@/lib/storage";

export function SettingsPage() {
  function clearData() {
    const ok = window.confirm(
      "Tens a certeza? Isto apaga todas as tarefas, movimentos e treinos guardados neste navegador.",
    );
    if (!ok) return;
    Object.values(STORAGE_KEYS).forEach((key) =>
      localStorage.removeItem("lume:" + key),
    );
    window.location.reload();
  }

  return (
    <>
      <PageHeader title="Definições" subtitle="Sobre a app e os teus dados" />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={18} className="text-lilac" /> Os teus dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-2 text-sm text-muted">
            <p>
              Nesta versão (MVP), tudo é guardado apenas{" "}
              <strong className="text-ink">neste navegador</strong>, através do
              localStorage. Os dados não saem do teu dispositivo.
            </p>
            <p>
              Se limpares o histórico do navegador, os dados podem desaparecer.
              Numa versão futura poderemos ligar a uma conta e à cloud para
              sincronizar entre dispositivos.
            </p>
            <div className="pt-2">
              <Button variant="danger" onClick={clearData}>
                <Trash2 size={16} /> Apagar todos os dados
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles size={18} className="text-rose" /> Próximas versões
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ul className="grid grid-cols-1 gap-2 text-sm text-muted sm:grid-cols-2">
              {[
                "Início de sessão (login)",
                "Base de dados na cloud",
                "Sincronização entre dispositivos",
                "Gráficos financeiros",
                "Objetivos mensais",
                "Estatísticas de treino",
                "Modo escuro",
                "Instalar como app (PWA)",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
