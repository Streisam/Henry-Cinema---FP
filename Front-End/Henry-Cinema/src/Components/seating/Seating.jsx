import React from "react";
import "./seating.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getScreeningId } from "../../redux/actions";
import Seats from "./Seats";
import Ticket from "./Ticket";
import Loader from "../Loader/Loader";

function Seating() {
  const { id, numberOfEntries } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const screening = useSelector((state) => state.screeningID);
  const [asientosArray, setAsientosArray] = useState(["A1 - 1"]);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [loading, setLoading] = useState(true);

  const filas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const handleClick = (event) => {
    const asientoId = event.target.getAttribute("data-value"); // obtener el id del asiento

    // Verifica si el asiento ya está seleccionado
    const index = asientosSeleccionados.indexOf(asientoId);
    if (index > -1) {
      // Si ya está seleccionado, lo elimina del array
      setAsientosSeleccionados(
        asientosSeleccionados.filter((a) => a !== asientoId)
      );
    } else {
      // Si no está seleccionado, verifica si se ha alcanzado el límite
      if (asientosSeleccionados.length < numberOfEntries) {
        // Si no se ha alcanzado el límite, lo agrega al array
        setAsientosSeleccionados([...asientosSeleccionados, asientoId]);
      }
    }
  };

  useEffect(() => {
    dispatch(getScreeningId(id));
    // setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [dispatch, id]);

  useEffect(() => {
    setAsientosArray(screening.seats);
  }, [screening]);

  console.log(asientosSeleccionados);
  return (
    <div className="seating">
      {loading ? (
        <Loader />
      ) : (
        <div className="screen">
          <div className="pantalla">
            <h1> Screen</h1>
          </div>
          <div className="Container-Seating">
            {filas.map((letra) => (
              <Seats
                seatsData={asientosArray}
                handleClick={handleClick}
                letra={letra}
                asientosSeleccionados={asientosSeleccionados}
              />
            ))}
          </div>
          <div className="selected">
            <Ticket
              asientosSeleccionados={asientosSeleccionados}
              screening={screening}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Seating;
