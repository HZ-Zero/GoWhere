import React from 'react'
import './HighSpeed.css'
export default function HighSpeed(props){
    const{highSpeed,toggle} = props
    return(
        <div className="high-speed">
            <div className="high-speed-label">
                只看高铁/动车
            </div>
            <div className="high-speed-switch" onClick={()=>toggle()}>
                <input type="hidden" name="highSpeed" value={highSpeed} />
                <div className={highSpeed?'high-speed-track checked':'high-speed-track'}>
                    <span className={highSpeed?'high-speed-handle checked':'high-speed-handle'}></span>
                </div>
            </div>
        </div>
    )
}