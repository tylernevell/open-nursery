import { createFileRoute } from "@tanstack/react-router";
import { ProfileForm } from "~/components/settings/profile-form";
import { Separator } from "~/components/ui/separator";

export const Route = createFileRoute("/_authed/settings/_settings-layout/")({
  component: SettingsOverview,
});

export default function SettingsOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
