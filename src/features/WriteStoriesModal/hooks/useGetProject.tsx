import { useEffect, useState } from "react";

import { Response } from "../../../types/response";
import dataJavascript from "../code/javascript";
import dataTypescript from "../code/typescript";
import dataTypescriptNextjs from "../code/nextjs-typescript";
import { CodeSnippets } from "../code/types";

type Project = {
  language: "javascript" | "typescript";
  framework: {
    name: string;
  };
};

const getDataPerFramework = ({
  frameworkName,
  isJavascript,
}: {
  frameworkName: string;
  isJavascript: boolean;
}) => {
  if (frameworkName === "@storybook/nextjs") {
    return isJavascript ? dataJavascript : dataTypescriptNextjs;
  } else {
    return isJavascript ? dataJavascript : dataTypescript;
  }
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
        const isJavascript = project?.data?.language === "javascript";

        const frameworkName = project?.data?.framework.name;

        setProject({
          data: getDataPerFramework({ frameworkName, isJavascript }),
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
