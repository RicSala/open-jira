import { AddCircleOutline, SaveOutlined } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";

export const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onAddClick = () => {
    setIsAdding(true);
  };

  const onFieldChange = (e) => {
    setInputValue(e.target.value);
  };

  const { addNewEntry } = useContext(EntriesContext);

  const onSaveClick = () => {
    if (inputValue.length > 0) {
      addNewEntry(inputValue);
      console.log(inputValue);
      setIsAdding(false);
      setInputValue("");
      setTouched(false);
    } else {
      setTouched(true);
    }
  };

  const cleanInput = () => {
    setInputValue("");
    setTouched(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAdding ? (
        <>
          <TextField
            fullWidth
            sx={{
              marginTop: 2,
              marginBottom: 1,
            }}
            placeholder="Descripción"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={
              inputValue.length <= 0 && touched
                ? `Escribe tu nueva entrada`
                : ``
            }
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onFieldChange}
            onBlur={() => setTouched(true)}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="oulined"
              color="primary"
              endIcon={<SaveOutlined />}
              onClick={(e) => onSaveClick()}
            >
              Guardar
            </Button>

            <Button
              variant="oulined"
              color="primary"
              onClick={() => {
                setIsAdding(false);
                cleanInput();
              }}
            >
              Cancelar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutline />}
          fullWidth
          variant="outlined"
          onClick={() => onAddClick()}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
