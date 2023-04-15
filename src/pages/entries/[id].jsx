import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from "@mui/material";
import { Layout } from "../../../components/layouts";
import { DeleteForever, SaveRounded } from "@mui/icons-material";
import { useMemo, useState } from "react";

const validStatus = ["pending", "in-progress", "finished"];

export const EntryPage = (props) => {
  console.log(props);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState("pending");

  const onFieldChange = (e) => {
    setInputValue(e.target.value);
    setTouched(true);
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
    setTouched(true);
    console.log(e.target.value);
  };

  const onSave = () => {
    console.log("save: ", inputValue, status);
  };

  // usememo is a hook that returns a value and it will only be recalculated if the dependencies change
  const isNotValid = useMemo(() => {
    return touched && !inputValue;
  }, [inputValue, touched]);

  return (
    <Layout title="Entry Page">
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry: ${inputValue}`}
              subheader={`Creada hace ... minutos`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 2 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                label="Nueva Entrada"
                multiline
                value={inputValue}
                onChange={onFieldChange}
                helperText={isNotValid && "Campo requerido"}
                //   if blur and no value and touched the change color to error
                error={isNotValid}
                // if blur set touched to true
                onBlur={() => setTouched(true)}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status}>
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                      onChange={onStatusChange}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                // Disable button if no inputValue
                disabled={!inputValue}
                startIcon={<SaveRounded />}
                variant="contained"
                fullWidth
                onClick={onSave}
              >
                {" "}
                Guardar{" "}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.main",
          color: "background.paper",
        }}
      >
        <DeleteForever />
      </IconButton>
    </Layout>
  );
};

// getServerSideProps

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  console.log("id", id);
  return {
    props: {
      id,
    },
  };
};

export default EntryPage;
