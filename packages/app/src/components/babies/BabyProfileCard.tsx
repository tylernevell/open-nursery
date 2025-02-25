import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Baby } from '@/lib/types';
import { Archive, Edit, MoreVertical } from 'lucide-react';

interface BabyProfileCardProps {
  baby: Baby;
  onEdit?: (baby: Baby) => void;
  onArchive?: (baby: Baby) => void;
}

export function BabyProfileCard({ baby, onEdit, onArchive }: Readonly<BabyProfileCardProps>) {
  const age = '1 year, 2 months, 5 days';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">{baby.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(baby)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onArchive?.(baby)} className="text-destructive">
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="grid gap-2">
          <CardDisplayItem label="Age" value={age} />
          <CardDisplayItem label="Date of Birth" value={new Date(baby.dateOfBirth).toLocaleDateString()} />
          {baby.gender && (
            <CardDisplayItem label="Gender" value={baby.gender.charAt(0).toUpperCase() + baby.gender.slice(1)} />
          )}
          {baby.currentWeight && <CardDisplayItem label="Current Weight" value={formatWeight(baby.currentWeight)} />}
          {baby.currentLength && <CardDisplayItem label="Current Length" value={formatLength(baby.currentLength)} />}
          {baby.notes && <CardDisplayItem label="Notes" value={baby.notes} isNote />}
        </div>
      </CardContent>
    </Card>
  );
}

function formatWeight(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2)} kg`;
  }
  return `${grams} g`;
}

function formatLength(mm: number): string {
  return `${(mm / 10).toFixed(1)} cm`;
}

interface CardDisplayItemProps {
  label: string;
  value?: string | number;
  className?: string;
  isNote?: boolean;
}

export function CardDisplayItem({ label, value, className, isNote }: Readonly<CardDisplayItemProps>) {
  if (!value) return null;

  if (isNote) {
    return (
      <div className={`mt-2 pt-2 border-t ${className}`}>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    );
  }

  return (
    <div className={`flex justify-between py-1 ${className}`}>
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
