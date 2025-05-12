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
      setError('Please select a CSV file.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      await importProducts(formData);
      toast.success('Products imported successfully.', {
        duration: 3000,
        position: 'top-right',
        dismissible: true,
      });
      onSubmitSuccessAction();
    } catch {
      setError('Error processing file. Check the CSV field format.');
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
      toast.error('Error downloading the CSV template.');
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <Label htmlFor="csv">CSV File</Label>
        <Input id="csv" type="file" accept=".csv" ref={fileInputRef} />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex flex-col sm:flex-row justify-end mb-4 gap-2">
        <Button variant="outline" type="button" onClick={handleDownloadSampleCSV}>
          Download CSV Template
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? 'Importing...' : 'Import Products'}
        </Button>
      </div>
    </form>
  );
}
