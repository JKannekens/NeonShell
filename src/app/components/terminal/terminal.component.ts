import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileSystemNode, terminalFileSystem } from './fileSystem';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent implements OnInit {
  readonly PROMPT = 'user@neon-shell:~$ ';
  currentPath: string[] = ['root'];
  outputHistory: string[] = [];
  currentInput = '';
  isBootingUp = true;

  private readonly bootMessages = [
    'Neon Shell OS v1.0',
    'Initializing system...',
    'Loading kernel modules...',
    'Mounting file system...',
    'Checking network connection... [FAILED]',
    "Entering command mode. Type 'help' for a list of commands.",
    '\n',
  ];

  private readonly commands: Record<string, () => void> = {
    help: this.showHelp.bind(this),
    clear: this.clear.bind(this),
    ls: this.listDirectories.bind(this),
  };

  ngOnInit(): void {
    this.fakeBootSequence();
  }

  private fakeBootSequence(): void {
    let index = 0;
    const interval = setInterval(() => {
      this.outputHistory.push(this.bootMessages[index]);
      index++;
      if (index >= this.bootMessages.length) {
        clearInterval(interval);
        this.isBootingUp = false;
      }
    }, 10);
  }

  executeCommand(event: Event): void {
    event.preventDefault();
    if (this.isBootingUp) return;

    const input = this.currentInput.trim();
    if (!input) return;

    this.outputHistory.push(this.PROMPT + input);
    const [command] = input.split(' ');

    if (this.commands[command]) {
      this.commands[command]();
    } else {
      this.outputHistory.push(
        `Command not found: "${command}". Type 'help' for available commands.`
      );
    }

    this.currentInput = '';
    this.outputHistory.push('\n');
  }

  private showHelp(): void {
    this.outputHistory.push('Available commands:\n- help\n- clear\n- ls\n');
  }

  private clear(): void {
    this.outputHistory = [];
  }

  private listDirectories(): void {
    const folder = this.getCurrentDirectory();
    this.outputHistory.push(
      folder.children
        ? Object.keys(folder.children).join('  ')
        : 'No directories found.'
    );
  }

  private getCurrentDirectory(): FileSystemNode {
    return this.currentPath.reduce<FileSystemNode>((dir, sub) => {
      if (sub === 'root') return terminalFileSystem.root;
      if (dir.type === 'folder' && dir.children?.[sub]) {
        return dir.children[sub];
      }
      throw new Error(`Path not found: ${this.currentPath.join('/')}`);
    }, terminalFileSystem.root);
  }
}
