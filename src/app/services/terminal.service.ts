import { Injectable } from '@angular/core';
import { FileSystemService } from './file-system.service';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  constructor(private fileSystemService: FileSystemService) {}

  private readonly commands: Record<string, () => string | null> = {
    help: this.showHelp.bind(this),
    clear: this.clear.bind(this),
    ls: this.listDirectories.bind(this),
  };

  executeCommand(input: string): string | null {
    const [command] = input.split(' ');

    if (this.commands[command]) {
      return this.commands[command]();
    } else {
      return `Command not found: "${command}". Type 'help' for available commands.`;
    }
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
}
