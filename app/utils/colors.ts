import { ProjectName } from "../types";

export default function getProjectColor(projectName?: ProjectName) {
  const projectNameFromUrl = window.location.pathname
    .replace("/", "")
    .replace(".html", "") as ProjectName;

  const project = projectName ?? projectNameFromUrl;

  switch (project) {
    case "sopra-banking-software":
      return "#800073";
    case "last-quest":
      return "#ca7d02";
    case "solers-io":
      return "#53389d";
    case "atelier-tote-bag":
      return "#c9bba6";
    default:
      return "#555555";
  }
}
