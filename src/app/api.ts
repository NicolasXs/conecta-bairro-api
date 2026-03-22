import { Elysia } from "elysia";
import { createDependencies } from "./dependencies";
import { authRoutes } from "../routes/auth.routes";
import { userRoutes } from "../routes/user.routes";
import { categoryRoutes } from "../routes/category.routes";
import { serviceRoutes } from "../routes/service.routes";
import { ratingRoutes } from "../routes/rating.routes";
import { mediaRoutes } from "../routes/media.routes";

export const createApiPlugin = () => {
  const dependencies = createDependencies();

  return new Elysia({ prefix: "/api/v1" })
    .use(authRoutes(dependencies.authController))
    .use(userRoutes(dependencies.userController))
    .use(categoryRoutes(dependencies.categoryController))
    .use(serviceRoutes(dependencies.serviceController))
    .use(ratingRoutes(dependencies.ratingController))
    .use(mediaRoutes(dependencies.mediaController));
};
