import React, {useEffect, useState} from 'react';
import {Answer, Question} from "../../types";
import './Poll.css';
import StudentAnswers from "./StudentAnswers";
import {useSocket} from "../contexts";
import Room from "../Room";

const Poll: React.FC = () => {
    const socket = useSocket();
    const sampleQuestions = ['q1', 'q2', 'q3'].map((q, index) => ({
        id: index,
        text: q
    })) as Question[];
    const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
    const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        const handleAnswerPoll = (msg: any) => answerPoll(msg);

        socket?.on('answer_poll', handleAnswerPoll);  // move this, to always be listening for answers

        return () => {
            socket?.off('answer_poll', handleAnswerPoll);
        };
    }, [socket]);

    function answerPoll(answer: Answer) {
        console.log("Answer poll:", answers, answer);
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[answer.seatIndex] = answer;
            return updatedAnswers;
        });
    }

    function handleMultipleQuestionsInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newQuestions = e.target.value
            .split('\n')
            .filter(q => q.trim() !== '') // Filter out empty questions or whitespace
            .map((q, index) => ({id: index, text: q.trim()})); // Trim any leading/trailing whitespace
        setQuestions(newQuestions);
        if (newQuestions.length > 0 && activeQuestionId === null) {
            setActiveQuestionId(newQuestions[0].id); // Automatically set the first question as active
        }
    }

    function handleQuestionSelection(e: React.ChangeEvent<HTMLSelectElement>) {
        setActiveQuestionId(Number(e.target.value));
    }

    function handleSendQuestion(questionId: number | null) {
        console.log("Sending question:", questionId);
        if (questionId !== null) {
            socket?.emit('start_poll', 'text', questions[questionId].text, []);
            console.log("Question sent:", questionId, questions[questionId])
        } else {
            console.log("No question selected.");
        }
    }

    function handleSendNext() {
        // Hide the previous answers
        setAnswers([]);

        // Automatically select the next question
        const currentIndex = questions.findIndex(q => q.id === activeQuestionId);
        if (currentIndex !== -1 && currentIndex + 1 < questions.length) {
            const nextQuestionId = questions[currentIndex + 1].id;
            console.log("Setting next question ID:", nextQuestionId);
            setActiveQuestionId(nextQuestionId);
            handleSendQuestion(nextQuestionId)
        } else {
            console.log("No more questions available.");
        }
    }

    function hasNextQuestion(): boolean {
        const currentIndex = questions.findIndex(q => q.id === activeQuestionId);
        return currentIndex !== -1 && currentIndex + 1 < questions.length;
    }


    function stopPoll() {
        socket?.emit('stop_poll');
        setAnswers([]);
    }

    return (
        <div id='poll'>
            <Room/>
            <textarea onChange={handleMultipleQuestionsInput}
                      placeholder="Paste questions here, one per line"></textarea><br/>

            <select
                className='form-select'
                value={activeQuestionId !== null ? activeQuestionId : ''}
                onChange={handleQuestionSelection}>

                <option value="" disabled>Select a question</option>
                {questions.map(q => <option key={q.id} value={q.id}>{q.text}</option>)}
            </select>

            <button className="btn btn-primary" onClick={() => handleSendQuestion(activeQuestionId)}>
                Send Question
            </button>
            <br/>

            <StudentAnswers answers={answers}/>
            {hasNextQuestion() &&
                <button className="btn btn-primary" onClick={handleSendNext}>Send Next</button>}
            <button className="btn btn-secondary" style={{marginLeft: '0.5em'}} onClick={stopPoll}>
                Stop
            </button>
        </div>
    );
};

export default Poll;
