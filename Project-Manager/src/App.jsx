import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectSideBar";
import SelectedProject from "./components/SelectedProject";


function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });
  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }
  

  function handleCancelProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project=>project.id!==id)
        
      };
    });
  }

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: Math.random(),
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState(prevState=>
      {
        return {
          ...prevState,
          tasks: prevState.tasks.filter(task=>task.id!==id)
        }
      })
  }
  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  const selectedProjectTasks = projectState.tasks.filter(task => task.projectId === projectState.selectedProjectId);

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={selectedProjectTasks}

    />
  );
  if (projectState.selectedProjectId === null)
    content = (
      <NewProject  onAdd={handleAddProject} onCancel={handleCancelProject} />
    );
  else if (projectState.selectedProjectId === undefined)
    content = <NoProjectSelected onAddProject={handleStartAddProject} />;

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar
        onAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}

      />
      {content}
    </main>
  );
}

export default App;
