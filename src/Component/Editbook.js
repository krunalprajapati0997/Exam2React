import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react'
import {useHistory, useParams} from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}    
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function SignUp() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          quantities: data.get('quantities'),
        //   password: data.get('password'),
        });
      };
        const {id} = useParams();
    const [name,setname] = useState('');
    const [description,setdescription] = useState('');
    const [quantities,setquantities] = useState('');
    const [price ,setprice] = useState('');
    const [profile,setprofile] = useState([]);
    // const [password,setpassword] = useState('');
    let history = useHistory();
   
    
function postData (){
  let token = localStorage.getItem('token')
        let item = {
            name:name,
            description:description,
            quantities:quantities,
            price:price,
            profile:profile
            // password:password
        }
        console.log(item)
        axios.put(`http://localhost:8009/${id}`, item,{ headers:{'x-access-token':token}}).then((res) => {
            console.log("update", res.data)
        })
        history.push('/booklist')
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
           Edit-Book
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                onChange={(e) => setname(e.target.value)}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                 onChange={(e) => setdescription(e.target.value)}
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 onChange={(e) => setquantities(e.target.value)}
                  required
                  fullWidth
                  id="quantities"
                  label="Quantities"
                  name="quantities"
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 onChange={(e) => setprice(e.target.value)}
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 onChange={(e) => setprofile(e.target.files)}
                  required
                  fullWidth
                  id="profile_file"
                  type='file'
                  label="Bookimage"
                  name="file"
                 
                />
              </Grid>
              
            </Grid>
            <Button
            onClick={postData}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit-Book
            </Button>
            <Grid container justifyContent="flex-end">
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}