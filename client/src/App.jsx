import { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const handleFile = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return null;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4200/recognize", { file });
      console.log(res.data);
      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black text-white h-screen flex flex-col gap-4 items-center justify-center">
      <input type="file" onChange={handleFile} />
      <button type="submit">Submit</button>
      {/* {result && result.text && <p>{result.text}</p>} */}
    </form>
  );
};

export default App;
