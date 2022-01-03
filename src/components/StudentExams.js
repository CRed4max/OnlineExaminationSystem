import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";
import { useHistory } from 'react-router-dom';

const StudentExams = () => {
    const auth = getAuth();
    var email;
    const history = useHistory();
    const [state, setState] = useState({});

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // console.log(user);
    //             email = user.email;
    //             console.log(email);
    //         } else {
    //           console.log("no user is currently signed in");
    //           history.push('/');
    //         }
    //       });
    //   }, [])

    // const temp = email;
    // let x = temp.length();
    // console.log(x);
    // const emailId = email.substring(0, emailLength);
    // console.log(emailId);
    const emailId = "dkuma25212";

    const db = getDatabase();
    // const history = useHistory();

    const [examDetail, setexamDetail] = useState([]);


    useEffect(() => {
        const dbref = ref(db,`student/`+emailId);
            onValue(dbref,(snapshot)=>{
                const data = snapshot.val();
                setState(data);
                setTimeout(()=>{
                    // setState(data);
                },2000);
                console.log(state);

            },{
                onlyOnce : true
            })
    }, [emailId])

    


    return (
        <div style={{marginTop: "100px"}}>
            <table className='styled-table1'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Exam Name</th>
                        <th style={{textAlign: "center"}}>Creator Email</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <LeaderBoard state={state}></LeaderBoard> */}
                    {Object.keys(state).map((id, index) => {
                        return (
                            <tr key = {id}>
                                <th scope="row">{index+1}.</th>
                                <td>{state[id].examName}</td>
                                <td>{state[id].creatorEmail}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    )
}

export default StudentExams
