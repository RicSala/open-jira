import { useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from ".";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../database";
import { entriesApi } from "../../apis";

// {
//     -id: string,
//     description: string,
//     createdAt: number,
//     status: EntriesStatus, // export type EntriesStatus = "pending" | "in-progress" | "finished";
// }

const ENTRIES_INITIAL_STATE = {
  entries: [],
};

export const EntriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = async (description) => {
    const resp = await entriesApi.post("/entries", { description });
    console.log("resp-data:", resp.data);
    dispatch({
      type: "[ENTRIES] - Add entry",
      payload: resp.data.newEntry,
    });
  };

  const onEntryUpdated = async ({ _id, description, status }) => {
    try {
      const { data } = await entriesApi.put(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({
        type: "[ENTRIES] - Entry Updated",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const refreshEntries = async () => {
    const resp = await entriesApi.get("/entries");
    console.log("ENTRIES", resp.data);
    dispatch({
      type: "[ENTRIES] - Refresh data",
      payload: resp.data,
    });
    return resp.data;
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, onEntryUpdated }}>
      {children}
    </EntriesContext.Provider>
  );
};

// TODO: UUID should be a dev dependency
