import { useEffect, useState } from "react";
import { Response } from "../../../types/response";

export function useGetButtonPath() {
  const [buttonPath, setButtonPath] = useState<Response<string>>(null);

  useEffect(() => {
    const getButtonPath = async () => {
      try {
        const response = await fetch("/index.json");
        const json = await response.json();
        const buttonPath = json.entries["example-button--primary"].importPath;
        setButtonPath({
          data: buttonPath,
          error: null,
        });
      } catch (e) {
        console.log({ e });
        setButtonPath({
          data: null,
          error: e,
        });
      }
    };
    getButtonPath();
  }, []);

  return buttonPath;
}
