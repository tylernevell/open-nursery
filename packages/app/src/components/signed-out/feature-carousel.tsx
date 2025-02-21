import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Baby, BarChart3, Clock, Heart } from 'lucide-react';
import type { ReactNode } from 'react';

const features = [
  {
    icon: <Baby className="w-12 h-12 text-blue-600" />,
    title: 'Complete Tracking',
    description: 'Track feedings, diapers, sleep, and growth milestones in one place',
  },
  {
    icon: <Clock className="w-12 h-12 text-blue-600" />,
    title: 'Real-time Updates',
    description: 'Sync instantly across all caregivers and devices',
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
    title: 'Insightful Trends',
    description: 'Visualize patterns and track development over time',
  },
  {
    icon: <Heart className="w-12 h-12 text-blue-600" />,
    title: 'Forever Free',
    description: 'No premium features, no subscriptions, just pure parental support',
  },
];

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="text-center p-6">
    <CardContent>
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export default function FeatureCarousel() {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full max-w-sm md:max-w-4xl mx-auto"
    >
      <CarouselContent>
        {features.map((feature) => (
          <CarouselItem key={feature.title} className="md:basis-1/2 lg:basis-1/3">
            <FeatureCard {...feature} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
