import {Answer} from "../../types";

type StudentAnswersProps = {
    answers: Answer[];
    showAnswers: boolean;
};

const StudentAnswers: React.FC<StudentAnswersProps> = ({ answers, showAnswers }) => {
    return (
        <div style={{ width: 'max-content', marginTop: '5px' }}>
            <h3>Answers</h3>
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
        </div>
    );
};

export default StudentAnswers;
