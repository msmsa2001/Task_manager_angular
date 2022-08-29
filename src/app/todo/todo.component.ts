import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoFrom !: FormGroup;
  tasks : ITask [] = [];
  inprogress : ITask [] = [];
  done : ITask [] = [];
  updatedId !:any;
  isEditEnabled :boolean=false;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.todoFrom=this.formBuilder.group({
      TaskName :['',Validators.required]
    })
  }

  addTask(){
    this.tasks.push({
      description:this.todoFrom.value.TaskName,
      done:false
    });
    this.todoFrom.reset();
  }
  onEdit(item:ITask,i:number){
    this.todoFrom.controls['TaskName'].setValue(item.description);
    this.updatedId = i;
    this.isEditEnabled = true;
  }
  UpdateTask(){
    this.tasks[this.updatedId].description=this.todoFrom.value.TaskName;
    this.tasks[this.updatedId].done=false
    this.todoFrom.reset();
    this.updatedId=undefined;
    this.isEditEnabled=false;
  }
  deleteTask(i:number){
    this.tasks.splice(i,1);
  }
  deleteinprogress(i:number){
    this.inprogress.splice(i,1);
  }
  deleteindone(i:number){
    this.done.splice(i,1);
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
