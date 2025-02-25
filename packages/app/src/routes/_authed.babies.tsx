import { BabiesPage as ImportedBabiesPage } from '@/components/babies/BabiesPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/babies')({
  component: BabiesPage,
});

function BabiesPage() {
  return <ImportedBabiesPage />;
}
