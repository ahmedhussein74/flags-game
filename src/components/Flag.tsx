interface FlagProps {
  flagUrl: string;
}

const Flag: React.FC<FlagProps> = ({ flagUrl }) => {
  return <img src={flagUrl} className="w-72 lg:w-80 h-48 border" />;
};

export default Flag;
