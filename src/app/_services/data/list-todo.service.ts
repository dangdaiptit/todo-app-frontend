import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const TODO_API = environment.baseUrl + 'api/todos/';

@Injectable({
  providedIn: 'root',
})
export class ListTodoService {
  baseUrl = environment.baseUrl + 'api/todos/';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  saveTodo(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateTodo(data: any, id: number) {
    return this.http.put<any>(this.baseUrl + id, data);
  }
  deleteTodo(id: number) {
    return this.http.delete<any>(this.baseUrl + id);
  }
}
