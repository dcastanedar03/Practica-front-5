import { FunctionComponent, useEffect, useState } from "preact/hooks";
import { Signal } from "@preact/signals";
import { Project } from "../types.ts";

type Props = {
    film_id: string;
    reboot: Signal<boolean>;
}

const CreateProject: FunctionComponent<Props> = ({ film_id, reboot }: Props) => {
    const [projectName, setProjectName] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setProjectName("");
        setError("");
    }, [reboot.value]);

    const toggleSection = (sectionId: string, display: string) => {
        const section = document.getElementById(sectionId);
        if (section) section.style.display = display;
        else console.log("Section not found");
    };

    const getProjects = (): Project[] | undefined => {
        const project = document.cookie.split("; ").find(cookie => cookie.startsWith("project="));
        if (!project) return undefined;
        return JSON.parse(project.split("=")[1]) as Project[];
    };

    const createProject = (projectName: string, filmId: string) => {
        if (!projectName.trim()) {
            setError("The project name cannot be empty");
            return;
        }
        const projects = getProjects() || [];
        if (projects.some(project => project.name === projectName)) {
            setError("The project already exists");
            return;
        }
        projects.push({ name: projectName, films: [filmId]});
        document.cookie = `project=${JSON.stringify(projects)}; path=/`;
        setError("Project created successfully");
    };

    return (
        <>
            <button class="btn btn-blue" onClick={() => toggleSection("create_section", "block")}>Create new project</button>
            <div id="create_section" class="create_section" style={{ display: "none" }}>
                <div class="create_items">
                    <input type="text" placeholder="Project name" value={projectName} onBlur={(e) => setProjectName(e.currentTarget.value)} />
                    <div class="create_buttons">
                        <button class="btn btn-blue" onClick={() => createProject(projectName, film_id)}>Create</button>
                        <button class="btn btn-blue" onClick={() => toggleSection("create_section", "none")}>Close</button>
                    </div>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    );
};

export default CreateProject;
