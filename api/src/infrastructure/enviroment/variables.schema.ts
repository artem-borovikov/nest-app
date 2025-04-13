import * as Joi from 'joi';
import { AppConfigs } from '../helpers/appConfigs';

export const variablesSchema = Joi.object<AppConfigs, true, AppConfigs>({
  JWT_SECRET: Joi.string().required(),
  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
});
