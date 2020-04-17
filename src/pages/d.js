import React, { useState, useEffect } from 'react'
import firebase from '../lib/firebase'

import Layout from '../components/Layout'

const db = firebase.firestore()

const D = () =>{
    const deviceNumber = localStorage.getItem('deviceNumber')
    const owner = localStorage.getItem('owner')
    const randomID = Math.floor(Math.random() * 999999).toString().padStart(6, '0')
    const number = deviceNumber || randomID
    const alreadyActivated = !!deviceNumber && !!owner

    const [activated, setActivated] = useState(alreadyActivated)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if(!activated){
            db
            .collection('temp-devices')
            .doc(number)
            .set({
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                localStorage.setItem('deviceNumber', number)
                setIsReady(true)
            })
        }
    }, [activated])

    useEffect(() => {
        let unsubscribe = null

        if(isReady && !activated){
            unsubscribe = db
                .collection('temp-devices')
                .doc(number)
                .onSnapshot(snap => {
                    const deviceData = snap.data()

                    if(deviceData && deviceData.owner){
                        db
                            .collection('devices')
                            .doc(deviceData.owner)
                            .collection('devices')
                            .doc(number)
                            .set({ activated: true })
                            .then(() => {
                                localStorage.setItem('owner', deviceData.owner)
                                setActivated(true)

                                db
                                    .collection('temp-devices')
                                    .doc(number)
                                    .delete()
                                    .then(() => {
                                        
                                    })
                            })
                    }
                })
        }

        return () => {
            if(unsubscribe) unsubscribe()
        }
    }, [isReady, activated])

    useEffect(() => {
        let unsubscribe = null

        if(activated){
            unsubscribe = db
                .collection('devices')
                .doc(owner)
                .collection('devices')
                .doc(deviceNumber)
                .onSnapshot(snap => {
                    console.log('Snapshot', snap.data())
                })
        }

        return () => {
            if(unsubscribe) unsubscribe()
        }
    })

    return(
        <Layout>
            <h1>Mostrando Display do tablet</h1>
            { !activated && <h2>{ number }</h2> }
            { activated && <h2>Device Already Activated!</h2>}
        </Layout>
    )
}

export default D
