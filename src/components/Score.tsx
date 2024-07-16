interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return <p className="text-xl text-slate-800 dark:text-white">Score: {score}</p>;
};

export default Score;
