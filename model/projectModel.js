import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    mainImage: {
        type: String,
        required: true
    },
    galleryImages: [{
        type: String
    }],
    technologies: {
        frameworks: [{
            type: String,
            enum: ['react', 'nextjs', 'aspnet', 'reactnative', 'django', 'ejs']
        }],
        languages: [{
            type: String,
            enum: ['javascript', 'typescript', 'nodejs', 'csharp', 'python', 'go', 'bun']
        }],
        projectType: {
            type: String,
            enum: ['app', 'website', 'mobileapp'],
            required: true
        }
    },
    links: {
        github: {
            type: String,
            required: true
        },
        liveDemo: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'hidden'],
        default: 'draft'
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const ProjectModel = mongoose.model('Project', projectSchema);
export default ProjectModel;
