import Users from "../databases/model/Users";

async function isOwner(req, res, next) {
  const user = await Users.findOne({
    where: { id: req.user.id },
  });
  if (user.isOwner) {
    next();
  } else {
    res.status(403).json({ message: "Invalid admin request" });
  }
}

export default isOwner;
