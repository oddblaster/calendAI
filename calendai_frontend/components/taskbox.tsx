import TaskLink from "./viewtask";

const TaskBox = () => {
    const tasks = [
        { title: 'Prepare presentation', completed: false },
        { title: 'Review code changes', completed: true },
        { title: 'Send weekly report', completed: false },
      ];
    
    return (
    <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-100 mb-4">Tasks</h2>
            <ul className="space-y-3">
              {tasks.map((task, index) => (
                <li key={index} className="flex items-center">
                  <input type="checkbox" checked={task.completed} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded" />
                  <span className={`ml-3 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-700 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <TaskLink></TaskLink>
            </div>
          </div>
        </div>
    );
}