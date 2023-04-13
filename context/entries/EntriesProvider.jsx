import { useReducer } from "react";
import { EntriesContext, entriesReducer } from ".";
import { v4 as uuidv4 } from "uuid";

// {
//     -id: string,
//     description: string,
//     createdAt: number,
//     status: EntriesStatus, // export type EntriesStatus = "pending" | "in-progress" | "finished";
// }

const ENTRIES_INITIAL_STATE = {
  entries: [
    {
      description:
        "PENDIENTE - lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      description: "IN PROGRESS - incididunt ut labore et dolore magna aliqua",
      createdAt: Date.now() - 1000000,
      status: "in-progress",
    },
    {
      description:
        "FINISHED - consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      createdAt: Date.now() - 5000000,
      status: "finished",
    },
  ],
};

export const EntriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = (description) => {
    const newEntry = {
      id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({
      type: "[ENTRIES] - Add entry",
      payload: newEntry,
    });
  };

  const onEntryUpdated = (entry) => {
    dispatch({
      type: "[ENTRIES] - Entry Updated",
      payload: entry,
    });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, onEntryUpdated }}>
      {children}
    </EntriesContext.Provider>
  );
};

// TODO: UUID should be a dev dependency
