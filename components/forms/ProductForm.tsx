'use client';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useCreateProduct } from '@app/use-cases/useCreateProduct';

import { CategoryRepository } from '@infra/http/repositories/CategoryRepository';

const categorySchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, 'Nome da categoria é obrigatório'),
  description: z.string().optional(),
});

const productSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
  price: z.coerce.number().positive('Preço deve ser maior que 0'),
  brand: z.string().min(1, 'Marca obrigatória'),
  quantity: z.coerce.number().int().nonnegative('Quantidade deve ser positiva'),
  category: categorySchema,
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
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: {
        id: undefined,
        name: '',
        description: ''
      }
    }
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [categoryOption, setCategoryOption] = useState<'existing' | 'new'>('existing');

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryRepo = new CategoryRepository();
      const response = await categoryRepo.findAll();

      if (response.success && response.data) {
        setCategories(response.data.filter((category: { id?: number }) => category.id !== undefined) as { id: number; name: string }[]);
      } else {
        console.error(response.error || 'Erro ao carregar categorias');
      }
    };

    fetchCategories();
  }, []);

  const productRepo = useCreateProduct();
  const onSubmit = async (data: ProductFormData) => {
    try {
      if (data.category.id) {
        delete data.category.name;
        delete data.category.description;
      }
      else if (data.category.name && !data.category.id) {
        delete data.category.id;
        delete data.category.description;
      }

      const response = await productRepo(data);

      if (response) {
        reset();
        onSubmitSuccess();
      } else {
        console.error('Erro ao criar produto:');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  const selectedCategoryId = watch('category.id');

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

      <div className="space-y-4">
        <Label>Tipo de Categoria</Label>
        <RadioGroup
          defaultValue="existing"
          className="flex gap-4"
          onValueChange={(value: 'existing' | 'new') => setCategoryOption(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="existing" id="existing" />
            <Label htmlFor="existing">Categoria Existente</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new" />
            <Label htmlFor="new">Nova Categoria</Label>
          </div>
        </RadioGroup>

        {categoryOption === 'existing' ? (
          <div>
            <Label>Categoria</Label>
            <Select
              onValueChange={(value) => {
                setValue('category.id', Number(value));
                const selectedCat = categories.find(cat => cat.id === Number(value));
                if (selectedCat) {
                  setValue('category.name', selectedCat.name);
                }
              }}
              value={selectedCategoryId ? String(selectedCategoryId) : undefined}
            >
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
            {errors.category?.id && <p className="text-sm text-red-500">{errors.category.id.message}</p>}
          </div>
        ) : (
          <>
            <div>
              <Label>Nome da Nova Categoria</Label>
              <Input {...register('category.name')} />
              {errors.category?.name && <p className="text-sm text-red-500">{errors.category.name.message}</p>}
            </div>
            <div>
              <Label>Descrição da Categoria (Opcional)</Label>
              <Input {...register('category.description')} />
              {errors.category?.description && <p className="text-sm text-red-500">{errors.category.description.message}</p>}
            </div>
          </>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Cadastrar Produto
      </Button>
    </form>
  );
}