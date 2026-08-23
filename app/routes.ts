import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // This is the index route, which will be rendered when the user visits the root URL
  index("routes/home.tsx"),

  route("creators/:id", "routes/creator.tsx"),

  route("creators/:id/edit", "routes/edit-creator.tsx"),

  route("new", "routes/add-creator.tsx"),
] satisfies RouteConfig;
