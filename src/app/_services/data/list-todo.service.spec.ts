import { TestBed } from '@angular/core/testing';

import { ListTodoService } from './list-todo.service';

describe('ListTodoService', () => {
  let service: ListTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
