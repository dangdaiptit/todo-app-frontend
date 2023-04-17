import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TODO_API = 'http://localhost:8080/api/todos/';
const token = localStorage.getItem('token');
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

@Injectable({
  providedIn: 'root'
})
export class ListTodoService {
  // private todosUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(TODO_API, { headers });
  }

  saveTodo(data: any) {
    return this.http.post<any>(TODO_API, data, { headers });
  }

  updateTodo(data: any, id: number) {
    return this.http.put<any>(TODO_API + id, data, { headers });
  }
  deleteTodo(id: number) {
    return this.http.delete<any>(TODO_API + id, { headers });
  }


}
