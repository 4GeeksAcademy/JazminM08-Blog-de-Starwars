export const initialStore = () => ({
  personajes: [],
  detalle_personaje: null,
  planetas: [],
  detalle_planeta: null,
  vehiculos: [],
  detalle_vehiculo: null,
  favoritos: [],    
  message: null,
  todos: []
});


export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "add_favorite": {
      const { uid, type, name, url } = action.payload;
      
      const exists = store.favoritos.some(
        f => f.uid === uid && f.type === type
      );
      if (exists) return store;
      return {
        ...store,
        favoritos: [
          ...store.favoritos,
          { uid, type, name, url }
        ]
      };
    }

    case "remove_favorite": {
      const { uid, type } = action.payload;
      return {
        ...store,
        favoritos: store.favoritos.filter(
          f => !(f.uid === uid && f.type === type)
        )
      };
    }

    case "personajes":
      return {
        ...store,
        personajes: action.payload
      };

    case "planetas":
      return {
        ...store,
        planetas: action.payload
      };

    case "vehiculos":
      return {
        ...store,
        vehiculos: action.payload
      };

    case "detalle_personaje":
      return {
        ...store,
        detalle_personaje: action.payload
      };

    case "detalle_planeta":
      return {
        ...store,
        detalle_planeta: action.payload
      };

    case "detalle_vehiculo":
      return {
        ...store,
        detalle_vehiculo: action.payload
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}



export const fetchPersonajes = async (dispatch) => {
  try {
    const response = await fetch("https://www.swapi.tech/api/people");
    const data = await response.json();
    
    dispatch({ type: "personajes", payload: data.results.slice(0, 10) });
  } catch (error) {
    console.error("Error fetching personajes:", error);
  }
};

export const fetchPlanetas = async (dispatch) => {
  try {
    const response = await fetch("https://www.swapi.tech/api/planets");
    const data = await response.json();
    
    dispatch({ type: "planetas", payload: data.results.slice(0, 10) });
  } catch (error) {
    console.error("Error fetching planetas:", error);
  }
};

export const fetchVehiculos = async (dispatch) => {
  try {
    const response = await fetch("https://www.swapi.tech/api/vehicles");
    const data = await response.json();
    
    dispatch({ type: "vehiculos", payload: data.results.slice(0, 10) });
  } catch (error) {
    console.error("Error fetching vehículos:", error);
  }
};

export const fetchDetallePersonaje = async (dispatch, id) => {
  try {
    const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
    const data = await response.json();
    dispatch({ type: "detalle_personaje", payload: data.result.properties });
  } catch (error) {
    console.error("Error fetching detalle personaje:", error);
  }
};

export const fetchDetallePlaneta = async (dispatch, id) => {
  try {
    const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
    const data = await response.json();
    dispatch({ type: "detalle_planeta", payload: data.result.properties });
  } catch (error) {
    console.error("Error fetching detalle planeta:", error);
  }
};

export const fetchDetalleVehiculo = async (dispatch, id) => {
  try {
    const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
    const data = await response.json();
    dispatch({ type: "detalle_vehiculo", payload: data.result.properties });
  } catch (error) {
    console.error("Error fetching detalle vehículo:", error);
  }
};