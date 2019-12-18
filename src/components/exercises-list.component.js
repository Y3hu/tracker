import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseUrl = 'http://localhost:5000'

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date}</td>
        <td>
            <Link className="btn btn-secondary" to={"/edit/"+props.exercise._id}>edit</Link> | <button className="btn btn-danger" type="button" onClick={() => props.deleteExercise(props.exercise._id)} >delete</button>
        </td>
    </tr>
)

export default function CreateUser(){
    const [exercises, setExercises] = useState([])
    
    useEffect(() => {
        axios.get(`${baseUrl}/exercises`)
        .then(res => {
            if(res.data.length > 0){
                setExercises(res.data)
            }
        })
        .catch(err => console.log(err))
    }, [])

    const deleteExercise = id => {
        axios.delete(`${baseUrl}/exercises/`+id)
        .then(() => {
            let newExercises = exercises.filter(el => el._id !== id)
            setExercises(newExercises)
        })
        .catch(err => console.log(err))
    }

    const exercisesList = _ => {
        return(
            exercises.map(current => (
                <Exercise exercise={current} deleteExercise={deleteExercise} key={current._id} />
            ))
        )
    }

    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercisesList()}
                </tbody>
            </table>
        </div>
    )
}