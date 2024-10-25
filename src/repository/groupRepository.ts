import { AppDataSource } from "../config/data-source";
import { Group } from "../entities/Group";

export const groupRepository = AppDataSource.getRepository(Group);