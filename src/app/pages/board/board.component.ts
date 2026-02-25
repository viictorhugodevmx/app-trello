import { Component } from '@angular/core';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { signal } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  columns = signal([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 1, title: 'Tarea 1' },
        { id: 2, title: 'Tarea 2' }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: 3, title: 'Tarea 3' }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 4, title: 'Tarea 4' }
      ]
    }
  ]);

  get connectedLists(): string[] {
    return this.columns().map(c => c.id);
  }

  addTask(columnId: string, title: string) {
    if (!title.trim()) return;

    const cols = this.columns();

    const column = cols.find(c => c.id === columnId);
    if (!column) return;

    const newTask = {
      id: Date.now(),
      title
    };

    column.tasks.push(newTask);

    this.columns.update(c => [...c]);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Forzar actualización del signal
    this.columns.update(cols => [...cols]);
  }

}
