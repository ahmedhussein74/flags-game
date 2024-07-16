import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Flag from "./Flag";
import Options from "./Options";
import Score from "./Score";

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
}

const TOTAL_QUESTIONS = 10;

const CountryGame: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }, []);

  const setupGame = useCallback(() => {
    if (countries.length > 0 && questionCount < TOTAL_QUESTIONS) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      const selectedCountry = countries[randomIndex];

      const countryOptions: string[] = [];
      while (countryOptions.length < 3) {
        const randomOptionIndex = Math.floor(Math.random() * countries.length);
        const randomOption = countries[randomOptionIndex].name.common;
        if (
          !countryOptions.includes(randomOption) &&
          randomOption !== selectedCountry.name.common
        ) {
          countryOptions.push(randomOption);
        }
      }
      const correctAnswerIndex = Math.floor(Math.random() * 4);
      countryOptions.splice(correctAnswerIndex, 0, selectedCountry.name.common);

      setCurrentCountry(selectedCountry);
      setOptions(countryOptions);
      setSelectedOption(null);
    } else if (questionCount >= TOTAL_QUESTIONS) {
      setGameOver(true);
    }
  }, [countries, questionCount]);

  const handleOptionClick = (selectedOption: string) => {
    setSelectedOption(selectedOption);
    if (selectedOption === currentCountry?.name.common) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setQuestionCount(questionCount + 1);
      setupGame();
    }, 2000); // Delay to show if the answer is correct or not
  };

  const startGame = () => {
    setScore(0);
    setQuestionCount(0);
    setGameOver(false);
    setupGame();
  };

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    setupGame();
  }, [setupGame]);

  return (
    <section className="h-screen flex justify-center items-center">
      {gameOver ? (
        <div className="w-60 lg:w-72 mx-auto flex flex-col gap-3 text-xl">
          <h1 className="text-center text-slate-800 dark:text-white">
            Game Over
          </h1>
          <p className="text-center text-slate-800 dark:text-white">
            Your score: {score}
          </p>
          <button
            onClick={startGame}
            className="h-10 bg-blue-600 text-white rounded-lg"
          >
            Start Again
          </button>
        </div>
      ) : currentCountry ? (
        <div className="flex flex-col gap-3">
          <Flag flagUrl={currentCountry.flags.png} />
          <Score score={score} />
          <p className="text-xl text-slate-800 dark:text-white">
            Question {questionCount + 1} of {TOTAL_QUESTIONS}
          </p>
          <Options
            options={options}
            selectedOption={selectedOption}
            correctAnswer={currentCountry.name.common}
            onOptionClick={handleOptionClick}
          />
        </div>
      ) : (
        <h1>Waiting</h1>
      )}
    </section>
  );
};

export default CountryGame;
