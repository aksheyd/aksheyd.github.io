import { Project } from "./Projects";
import { Contribution } from "./Contributions";

export class FileNode {
  filename: string;
  parent: FileNode | undefined;
  data: Project | Contribution | undefined;
  children: FileNode[] = [];

  constructor(
    _filename: string,
    _parent: FileNode | undefined,
    _data: Project | Contribution | undefined,
  ) {
    this.filename = _filename;
    this.parent = _parent;
    this.data = _data;
  }
}
