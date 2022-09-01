import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { AddIconButton } from "./AddEventForm.styles";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
	itemName: Yup.string().required("Item Name is required"),
	description: Yup.string().required("Description is required"),
});

export default function AddEventForm() {
	const [open, setOpen] = React.useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm({
		resolver: yupResolver(validationSchema),
		mode: "onChange",
		shouldFocusError: true,
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<IconButton aria-label="add event" onClick={handleClickOpen}>
				<AddIconButton />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create Event Item</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="eventName"
								label="Name"
								name="name"
								autoComplete="eventName"
								{...register("name")}
								error={errors.name ? true : false}
							/>
							<Typography variant="inherit" color="textSecondary">
								{errors.name?.message}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="description"
								label="Add note"
								name="description"
								placeholder="Input event name here"
								multiline
								rows={5}
								maxRows={10}
								{...register("description")}
								error={errors.description ? true : false}
							/>
							<Typography variant="inherit" color="textSecondary">
								{errors.description?.message}
							</Typography>
						</Grid>
						{/* <Stack direction="row" spacing={3}>
							
							
						</Stack> */}
					</Grid>
				</DialogContent>
				<DialogActions>
					{/* <Button onClick={handleClose}>Cancel</Button> */}
					<Button
						type="submit"
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={!isDirty || !isValid}
						onClick={handleSubmit(onSubmit)}
					>
						Create Event
					</Button>
					{/* <Button onClick={handleClose}>Subscribe</Button> */}
					<Button
						type="submit"
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						onClick={handleClose}
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
