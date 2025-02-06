import { TestBed } from '@angular/core/testing';
import { TerminalService } from './terminal.service';
import { FileSystemService } from './file-system.service';

describe('TerminalService', () => {
  let service: TerminalService;
  let fileSystemService: FileSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalService);
    fileSystemService = TestBed.inject(FileSystemService);
  });

  it('getCurrentPath should call FileSystemService.getCurrentPath', () => {
    const getCurrentPathSpy = spyOn(fileSystemService, 'getCurrentPath');
    service.getCurrentPath();
    expect(getCurrentPathSpy).toHaveBeenCalled();
  });

  it('executeCommand should call FileSystemService.listDirectories if the command is "ls"', () => {
    const listDirectoriesSpy = spyOn(fileSystemService, 'listDirectories');
    service.executeCommand('ls');
    expect(listDirectoriesSpy).toHaveBeenCalled();
  });

  it('executeCommand should call FileSystemService.changeDirectory if the command is "cd"', () => {
    const changeDirectorySpy = spyOn(fileSystemService, 'changeDirectory');
    service.executeCommand('cd');
    expect(changeDirectorySpy).toHaveBeenCalled();
  });

  it('executeCommand should return null if the command is "clear"', () => {
    expect(service.executeCommand('clear')).toBeNull();
  });

  it('executeCommand should return a help message if the command is "help"', () => {
    expect(service.executeCommand('help')).toBe(
      'Available commands:\n- help\n- clear\n- ls\n'
    );
  });

  it('should return error for unknown command', () => {
    expect(service.executeCommand('unknowncmd')).toBe(
      'Command not found: "unknowncmd". Type \'help\' for available commands.'
    );
  });
});
