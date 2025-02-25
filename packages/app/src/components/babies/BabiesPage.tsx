import PageHeader from '@/components/PageHeader';
import { BabyProfileCard } from '@/components/babies/BabyProfileCard';
import { BabyProfileForm } from '@/components/babies/BabyProfileForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { babyApi } from '@/lib/apis/babyApi';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';

export function BabiesPage() {
  const { data: babies, isLoading } = useQuery({
    queryKey: ['babies'],
    queryFn: async () => await babyApi.getBabies(),
  });

  if (isLoading) {
    // todo: build a loading spinner
    return <p>Loading...</p>;
  }

  const activeBabies = babies?.filter((baby) => baby.status === 'active');

  return (
    <div className="container w-full mx-auto px-4 py-6">
      <PageHeader title="Baby Profiles">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Baby
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Baby</DialogTitle>
            </DialogHeader>
            <BabyProfileForm />
          </DialogContent>
        </Dialog>
      </PageHeader>

      <hr className="my-6" />

      <div className="w-full">
        {activeBabies?.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No babies yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Click the "New Baby" button to add your first baby profile.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {activeBabies?.map((baby) => (
              <div key={baby.id} className="col-span-3 min-w-90">
                <BabyProfileCard baby={baby} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
