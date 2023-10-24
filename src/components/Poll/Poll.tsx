import React, {useEffect, useState} from 'react';
import {Answer, Question} from "./types";
import StudentAnswers from "./StudentAnswers";
import {useSocket} from "../../App";

const Poll: React.FC = () => {
    const socket = useSocket();
    if (!socket) {
        throw new Error("Socket is null or undefined");
    }
    const [questions, setQuestions] = useState<Question[]>(['q1', 'q2', 'q3'].map((q, index) => ({
        id: index,
        text: q
    })) as Question[]);
    const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [showAnswers, setShowAnswers] = useState(false);

    useEffect(() => {
        const handleAnswerPoll = (msg: any) => answerPoll(msg);

        socket.on('answer_poll', handleAnswerPoll);

        return () => {
            socket.off('answer_poll', handleAnswerPoll);
        };
    }, [socket]);

    const answerPoll = (answer: Answer) => {
        console.log("Answer poll:", answer);
        const updatedAnswers = [...answers];
        updatedAnswers[answer.seatIndex] = answer;
        setAnswers(updatedAnswers);
    };

    const handleMultipleQuestionsInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newQuestions = e.target.value
            .split('\n')
            .filter(q => q.trim() !== '') // Filter out empty questions or whitespace
            .map((q, index) => ({id: index, text: q.trim()})); // Trim any leading/trailing whitespace
        setQuestions(newQuestions);
        if (newQuestions.length > 0 && activeQuestionId === null) {
            setActiveQuestionId(newQuestions[0].id); // Automatically set the first question as active
        }
    };

    const handleQuestionSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveQuestionId(Number(e.target.value));
    };

    const handleSendQuestion = () => {
        if (activeQuestionId !== null) {
            socket.emit('start_poll', 'text', questions[activeQuestionId].text, []);
            console.log("Question sent:", activeQuestionId, questions[activeQuestionId])
        } else {
            console.log("No question selected.");
        }
    };

    const handleSendNext = () => {
        // Hide the previous answers
        setAnswers([]);

        // Automatically select the next question
        const currentIndex = questions.findIndex(q => q.id === activeQuestionId);
        if (currentIndex !== -1 && currentIndex + 1 < questions.length) {
            const nextQuestionId = questions[currentIndex + 1].id;
            console.log("Setting next question ID:", nextQuestionId);
            setActiveQuestionId(nextQuestionId);

            // Send the next question using the local variable
            console.log("Question sent:", nextQuestionId, questions[nextQuestionId])
        } else {
            console.log("No more questions available.");
        }
    };

    const hasNextQuestion = (): boolean => {
        const currentIndex = questions.findIndex(q => q.id === activeQuestionId);
        return currentIndex !== -1 && currentIndex + 1 < questions.length;
    };

    const handleShowAnswersCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setShowAnswers(checked);
        if (! checked)
            socket.emit('stop_poll');
    };

    return (
        <div id='poll'>
            <h1>Poll</h1>
            <textarea onChange={handleMultipleQuestionsInput}
                      placeholder="Paste questions here, one per line"></textarea><br/>

            <select
                className='form-select'
                value={activeQuestionId || ''}
                onChange={handleQuestionSelection}>

                <option value="" disabled>Select a question</option>
                {questions.map(q => <option key={q.id} value={q.id}>{q.text}</option>)}
            </select>

            <button className="btn btn-primary" onClick={handleSendQuestion}>Send Question</button>
            <br/>

            <label>
                <input type="checkbox" checked={showAnswers} onChange={handleShowAnswersCheckboxChange}/>
                Show Answers
            </label>
            <br/>

            {showAnswers && (
                <>
                    <StudentAnswers answers={answers}/>
                    {hasNextQuestion() &&
                        <button className="btn btn-primary" onClick={handleSendNext}>Send Next</button>}
                </>
            )}
        </div>
    );
};

export default Poll;
