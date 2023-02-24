import "../styles/Main.css";
import { useState } from "react";
import Swal from "sweetalert2";

function Main() {
  const initialState = [
    { position: "a-1", option: "0" },
    { position: "a-2", option: "0" },
    { position: "a-3", option: "0" },

    { position: "b-1", option: "0" },
    { position: "b-2", option: "0" },
    { position: "b-3", option: "0" },

    { position: "c-1", option: "0" },
    { position: "c-2", option: "0" },
    { position: "c-3", option: "0" },
  ];

  const [triqui, resetTriqui] = useState(initialState);

  const [turno, setTurno] = useState(1);

  const CheckWinner = () => {
    const WhoWon = (options) => {
      if (options === "111") {
        Swal.fire({
          title: "El jugador 1 ha ganado!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Volver a jugar",
        }).then((result) => {
          if (result.isConfirmed) {
            resetTriqui(initialState);
          }
        });
        setTurno(1);
      } else if (options === "222") {
        Swal.fire({
          title: "El jugador 2 ha ganado!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Volver a jugar",
        }).then((result) => {
          if (result.isConfirmed) {
            resetTriqui(initialState);
          }
        });
        setTurno(1);
      } else if(!options.includes("0") && options.length === 9) {
        Swal.fire({
          title: "Empate",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Volver a jugar",
        }).then((result) => {
          if (result.isConfirmed) {
            resetTriqui(initialState);
          }
        });
        setTurno(1);
      }
    };
    let cases = [
      {
        case: "caseV1",
        options: `${triqui[0].option}${triqui[1].option}${triqui[2].option}`,
      },
      {
        case: "caseV2",
        options: `${triqui[3].option}${triqui[4].option}${triqui[5].option}`,
      },
      {
        case: "caseV3",
        options: `${triqui[6].option}${triqui[7].option}${triqui[8].option}`,
      },
      {
        case: "caseH1",
        options: `${triqui[0].option}${triqui[3].option}${triqui[6].option}`,
      },
      {
        case: "caseH2",
        options: `${triqui[1].option}${triqui[4].option}${triqui[7].option}`,
      },
      {
        case: "caseH3",
        options: `${triqui[2].option}${triqui[5].option}${triqui[8].option}`,
      },
      {
        case: "caseD1",
        options: `${triqui[0].option}${triqui[4].option}${triqui[8].option}`,
      },
      {
        case: "caseD2",
        options: `${triqui[2].option}${triqui[4].option}${triqui[6].option}`,
      },
      {
        case: "empate",
        options: "",
      },
    ];
    for (const square of triqui) {
      cases[8].options += `${square.option}`;
    }
    for (const case_ of cases) {
      WhoWon(case_.options);
    }
  };

  const handleTurno = (index) => {
    const position = triqui.find((square) => square.position === index);
    if (position.option === "0") {
      if (turno === 1) {
        position.option = "1";
        setTurno(2);
      } else if (turno === 2) {
        position.option = "2";
        setTurno(1);
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Elige otra posicion",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setTimeout(() => {
      CheckWinner();
    }, 500);
  };

  const ShowOption = ({ square }) => {
    if (square.option === "1") {
      return <span className="option green">X</span>;
    } else if (square.option === "2") {
      return <span className="option red">O</span>;
    } else {
      return <span className="option"></span>;
    }
  };

  return (
    <div className="container">
      <h1 className="title">TRIQUI</h1>
      <div className="table">
        {triqui.map((square, index) => (
          <div
            key={index}
            className="square"
            onClick={() => {
              handleTurno(square.position);
            }}
          >
            <ShowOption square={square} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
