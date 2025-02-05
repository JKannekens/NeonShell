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
    ];

    let index = 0;
    const interval = setInterval(() => {
      this.outputHistory.push(bootMessages[index]);
      index++;
      if (index >= bootMessages.length) {
        clearInterval(interval);
        this.isBootingUp = false;
      }
    }, 1000);
  }

  executeCommand() {
    if (!this.currentInput.trim() || this.isBootingUp) return;
    console.log(this.currentInput);
  }
}
