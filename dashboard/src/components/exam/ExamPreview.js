import React from "react";

let answersLetters = ["a- ", "b- ", "c- ", "d- ", "e- "]
export default function ExamPreview({ exam }) {
    return <div className="text-start">
        <div className="d-flex justify-content-center">
            <div className="bg-main-color text-white d-flex align-items-center justify-content-center" style={{ height: "140px", width: "140px" }}>
                <div className="text-center">
                    <span className="d-block fs-5">exams</span>
                    <span className="d-block fs-4">{exam.questions.length}</span>
                </div>
            </div>
            <div className="bg-second-color text-white d-flex align-items-center justify-content-center ms-3" style={{ height: "140px", width: "140px" }}>
                <div className="text-center">
                    <span className="d-block fs-5">degree</span>
                    <span className="d-block fs-4">{exam.degree}</span>
                </div>
            </div>
        </div>
        <div className="mt-4">
            {
                exam.questions.map((question, index) => (
                    <div key={index}>
                        <p className="mb-1 fs-5">{index + 1}- {question.question}</p>
                        <div className="row ms-4">
                            {
                                question.answers.map((answer, i) => <div className={`col-12 col-lg-3${answer === question.correctAnswer ? " text-primary" : ""}`} key={i}>{answersLetters[i]}{answer}</div>)
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
}
