import React, { useState, useEffect } from 'react'
import firebase from '../../../lib/firebase'
import { useAuth } from '../../../lib/AuthContext'

const Scene = ({ sceneId }) => {
    const auth = useAuth()
    const [scene, setScene] = useState({})
    const db = firebase.firestore()

    useEffect(() => {
        if(auth.isAuthReady){
            db
                .collection('scenes')
                .doc(auth.uid)
                .collection('scenes')
                .doc(sceneId)
                .onSnapshot(querySnapshot => {
                    console.log('QuerySnapshot', querySnapshot.data())
                    setScene({
                        ...querySnapshot.data(),
                        id: sceneId
                    })
                })
        }
    }, [db, auth])

    return(
        <div>
            <h1>{ scene.name }</h1>
        </div>
    )
}

export default Scene
