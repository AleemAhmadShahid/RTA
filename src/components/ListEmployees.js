import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


const ListEmployees=()=> {
    const [empoyees,setEmployees]=useState([])
    useEffect(()=> {
        getAllEmployees();
    },[])

const getAllEmployees=()=>{
    // for API
}



}