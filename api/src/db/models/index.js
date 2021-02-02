import Permission from "./permission";
import ResourceRole from "./resource-role";
import Resource from "./resource";
import Role from "./role";
import User from "./user";
import UserSpaceRole from "./user-space-role";
import Space from "./space";
import SpaceWork from "./space-work";
import WorkCategory from "./work-category";
import WorkType from "./work-type";
import WorkState from "./work-state";
import WorkStatus from "./work-status";
import Work from "./work";
import WorkItem from "./work-item";
import Sequelize from "sequelize";
import config from "../config/config";

const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const models = {
    User: User(sequelize, Sequelize),
    Role: Role(sequelize, Sequelize),
    UserSpaceRole: UserSpaceRole(sequelize, Sequelize),
    Resource: Resource(sequelize, Sequelize),
    ResourceRole: ResourceRole(sequelize, Sequelize),
    Permission: Permission(sequelize, Sequelize),
    Space: Space(sequelize, Sequelize),
    SpaceWork: SpaceWork(sequelize, Sequelize),
    WorkCategory: WorkCategory(sequelize, Sequelize),
    WorkType: WorkType(sequelize, Sequelize),
    WorkState: WorkState(sequelize, Sequelize),
    WorkStatus: WorkStatus(sequelize, Sequelize),
    Work: Work(sequelize, Sequelize),
    WorkItem: WorkItem(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
    if ("associate" in models[key]) {
        models[key].associate(models);
    }
});

db.conn = sequelize;
db.orm = Sequelize;

export default db;
