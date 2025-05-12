'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useImportProducts } from '@app/use-cases/useImportProducts';
import { DownloadCSVProductsService } from '@domain/services/DownloadCSVProductsService';
import { ProductRepository } from '@infra/http/repositories/ProductRepository';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  onSubmitSuccessAction: () => void;
}

export function UploadForm({ onSubmitSuccessAction }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const importProducts = useImportProducts();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setError('Por favor, selecione um arquivo CSV.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      await importProducts(formData)
      toast.success('Produtos importados com sucesso.', {
        duration: 3000,
        position: 'top-right',
        dismissible: true,
      });
      onSubmitSuccessAction();
    } catch {
      setError('Erro ao processar o arquivo. Verifique se o CSV está no formato correto.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSampleCSV = async () => {
    try {
      const service = new DownloadCSVProductsService(new ProductRepository());
      const response = await service.execute();

      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sample_products.csv';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Erro ao baixar o CSV modelo.');
    }
  }
  

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <Label htmlFor="csv">Arquivo CSV</Label>
        <Input id="csv" type="file" accept=".csv" ref={fileInputRef} />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex flex-col sm:flex-row justify-end mb-4 gap-2">
        <Button variant='outline' type="button" onClick={handleDownloadSampleCSV}>
          Baixar CSV modelo
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? 'Importando...' : 'Importar Produtos'}
        </Button>
      </div>
    </form>
  );
}
