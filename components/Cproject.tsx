import { FunctionComponent } from 'preact';
import { Film, Project } from '../types.ts';

type ProjectDisplayProps = {
    projects: Project[];
    films: Film[];
};

const Cproject: FunctionComponent<ProjectDisplayProps> = ({ projects, films }) => {
    return (
        <div>
            {projects.map(project => (
                <div key={project.name}>
                    <h1>Project {project.name}</h1>
                    <div className="peliculas">
                        {project.films.map((film_id: string) => {
                            const film = films.find((film) => film._id === film_id);
                            if (film) {
                                return (
                                    <div key={film._id}>
                                        <a href={`/id/${film._id}`}>
                                            <div>
                                                <h1>{film.brand} {film.name}</h1>
                                                <img src={film.staticImageUrl} alt={film.name} />
                                                <p>Format: {film.formatThirtyFive && "Thirty Five"}{film.formatThirtyFive && film.formatOneTwenty && ", "}{film.formatOneTwenty && "One Twenty"}</p>
                                                <p>Iso: {film.iso}</p>
                                                <p>Color: {film.color ? "Color" : "B&W"}</p>
                                            </div>
                                        </a>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cproject;
