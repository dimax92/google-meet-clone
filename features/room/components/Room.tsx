"use client"
import { CallingState, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import Loading from './Loading'
import SpeakerView from './SpeakerView'

const Room = () => {
    const { useCallCallingState} = useCallStateHooks()
    const callingState = useCallCallingState()

    if(callingState !== CallingState.JOINED){
        return <Loading title='Joining call...' />
    }
  return (
    <SpeakerView />
  )
}

export default Room