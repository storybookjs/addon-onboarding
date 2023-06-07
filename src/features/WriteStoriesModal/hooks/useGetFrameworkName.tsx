// fetch project.json and read `framework.name` from it and return it

import { useEffect, useState } from "react";
import { Response } from "../../../types/response";

type Project = {
  language: "javascript" | "typescript";
  framework: {
    name: string;
  };
};

export function useGetProject() {
  const [project, setProject] = useState<Response<Project>>(null);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetch("/project.json");
        const json = await response.json();

        setProject({
          data: json,
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
