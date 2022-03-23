import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Table() {

    let history = useHistory();

    const [user, setuser] = useState([])

    useEffect(() => {
        data()
    }, [])

    function data() {
        let token = localStorage.getItem('token')
        axios.get(`http://localhost:8009`, { headers: { 'x-access-token': token } })
            .then(res => {
                console.log('heyyyy________', res.data)
                const tableData = res.data.user;
                setuser(tableData)
            })
    }



    function updateuser(_id) {

        console.log('heyy_____put', _id);
        history.push(`${_id}`);

    }

    const columns = [
        {
            title: 'Profile', field: 'profile_url', render: (rowData) => <img src={rowData.profile_url} style={{ width: 120, height: 100 }} alt="" />,
        },
        {
            title: 'Name', field: 'name'
        },
        {
            title: 'Username', field: 'username'
        },
        {
            title: 'Email', field: 'email'
        },
        {
            title: 'Mobilenumber', field: 'mobilenumber'
        },

    ]
    return (

        <div>


            <MaterialTable title="My Profile"
                data={user}
                columns={columns}

                actions={[
                    {

                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => updateuser(rowData._id),

                    },



                ]}
            />


            <Link to='/menubar'><button className='mb-3 my-3'>Return Menubar</button></Link>

        </div>




    )
}





export default Table