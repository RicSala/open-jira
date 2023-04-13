import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

export const EntryCard = ({ entry }) => {
  const { startDragging, stopDragging } = useContext(UIContext);

  const onDragStart = (e) => {
    e.dataTransfer.setData("entryId", entry.id);
    console.log("dragging:", entry);
    startDragging();
  };

  const onDragEnd = (e) => {
    stopDragging();
  };

  return (
    <>
      <Card
        sx={{ marginBottom: 1 }}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <CardActionArea>
          <CardContent>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {entry.description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
          >
            <Typography variant="body2">{`Hace ${Math.floor(
              (Date.now() - entry.createdAt) / (1000 * 60),
              2
            )} minutos`}</Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    </>
  );
};
