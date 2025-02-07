import { Injectable } from '@angular/core';
import { FileSystemService } from './file-system.service';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  constructor(private fileSystemService: FileSystemService) {}

  private readonly commands: Record<
    string,
    (...args: string[]) => string | null
  > = {
    help: this.showHelp.bind(this),
    clear: this.clear.bind(this),
    ls: this.listDirectories.bind(this),
    cd: this.changeDirectory.bind(this),
    cat: this.readFile.bind(this),
  };

  executeCommand(input: string): string | null {
    const [command, ...args] = input.split(' ');

    if (this.commands[command]) {
      return this.commands[command](...args);
    } else {
      return `Command not found: "${command}". Type 'help' for available commands.`;
    }
  }

  getCurrentPath(): string {
    return this.fileSystemService.getCurrentPath();
  }

  private showHelp(): string {
    return 'Available commands:\n- help\n- clear\n- ls\n';
  }

  private clear(): null {
    return null;
  }

  private listDirectories(): string {
    return this.fileSystemService.listDirectories();
  }

  private changeDirectory(path: string): string {
    if (!path) return 'Usage: cd <folder_name>';
    return this.fileSystemService.changeDirectory(path);
  }

  private readFile(fileName: string): string {
    if (!fileName) return 'Usage: cat <file_name>';
    return this.fileSystemService.readFile(fileName);
  }
}
