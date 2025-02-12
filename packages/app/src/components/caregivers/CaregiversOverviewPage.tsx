import { useCaregiversList } from "~/hooks/use-caregivers";
import PageHeader from "../PageHeader";

export default function CaregiversOverviewPage() {
  const { data: caregivers, isLoading, error } = useCaregiversList();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!caregivers || caregivers.length === 0)
    return <div>No caregivers found</div>;

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="Overview" />

      <hr className="my-6" />
    </div>
  );
}
