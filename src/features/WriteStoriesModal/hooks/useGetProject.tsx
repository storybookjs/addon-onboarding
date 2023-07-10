import { useEffect, useState } from "react";

import { Response } from "../../../types/response";
import dataJavascript from "../code/javascript";
import dataTypescript from "../code/typescript";
import { CodeSnippets } from "../code/types";

type Project = {
  language: "javascript" | "typescript";
  framework: {
    name: string;
  };
};

export function useGetProject() {
  const [project, setProject] = useState<{
    data: CodeSnippets | null;
    error: Error | null;
  }>({ data: null, error: null });

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetch("/project.json");
        const project: Response<Project> = await response.json();
        const data = project?.data?.language === "javascript" ? dataJavascript : dataTypescript;

        setProject({
          data,
          error: null,
        });
      } catch (e) {
        setProject({
          data: null,
          error: e,
        });
      }
    };
    getProject();
  }, []);

  return project;
}
