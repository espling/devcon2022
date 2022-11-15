type Props = {
  text: string;
  cb: () => void;
};

const LinkElement: React.FC<Props> = ({ text, cb }) => {
  return (
    <div
      className="mt-2 text-lg underline cursor-pointer underline-offset-4"
      onClick={() => cb()}
    >
      {text}
    </div>
  );
};

export default LinkElement;
