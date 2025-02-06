import { Injectable } from '@angular/core';

type FileSystemNode = {
  type: 'file' | 'folder';
  content?: string;
  children?: Record<string, FileSystemNode>;
};

type TerminalFileSystem = {
  root: FileSystemNode;
};

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  constructor() {}

  private currentPath: string[] = ['root'];
  private terminalFileSystem: TerminalFileSystem = {
    root: {
      type: 'folder',
      children: {
        documents: {
          type: 'folder',
          children: {
            'note.txt': {
              type: 'file',
              content: "Welcome to Neon Shell! Type 'help' for commands.",
            },
          },
        },
        logs: {
          type: 'folder',
          children: {
            'log1.txt': {
              type: 'file',
              content: 'System booted successfully.',
            },
          },
        },
      },
    },
  };

  public listDirectories(): string {
    const folder = this.getCurrentDirectory();
    return folder.children
      ? Object.keys(folder.children).join('  ')
      : 'No directories found.';
  }

  private getCurrentDirectory(): FileSystemNode {
    return this.currentPath.reduce<FileSystemNode>((dir, sub) => {
      if (sub === 'root') return this.terminalFileSystem.root;
      if (dir.type === 'folder' && dir.children?.[sub]) {
        return dir.children[sub];
      }
      throw new Error(`Path not found: ${this.currentPath.join('/')}`);
    }, this.terminalFileSystem.root);
  }
}
