import { useState } from "react";
import axios from "axios";

const API_KEY = "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"; // Replace with your actual OpenAI API key

function CoverNote() {
  const [candidateSummary, setCandidateSummary] = useState('');
  const [jobText, setJobText] = useState('');

  const handleCandidateSummaryChange = (event) => {
    setCandidateSummary(event.target.value);
  };

  const handleJobDescriptionChange = (event) => {
    setJobText(event.target.value);
  };

  const handleClick = () => {
    //console.log('Candidate Text:', candidateSummary);
    //console.log('Job Text:', jobText);
  };

  const testing = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional cover letter writer and specialise in tailoring cover letters to job descriptions" },
        { role: "system", content: "you will be given two prompts, one will be a summary of the candidate and then the job description. Use the information of the candidate to create a cover letter tailored to the job description. maximum 2 paragraphs" },
        { role: "system", content: "Here's the candidate summary: "+candidateSummary+" Here's the job description: "+jobText},
        // { role: "user", content: "Candidate: Himansh Kohli - final year student studying computer science and AI at AUT. has professional experience in software engineering through an internship at Soul Machines. Has experience in penetration testing through a university capstone project for the company Cyber Forensics Ltd. Here's the job description: A growing cloud-based software start-up is looking for a Graduate Fullstack C#.Net Software Engineer?Do you enjoy learning? Love solving problems? Work on building new features & functionality across the microsoft windows stack - C#.Net, Blazor, ASP.Net, Xamarin?What you’ll bring:BEng Software Engineering or BSc Computer Science or similar degree0-6 months commercial internship experience in codingBasic C#.Net coding experienceAny experience of ASP.Net, JavaScript, Blazor or Xamarin a bonusEnjoy building stuff & solving technical problemsBe a team player who can contribute new ideas to achieve team goals & outcomesWhat you’ll get:Opportunity to be part of a growing cloud-based software start-upModern offices + choose your workstation + training + great coffee + well stocked fridge + occasional free lunchesTickets to music events / gigs / festivals / theatre / sportsGet in touch with Paul for this unique opportunity to be part of building an exciting new product platform in a growing cloud-based start-up that has lots of customers already & is scaling" },
      ]
    };

    axios
      .post("https://api.openai.com/v1/chat/completions", data, { headers })
      .then((response) => {
        console.log(response.data.choices[0].message.content);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <label>Talk about yourself: </label>
      <input type="text" value={candidateSummary} onChange={handleCandidateSummaryChange} />
      <br></br>
      <label>Paste the job description here: </label>
      <input type="text" value={jobText} onChange={handleJobDescriptionChange} />
      <button onClick={handleClick}>Generate</button>
    </div>
  );
}

export default CoverNote;
