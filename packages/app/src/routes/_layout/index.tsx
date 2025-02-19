import { createFileRoute } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureCarousel from "@/components/signed-out/feature-carousel";

export const Route = createFileRoute("/_layout/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Track Your Baby's Journey
          </h1>
          <p className="text-xl text-gray-600 mx-auto max-w-2xl">
            OpenNursery helps you and your caregiving team track feeds, changes,
            sleep, and milestones in one simple dashboard. Make data-driven
            parenting decisions with powerful insights and trends.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, powerful tools to help you track every moment of your baby's
            growth
          </p>
        </div>
        <FeatureCarousel />
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Open Source, Open Hearts
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Built by parents, for parents. OpenNursery is committed to providing
            a reliable, transparent tool for tracking your baby's development.
            Join our community and help make parenting a little bit easier for
            everyone.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 hover:bg-gray-100"
              onClick={() =>
                window.open("https://github.com/kurtaking/open-nursery")
              }
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
