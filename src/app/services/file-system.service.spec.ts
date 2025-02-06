import { TestBed } from '@angular/core/testing';

import { FileSystemService } from './file-system.service';

describe('FileSystemService', () => {
  let service: FileSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSystemService);
  });

  it('listDirectories should list all directories at the current path', () => {
    expect(service.listDirectories()).toBe('documents  logs');

    service.changeDirectory('documents');

    expect(service.listDirectories()).toBe('note.txt');
  });

  it('changeDirectory should change the current path', () => {
    expect(service.getCurrentPath()).toBe('/');

    service.changeDirectory('documents');

    expect(service.getCurrentPath()).toBe('/documents');
  });

  it('changeDirectory should return an error message if the directory does not exist', () => {
    expect(service.changeDirectory('non-existent-folder')).toBe(
      'cd: no such file or directory: non-existent-folder'
    );
  });

  it('changeDirectory should allow navigating up the directory tree', () => {
    service.changeDirectory('documents');

    expect(service.getCurrentPath()).toBe('/documents');

    service.changeDirectory('..');

    expect(service.getCurrentPath()).toBe('/');
  });

  it('changeDirectory should not allow navigating above the root directory', () => {
    service.changeDirectory('..');

    expect(service.getCurrentPath()).toBe('/');
  });
});
