import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCallStateHooks } from '@stream-io/video-react-sdk';


interface Props {
    disable: boolean;
}

const CustomDeviceSelectorAudio = ({ disable }: Props) => {
    const {useMicrophoneState} = useCallStateHooks()
    const {microphone, devices, selectedDevice} = useMicrophoneState()

    const handleSelect = async (value: string) => {
        await microphone.select(value)
    }
    return (
        <Select
        disabled={disable}
        value={selectedDevice}
        onValueChange={handleSelect}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select micro" />
            </SelectTrigger>
            <SelectContent>
                {
                    devices?.map((device) => (
                        <SelectItem key={device.deviceId} value={device.deviceId}>
                            {device.label || `Micro ${device.deviceId.slice(0, 5)}`}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>

    )
}

export default CustomDeviceSelectorAudio