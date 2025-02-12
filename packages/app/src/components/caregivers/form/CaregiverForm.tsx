import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { UserPlus } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

const relationshipOptions = [
  { value: "mother", label: "Mother" },
  { value: "father", label: "Father" },
  { value: "grandparent", label: "Grandparent" },
  { value: "nanny", label: "Nanny" },
  { value: "other", label: "Other" },
];

export default function CaregiverForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your invitation logic here
    setTimeout(() => setIsSubmitting(false), 1000); // Simulate API call
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Caregiver
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite a Caregiver</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter caregiver's full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter caregiver's email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship to Baby</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {relationshipOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Access Level</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary (Full Access)</SelectItem>
                <SelectItem value="secondary">Secondary (Can Edit)</SelectItem>
                <SelectItem value="support">Support (View Only)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Input
              id="message"
              placeholder="Add a personal note to the invitation"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending Invitation..." : "Send Invitation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Optional: Card wrapper version for standalone usage
// export function InviteCaregiverCard() {
//   return (
//     <Card className="w-full max-w-lg">
//       <CardContent className="pt-6">
//         <CaregiverForm />
//       </CardContent>
//     </Card>
//   );
// }
