/* eslint-disable default-case */

import React, { useEffect, useState } from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { useParams, useHistory, Link } from "react-router-dom"
import axios from 'axios'
import { omit } from 'lodash'
import Alert from '@material-ui/lab/Alert'
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});
    
    useEffect(()=>{
        // localStorage.removeItem('token')
    },[])

    // const { id } = useParams()
    let history = useHistory();
   

    const postData = (e) => {
        
        let item = {
            // username: values.username,
            email: values.email,
            // phonenumber:values.phonenumber,
            password: values.password
        }
        console.log(item)
        axios.put("http://localhost:8009/forgate", item).then((res) => {
            console.log("updare", res)
            // localStorage.setItem('token',res.data.token);
        })
        history.push('/')
        // alert('Login succefully')
    }

    const validate = (event, name, value) => {


        switch (name) {
            case 'password':
                if (!new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/).test(value)) {
                    // we will set the error state

                    setErrors({
                        ...errors,
                        password: 'passwordatleast have 10 to 15  digits'
                    })
                } else {
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "password");
                    setErrors(newObj);

                }
                break;

            case 'email':
                if (
                    !new RegExp(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address just like mailto:xyz2@gmail.com'
                    })
                } else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);

                }
                break;
        }
    }

    const handleChange = (event) => {
        //To stop default events    
        event.persist();
        let name = event.target.name;
        let val = event.target.value;

        validate(event, name, val);
        setValues({
            ...values,
            [name]: val, [email]: val, [password]: val
        })
    }
    const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' }
    const marginTop = { marginTop: 5 }


    return (
        <div>
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <h2> Forgate Password </h2>
                    </Grid>
                    <form>
                        <TextField name='email' fullWidth label='Email' value={values.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} />
                        <TextField name='password' fullWidth label='Passwrord' value={values.password} onChange={handleChange} error={Boolean(errors.password)} helperText={errors.password} />
                        <br />
                        <br />
                        <Grid align='center'>
                            <Button type='submit' class='btn btn-info' onClick={postData}>Submit</Button>
                            {/* <Stack spacing={2} sx={{ width: '100%' }}>
                                <Button variant="outlined" onClick={handleClick}>
                                 
                                   Submit
                                </Button>
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                        User Login Succsfully
                                    </Alert>
                                </Snackbar>
                            </Stack> */}
                        </Grid>
                        <br />
                        <Grid>
                            {/* <Link to='/reg'> New Register   </Link>
                            <br />
                            <br/>
                            <Link to='/forgate'>Forgate Password</Link> */}
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default Login