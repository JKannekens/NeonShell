export type FileSystemNode = {
  type: 'file' | 'folder';
  content?: string;
  children?: Record<string, FileSystemNode>;
};

export type TerminalFileSystem = {
  root: FileSystemNode;
};

export const terminalFileSystem: TerminalFileSystem = {
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
