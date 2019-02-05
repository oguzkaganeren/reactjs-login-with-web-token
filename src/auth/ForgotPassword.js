import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AuthService from '../service/AuthService';
import Snackbar from '@material-ui/core/Snackbar';
const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	},
	forgot: {
		marginTop: theme.spacing.unit * 3
	}
});

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.Auth = new AuthService();
		this.state = { open: false, message: '', variant: 'success' };
	}
	render() {
		const { classes } = this.props;
		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						Forgot Password
					</Typography>
					<form className={classes.form} onSubmit={this.handleSubmit}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel>Username</InputLabel>
							<Input id="email" name="username" onChange={this.handleChange} autoFocus />
						</FormControl>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							Send
						</Button>
					</form>
				</Paper>
				<Snackbar
					anchorOrigin={{
						vertical: 'Top',
						horizontal: 'center'
					}}
					open={this.state.open}
					autoHideDuration={6000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{this.state.message}</span>}
				/>
			</main>
		);
	}
	handleSubmit(e) {
		e.preventDefault();
		this.setState({ username: this.state.username.replace(/\s+/g, '').trim() }); //removing spaces

		this.setState({ username: strip(this.state.username.trim()) }); //removing html
		if (this.state.username.trim().length > 3) {
			this.Auth.login(this.state.username, this.state.password)
				.then(res => {
					this.props.history.replace('/');
				})
				.catch(err => {
					this.setState({ open: true, message: 'Kullanıcı adı ve/veya şifresi hatalı' });
				});
		} else {
			this.setState({
				open: true,
				message: 'Lütfen Kullanıcı Adını 3 karakterden fazla ve boşluksuz olarak giriniz. '
			});
		}
	}
	componentWillMount() {
		if (this.Auth.loggedIn()) this.props.history.replace('/');
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
}
function strip(html) {
	var tmp = document.createElement('DIV');
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || '';
}
ForgotPassword.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ForgotPassword);
