interface OptionsProps {
  options: string[];
  selectedOption: string | null;
  correctAnswer: string;
  onOptionClick: (selectedOption: string) => void;
}

const Options: React.FC<OptionsProps> = ({
  options,
  selectedOption,
  correctAnswer,
  onOptionClick,
}) => {
  return (
    <div className="w-72 lg:w-80 flex flex-col gap-3">
      {options.map((option, index) => {
        let bgColorClass = "";
        if (selectedOption) {
          if (option === correctAnswer) {
            bgColorClass = "bg-green-500 text-white dark:text-white";
          } else if (option === selectedOption) {
            bgColorClass = "bg-red-500 text-white";
          }
        }

        return (
          <button
            key={index}
            disabled={!!selectedOption}
            onClick={() => onOptionClick(option)}
            className={`border rounded-lg text-start p-2 text-slate-800 dark:text-white ${bgColorClass}`}
          >
            {index + 1}. {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
