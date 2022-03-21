import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Table() {

    let history = useHistory();

    const [user, setuser] = useState([])
    const [profile_file,setprofile_file] =useState([]);

    useEffect(() => {
        data()
    }, [])

    function data() {
        let token = localStorage.getItem('token')
        axios.get(`http://localhost:8009/book`,{ headers:{'x-access-token':token}})
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
       history.push('/add')
        
    }
    function updateuser(_id) {
      
        console.log('heyy_____put',_id);
        history.push(`${_id}`);
       
    }

    const columns = [
        {
            title: 'Name', field: 'name'
        },
        {
            title: "Book-Image", field: "profile_url", render: (rowData) => <img src={rowData.profile_url} style={{ width: 120, height: 100}} alt="" />,
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
    return (

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
    )
}





export default Table