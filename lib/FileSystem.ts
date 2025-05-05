import { Project } from "./Projects";

export class FileNode {
    filename: string;
    parent: FileNode | undefined;
    data: Project | undefined;
    children: FileNode[] = [];

    constructor(_filename: string, _parent: FileNode | undefined, _data: Project | undefined) {
        this.filename = _filename;
        this.parent = _parent;
        this.data = _data;
    }
}

 