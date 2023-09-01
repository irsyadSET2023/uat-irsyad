import Projects from "../../databases/model/Projects";
import Users from "../../databases/model/Users";

async function createProject(req, res) {
  const slug = Math.random().toString(36).substring(2, 8);

  const { name, admin, organization } = req.body;
  try {
    const project = await Projects.create({
      name,
      admin,
      owner: req.user.id,
      organizationId: organization,
      uniqueId: slug,
    });
    res.status(200).json({ message: "Project Created", project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

const ownerController = {
  createProject,
};

export default ownerController;
