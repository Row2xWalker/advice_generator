import React, { useState } from "react";
import "./index.css";

function App() {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setQuote(result.slip.advice);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="flex items-center justify-center min-h-screen bg-blue-100">
      <div class="bg-white w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 md:p-8 rounded-lg shadow-lg text-center">
        <h1 class="text-2xl md:text-3xl font-semibold mb-2 md:mb-4 text-blue-600">
          Unexpected Delight
        </h1>
        <p class="mb-4 md:mb-6">
          Click the button to receive insightful advice.
        </p>
        <button
          onClick={generateQuote}
          class=" bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none"
        >
          Get Advice
        </button>
        {isLoading ? (
          <div class="mt-6 md:mt-8">
            <div class="bg-blue-100 p-2 md:p-4 rounded-lg">
              <div class="animate-pulse">
                <div class="bg-blue-300 h-4 mb-2 rounded-md"></div>
                <div class="bg-blue-200 h-4 rounded-md"></div>
              </div>
            </div>
          </div>
        ) : (
          quote && (
            <div class="mt-6 md:mt-8">
              <div class="bg-blue-100 p-2 md:p-4 rounded-lg">
                <p class="text-sm md:text-base">{quote}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
