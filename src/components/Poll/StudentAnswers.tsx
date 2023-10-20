import {Answer} from "./types";

type StudentAnswersProps = {
    answers: Answer[];
};

const StudentAnswers: React.FC<StudentAnswersProps> = ({ answers }) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((answer, index) => (
                        <tr key={index}>
                            <td>{answer.studentName}</td>
                            <td>{answer.response}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default StudentAnswers;
