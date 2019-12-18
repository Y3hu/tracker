import React, { useState } from 'react'
import axios from 'axios'

export default function CreateUser(){

    const [user, setUser] = useState('')

    const onChangeUsername = e => {
        setUser(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        
        axios.post('http://localhost:5000/users/add', {username: user})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h3>Create New User</h3>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label>Username: </label>
                    <input 
                        type="text"
                        required
                        className="form-control"
                        value={user}
                        onChange={e => onChangeUsername(e)}
                    />
                </div>
                <div className="form-gropu">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}