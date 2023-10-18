import React from "react";

export default function Poll() {
    return (
        <div id='poll'>
            <h1>Poll</h1>

            <div className="form-group row">
                <h5>Question</h5>
                <textarea className="form-control" id="question-text" rows={2}
                          placeholder="Question"></textarea>
            </div>

            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a id="poll-tab-text" className="nav-link active" data-toggle="tab" href="#text" role="tab"
                       aria-controls="text" aria-selected="true">Text</a>
                </li>
                <li className="nav-item">
                    <a id="poll-tab-multi" className="nav-link" data-toggle="tab" href="#multiple-choice"
                       role="tab"
                       aria-controls="multiple-choice" aria-selected="true">Multiple Choice</a>
                </li>
                <li className="nav-item">
                    <a id="poll-tab-scale" className="nav-link" data-toggle="tab" href="#scale" role="tab"
                       aria-controls="scale" aria-selected="true">Scale</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane show active" id="text" role="tabpanel" aria-labelledby="poll-tab-text">
                </div>
                <div className="tab-pane" id="multiple-choice" role="tabpanel" aria-labelledby="poll-tab-multi">
                    <div className="form-group row">
                        <h5>Responses</h5>
                        <textarea className="form-control" id="multi-answers" rows={4}
                                  placeholder="Answers"></textarea>
                    </div>
                </div>
                <div className="tab-pane" id="scale" role="tabpanel" aria-labelledby="poll-tab-scale">
                    <div className="form-group row">
                    </div>
                </div>
            </div>

            <div className="form-group row">
                <h5>Multiple Questions</h5>
                <button id='show-multi-text' className='btn btn-outline-secondary btn-sm'
                        style={{marginLeft: '1em'}}>Paste...
                </button>
                <textarea className="form-control" id="multiple-question-text" rows={5}
                          placeholder="Paste multiple questions here"></textarea>
            </div>
            <div className="form-group row">
                <h5>Select from Multiple Questions</h5>
                <select className="form-control" id="multiple-question-select"></select>
            </div>

            <div className="form-group row">
                        <span className="form-control">
                            <input id='enable-poll' type="checkbox"/>
                            <label htmlFor="enable-poll">Show Question</label>
                            <span id='show-answers' style={{marginLeft: '2em'}}>Show <span
                                id="num-answers"></span> answer<span id="num-answers-plural"></span>:
                                <input id='show-here' type="checkbox"/>
                                <label htmlFor="show-here">Here</label>
                                <input id='show-in-chart' type="checkbox"/>
                                <label htmlFor="show-in-chart">In Chart</label>
                            </span>
                        </span>
            </div>
            <div id='answers' className="form-group row" style={{display: 'none'}}>
                <table className="table table-striped table-small">
                    <thead className="thead-light">
                    <tr>
                        <th>Student</th>
                        <th>Answer</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
