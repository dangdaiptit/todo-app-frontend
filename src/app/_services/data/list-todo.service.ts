import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TODO_API = 'http://localhost:8080/api/todos/';

@Injectable({
  providedIn: 'root',
})
export class ListTodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get<any>(TODO_API);
  }

  saveTodo(data: any) {
    return this.http.post<any>(TODO_API, data);
  }

  updateTodo(data: any, id: number) {
    return this.http.put<any>(TODO_API + id, data);
  }
  deleteTodo(id: number) {
    return this.http.delete<any>(TODO_API + id);
  }
}
