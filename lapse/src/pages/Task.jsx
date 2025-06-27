import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  Calendar, 
  User, 
  ChevronDown, 
  X, 
  Save,
  GripVertical,
  CheckCircle,
  Circle,
  AlertCircle
} from 'lucide-react';
import { createTaskApi, updateTaskApi, deleteTaskApi, getTasksApi } from '../Api/Api';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignee: '',
    dueDate: ''
  });
  const navigate = useNavigate();

  const columns = [
    { id: 'To-Do', title: 'To Do', color: 'from-slate-500 to-slate-600' },
    { id: 'In-Progress', title: 'In Progress', color: 'from-blue-500 to-blue-600' },
    { id: 'Done', title: 'Done', color: 'from-green-500 to-green-600' }
  ];

  const priorityColors = {
    Low: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    High: 'bg-red-100 text-red-800 border-red-200'
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      toast.error('Please log in');
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const response = await getTasksApi();
      if (response?.data?.success) {
        setTasks(response.data.tasks);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch tasks');
      }
    } catch (error) {
      toast.error('Error fetching tasks');
      console.error('Fetch tasks error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      assignee: '',
      dueDate: ''
    });
    setEditingTask(null);
  };

  const openModal = (task = null) => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        assignee: task.assigned_to ? task.assigned_to.toString() : '', // Match backend assigned_to
        dueDate: task.due_date ? task.due_date.split('T')[0] : '' // Format date
      });
      setEditingTask(task);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) return;

    try {
      if (editingTask) {
        const response = await updateTaskApi(editingTask.id, formData);
        if (response?.data?.success) {
          setTasks(tasks.map(task => task.id === editingTask.id ? response.data.task : task));
          toast.success('Task updated');
        }
      } else {
        const response = await createTaskApi(formData);
        if (response?.data?.success) {
          setTasks([...tasks, response.data.task]);
          toast.success('Task created');
        }
      }
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving task');
      console.error('Save task error:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await deleteTaskApi(taskId);
      if (response?.data?.success) {
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.success('Task deleted');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting task');
      console.error('Delete task error:', error);
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      try {
        const updatedTask = { ...draggedTask, status: newStatus };
        const response = await updateTaskApi(draggedTask.id, updatedTask);
        if (response?.data?.success) {
          setTasks(tasks.map(task =>
            task.id === draggedTask.id ? response.data.task : task
          ));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error updating task status');
        console.error('Update status error:', error);
      }
      setDraggedTask(null);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && dueDate;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 mt-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Task <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Board</span>
              </h1>
              <p className="text-slate-600">Organize and track your tasks with ease</p>
            </div>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Task
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <div
              key={column.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className={`bg-gradient-to-r ${column.color} p-4`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">{column.title}</h3>
                  <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>
              </div>

              {/* Tasks */}
              <div className="p-4 space-y-4 min-h-[500px]">
                {getTasksByStatus(column.id).map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 cursor-move hover:shadow-lg transition-all duration-200 border border-slate-200 hover:border-indigo-200 group"
                  >
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <GripVertical className="w-4 h-4 text-slate-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className="font-semibold text-slate-900 text-sm leading-tight">{task.title}</h4>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openModal(task)}
                          className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Task Description */}
                    {task.description && (
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">{task.description}</p>
                    )}

                    {/* Task Meta */}
                    <div className="space-y-2">
                      {/* Priority */}
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                        {task.status === 'Done' && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>

                      {/* Due Date & Assignee */}
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        {task.due_date && (
                          <div className={`flex items-center ${isOverdue(task.due_date) ? 'text-red-600' : ''}`}>
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(task.due_date)}
                            {isOverdue(task.due_date) && <AlertCircle className="w-3 h-3 ml-1" />}
                          </div>
                        )}
                        {task.assigned_to && (
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {task.assignee?.split(' ')[0] || 'Unknown'} {/* Fallback if assignee not set */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {getTasksByStatus(column.id).length === 0 && (
                  <div className="text-center py-12">
                    <Circle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">No tasks yet</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Task Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {editingTask ? 'Edit Task' : 'Create New Task'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Task Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter task title..."
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      rows="3"
                      placeholder="Enter task description..."
                    />
                  </div>

                  {/* Priority & Due Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Assignee */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Assignee
                    </label>
                    <input
                      type="text"
                      value={formData.assignee}
                      onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter assignee name..."
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingTask ? 'Update' : 'Create'} Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;