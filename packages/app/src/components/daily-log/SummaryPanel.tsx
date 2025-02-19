import { Card, CardContent } from "@/components/ui/card";
interface SummaryPanelProps {
  title: string;
  items: Array<{ label: string; value: string }>;
}

export function SummaryPanel({ title, items }: Readonly<SummaryPanelProps>) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">
          {title}
          <hr />
        </h3>

        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {item.label}
              </span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function SummarySection() {
  const summaryData = [
    {
      title: "Feedings",
      items: [
        { label: "Total", value: "6" },
        { label: "Volume", value: "24 oz" },
      ],
    },
    {
      title: "Sleep",
      items: [
        { label: "Total", value: "14 hrs" },
        { label: "Naps", value: "3" },
      ],
    },
    {
      title: "Diapers",
      items: [
        { label: "Wet", value: "6" },
        { label: "Dirty", value: "2" },
      ],
    },
  ];

  return (
    <>
      {summaryData.map((data, i) => (
        <SummaryPanel key={i} title={data.title} items={data.items} />
      ))}
    </>
  );
}
