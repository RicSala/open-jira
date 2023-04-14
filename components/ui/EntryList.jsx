import { List, Paper } from "@mui/material";
import { EntryCard } from ".";
import { useContext, useMemo, useCallback, useEffect } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import styles from "./EntryList.module.css";

export const EntryList = ({ status }) => {
  // Inside EntryList component
  const { entries, onEntryUpdated } = useContext(EntriesContext);

  const { isDragging, stopDragging } = useContext(UIContext);
  useEffect(() => {
    console.log("Component re-rendered due to a change in isDragging");
  }, [isDragging]);

  useEffect(() => {
    console.log("Component re-rendered due to a change in entries");
  }, [entries]);

  useEffect(() => {
    console.log("Component re-rendered due to a change in status");
  }, [status]);

  const filteredEntries = useMemo(
    () =>
      entries.filter((entry) => {
        console.log("Filtering entries", entry.status, " - ", status);
        return entry.status === status;
      }),
    [entries, status]
  );

  const onDropEntry = useCallback(
    (e) => {
      const entryId = e.dataTransfer.getData("entryId");
      console.log("entryId:", entryId);
      const updatedEntry = entries.filter((entry) => entry._id === entryId)[0];
      console.log("dropped:", updatedEntry);
      updatedEntry.status = status;
      onEntryUpdated(updatedEntry);
      stopDragging();
    },
    [entries, onEntryUpdated, status, stopDragging]
  );

  const allowDrop = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={`${isDragging ? styles.dragging : ""}`}
      style={{ height: "100%", display: "flex" }}
    >
      <Paper
        sx={{
          height: "calc(100vh-250px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: 0,
          display: "flex",
        }}
      >
        <div
          sx={{
            opacity: isDragging ? 0.5 : 1,
            transition: "all 0.3s ease",
            padding: 0,
            // set min height to 100%
            minHeight: "100%",
          }}
        >
          {filteredEntries &&
            filteredEntries.length > 0 &&
            filteredEntries.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))}
        </div>
      </Paper>
    </div>
  );
};
