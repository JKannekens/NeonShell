import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TerminalService } from '../../services/terminal.service';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent implements OnInit {
  prompt: string = '';
  outputHistory: string[] = [];
  currentInput = '';
  isBootingUp = true;

  constructor(private terminalService: TerminalService) {}

  private readonly bootMessages = [
    'Neon Shell OS v1.0',
    'Initializing system...',
    'Loading kernel modules...',
    'Mounting file system...',
    'Checking network connection... [FAILED]',
    "Entering command mode. Type 'help' for a list of commands.",
    '\n',
  ];

  ngOnInit(): void {
    this.fakeBootSequence();
    this.updatePrompt();
  }

  updatePrompt() {
    this.prompt = `user@neon-shell:${this.terminalService.getCurrentPath()}$`;
  }

  handleEnterKeyPressed(event: Event): void {
    event.preventDefault();
    if (this.isBootingUp || !this.currentInput) return;

    this.outputHistory.push(this.prompt + ' ' + this.currentInput);
    const output = this.terminalService.executeCommand(this.currentInput);

    if (output === null) {
      this.outputHistory = [];
    } else {
      this.outputHistory.push(output);
    }

    this.currentInput = '';
    this.outputHistory.push('\n');
    this.updatePrompt();
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
    }, 500);
  }
}
