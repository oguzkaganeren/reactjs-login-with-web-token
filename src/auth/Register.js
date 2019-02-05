import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AuthService from '../service/AuthService';
import Snackbar from '@material-ui/core/Snackbar';

import withAuth from '../auth/withAuth';
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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});

class Register extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.Auth = new AuthService();
		this.timeout = null;
		this.state = { open: false, message: '', variant: 'success' };
	}

	render() {
		const { classes } = this.props;
		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						Register
					</Typography>
					<form className={classes.form} onSubmit={this.handleSubmit}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel>Identification number(11 character)</InputLabel>
							<Input
								id="tc"
								name="userID"
								type="number"
								onInput={e => {
									e.target.value = Math.max(0, parseInt(e.target.value))
										.toString()
										.slice(0, 11);
								}}
								onChange={this.handleChange}
								min={11}
								autoFocus
							/>
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Username</InputLabel>
							<Input id="email" name="username" onChange={this.handleChange} />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input
								name="password"
								type="password"
								id="password"
								onChange={this.handleChange}
								autoComplete="current-password"
							/>
						</FormControl>

						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							Register
						</Button>
					</form>
					<Snackbar
						anchorOrigin={{
							vertical: 'Top',
							horizontal: 'center'
						}}
						className={classNames(classes[this.state.variant], this.state.variant)}
						open={this.state.open}
						autoHideDuration={6000}
						onClose={this.handleClose}
						ContentProps={{
							'aria-describedby': 'message-id'
						}}
						message={<span id="message-id">{this.state.message}</span>}
					/>
				</Paper>
			</main>
		);
	}
	handleSubmit(e) {
		e.preventDefault();
		this.setState({ userID: this.state.userID.replace(/\s+/g, '').trim() }); //removing spaces
		this.setState({ username: this.state.username.replace(/\s+/g, '').trim() }); //removing spaces

		/* Little secure */
		this.setState({ userID: strip(this.state.userID.trim()) }); //removing html
		this.setState({ username: strip(this.state.username.trim()) }); //removing html
		if (this.state.userID.trim().length === 11) {
			if (this.state.username.trim().length > 3) {
				this.Auth.register(this.state.userID, this.state.username, this.state.password)
					.then(res => {
						this.setState({ open: true, message: 'Kullanıcı Eklendi, Giriş Sayfasına yönlendiriliyorsunuz' });
						this.props.history.replace('/login');
					})
					.catch(err => {
						alert(err);
					});
			} else {
				this.setState({
					open: true,
					message: 'Lütfen Kullanıcı Adını 3 karakterden fazla ve boşluksuz olarak giriniz.'
				});
			}
		} else {
			this.setState({ open: true, message: 'Lütfen Kimlik Numarasını 11 hane olarak giriniz.' });
		}
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
Register.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Register);
