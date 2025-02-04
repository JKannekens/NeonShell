import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  imports: [FormsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss',
})
export class TerminalComponent {
  @ViewChild('terminalInput') textAreaRef!: ElementRef<HTMLTextAreaElement>;
  currentInput: string = '';
  cursorPosition = 0;

  executeCommand() {
    console.log(this.currentInput);
  }
}
