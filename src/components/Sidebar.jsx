import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64  bg-zinc-900 text-white min-h-screen p-4 bg-gradient-to-b from-zinc-900 to-zinc-800">
      <nav className="flex flex-col gap-4 text-white">
        <NavLink
          to="/dashboard/home"
          end
          className={({ isActive }) =>
            `px-4 py-3 rounded-md text-left  ${
              isActive ? 'bg-blue-500' : 'bg-zinc-800 hover:bg-blue-500'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard/projects"
          className={({ isActive }) =>
            `px-4 py-3 rounded-md text-left ${
              isActive ? 'bg-blue-500' : 'bg-zinc-800 hover:bg-blue-500'
            }`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/dashboard/tasks"
          className={({ isActive }) =>
            `px-4 py-3 rounded-md text-left ${
              isActive ? 'bg-blue-500' : 'bg-zinc-800 hover:bg-blue-500'
            }`
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to="/dashboard/chat"
          className={({ isActive }) =>
            `px-4 py-3 rounded-md text-left ${
              isActive ? 'bg-blue-500' : 'bg-zinc-800 hover:bg-blue-500'
            }`
          }
        >
          Chat
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
