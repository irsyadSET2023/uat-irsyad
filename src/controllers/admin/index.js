import Checklists from "../../databases/model/Checklist";
import Projects from "../../databases/model/Projects";
import Users from "../../databases/model/Users";

async function createCheckList(req, res) {
  const { name, projectId } = req.body;

  try {
    const checkList = await Checklists.create({ name, projectId });
    res.status(200).json({ message: "Checklist Created", checkList });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
    return;
  }
}

const adminController = { createCheckList };
export default adminController;
