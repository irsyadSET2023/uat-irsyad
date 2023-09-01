// import connectionDB from "./connection/index";
import postgressConnection from "../connection";
import { DataTypes } from "sequelize";
import Users from "./Users";
import Organizations from "./Organizations";
const Projects = postgressConnection.define(
  "Projects",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },

    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    uniqueId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    // Other model options go here
    timestamp: true,
    paranoid: true,
    underscored: true,
  }
);
Projects.belongsTo(Users, { foreignKey: "owner" });
Projects.belongsTo(Users, { foreignKey: "admin" });

Projects.belongsTo(Organizations, { foreignKey: "organizationId" });

export default Projects;
