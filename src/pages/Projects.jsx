import React, { useState } from 'react';
import './Projects.css';

const initialStudents = [
    { username: 'john_doe' },
    { username: 'jane_smith' },
    { username: 'mike_jones' }
];

const initialProjects = [
    {
        projectTitle: 'AI Chatbot',
        projectDescription: 'A chatbot using NLP.',
        students: ['john_doe'],
        projectCategory: 'Machine Learning',
        startingDate: '2025-05-01',
        endingDate: '2025-06-01',
        projectStatus: 'In Progress'
    },
    {
        projectTitle: 'React Dashboard',
        projectDescription: 'Admin dashboard in React.',
        students: ['jane_smith'],
        projectCategory: 'Web Development',
        startingDate: '2025-04-15',
        endingDate: '2025-05-30',
        projectStatus: 'Completed'
    }
];

const initialTasks = [
    { id: 1, project: 'AI Chatbot', name: 'Build NLP model', description: 'Create and train NLP model.', student: 'john_doe', status: 'In Progress' },
    { id: 2, project: 'React Dashboard', name: 'Design UI', description: 'Create UI mockups.', student: 'jane_smith', status: 'Completed' },
    { id: 3, project: 'React Dashboard', name: 'UI', description: 'Create UI mockups.', student: 'jane_smith', status: 'Completed' }
];

