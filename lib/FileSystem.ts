import { Project } from "./Projects";
import { Contribution } from "./Contributions";
import { Model } from "./Models";

export class FileNode {
  filename: string;
  parent: FileNode | undefined;
  data: Project | Contribution | Model | undefined;
  children: FileNode[] = [];

  constructor(
    _filename: string,
    _parent: FileNode | undefined,
    _data: Project | Contribution | Model | undefined
  ) {
    this.filename = _filename;
    this.parent = _parent;
    this.data = _data;
  }
}
