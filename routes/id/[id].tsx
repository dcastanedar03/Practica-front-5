import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Film } from "../../types.ts";
import Axios from "npm:axios";
import Modal from "../../islands/Modal.tsx";
import Retrun from "../../islands/Return.tsx";

export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, {id: string, peli: Film[]}>) => {
        const { id } = ctx.params;
        try{
            const pelis = await Axios.get<Film[]>("https://filmapi.vercel.app/api/films")
    
            return ctx.render({
                id: id,
                peli: pelis.data
            })
        }catch(e){
            return ctx.render({
                id: id,
                peli: []
            })
        }
    },
}

const Page = (props: PageProps<{id: string, peli: Film[]}>) => {
    const id = props.data.id;
    const peli = props.data.peli;
        const pelicula: Film | undefined = peli.find((pelicula) => pelicula._id === id);
        return (   
            <>
            {pelicula !== undefined &&
                <div class = "pelicula">  
                    <h2>{pelicula.name}</h2>     
                    <img src={pelicula.staticImageUrl}/>
                    <div class = "info-pelicula">
                        <p>Brand: {pelicula.brand}</p>
                        <p>ISO: {pelicula.iso}</p>
                        <p>Color: {pelicula.color ? "Si" : "Black&White"}</p>
                        <p> Format: {pelicula.formatOneTwenty && "3.5mm"} {pelicula.formatOneTwenty && pelicula.formatThirtyFive && " y "} {pelicula.formatThirtyFive && "120mm"}</p>
                        {pelicula.color && <div>Process: {pelicula.process}</div>}
                        <div>{pelicula.description}</div>
                        <Modal film_id = {pelicula._id }/>
                        <Retrun />
                    </div>
                    <div class = "date">Date: {pelicula.dateAdded}</div>
                </div>
            }
            </>
        );
    }

export default Page;