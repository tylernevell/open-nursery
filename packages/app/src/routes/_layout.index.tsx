import SignedOut from '@/components/signed-out/SignedOutPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/')({
  component: LandingPage,
});

function LandingPage() {
  return <SignedOut />;
}
