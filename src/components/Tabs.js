import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tabs.css";

const Tabs = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("presentation");

  useEffect(() => {
    axios
      .get("/assets/data.json")
      .then((response) => setData(response.data.data.items.transcript_data))
      .catch((error) => console.error("Error loading the data:", error));
  }, []);

  if (
    !data ||
    !data.presentation ||
    !data.questions_and_answers ||
    !data.participants
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tabs">
      <div className="tab-list">
        <button
          onClick={() => setActiveTab("presentation")}
          className={activeTab === "presentation" ? "active" : ""}
        >
          Presentation
        </button>
        <button
          onClick={() => setActiveTab("questions_and_answers")}
          className={activeTab === "questions_and_answers" ? "active" : ""}
        >
          Q&A
        </button>
        <button
          onClick={() => setActiveTab("executives")}
          className={activeTab === "executives" ? "active" : ""}
        >
          Corporate Participants
        </button>
        <button
          onClick={() => setActiveTab("analysts")}
          className={activeTab === "analysts" ? "active" : ""}
        >
          Conference Call Participants
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "presentation" && (
          <div>
            {data.presentation.map((item, index) => (
              <div key={index}>
                <h3>
                  {item.participant_name} ({item.participant_designation},{" "}
                  {item.participant_company})
                </h3>
                {item.transcript_data.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            ))}
          </div>
        )}
        {activeTab === "questions_and_answers" && (
          <div>
            {data.questions_and_answers.map((item, index) => (
              <div key={index}>
                <h3>
                  {item.participant_name} ({item.designation}, {item.company})
                </h3>
                {item.transcript_data.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            ))}
          </div>
        )}
        {activeTab === "executives" && (
          <div>
            {data.participants.executives.map((exec, index) => (
              <div key={index}>
                <h3>{exec.name}</h3>
                <p>
                  {exec.designation}, {exec.company}
                </p>
              </div>
            ))}
          </div>
        )}
        {activeTab === "analysts" && (
          <div>
            {data.participants.analyst.map((analyst, index) => (
              <div key={index}>
                <h3>{analyst.name}</h3>
                <p>
                  {analyst.designation}, {analyst.company}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
