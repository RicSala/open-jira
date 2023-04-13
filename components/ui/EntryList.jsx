import { List, Paper } from "@mui/material";
import { EntryCard } from ".";
import { useContext, useMemo } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import styles from "./EntryList.module.css";

export const EntryList = ({ status }) => {
  const { entries, onEntryUpdated } = useContext(EntriesContext);

  const { isDragging, stopDragging } = useContext(UIContext);

  console.log("entries:", entries);

  const filteredEntries = useMemo(
    () =>
      entries.filter((entry) => {
        return entry.status === status;
      }),
    [entries]
  );

  console.log("filtered entries:", filteredEntries);

  const onDropEntry = (e) => {
    const entryId = e.dataTransfer.getData("entryId");
    console.log(entryId);
    const updatedEntry = entries.filter((entry) => entry.id === entryId)[0];
    updatedEntry.status = status;
    onEntryUpdated(updatedEntry);
    stopDragging();
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

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
        <List
          sx={{
            opacity: isDragging ? 0.5 : 1,
            transition: "all 0.3s ease",
            padding: 0,
            // set min height to 100%
            minHeight: "100%",
          }}
        >
          {filteredEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
