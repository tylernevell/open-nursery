import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Baby, Clock, BarChart3, Github } from "lucide-react";
import { SignedOutNavigation } from "~/components/signed-out/SignedOutNavigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div>
      <SignedOutNavigation />
      {/* Hero Section */}
      <section className="container mx-auto py-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Track Your Baby's Journey
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          OpenNursery helps you and your caregiving team track feeds, changes,
          sleep, and milestones in one simple dashboard. Make data-driven
          parenting decisions with powerful insights and trends.
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Baby className="w-12 h-12 text-blue-600" />}
            title="Complete Tracking"
            description="Track feedings, diapers, sleep, and growth milestones in one place"
          />
          <FeatureCard
            icon={<Clock className="w-12 h-12 text-blue-600" />}
            title="Real-time Updates"
            description="Sync instantly across all caregivers and devices"
          />
          <FeatureCard
            icon={<BarChart3 className="w-12 h-12 text-blue-600" />}
            title="Insightful Trends"
            description="Visualize patterns and track development over time"
          />
          <FeatureCard
            icon={<Heart className="w-12 h-12 text-blue-600" />}
            title="Forever Free"
            description="No premium features, no subscriptions, just pure parental support"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Open Source, Open Hearts</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Built by parents, for parents. OpenNursery is committed to providing a
          reliable, transparent tool for tracking your baby's development. Join
          our community and help make parenting a little bit easier for
          everyone.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            className="gap-2"
            onClick={() =>
              window.open("https://github.com/kurtaking/opennursery")
            }
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </Button>
        </div>
      </section>

      {/* <section className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-center mb-12">Ready?</h2>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link to="/sign-up">Get Started</Link>
        </Button>
      </section> */}
    </div>
  );
}

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="text-center p-6">
    <CardContent>
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);