const Projects = () => {
    const [students] = useState(initialStudents);
    const [projects, setProjects] = useState(initialProjects);
    const [tasks] = useState(initialTasks);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarProject, setSidebarProject] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const toggleStudentSelection = (username) => {
        setSelectedStudents((prev) =>
            prev.includes(username) ? prev.filter((u) => u !== username) : [...prev, username]
        );
    };

    const handleSaveProject = () => {
        const title = document.querySelector('.input-title').value;
        const description = document.querySelector('.text-area-description').value;
        const category = document.querySelector('.Select-category').value;
        const startingDate = document.querySelector('.input-starting-date').value;
        const endingDate = document.querySelector('.input-ending-date').value;
        const status = document.querySelector('.select-Status').value;

        if (!title || !description || !category || !startingDate || !endingDate) {
            alert('All fields are required!');
            return;
        }

        if (startingDate >= endingDate) {
            alert('Starting date must be before ending date!');
            return;
        }

        const newProject = {
            projectTitle: title,
            projectDescription: description,
            students: selectedStudents,
            projectCategory: category,
            startingDate,
            endingDate,
            projectStatus: status
        };

        setProjects([...projects, newProject]);
        setShowModal(false);
        setSelectedStudents([]);
    };

    const calculateProgress = (start, end) => {
        const now = new Date();
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (now < startDate) return 0;
        if (now > endDate) return 100;
        return Math.floor(((now - startDate) / (endDate - startDate)) * 100);
    };

    const filteredProjects = projects.filter((p) => {
        const statusMatch = statusFilter === 'All Statuses' || p.projectStatus === statusFilter;
        const searchMatch =
            p.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.projectDescription.toLowerCase().includes(searchQuery.toLowerCase());
        return statusMatch && searchMatch;
    });

    const filteredTasks = (projectTitle) =>
        tasks.filter((task) => task.project === projectTitle);

    return (
        <div className="flex flex-col h-full w-full bg-[#1e1e1e] p-5 overflow-y-auto">
            <div className="flex justify-start mt-[100px] mb-[10px] text-[25px] font-bold text-[#3366ff]">
                <h2>Projects Overview</h2>
            </div>
            <div className="flex flex-row items-center gap-[10px] mt-0">
                <button className="!bg-[#007bff] text-white px-3 py-2 w-[160px] rounded-md hover:bg-[#3c9aff] hover:font-bold hover:scale-105 transition-transform" onClick={() => setShowModal(true)}>
                    Add New Project
                </button>
                <input
                    className="flex-grow px-2.5 py-2.5 ml-5 border-0 rounded-md w-[900px] bg-white text-black"
                    placeholder="Search projects by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border-0 rounded-md bg-white text-black px-2.5 py-2.5 text-sm"
                >
                    <option>All Statuses</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>On Hold</option>
                    <option>Cancelled</option>
                </select>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mt-5 justify-items-center w-full">
                {filteredProjects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-[#363636] p-4 rounded-lg w-[280px] h-[230px] border-[3px] border-[#b6b6b6] shadow-[0_0_10px_rgba(0,0,0,0.737)] text-white cursor-pointer hover:border-orange-500"
                        onClick={() => setSidebarProject(project)}
                    >
                        <h3 className="text-[#3366ff] font-bold">{project.projectTitle}</h3>
                        <p><strong>Description:</strong> {project.projectDescription}</p>
                        <p><strong>Students:</strong> {project.students.join(', ')}</p>
                        <p><strong>Category:</strong> {project.projectCategory}</p>
                        <div className="bg-[#222] rounded-md overflow-hidden h-[20px] mt-7 relative">
                            <div className="h-[40px] bg-[#3c9aff] text-center leading-[20px] text-[12px] font-bold text-white" style={{ width: `${calculateProgress(project.startingDate, project.endingDate)}%` }}>
                                {calculateProgress(project.startingDate, project.endingDate)}%
                            </div>
                        </div>
                        <p className="text-[12px] text-white mt-[5px]">{project.startingDate} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{project.endingDate}</p>
                    </div>
                ))}
            </div>

            {
                sidebarProject && (
                    <div id="rightSidebar" className={`fixed top-[11%] ${sidebarProject ? 'right-0' : 'right-[-400px]'} w-[360px] h-full bg-[#1e1e1e] shadow-[-2px_0_5px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out p-[15px] overflow-y-auto z-[9999]`}>
                        <button onClick={() => setSidebarProject(null)} className="absolute top-[10px] right-[15px] flex justify-center items-center bg-transparent text-white border-none w-[30px] h-[30px] text-[18px] font-bold cursor-pointer hover:!bg-[darkred] hover:!rounded-[6px]">×</button>
                        <h2 className="text-[#44ccfd] pb-[10px] mb-[10px] mt-[10px] border-b-2 border-[#383838] font-bold text-[20px]">{sidebarProject.projectTitle}</h2>
                        <p><strong>Description:</strong> {sidebarProject.projectDescription}</p>
                        <p><strong>Category:</strong> {sidebarProject.projectCategory}</p>
                        <p><strong>Students:</strong> {sidebarProject.students.join(', ')}</p>
                        <p><strong>Start Date:</strong> {sidebarProject.startingDate}</p>
                        <p><strong>End Date:</strong> {sidebarProject.endingDate}</p>
                        <h2 className="text-[#44ccfd] pb-[10px] mb-[10px] mt-[10px] border-b-2 border-[#383838] font-bold text-[20px]">Tasks</h2>
                        {filteredTasks(sidebarProject.projectTitle).length > 0 ? (
                            filteredTasks(sidebarProject.projectTitle).map((task) => (
                                <div key={task.id} className="mb-5 p-2.5 border-2 border-[#0d6751] rounded bg-[#383838] shadow-[0_4px_5px_rgba(0,0,0,0.1)]">
                                    <p><strong>Task ID:</strong> {task.id}</p>
                                    <p><strong>Task Name:</strong> {task.name}</p>
                                    <p><strong>Description:</strong> {task.description}</p>
                                    <p><strong>Assigned Student:</strong> {task.student}</p>
                                    <p><strong>Status:</strong> {task.status}</p>
                                </div>
                            ))
                        ) : (
                            <p>No tasks found for this project.</p>
                        )}
                    </div>
                )
            }

            {
                showModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[1000] overflow-y-auto bg-[rgba(0,0,0,0.5)] font-sans text-white">
                        <div className="modal">
                            <button className="absolute top-[10px] right-[15px] flex justify-center items-center bg-transparent text-white border-none w-[30px] h-[30px] text-[18px] font-bold cursor-pointer hover:!bg-[darkred] hover:!rounded-[6px]" onClick={() => setShowModal(false)}>×</button>
                            <h2 className="text-[#3366ff] font-bold text-[20px] mb-3">Add New Project</h2>
                            <label>Project Title:</label>
                            <input type="text" className="input-title" />
                            <label>Project Description:</label>
                            <textarea rows="3" className="text-area-description"></textarea>
                            <label>Students List:</label>
                            <div className="students-list">
                                {students.map((student, index) => (
                                    <div
                                        key={index}
                                        className={`student-item ${selectedStudents.includes(student.username) ? 'selected' : ''}`}
                                        onClick={() => toggleStudentSelection(student.username)}
                                    >
                                        {student.username}
                                    </div>
                                ))}
                            </div>
                            <label>Project Category:</label>
                            <select className="Select-category" defaultValue="Select a category">
                                <option disabled>Select a category</option>
                                <option>Web Development</option>
                                <option>Mobile Development</option>
                                <option>Data Science</option>
                                <option>Machine Learning</option>
                            </select>
                            <label>Starting Date:</label>
                            <input type="date" className="input-starting-date" />
                            <label>Ending Date:</label>
                            <input type="date" className="input-ending-date" />
                            <label>Status:</label>
                            <select className="select-Status" defaultValue="In Progress">
                                <option>In Progress</option>
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>On Hold</option>
                                <option>Cancelled</option>
                            </select>
                            <button className="btn" onClick={handleSaveProject}>Save Project</button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Projects;
