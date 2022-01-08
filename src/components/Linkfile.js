import React from 'react'
import { Link } from 'react-router-dom'

export const Linkfile = (props) => {
    return (
        <div>
            <Link to={"/viewExam/"+props.usrid}>
                <button className='submit'>
                    View Exam
                </button>
            </Link>
        </div>
    )
}
