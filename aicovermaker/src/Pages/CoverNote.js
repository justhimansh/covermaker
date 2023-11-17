import { useState } from "react";
import axios from "axios";
import './styles/buttonstyle.scss';

const API_KEY = process.env.REACT_APP_OPENAI_KEY; // Replace with your actual OpenAI API key

function CoverNote() {


  console.log("here is codes" + API_KEY)
  const [candidateSummary, setCandidateSummary] = useState('');
  const [jobText, setJobText] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false); // Track whether text is generated

  const handleCandidateSummaryChange = (event) => {
    setCandidateSummary(event.target.value);
  };

  const handleJobDescriptionChange = (event) => {
    setJobText(event.target.value);
  };

  const handleClick = async () => {
    console.log('Candidate Text:', candidateSummary);
    console.log('Job Text:', jobText);
    setIsLoading(true);
    await testing();
    setIsLoading(false);
    setIsGenerated(true); // Set isGenerated to true after generating text
  };

  const handleCopyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = generatedLetter;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const testing = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional cover letter writer and specialize in tailoring cover letters to job descriptions" },
        { role: "system", content: "you will be given two prompts, one will be a summary of the candidate and then the job description. Use the information of the candidate to create a cover letter tailored to the job description" },
        { role: "user", content: "Here is the candidate: " + candidateSummary + ". Here is the job description: " + jobText },
      ]
    };

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", data, { headers });
      const generatedText = response.data.choices[0].message.content;
      setGeneratedLetter(generatedText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="wrapper">
      <label className="label">Write a paragraph about yourself: </label>
      <textarea
        className="inputstuff"
        value={candidateSummary}
        onChange={handleCandidateSummaryChange}
        style={{ height: "auto" }}
      />
      <br />
      <label className="label">Paste the job description here: </label>
      <textarea
        className="inputstuff"
        value={jobText}
        onChange={handleJobDescriptionChange}
        style={{ height: "auto" }}
      />
      <div className="wrapper">
        <a className="box__link button-animation submitbutton" href="#" onClick={handleClick}>
          Submit
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </a>
        
      </div>

      <div className="output">
        {isLoading ? <h3 className="letter">gimmie a sec...</h3> : (
          <>
            <h3 className="mid letter" style={{ whiteSpace: "pre-line", display: "flex", justifyContent: "center", alignItems: "center" }}>{generatedLetter}</h3>
            {isGenerated && <button className="copy" onClick={handleCopyToClipboard}>Copy to Clipboard</button>}
          </>
        )}
      </div>
    </div>
  );
}

export default CoverNote;
