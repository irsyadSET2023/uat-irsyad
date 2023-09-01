import { body } from "express-validator";
import { Op } from "sequelize";
import Users from "../../databases/model/Users";
import Organizations from "../../databases/model/Organizations";

export const loginValidator = [
  body("identifier")
    // .isEmail()
    // .withMessage("Must be email")
    .custom(async function (value) {
      //   console.log("Hello World", value);
      const user = await Users.findOne({
        atttibutes: ["identifier"],
        where: { [Op.or]: [{ userName: value }, { email: value }] },
      });
      if (!user) {
        throw new Error("User Does Not Exist");
      }
    }),
];

export const registorValidator = [
  body("username")
    .notEmpty()
    .withMessage("User Name must not be empty")
    .isAlpha()
    .withMessage("Must Be Alphabet Only")
    .custom(async function (value) {
      const user = await Users.findOne({
        where: { userName: value },
      });
      if (user) {
        throw new Error("This User Name Already Exist");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Must be email")
    .custom(async function (value) {
      const user = await Users.findOne({
        where: { email: value },
      });
      if (user) {
        throw new Error("This Email Already Exist");
      }
    }),
  body("organization")
    .notEmpty()
    .withMessage("organization must not be empty")
    .custom(async function (value) {
      const organization = await Organizations.findOne({
        where: { name: value },
      });

      if (!organization) {
        throw new Error("Organization Does Not Exist");
      }
    }),
  body("password").notEmpty().withMessage("Must not be Empty"),
];

export const updateValidator = [
  body("username")
    .optional()
    .isAlpha()
    .withMessage("Must Be Alphabet Only")
    .custom(async function (value) {
      const user = await Users.findOne({
        where: { userName: value },
      });
      if (user) {
        throw new Error("This User Name Already Exist");
      }
    }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be email")
    .custom(async function (value) {
      const user = await Users.findOne({
        where: { email: value },
      });
      if (user) {
        throw new Error("This Email Already Exist");
      }
    }),
  body("organization")
    .optional()
    .custom(async function (value) {
      const organization = await Organizations.findOne({
        where: { name: value },
      });

      if (!organization) {
        throw new Error("Organization Does Not Exist");
      }
    }),
];
