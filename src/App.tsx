import { useState } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAsyncFn } from "react-use";
import Markdown from "react-markdown";

const App = () => {
  const [typeInterface, setTypeInterface] = useState("");
  const [dataLength, setDataLength] = useState("5");
  const [data, setData] = useState("");
  const [{ loading }, getPrompt] = useAsyncFn(
    async (typeInterface: string, dataLength: string) => {
      const prompt = `generate a list of object in JSON with dummy data as per the type interface: \n \`\`\`json ${typeInterface} \`\`\` \n no description just the dummy data of length ${dataLength}`;
      const result = await genAI
        .getGenerativeModel({ model: "gemini-1.5-flash" })
        .generateContent(prompt);
      // const result = await model.generateContent(prompt);
      const response = result.response.text();
      setData(response);
    },
    []
  );

  if (!import.meta.env.VITE_GOOGLE_GEMINI_API_KEY)
    throw Error("No Gemini api key found!!");

  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GOOGLE_GEMINI_API_KEY
  );

  // useMount(() => {
  //   getPrompt("Once upon a time ...");
  // });

  return (
    <div className="main-containter">
      <div className="data-container">
        <Markdown>{loading ? "loading..." : data}</Markdown>
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
