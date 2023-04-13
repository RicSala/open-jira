import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import { Layout } from "../../components/layouts";
import { EntryList, NewEntry } from "../../components/ui";

const inter = Inter({ subsets: ["latin"] });

// Ejemplo de como usar variables de entorno en el front end (NEXT_PUBLIC_*)
// console.log(process.env.NEXT_PUBLIC_API_URL);

// Ejemplo de como NO te deja usar variables de entorno en el back end (SECRET_KEY)
// console.log(process.env.SECRET_KEY);

export default function HomePage() {
  return (
    <Layout title="Home Open Jira">
      <Grid container spacing={2} sx={{ height: "calc(100vh - 100px)" }}>
        <Grid item xs={12} sm={4} sx={{ height: "100%" }}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Pendientes" />
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ height: "100%" }}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="En Progreso" />
            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ height: "100%" }}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Completadas" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
