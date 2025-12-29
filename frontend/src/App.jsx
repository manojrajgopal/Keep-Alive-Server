import { useEffect, useState } from "react";
import { getProjects } from "./services/api";
import ProjectForm from "./components/ProjectForm";
import ProjectTable from "./components/ProjectTable";

function App() {
  const [projects, setProjects] = useState([]);

  async function loadProjects() {
    const data = await getProjects();
    setProjects(data);
  }

  useEffect(() => {
    loadProjects();
    const interval = setInterval(loadProjects, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>KeepAlive Server</h2>
      <ProjectForm onAdd={loadProjects} />
      <ProjectTable projects={projects} onUpdate={loadProjects} />
    </div>
  );
}

export default App;
