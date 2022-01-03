import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, orderByChild, query, equalTo, get} from "firebase/database";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

const TeacherExams = () => {
    const auth = getAuth();
    // const {email} = auth.currentUser;
    const emailId = "dkumar25212@gmail.com";
    const [examsData, setExamsData] = useState();
    console.log(examsData);
    const db = getDatabase();
    useEffect(() => {
        // const arr = [];
        const que = query(ref(db, "exams"), orderByChild("creatorEmail"), equalTo(emailId));
        var data;
        get(que)
        .then((snapshot)=>{
            // console.log(snapshot.val());
            data = snapshot.val();
            console.log(data);
            


            // Object.keys(data).map((id, index) => {
            //     console.log("yes")
            //     var temp = {
            //         examId: id,
            //         val : data[id]
            //     }

            //     console.log(temp);

            //     arr.push(temp);
                
            // })

        });
        // console.log(data);
        
        setTimeout(() => {
            console.log("hello");
            setExamsData(data);
            console.log(data)
        }, 10000);

        console.log(examsData);

    }, [emailId])

    return (
        <div>
            <Link to="/createExam">
                <button className='submit'>
                    Create Exam
                </button>
            </Link><hr></hr><hr></hr>

            <div style={{marginTop: "100px"}}>
            <table className='styled-table1'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Exam Name</th>
                        <th style={{textAlign: "center"}}>Exam Id</th>
                        <th style={{textAlign: "center"}}>Exam Password</th>
                        <th style={{textAlign: "center"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {examsData == null?<>null hai bhai</>:
                    Object.keys(examsData).map((id, index) => {
                        return (
                            <tr key = {id}>
                                <th scope="row">{index+1}.</th>
                                <td>{examsData[id].examName}</td>
                                <td>{examsData[id].examId}</td>
                                <td>{examsData[id].password}</td>
                            </tr>
                        )
                    })
}
                    
                </tbody>
            </table>
        </div>


        </div>
    )
}

export default TeacherExams
