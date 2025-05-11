'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import categoriesMock from '@/mock/categories.json';

const productSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
  price: z.coerce.number().positive('Preço deve ser maior que 0'),
  brand: z.string().min(1, 'Marca obrigatória'),
  quantity: z.coerce.number().int().nonnegative('Quantidade deve ser positiva'),
  category_id: z.coerce.number().int(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Props {
  onSubmitSuccess: () => void;
}

export function ProductForm({ onSubmitSuccess }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    setCategories(categoriesMock);
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    console.log('Produto enviado:', data);
    reset();
    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Nome</Label>
        <Input {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label>Descrição</Label>
        <Input {...register('description')} />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Preço</Label>
          <Input type="number" step="0.01" {...register('price')} />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <Label>Quantidade</Label>
          <Input type="number" {...register('quantity')} />
          {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
        </div>
      </div>

      <div>
        <Label>Marca</Label>
        <Input {...register('brand')} />
        {errors.brand && <p className="text-sm text-red-500">{errors.brand.message}</p>}
      </div>

      <div>
        <Label>Categoria</Label>
        <Select onValueChange={(value) => setValue('category_id', Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category_id && <p className="text-sm text-red-500">{errors.category_id.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Cadastrar Produto
      </Button>
    </form>
  );
}
