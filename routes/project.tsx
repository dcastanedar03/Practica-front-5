import { Film, Project } from "../types.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Cproject from "../components/Cproject.tsx";
import { getCookies } from "$std/http/cookie.ts";

type Props = {
    project: Project[];
    film: Film[];
};

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext) => {
        const url = "https://filmapi.vercel.app/api/films";
        const res = await fetch(url);
        const films: Film[] = await res.json();

        const projectsCookie = getCookies(req.headers).project;
        let projects: Project[] = [];

        if (projectsCookie) {
            try {
                projects = JSON.parse(projectsCookie);
            } catch (e) {
                console.error("Error parsing projects cookie:", e);
            }
        }

        return ctx.render({ project: projects, film: films });
    },
};

const Page = (props: PageProps<Props>) => {
    const { project, film } = props.data;
    return (
        <>
            <div>
                <Cproject projects={project} films={film} />
            </div>
        </>
    );
}

export default Page;
