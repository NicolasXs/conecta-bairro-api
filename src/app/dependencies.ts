import { AuthController } from "../controllers/auth.controller";
import { CategoryController } from "../controllers/category.controller";
import { MediaController } from "../controllers/media.controller";
import { RatingController } from "../controllers/rating.controller";
import { ServiceController } from "../controllers/service.controller";
import { UserController } from "../controllers/user.controller";
import { db } from "../db";
import { PostgresCategoryRepository } from "../repositories/category.pg.repository";
import { PostgresMediaRepository } from "../repositories/media.pg.repository";
import { PostgresRatingRepository } from "../repositories/rating.pg.repository";
import { PostgresServiceRepository } from "../repositories/service.pg.repository";
import { PostgresUserRepository } from "../repositories/user.pg.repository";
import { AuthService } from "../services/auth.service";
import { CategoryService } from "../services/category.service";
import { MediaService } from "../services/media.service";
import { RatingService } from "../services/rating.service";
import { ServiceService } from "../services/service.service";
import { UserService } from "../services/user.service";

export const createDependencies = () => {
  const userRepository = new PostgresUserRepository(db);
  const categoryRepository = new PostgresCategoryRepository(db);
  const serviceRepository = new PostgresServiceRepository(db);
  const ratingRepository = new PostgresRatingRepository(db);
  const mediaRepository = new PostgresMediaRepository(db);

  const authService = new AuthService(userRepository);
  const userService = new UserService(userRepository);
  const categoryService = new CategoryService(categoryRepository);
  const serviceService = new ServiceService(serviceRepository, userRepository);
  const ratingService = new RatingService(ratingRepository, userRepository);
  const mediaService = new MediaService(mediaRepository);

  return {
    authController: new AuthController(authService),
    userController: new UserController(userService),
    categoryController: new CategoryController(categoryService),
    serviceController: new ServiceController(serviceService),
    ratingController: new RatingController(ratingService),
    mediaController: new MediaController(mediaService),
  };
};
