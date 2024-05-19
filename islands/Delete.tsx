import { FunctionComponent, useEffect, useState } from 'preact/hooks';
import { Signal } from '@preact/signals';
import { Project } from '../types.ts';

type DeleteProjectProps = {
    reboot: Signal<boolean>;
};

const getProjects = (): Project[] | undefined => {
    const project = document.cookie.split("; ").find(cookie => cookie.startsWith("project="));
    if (!project) return undefined;
    return JSON.parse(project.split("=")[1]) as Project[];
};

const setProjectsCookie = (projects: Project[]) => {
    document.cookie = `project=${JSON.stringify(projects)}; path=/`;
};

const DeleteProject: FunctionComponent<DeleteProjectProps> = ({ reboot }: DeleteProjectProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const projects = getProjects();
        if (!projects) {
            setError("No hay proyectos para mostrar");
        } else {
            setProjects(projects);
        }
    }, [reboot.value]);

    const handleDeleteProject = (projectName: string) => {
        const updatedProjects = projects.filter(project => project.name !== projectName);
        setProjects(updatedProjects);
        setProjectsCookie(updatedProjects);
    };

    const handleDeleteFilmFromProject = (projectName: string, filmId: string) => {
        const updatedProjects = projects.map(project => {
            if (project.name === projectName) {
                project.films = project.films.filter(film => film !== filmId);
            }
            return project;
        });
        setProjects(updatedProjects);
        setProjectsCookie(updatedProjects);
    };

    return (
        <div>
            {projects.length === 0 ? (
                <p>{error}</p>
            ) : (
                projects.map(project => (
                    <div key={project.name}>
                        <h2>{project.name}</h2>
                        <button className="btn btn-blue" onClick={() => handleDeleteProject(project.name)}>Delete Project</button>
                        <div>
                            {project.films.map(film => (
                                <div key={film}>
                                    <span>{film}</span>
                                    <button className="btn btn-blue-small"onClick={() => handleDeleteFilmFromProject(project.name, film)}>Delete Film</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default DeleteProject;
