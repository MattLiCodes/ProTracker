import React, {Component} from 'react';
import {Container, Grid, Typography, TextField, Button, FormControlLabel, Paper} from '@material-ui/core';
import axios from 'axios';
import logo from './Logo.png';
import "./App.css";

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
            <div class="animated-background" style={{height: "100vh", backgroundColor: "#EF6351"}}>
                <div>
                    <Container>
                        <img src={logo} style={{paddingTop: "10%", marginBottom: "-5%", display: "block", marginLeft: "auto", marginRight: "auto", width:"50vh"}} component="h1" variant="h3" />
                        <Typography className="typography" style={{paddingTop: "5%", textAlign: "center"}} component="h1" variant="h6">
                            Supporting local schools during unprecedented times.
                        </Typography>
                    </Container>
                    <Container component="main" maxWidth="sm" style={{paddingTop: "3%"}}>
                        <Paper style={{backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center"}} elevation={24}>

                            <Typography className="typography" style={{paddingTop: "5%", marginBottom: "2%"}} component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form>
                                <TextField
                                    className="typography"
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
                                    className="typography"
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
                                    className="typography"
                                    onClick = {this.handleSubmit}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    style={{width: "80%", marginLeft: "10%", marginTop: "3%", marginBottom: "5%"}}
                                >
                                    Sign In
                                </Button>
                                <Grid container style={{marginBottom: "5%", backgroundColor:"#EF6351"}}>
                                    <Grid item xs style={{backgroundColor:"#EF6351"}}>
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