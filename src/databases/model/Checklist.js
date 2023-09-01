import { DataTypes } from "sequelize";
import postgressConnection from "../connection";
import Projects from "./Projects";

const Checklists = postgressConnection.define(
  "Checklists",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    timestamp: true,
    paranoid: true,
    underscored: true,
  }
);

Checklists.belongsTo(Projects, { foreignKey: "project_id" });
export default Checklists;
