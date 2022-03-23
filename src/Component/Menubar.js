import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react'
import axios from 'axios';

import { useHistory } from "react-router-dom";

export default function AccountMenu() {

  let history = useHistory();

  const [user, setuser] = useState([])
  const [profile_file,setprofile_file] =useState([]);

  useEffect(() => {
      data()
  }, [])

  function data() {
      let token = localStorage.getItem('token')
      axios.get(`http://localhost:8009`,{ headers:{'x-access-token':token}})
          .then(res => {
              console.log('heyyyy________',res.data)
              const tableData = res.data.user;
              setuser(tableData)
          })
  }

  function deleteuser(_id) {
      let token = localStorage.getItem('token')
      console.log(_id);
      axios.delete(`http://localhost:8009/${_id}`, { headers:{'x-access-token':token}})
      .then((result) => {
          console.log("result.data", result.data);

      })

  }
  function adduser(){
     
      console.log('hey______add');
     history.push('/addbook')
      
  }
  function updateuser(_id) {
    
      console.log('heyy_____put',_id);
      history.push(`${_id}`);
     
  }

  const columns = [
    {
        title: "Book-Image", field: "profile_url", render: (rowData) => <img src={rowData.profile_url} style={{ width: 120, height: 100}} alt="" />,
    },
      {
          title: 'BookName', field: 'book'
      },
      {
          title: 'Discription', field: 'description'
      },
      {
          title: 'Quentities', field: 'quantities'
      },
      {
          title: 'Price', field: 'price'
      },
     
  ]
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
    <React.Fragment>
    <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            My App
          </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
       

        {/* <Typography sx={{ minWidth: 100 }}><Link to='/booklist'>Book list</Link></Typography> */}
       
        <Typography sx={{ minWidth: 100 }}><Link to='/userlist'>User list</Link></Typography>
        <Typography sx={{ minWidth: 100 }}><Link to='/myprofile'>My-profile</Link></Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>K</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
     
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          {/* <Avatar /> <Link to='/booklist'>Book list</Link> */}
        </MenuItem>
        <MenuItem>
          <Avatar className='mb-3 mx-3' /> <Link to='/userlist'>User list</Link>
        </MenuItem>
        <MenuItem>
          <Avatar className='mb-3 mx-3'/> <Link to='/myprofile'>My-profile</Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <Link to='/reg' className='my-3'> Add New Register   </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
     
    </React.Fragment>
    </Toolbar>
      </Container>
      <br />
     
      <div>

<MaterialTable title="Book List"
    data={user}
    columns={columns}

    actions={[
        {
            
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: (event, rowData) => updateuser(rowData._id),
           
        },
        

        {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => deleteuser(rowData._id)

        }, 
        {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true ,
            onClick: (event, rowData) => adduser(rowData.form)
          }
    ]}
/>



</div>
    </AppBar>
    
  );
}
