type Props = {
  text: string;
  id?: string;
  cb: () => void;
};

const LinkElement: React.FC<Props> = ({ text, cb, id }) => {
  return (
    <div
      role="link"
      id={id ?? ""}
      className="mt-2 text-lg underline cursor-pointer underline-offset-4 link-underline font-joystix"
      onClick={() => cb()}
    >
      {text}
    </div>
  );
};

export default LinkElement;
