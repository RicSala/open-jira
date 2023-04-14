import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UIContext } from "../../context/ui";

export const EntryCard = ({ entry }) => {
  const [timeDifference, setTimeDifference] = useState(null);

  const calculateTimeDifference = () => {
    const diff = Math.floor((Date.now() - entry.createdAt) / (1000 * 60));
    setTimeDifference(diff);
  };

  useEffect(() => {
    calculateTimeDifference();

    const timer = setInterval(() => {
      calculateTimeDifference();
    }, 60000); // Update every 60 seconds

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const { startDragging, stopDragging } = useContext(UIContext);

  const onDragStart = (e) => {
    e.dataTransfer.setData("entryId", entry._id);
    const added = e.dataTransfer.getData("entryId");
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
            <Typography variant="body2">{`Hace ${timeDifference} minuto(s)`}</Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    </>
  );
};
