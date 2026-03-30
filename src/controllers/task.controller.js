const Task = require("../models/task.model");
const User = require("../models/user.model");

// ✅ Create Task (Admin / Manager)
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Tasks (Role based)
exports.getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      // 👑 Admin → sab tasks
      tasks = await Task.find()
        .populate("assignedTo", "name email role")
        .populate("createdBy", "name email role");

    } else if (req.user.role === "manager") {
      // 🧑‍💼 Manager → assigned + created dono
      tasks = await Task.find({
        $or: [
          { assignedTo: req.user.id },
          { createdBy: req.user.id }
        ]
      })
        .populate("assignedTo", "name email role")
        .populate("createdBy", "name email role");

    } else {
      // 👤 User → sirf assigned
      tasks = await Task.find({ assignedTo: req.user.id })
        .populate("assignedTo", "name email role")
        .populate("createdBy", "name email role");
    }

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Task Status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Only assigned user OR admin
    if (
      task.assignedTo.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Task (Admin only)
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};