import { useCaregiversList } from "@/hooks/use-caregivers";
import CaregiverForm from "./form/CaregiverForm";
import { CaregiversTable } from "./table/CaregiversTable";
import { columns } from "./table/CaregiversTableColumn";
import PageHeader from "../PageHeader";

export default function CaregiversManagerPage() {
  const { data: caregivers, isLoading, error } = useCaregiversList();
  // const createCaregiver = useCreateCaregiver();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!caregivers || caregivers.length === 0)
    return <div>No caregivers found</div>;

  return (
    <div className="container w-screen p-4">
      <PageHeader title="Manage caregivers">
        <CaregiverForm />
      </PageHeader>

      <hr className="my-6" />

      <div className="w-full space-y-8">
        <CaregiversTable columns={columns} data={caregivers} />
      </div>
    </div>
  );
}
