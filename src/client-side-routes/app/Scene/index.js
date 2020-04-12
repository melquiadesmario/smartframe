import React, { useState, useEffect } from 'react'
import firebase from '../../../lib/firebase'
import { useAuth } from '../../../lib/AuthContext'

const Scenes = () => {
    const auth = useAuth()
    const [scenes, setScenes] = useState([])
    const db = firebase.firestore()
    console.log('UID', auth)

    useEffect(() => {
        if(auth.isAuthReady){
            db
                .collection('scenes')
                .where('owner', '==', auth.uid)
                .onSnapshot(querySnapshot => {
                    const docs = []
                    querySnapshot.forEach(doc => {
                        console.log(`${ doc.id } => `, doc.data())
                        docs.push(doc.data())
                    })
                    setScenes(docs)
                })
        }
    }, [db, auth])

    const createScene = () => {
        const newSceneRef = db.collection('scenes').doc()
        newSceneRef.set({
            name: 'test2',
            owner: auth.uid
        })
    }

    return(
        <div>
            <h1>Scenes</h1>
            <input
                type='text'
                name='name'
                placeholder='Name'
            />
            <button
                onClick={ createScene }
            >
                Create Scene
            </button>
            <pre>
                { JSON.stringify(scenes, null, 2)}
            </pre>
        </div>
    )
}

export default Scenes
