"use client"
import Logo from '@/components/Logo'
import { useCallStateHooks, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import ParticipantPlaceholder from './ParticipantPlaceholder'
import RequestPermissionPlaceholder from './RequestPermissionPlaceholder'
import { Button } from '@/components/ui/button'
import { useStreamCall } from '../hooks/use-stream-call'
import { toast } from 'sonner'
import { AlertTriangle, Mic, MicOff, Video, VideoOff } from 'lucide-react'
import CustomDeviceSelectorVideo from './CustomDeviceSelectorVideo'
import CustomDeviceSelectorAudio from './CustomDeviceSelectorAudio'
import CustomDeviceSelectorAudioOutput from './CustomDeviceSelectorAudioOutput'

interface Props {
    setIsSetupComplete: (isSetupComplete: boolean) => void
}

const Prejoin = ({ setIsSetupComplete }: Props) => {
const call = useStreamCall()
const {
    useMicrophoneState,
    useCameraState,
    useParticipantCount,
} = useCallStateHooks()

const microphoneState = useMicrophoneState()
const cameraState = useCameraState()
const participantCount = useParticipantCount()

const [microphoneEnabled, setMicrophoneEnabled] = useState<boolean>(
    microphoneState.isEnabled && microphoneState.hasBrowserPermission
)

const [cameraEnables, setCameraEnabled] = useState(
    cameraState.isEnabled && cameraState.hasBrowserPermission
)

const requestMicrophonePermission = async () => {
     try {
        await navigator.mediaDevices.getUserMedia({audio: true})
        setMicrophoneEnabled(!microphoneEnabled)
     } catch (error) {
        toast.error("Microphone access is required to join the call. Please grant permission to continue")
     }
}

const requestCameraPermission = async () => {
    try {
       await navigator.mediaDevices.getUserMedia({video: true})
       setCameraEnabled(!cameraEnables)
    } catch (error) {
       toast.error("Camera access is required to join the call. Please grant permission to continue")
    }
}

const toggleMicrophone = () => {
    if(!microphoneState.hasBrowserPermission){
        microphoneEnabled ? call.microphone.disable() : call.microphone.enable()
        setMicrophoneEnabled(!microphoneEnabled)
    } else {
        requestMicrophonePermission()
    }
}

const togglCamera = () => {
    if(!cameraState.hasBrowserPermission){
        cameraEnables ? call.camera.disable() : call.camera.enable()
        setCameraEnabled(!cameraEnables)
    } else {
        requestCameraPermission()
    }
}

    const getButtonVariant = (isEnable: boolean, hasPermission: boolean) => {
        if(!hasPermission) return "destructive"
        if(!isEnable) return "destructive"
        return "default"
    }
    return (
        <div className='flex flex-col w-full h-full'>
            <div className='w-full sticky top-0 inset-x-0 pl-4 backdrop-blur-md bg-background/20 z-50'>
                <Logo></Logo>
            </div>
            <div className='w-full h-full flex-1 flex flex-col lg:flex-row mx-auto max-w-screen-xl px-4 mb-8'>
                <div className='w-full lg:w-2/3 h-full flex flex-col justify-center'>
                    <div className='w-full max-w-3xl relative aspect-video min-h-[360px]'>
                        <VideoPreview
                            className='w-full h-full border-none bg-black/90'
                            DisabledVideoPreview={ParticipantPlaceholder}
                            NoCameraPreview={RequestPermissionPlaceholder}
                        />
                        <div className='flex gap-x-4 absolute left-1/2 -translate-x-1/2 bottom-4'>
                            <div className='relative'>
                                <Button
                                variant={getButtonVariant(microphoneEnabled, microphoneState.hasBrowserPermission)}
                                className='size-12 sm:size-14 rounded-full cursor-pointer'
                                onClick={toggleMicrophone}
                                >
                                    {
                                        microphoneEnabled ? (
                                            <Mic className='size-5 sm:size-6'/>
                                        ) : (
                                            <MicOff className='size-5 sm:size-6'/>
                                        )
                                    }
                                </Button>
                                {
                                    !microphoneState.hasBrowserPermission && (
                                        <div className='absolute -top-1 -right-1 bg-orange-500 text-white size-6 flex items-center justify-center rounded-full'>
                                            <AlertTriangle className='size-3'/>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='relative'>
                                <Button
                                variant={getButtonVariant(cameraEnables, cameraState.hasBrowserPermission)}
                                className='size-12 sm:size-14 rounded-full cursor-pointer'
                                onClick={togglCamera}
                                >
                                    {
                                        cameraEnables ? (
                                            <Video className='size-5 sm:size-6'/>
                                        ) : (
                                            <VideoOff className='size-5 sm:size-6'/>
                                        )
                                    }
                                </Button>
                                {
                                    !cameraState.hasBrowserPermission && (
                                        <div className='absolute -top-1 -right-1 bg-orange-500 text-white size-6 flex items-center justify-center rounded-full'>
                                            <AlertTriangle className='size-3'/>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-full max-w-3xl gap-4 p-4 flex-wrap'>
                        {
                            cameraState.hasBrowserPermission && (
                                <div className='flex-1'>
                                    <CustomDeviceSelectorVideo disable={!cameraEnables} />
                                </div>
                            )
                        }
                        {
                            microphoneState.hasBrowserPermission && (
                                <div className='flex-1'>
                                    <CustomDeviceSelectorAudio disable={!microphoneEnabled} />
                                </div>
                            )
                        }
                        {
                            microphoneState.hasBrowserPermission && (
                                <div className='flex-1'>
                                    <CustomDeviceSelectorAudioOutput disable={!microphoneEnabled} />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center space-y-4 lg:w-1/3 mt-4 lg:mt-0 lg:self-center '>
                <h1 className='font-medium text-2xl sm:text-4xl text-center'>
                    Ready to join the call ?
                </h1>
                <p>
                    {
                        participantCount > 0 ?
                        `There are ${participantCount} participants in the call` : 
                        `You are the first one here`
                    }
                </p>
                <Button
                size={"lg"}
                onClick={async()=>{
                    call.join()
                    setIsSetupComplete(true)
                }}
                >
                    Join call
                </Button>
                </div>
            </div>
        </div>
    )
}

export default Prejoin