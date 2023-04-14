export const entriesReducer = (state, action) => {
  //En los reducers, no hacemos transformaciones de datos, solo actualizamos el estado

  switch (action.type) {
    case "[ENTRIES] - Refresh data":
      console.log("PAYPAL", action.payload);
      return {
        ...state,
        entries: [...action.payload],
      };
    case "[ENTRIES] - Add entry":
      console.log("IN REDUCER", action.payload);
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[ENTRIES] - Entry Updated":
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry._id === action.payload._id ? action.payload : entry
        ),
      };
    default:
      return state;
  }
};
