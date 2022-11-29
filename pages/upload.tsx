import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import api from "@/lib/cache";
import clsx from "clsx";

type Props = {
  json: string;
};

const Upload: NextPage<Props> = ({ json }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textareaRef.current?.value ?? ""),
    });
  };

  useEffect(() => {
    if (!loading) return;
    const timeid = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeid);
  }, [loading]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen px-10 bg-slate-800 ">
      {loading && (
        <div
          className={clsx(
            "section-heading tracking-widest top-8 absolute left-1/2",
            [loading ? "animate-fade-in" : ""]
          )}
        >
          Saved
        </div>
      )}
      <form className="w-full">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <textarea
          disabled={loading}
          ref={textareaRef}
          id="message"
          defaultValue={json}
          rows={14}
          className="mb-4 block p-2.5 w-full text-sm h-full  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="json data..."
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          onClick={submitHandler}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const teams = await api.cache.get();
  return {
    // revalidate: REVALIDATE,
    props: { json: teams },
  };
};

export default Upload;
