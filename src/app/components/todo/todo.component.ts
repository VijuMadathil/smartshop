import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Todo {
  id?: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;
  newTodo: Todo;

  constructor(private afs: AngularFirestore) {
    this.todoCollectionRef = this.afs.collection<Todo>('todos');
    this.todo$ = this.todoCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Todo;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  ngOnInit(): void {
  }

  addTodo(todoDesc: string) {
    if (todoDesc && todoDesc.trim().length) {
      this.todoCollectionRef.add({ description: todoDesc, completed: false });
    }
  }

  updateTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).update({ completed: !todo.completed });
  }

  deleteTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).delete();
  }
}
