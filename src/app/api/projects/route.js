import { connectDB } from "../../../../lib/db.js";
import Project from "../../../../lib/models/Project.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth.js";

// GET all projects (public by default, private for admins)
export async function GET(request) {
  await connectDB();
  
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === 'admin';
  
  // Optional filtering via query params
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  
  const filter = {};
  if (featured === 'true') filter.featured = true;
  if (category) filter.categories = category;
  
  // Non-admins only see public projects
  if (!isAdmin) {
    filter.status = 'public';
  } else if (status) {
    filter.status = status;
  }
  
  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  return Response.json(projects);
}

// POST a new project (admin-only)
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {
    title,
    description,
    shortDescription,
    technologies,
    categories,
    imageUrl,
    liveUrl,
    githubUrl,
    featured,
    order,
    status
  } = await request.json();
  
  await connectDB();
  
  try {
    const project = await Project.create({
      title,
      description,
      shortDescription: shortDescription || description.substring(0, 150),
      technologies,
      categories: categories || ['web'],
      imageUrl,
      liveUrl,
      githubUrl,
      featured: featured || false,
      order: order || 0,
      status: status || 'private' // Default to private for new projects
    });
    
    return Response.json(project);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

// Patch to update a project (admin-only)
export async function PATCH(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, ...updateData } = await request.json();
  
  if (!id) {
    return Response.json({ error: 'Project ID is required' }, { status: 400 });
  }

  await connectDB();
  
  try {
    const project = await Project.findByIdAndUpdate(id, updateData, { new: true });
    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return Response.json(project);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

// DELETE a project (admin-only)
export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { projectId } = await request.json();
  if (!projectId) {
    return Response.json({ error: 'Project ID is required' }, { status: 400 });
  }

  await connectDB();
  
  try {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return Response.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}