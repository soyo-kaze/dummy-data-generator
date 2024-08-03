import { useState } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAsyncFn } from "react-use";
import { CopyBlock, dracula } from "react-code-blocks";

// Then register the languages you need

const App = () => {
  const [typeInterface, setTypeInterface] = useState("");
  const [dataLength, setDataLength] = useState("5");
  const [data, setData] = useState("");

  const [{ loading }, getPrompt] = useAsyncFn(
    async (typeInterface: string, dataLength: string) => {
      const prompt = `generate a list of object in javascript with dummy data as per the type interface: \n \`\`\`json ${typeInterface}  \`\`\` \n no description just the dummy data of length ${dataLength} given that it's shown as plain text strictly without triple backticks language tags as I want only the code formatted with newlines and well indented where tab is 4`;
      const result = await genAI
        .getGenerativeModel({ model: "gemini-1.5-flash" })
        .generateContent(prompt);
      const response = result.response.text().split("/n").join("");
      console.log(response, result.response.text());
      setData(response);
    },
    []
  );

  if (!import.meta.env.VITE_GOOGLE_GEMINI_API_KEY)
    throw Error("No Gemini api key found!!");

  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GOOGLE_GEMINI_API_KEY
  );

  return (
    <div className="main-containter">
      <div className="data-container">
        {loading ? (
          "loading..."
        ) : (
          <CopyBlock
            text={data || "// dummy data here!! "}
            language="json"
            showLineNumbers
            codeBlock
            onCopy={() => alert("code copied")}
            theme={dracula}
            customStyle={{
              maxHeight: "90vh",
              height: "100%",
              overflow: "auto",
            }}
          />
        )}
      </div>
      <div className="form-container">
        <textarea
          value={typeInterface}
          cols={30}
          rows={20}
          onChange={(e) => setTypeInterface(e.target.value)}
        />
        <input
          value={dataLength}
          type="number"
          onChange={(e) => setDataLength(e.target.value)}
        />
        <button onClick={() => getPrompt(typeInterface, dataLength)}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default App;
