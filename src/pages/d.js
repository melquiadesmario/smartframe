import React, { useState, useEffect } from 'react'
import firebase from '../lib/firebase'

import Layout from '../components/Layout'

const D = () =>{
    const r = Math.floor(Math.random() * 999999).toString().padStart(6, '0')
    const [number, setNumber] = useState(r)

    useEffect(() => {
        const deviceNumber = localStorage.getItem('deviceNumber')
        
        if(deviceNumber){
            setNumber(deviceNumber)

            const db = firebase.firestore()
            db
                .collection('temp-devices')
                .doc(deviceNumber)
                .set({
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {

                })
        }else{
            localStorage.setItem('deviceNumber', number)
        }
    }, [])

    return(
        <Layout>
            <h1>Mostrando Display do tablet</h1>
            <h2>{ number }</h2>
        </Layout>
    )
}

export default D
