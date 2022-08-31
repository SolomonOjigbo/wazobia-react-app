import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Wrapper } from "./Login.styles";

const validationSchema = Yup.object().shape({
	email: Yup.string().required("Email is required").email("Email is invalid"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
});

function Login() {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm({
		resolver: yupResolver(validationSchema),
		mode: "onChange",
		shouldFocusError: true,
		criteriaMode: "all",
	});

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<Wrapper>
			<Container>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 3,
						padding: 5,
					}}
				>
					<Grid textAlign="center">
						<Typography component="h1" variant="h4">
							Login in
						</Typography>
					</Grid>
					<Grid textAlign="center">
						<p>
							If you have no account
							<span>
								<Link to="/signup"> Sign up</Link>
							</span>
						</p>
					</Grid>
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							{...register("email")}
							error={errors.email ? true : false}
						/>
						<Typography variant="inherit" color="textSecondary">
							{errors.email?.message}
						</Typography>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={showPassword ? "text" : "password"}
							id="password"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							autoComplete="current-password"
							{...register("password")}
							error={errors.password ? true : false}
						/>
						<Typography variant="inherit" color="textSecondary">
							{errors.password?.message}
						</Typography>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={!isDirty || !isValid}
							onClick={handleSubmit(onSubmit)}
						>
							Login In
						</Button>
					</Box>
				</Box>
			</Container>
		</Wrapper>
	);
}

export default Login;
