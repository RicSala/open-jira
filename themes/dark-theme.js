import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
	},
	components: {
		defaultProps: {
			elevation: 0,
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					"&.MuiAppBar-root": {
						backgroundColor: "#4a148c",
					},
				},
			},
		},
	},
});
