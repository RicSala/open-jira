export const entriesReducer = (state, action) => {
  //En los reducers, no hacemos transformaciones de datos, solo actualizamos el estado

  switch (action.type) {
    case "[ENTRIES] - Add entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[ENTRIES] - Entry Updated":
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.id === action.payload.id ? action.payload : entry
        ),
      };
    default:
      return state;
  }
};
