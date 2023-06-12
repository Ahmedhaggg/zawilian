import React from "react";

let answersLetters = ["a- ", "b- ", "c- ", "d- ", "e- "]
export default function ExamPreview({ exam }) {
    return <div className="mt-4">
            {
                exam.questions.map((question, index) => (
                    <div key={index}>
                        <p className="mb-1 text-left">{index + 1}- {question.question} :- </p>
                        <div className="row ms-4">
                            {
                                question.answers.map((answer, i) => 
                                    <div 
                                        className={`col-12 col-md-6 col-lg-3${i == question.correctAnswer ? " text-primary" : ""}`} 
                                        key={i}
                                    >
                                        {answersLetters[i]}{answer}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
}
