import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Wrapper } from "./Signup.styles";

import { useDispatch } from "react-redux";
import { signup } from "../../../features/api/auth";

const validationSchema = Yup.object().shape({
	first_name: Yup.string().required("First Name is required"),
	last_name: Yup.string().required("Last Name is required"),
	email: Yup.string().required("Email is required").email("Email is invalid"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase")
		.matches(/^(?=.*[!@#$%^&*])/, "Must Contain One Special Case Character")
		.matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number")
		.required("Password is required"),
});

function Signup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
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

	const onSubmit = (data) => {
		dispatch(signup(data));
		navigate("/");
	};

	return (
		<Container component="main">
			<Wrapper>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 15,
						padding: 5,
					}}
				>
					<Grid textAlign="center">
						<Typography component="h1" variant="h4">
							Create an Account
						</Typography>
					</Grid>
					<Grid textAlign="center">
						<p>
							Already have an account?
							<span>
								<Link to="/login"> Login</Link>
							</span>
						</p>
					</Grid>

					<Box component="form" noValidate sx={{ mt: 1 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="first_name"
									required
									fullWidth
									id="first_name"
									label="First Name"
									autoFocus
									{...register("first_name")}
									error={errors.first_name ? true : false}
								/>
								<Typography variant="inherit" color="textSecondary">
									{errors.first_name?.message}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="last_name"
									label="Last Name"
									name="last_name"
									autoComplete="last_name"
									autoFocus
									{...register("last_name")}
									error={errors.last_name ? true : false}
								/>
								<Typography variant="inherit" color="textSecondary">
									{errors.last_name?.message}
								</Typography>
							</Grid>
						</Grid>
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
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
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
							Sign Up
						</Button>
					</Box>
				</Box>
			</Wrapper>
		</Container>
	);
}

export default Signup;
