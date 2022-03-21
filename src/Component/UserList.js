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
        axios.get(`http://localhost:8009/userlist`,{ headers:{'x-access-token':token}})
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
          history.push('/booklist')
    }
    
   

    const columns = [
        {
            title: 'name', field: 'name'
        },
        {
          title: 'username', field: 'username'
      },
                {
            title: 'email', field: 'email'
        },
        {
            title: 'mobilenumber', field: 'mobilenumber'
        },
       
    ]
    return (

        <div>

            <MaterialTable title="User List"
                data={user}
                columns={columns}

                actions={[
                    
                    

                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => deleteuser(rowData._id)

                    }, 
                   
                ]}
            />

           

        </div>
    )
}





export default Table