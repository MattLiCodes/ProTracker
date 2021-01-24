import React, {Component} from 'react';
import {Container, Grid, Typography, TextField, Button, FormControlLabel, Paper} from '@material-ui/core';
import axios from 'axios';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            failed: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var username = document.getElementById("username").value;
        console.log(username);
        axios.post('http://localhost:5000/students/login', {'name': username}).then((res) => {
            if(res.status === 200) {
                console.log(`./${username}/StudentPage`);
                window.location.href = `./${username}/StudentPage`;
            } else {
                this.setState({
                    failed: true
                })
            }
        });
    }

    render() {
        return (
            <div class="animated-background" style={{height: "100vh"}}>
                <div>
                    <Container>
                        <Typography style={{paddingTop: "10%", marginBottom: "-5%", textAlign: "center"}} component="h1" variant="h3">
                            <b>ProTracker</b>
                        </Typography>
                        <Typography style={{paddingTop: "5%", textAlign: "center"}} component="h1" variant="h6">
                            Supporting local schools during unprecedented times.
                        </Typography>
                    </Container>
                    <Container component="main" maxWidth="sm" style={{paddingTop: "3%"}}>
                        <Paper style={{backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center"}} elevation={24}>

                            <Typography style={{paddingTop: "5%", marginBottom: "2%"}} component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form>
                                <TextField
                                    error = {this.state.failed}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    label="Username"
                                    id="username"
                                    autoFocus
                                    style={{width: "80%", marginLeft: "10%"}}
                                />
                                <TextField
                                    error = {this.state.failed}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    style={{width: "80%", marginLeft: "10%"}}
                                />
                                <Button
                                    onClick = {this.handleSubmit}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    style={{width: "80%", marginLeft: "10%", marginTop: "3%", marginBottom: "5%"}}
                                >
                                    Sign In
                                </Button>
                                <Grid container style={{marginBottom: "5%"}}>
                                    <Grid item xs>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Container>
                </div>
            </div>
        )
    }
}

export default LoginPage;