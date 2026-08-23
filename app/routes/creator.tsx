import type { Route } from "./+types/creator";
import ViewCreator from "../pages/ViewCreator";

export default function CreatorRoute({ params }: Route.ComponentProps) {
  return <ViewCreator id={params.id} />;
}
