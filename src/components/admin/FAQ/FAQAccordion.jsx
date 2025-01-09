import React, { useState } from "react";
import "./FAQ.css";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is the purpose of this project?",
      answer: "This project aims to create a web application that facilitates efficient data management and interaction for users.",
    },
    {
      question: "What technologies are used in this project?",
      answer: "The project uses React for the frontend, Node.js for the backend, and MongoDB for the database.",
    },
    {
      question: "How can I contribute to this project?",
      answer: "You can contribute by forking the repository, making changes, and submitting a pull request with your improvements.",
    },
    {
      question: "How do I set up the development environment for this project?",
      answer: "Clone the repository, install dependencies with `npm install`, and start the development server with `npm start`.",
    },
    {
      question: "Where can I find the project documentation?",
      answer: "Project documentation is available in the `README.md` file and the `docs` directory of the repository.",
    },
  ];

  return (
    <div className="faq-container">
      <h2>Project FAQs</h2>
      <p>
        If you have questions about the project, you can browse through the topics below or{" "}
        <a href="#" className="support-link">
          contact our team
        </a>
      </p>
      <input
        type="text"
        className="search-bar"
        placeholder="Search topics..."
      />

      <div className="faq-accordion">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
