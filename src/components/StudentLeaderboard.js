import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import fireDb from "../firebase";
import "../style/StudentLeaderboard.css";

const StudentLeaderboard = () => {
    const [data, setData] = useState({});
    const [state, setState] = useState(["hello"]);
    console.log(state);


    const {id} = useParams();
    const examid = id;

    const emailId = "emailId1";

    useEffect(() => {
        // console.log(id);
        fireDb.child(`examsResponse/${examid}`).on("value", (snapshot) =>{
            if(snapshot.val() !== null){
                // console.log(snapshot.val());
                setData({ ...snapshot.val()});
                // console.log(data);
            }
            else
            {
                setData({});
            }
        });

        return () => {
            setData({});
        }
    }, [examid]);

    console.log(data);
    function func(){
        console.log("hereee");
        return [...state,"hi"];
    }
    useEffect(() => {
        const ans = [];
        Object.keys(data).map((id, index) => {
            // console.log(id);
            const emailId = id;
            let totalScore = 0;
            let slNo = index + 1 ;
    
            var response = data[id];
    
            Object.keys(response).map((id1, index) => {
                
                if(response[id1].answer === response[id1].response)
                {
                    totalScore += Number(response[id1].marks);
                }
            })

            // console.log(totalScore);
    
            var obj = {slNo:slNo, emailId:emailId, totalScore:totalScore};
            console.log(obj);
            ans.push(obj);
        })
        setTimeout(()=>{
            ans.sort((a,b) => b.totalScore-a.totalScore);
            setState(ans);
            
        },2000);
    }, [data]);

    // {Object.keys(data).map((id, index) => {
    //     // console.log(id);
    //     const emailId = id;
    //     let totalScore = 0;
    //     let slNo = index + 1 ;

    //     var response = data[id];

    //     {Object.keys(response).map((id, index) => {
            
    //         if(response[id].answer === response[id].response)
    //         {
    //             totalScore += Number(response[id].marks);
    //         }
    //     })}

    //     // console.log(totalScore);

    //     var obj = {slNo:slNo, emailId:emailId, totalScore:totalScore};
    //     // console.log(obj);
    //     setState([...state,obj]);


    // })}

    // console.log(state);

    return (
        <div style={{marginTop: "100px"}}>
            <table className='styled-table1'>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>Student Id</th>
                        <th style={{textAlign: "center"}}>Student Score</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <LeaderBoard state={state}></LeaderBoard> */}
                    {Object.keys(state).map((id, index) => {
                        return (
                            <tr key = {id}>
                                <th scope="row">{index+1}.</th>
                                <td>{state[id].emailId}</td>
                                <td>{state[id].totalScore}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    )
}

export default StudentLeaderboard
