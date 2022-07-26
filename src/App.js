import React,{useState} from 'react'
import './index.css'

function App() {
  const [quote, setQuote] = useState("");
  const [error, setError] =useState(null);
  const [isLoading,setIsLoading] = useState(false);

  const generateQuote= async () =>{

    setIsLoading(true)
    try{
      const response = await fetch('https://api.adviceslip.com/advice',{
        method: 'GET',
        headers:{
          Accept: 'application/json',
        }
      });

      if (!response.ok){
        throw new Error(`Error! status: ${response.status}`)
      }

      const result = await response.json();
      
      setQuote(result.slip.advice);
    }catch(error){
      setError(error.message);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200">
      <div className="w-96 bg-gray-100 shadow-2xl rounded text-center py-6">
        <h1 className="antialiased text-4xl">Click the button below to get some advices</h1>
        <button onClick={generateQuote} className=" bg-blue-200 hover:bg-blue-300 border-solid border-2 border-black p-2 my-8 rounded">Get advice</button>
        <h2 className="bg-red-100 text-2xl border-solid py-8 mx-auto px-4 rounded">{quote}</h2>
      </div>
    </div>
  )
}

export default App;
