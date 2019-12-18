import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers'

const baseUrl = 'http://localhost:5000'

export default function EditExercise(props){
    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

    useEffect(() => {
        
        axios.get(`${baseUrl}/users/`)
        .then(res => {
            if(res.data.length > 0){
                setExercise(e => ({...e, users: res.data.map(user => user.username)}))
            }
        })
        .catch(err => console.log(err))
        
        axios.get(`${baseUrl}/exercises/`+props.match.params.id)
        .then(res => {
            if(res.data){
                setExercise(e => ({...e, username: res.data.username, description: res.data.description, duration: res.data.duration, date: new Date(res.data.date)}))
            }
        })
        .catch(err => console.log(err))

    }, [])

    const onChangeUsername = e => {
        setExercise({...exercise, [e.target.name]: e.target.value})
    }

    const onChangeDate = date => {
        setExercise({...exercise, date: date})
    }

    const onSubmit = e => {
        e.preventDefault()

        axios.post(`${baseUrl}/exercises/update/`+props.match.params.id, exercise)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

        window.location = '/'
    }

    return(
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label>Username: </label>
                    <select 
                        required
                        className="form-control"
                        name="username"
                        value={exercise.username}
                        onChange={ e => onChangeUsername(e)}>
                            {
                                exercise.users.map( user => (
                                    <option
                                        key={user}
                                        value={user}
                                    >
                                        {user}
                                    </option>
                                ))
                            }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input name="description" required type="text" className="form-control" value={exercise.description} onChange={e => onChangeUsername(e)} />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input name="duration" required type="text" className="form-control" value={exercise.duration} onChange={e => onChangeUsername(e)} />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="MM/dd/yyyy"
                                    value={exercise.date}
                                    onChange={e => onChangeDate(e)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            
                            </MuiPickersUtilsProvider>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}