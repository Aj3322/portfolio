import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100 
    },
    description: { 
      type: String, 
      required: true,
      maxlength: 500 
    },
    shortDescription: {
      type: String,
      maxlength: 150,
      default: ""
    },
    technologies: { 
      type: [String], 
      required: true,
      validate: {
        validator: (techs) => techs.length > 0,
        message: "At least one technology is required"
      }
    },
    categories: {
      type: [String],
      default: ["web"],
      enum: ["web", "mobile", "ai", "backend", "fullstack", "design"]
    },
    imageUrl: { 
      type: String, 
      required: true,
      match: [/^https?:\/\/.+\..+/, "Invalid URL format"]
    },
    liveUrl: {
      type: String,
      match: [/^https?:\/\/.+\..+/, "Invalid URL format"]
    },
    githubUrl: {
      type: String,
      match: [/^https?:\/\/(github\.com|gitlab\.com)\/.+/, "Invalid GitHub/GitLab URL"]
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0,
      min: 0
    },

    // New status field
    status: {
      type: String,
      enum: ["public", "private"],
      default: "private"
    }
  },
  { 
    timestamps: true 
  }
);

// 🔍 Full-text search index
projectSchema.index({
  title: "text",
  description: "text",
  technologies: "text"
});

// 🔄 Static method to toggle status
projectSchema.statics.toggleStatus = async function (projectId) {
  const project = await this.findById(projectId);
  if (!project) throw new Error("Project not found");

  project.status = project.status === "public" ? "private" : "public";
  return await project.save();
};

export default mongoose.models?.Project || mongoose.model("Project", projectSchema);
