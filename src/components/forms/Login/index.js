import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Wrapper } from "./Login.styles";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLoginMutation } from "../../../features/api/auth";

const validationSchema = Yup.object().shape({
	email: Yup.string().required("Email is required").email("Email is invalid"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
});

function Login() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const login = useLoginMutation();

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

	const handleChange = ({ target: { name, value } }) =>
		setFormData((prev) => ({ ...prev, [name]: value }));

	const onSubmit = async () => {
		try {
			await login(formData).unwrap();
			navigate("/");
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<Container>
			<Wrapper>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 15,
						padding: 7,
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
							onChange={handleChange}
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
							onChange={handleChange}
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
			</Wrapper>
		</Container>
	);
}

export default Login;
