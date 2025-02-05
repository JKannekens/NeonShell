import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  imports: [FormsModule, CommonModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent {
  readonly PROMPT = 'user@neon-shell:~$ ';
  outputHistory: string[] = [];
  currentInput: string = '';
  isBootingUp = true;

  ngOnInit() {
    this.fakeBootSequence();
  }

  fakeBootSequence() {
    const bootMessages = [
      'Neon Shell OS v1.0',
      'Initializing system...',
      'Loading kernel modules...',
      'Mounting file system...',
      'Checking network connection... [FAILED]',
      "Entering command mode. Type 'help' for a list of commands.",
      '\n',
    ];

    let index = 0;
    const interval = setInterval(() => {
      this.outputHistory.push(bootMessages[index]);
      index++;
      if (index >= bootMessages.length) {
        clearInterval(interval);
        this.isBootingUp = false;
      }
    }, 10);
  }

  executeCommand(event: Event) {
    event.preventDefault();
    const input = this.currentInput.trim();
    if (!input || this.isBootingUp) return;

    this.outputHistory.push(this.PROMPT + input);
    const [command, ...args] = input.split(' ');

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

  private commands: { [key: string]: () => void } = {
    help: this.showHelp.bind(this),
    clear: this.clear.bind(this),
  };

  private showHelp() {
    this.outputHistory.push('Available commands:\n- help\n- clear\n');
  }

  private clear() {
    this.outputHistory = [];
  }
}
