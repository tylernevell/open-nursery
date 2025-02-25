import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { babyApi } from '@/lib/apis/babyApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const createBabySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.date({ coerce: true }),
  gender: z.enum(['male', 'female', 'other']).optional(),
  birthWeight: z.number().optional(), // in grams
  birthLength: z.number().optional(), // in millimeters
  currentWeight: z.number().optional(), // in grams
  currentLength: z.number().optional(), // in millimeters
  notes: z.string().optional(),
});

type CreateBabyFormValues = z.infer<typeof createBabySchema>;

export function BabyProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateBabyFormValues>({
    resolver: zodResolver(createBabySchema),
  });

  const queryClient = useQueryClient();

  const onSubmit = async (data: CreateBabyFormValues) => {
    try {
      const response = await babyApi.createBaby(data);
      console.log(response);

      queryClient.invalidateQueries({ queryKey: ['babies'] });

      toast.success('Baby profile created successfully!', {
        duration: 3000,
        dismissible: true,
      });
    } catch (error) {
      console.error('Failed to create baby profile:', error);
      toast.error('Failed to create baby profile. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input id="dateOfBirth" type="date" {...register('dateOfBirth', { value: new Date() })} />
        {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          onValueChange={(value) => {
            const genderValue = value as 'male' | 'female' | 'other';
            register('gender').onChange({
              target: { value: genderValue, name: 'gender' },
            });
          }}
        >
          <SelectTrigger id="gender">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthWeight">Birth Weight (grams)</Label>
        <Input id="birthWeight" type="number" {...register('birthWeight', { valueAsNumber: true })} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthLength">Birth Length (mm)</Label>
        <Input id="birthLength" type="number" {...register('birthLength', { valueAsNumber: true })} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" {...register('notes')} />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Baby Profile'}
      </Button>
    </form>
  );
}
