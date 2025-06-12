
import { connectDB } from "../../../../../../lib/db.js";
import Project from "../../../../../../lib/models/Project.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../lib/auth.js";

export async function PUT(_, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return Response.json({ error: "Project ID is required" }, { status: 400 });
  }
  try {
    const project = await Project.findById(id);
    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    project.status = project.status === "public" ? "private" : "public";
    await project.save();

    return Response.json({
      message: "Project status toggled",
      newStatus: project.status,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
