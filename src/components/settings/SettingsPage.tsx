import { RotateCcw, Trash2, Info } from 'lucide-react';
import { useAppData } from '@/store/AppDataProvider';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';

export function SettingsPage() {
  const { resetDemoData, clearData } = useAppData();

  return (
    <div className="animate-in space-y-5">
      <PageHeader title="Definições" subtitle="Gere os teus dados" />

      <Card>
        <CardTitle>Dados</CardTitle>
        <p className="mt-1 text-sm text-muted">
          Nesta versão, tudo é guardado apenas neste dispositivo (no navegador).
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            onClick={() => {
              if (confirm('Repor os dados de exemplo? Os teus dados atuais serão substituídos.')) {
                resetDemoData();
              }
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Repor dados demo
          </Button>

          <Button
            variant="danger"
            className="justify-center border border-rose/20"
            onClick={() => {
              if (confirm('Apagar todos os dados? Esta ação não pode ser desfeita.')) {
                clearData();
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
            Apagar tudo
          </Button>
        </div>
      </Card>

      <Card className="bg-lilac-soft/40">
        <div className="flex gap-3">
          <Info className="h-5 w-5 shrink-0 text-lilac" />
          <div className="text-sm text-muted">
            <p className="font-medium text-ink">A pensar no futuro</p>
            <p className="mt-1">
              Esta base está preparada para, mais tarde, adicionar login, base de dados
              na cloud (Supabase/Firebase), sincronização entre dispositivos, gráficos,
              modo escuro e instalação como app (PWA).
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
