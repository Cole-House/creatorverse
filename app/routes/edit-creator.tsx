
import type { Route } from "./+types/edit-creator";
import EditCreator from "../pages/EditCreator";

export default function EditCreatorRoute({ params }: Route.ComponentProps) {
  return <EditCreator id={params.id} />;
}