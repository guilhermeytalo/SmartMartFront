'use client';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseCSVToProducts } from '@/lib/csvParser';

interface Props {
  onSubmitSuccess: () => void;
}

export function UploadForm({ onSubmitSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      const products = await parseCSVToProducts(file);
      console.log('Produtos importados do CSV:', products);

      // await createProductsBatch(products)

      onSubmitSuccess();
    } catch (err) {
      setError('Erro ao processar o arquivo. Verifique se o CSV está no formato correto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <Label htmlFor="csv">Arquivo CSV</Label>
        <Input id="csv" type="file" accept=".csv" ref={fileInputRef} />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Importando...' : 'Importar Produtos'}
      </Button>
    </form>
  );
}
