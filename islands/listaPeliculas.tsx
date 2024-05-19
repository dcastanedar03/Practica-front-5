import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { useEffect, useState } from "preact/hooks";
import { Film } from "../types.ts";

const Listapelis: FunctionComponent = () => {
  const [peliculas, setPeliculas] = useState<Film[]>([]);
  const [name, setName] = useState<string>(" ");
  const [iso, setIso] = useState<number>();
  const [brand, setMarca] = useState<string>("");
  const [formato, setFormato] = useState<string>("");
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pelis = await fetch("api/API", {
          method: "GET",
        });
        const data = await pelis.json();
        setPeliculas(data);
      } catch (e) {
        return e;
      }
    };
    fetchData();
  }, []);

  const filteredPeliculas = peliculas.filter((pelicula) => {
    if (brand && pelicula.brand !== brand) {
      return false;
    }
    if (iso && pelicula.iso !== iso) {
      return false;
    }
    if (formato) {
      if (formato === "35" && !pelicula.formatThirtyFive) {
        return false;
      }
      if (formato === "120" && !pelicula.formatOneTwenty) {
        return false;
      }
    }
    if (color) {
      if (color === "true" && !pelicula.color) {
        return false;
      }
      if (color === "false" && pelicula.color) {
        return false;
      }
    }
    if (name && !pelicula.name.includes(name)) {
      return false;
    }
    return true;
  });
  return (
    <>
      <h1 className="center arcade-heading">Films List</h1>
      <div className="center">
        <select className="arcade-select" value={brand} onChange={(e) => setMarca(e.currentTarget.value)}>
          <option value="">Select a Brand</option>
          {Array.from(
            new Set(filteredPeliculas.map((pelicula) => pelicula.brand)),
          ).sort().map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
        <select className="arcade-select"
          value={iso}
          onChange={(e) => setIso(Number(e.currentTarget.value))}
        >
          <option value="">Select ISO</option>
          {Array.from(
            new Set(filteredPeliculas.map((pelicula) => pelicula.iso)),
          ).sort((x, y) => x - y).map((iso) => (
            <option key={iso} value={iso}>{iso}</option>
          ))}
        </select>
        <select className="arcade-select"
          value={color.toString()}
          onChange={(e) => setColor(e.currentTarget.value)}
        >
          <option value="">Select Color</option>
          <option value="true">Color</option>
          <option value="false">Black & White</option>
        </select>
        <select className="arcade-select"
          value={formato.toString()}
          onChange={(e) => setFormato(e.currentTarget.value)}
        >
          <option value="">Select Format</option>
          <option value="35">3.5mm</option>
          <option value="120">120mm</option>
        </select>
      </div>
      <form className="center">
        <input className="arcade-select"
          type="text"
          placeholder="Search Film by Name"
          onInput={(e) => setName(e.currentTarget.value)}
        />
      </form>

      <div className="peliculas">
        {filteredPeliculas.map((pelicula) => (
          <a href={`/id/${pelicula._id}`} key={pelicula._id}>
            <div key={pelicula._id}>
              <h2 className="center">{pelicula.name}</h2>
              <img className="center" src={pelicula.staticImageUrl} />
              
                Brand: {pelicula.brand}
                <br />
                ISO: {pelicula.iso}
                <br />
                Color: {pelicula.color ? "Yes" : "Black & White"}
                <br />
                Format: {pelicula.formatOneTwenty && "3.5mm"}{" "}
                {pelicula.formatOneTwenty && pelicula.formatThirtyFive && " and "}
                {" "}
                {pelicula.formatThirtyFive && "120mm"}
                <br />
                {pelicula.color && <p>Process: {pelicula.process}</p>}
        
            </div>
          </a>
        ))}
      </div>

      {filteredPeliculas.length === 0 &&
        (
          <>
            <br />
            <div className="final-message">
              No films match your search
            </div>
            <br />
            <div className="center">
              <button
                className="btn btn-blue"
                onClick={() => {
                  setMarca("");
                  setIso(undefined);
                  setColor("");
                  setFormato("");
                  setName("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </>
        )}
    </>
  );
};

export default Listapelis;
