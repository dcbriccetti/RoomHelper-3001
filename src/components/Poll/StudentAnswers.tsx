import {Answer} from "../../types";
import React, {useState} from "react";

type StudentAnswersProps = {
    answers: Answer[];
};

const StudentAnswers: React.FC<StudentAnswersProps> = ({ answers }) => {
    const [showAnswers, setShowAnswers] = useState(false);

    const handleShowAnswersCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setShowAnswers(checked);
    };

    return (
        answers.length ? <div style={{ width: 'max-content', marginTop: '5px' }}>
            <h3>Answers</h3>
            <label>
                <input type="checkbox" checked={showAnswers} onChange={handleShowAnswersCheckboxChange}/> Show Answers
            </label>
            <br/>

            <table className='table'>
                <thead className='thead-light'>
                    <tr>
                        <th>Student</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.filter(a => a !== undefined).map((answer, index) => (
                        <tr key={index}>
                            <td>{answer.studentName}</td>
                            <td>{showAnswers ? answer.text : '*'.repeat(answer.text.length)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> : null
    );
};

export default StudentAnswers;
