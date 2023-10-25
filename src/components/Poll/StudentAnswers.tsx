import {Answer} from "../../types";

type StudentAnswersProps = {
    answers: Answer[];
};

const StudentAnswers: React.FC<StudentAnswersProps> = ({ answers }) => {
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
                    {answers.map((answer, index) => (
                        <tr key={index}>
                            <td>{answer.studentName}</td>
                            <td>{answer.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentAnswers;
