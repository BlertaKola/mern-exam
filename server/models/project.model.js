const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ProjectSchema = new mongoose.Schema({
    name: { type: String,
    required: [
        true,
        "Project name is required"
    ], unique: true
    },
    dueDate: { type: Date,
    required: [true, "Due date is required"],
    min: [new Date(), "Due date must be in the future dummy"]
    },
    state: {type: String,
    default: "Backlog"
    }
}, { timestamps: true });
ProjectSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Project', ProjectSchema);

