// TODO: maybe place this directly inside Image, since it's used only there for now?
export type ProjectName =
  | "sopra-banking-software"
  | "last-quest"
  | "solers-io"
  | "atelier-tote-bag";

export default function getProjectColor(project: ProjectName) {
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
