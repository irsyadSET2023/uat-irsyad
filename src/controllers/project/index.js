import Projects from "../../databases/model/Projects";

async function getAllProjectsbyOwner(req, res) {
  const adminId = req.user.id;
  let authorsInfo;
  try {
    authorsInfo = await Projects.findOne({ where: { admin: adminId } });
    if (!authorsInfo) {
      res.status(404).json({
        message: `There is no projects with this name admin ${adminId}`,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({ error });
    return;
  }
}
