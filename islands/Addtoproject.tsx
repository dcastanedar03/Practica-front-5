import { FunctionComponent, useEffect, useState } from 'preact/hooks';
import { Signal } from '@preact/signals';
import { Project } from '../types.ts';

type AddToProjectProps = {
    film_id: string;
    reboot: Signal<boolean>;
};

const getProjects = (): Project[] | undefined => {
    const project = document.cookie.split("; ").find(cookie => cookie.startsWith("project="));
    if (!project) return undefined;
    try {
        return JSON.parse(project.split("=")[1]) as Project[];
    } catch (e) {
        console.error("Error parsing cookie:", e);
        return undefined;
    }
};

const AddToProject: FunctionComponent<AddToProjectProps> = ({ film_id, reboot }: AddToProjectProps) => {
    const [projectn, setProjectn] = useState<string>("");
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsNames, setProjectsNames] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const projects = getProjects();
        if (!projects) {
            setError("Create a project first");
        } else {
            setProjects(projects);
            setProjectsNames(projects.map((project) => project.name));
        }
    }, [reboot.value]);

    const handleAddToProject = () => {
        setError("");
        if (projectn === "") {
            setError("Select a project");
            return;
        }

        const selectedProject = projects.find(project => project.name === projectn);
        if (!selectedProject) {
            setError("Project not found");
            return;
        }

        if (selectedProject.films.includes(film_id)) {
            setError("Film already exists");
            return;
        }

        selectedProject.films.push(film_id);

        document.cookie = `project=${JSON.stringify(projects)}; path=/`;

        setError("Film added");
    };

    const handleSelectChange = (e: Event) => {
        const target = e.currentTarget as HTMLSelectElement;
        setProjectn(target.value);
    };

    return (
        <>
            <button className="btn btn-blue" onClick={() => open("add_section")}>Add to project</button>
            <div id="add_section" className="add_section" style={{ display: 'none' }}>
                <div>
                    <select id="select_project" value={projectn} onChange={handleSelectChange}>
                        <option value="" disabled>Select project</option>
                        {projectsNames.map(projectName => (
                            <option key={projectName} value={projectName}>{projectName}</option>
                        ))}
                    </select>
                    <div>
                        <button className="btn btn-blue" onClick={handleAddToProject}>Add to project</button>
                        <button className="btn btn-blue" onClick={() => close("add_section")}>Close</button>
                    </div>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    );
};

export default AddToProject;

export const open = (section_id: string) => {
    const section = document.getElementById(section_id);
    if (section) section.style.display = "block";
};

export const close = (section_id: string) => {
    const section = document.getElementById(section_id);
    if (section) section.style.display = "none";
};
