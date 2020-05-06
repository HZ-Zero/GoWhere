import React,{memo} from 'react'
import './Submit.css'
export default memo(function Submit(props){
    return(
        <div>
            <button type="submit" className="submit-button">Search</button>
        </div>
    )
})