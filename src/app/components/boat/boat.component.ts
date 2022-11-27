import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { Boat } from 'src/app/models/boat/boat.model';
import { BoatService } from 'src/app/services/boat/boat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css']
})
export class BoatComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebuttondelete') closebuttondelete: any;

  form!: FormGroup;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  boats: Boat[];
  boatsPaginate: Boat[];
  boat_id: number | undefined
  current_boat: Boat | undefined;
  submitted = false;

  constructor(
    private boatService: BoatService, private router: Router, private formBuilder: FormBuilder
  ) {
    this.boats = new Array();
    this.boatsPaginate = new Array();
    this.boat_id = 0;
    this.refreshBoats();
  }


  get formControls() { return this.form?.controls; }

  /**
   * 
   */
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: [this.current_boat?.name, [Validators.required]],
      description: [this.current_boat?.description, [Validators.required]]

    });

    this.current_boat = new Boat();
    this.fetchData();
  }



  /**
   * 
   */
  public removeBoat() {
    this.boatService.delete(this.boat_id).subscribe({
      next: () => {
        this.closebuttondelete.nativeElement.click();
        this.fetchData();
      },
      error: err => {
        console.log(err);
      }
    });
  }
  /**
   * 
   */
  public updateBoat() {
    this.submitted = true;
    if (this.form?.invalid) {
      return;
    }

    this.boatService.update(this.boat_id, this.form.value).subscribe({
      next: () => {
        this.closebutton.nativeElement.click();
        this.submitted = false;
        this.fetchData();
      },
      error: err => {
        this.submitted = false;
        console.log(err);
      }
    });
  }

  /**
 * 
 */
  public createBoat() {
    this.submitted = true;
    if (this.form?.invalid) {
      return;
    }
    this.boatService.create(this.form.value).subscribe({
      next: () => {
        this.closebutton.nativeElement.click();
        this.submitted = false;
        this.fetchData();
      },
      error: err => {
        this.submitted = false;
        console.log(err);
      }
    });
  }
  /**
   * 
   * @param id 
   */
  public populateBoatId(id?: number) {
    this.boat_id = id;
    this.current_boat = this.boats.find(boat => boat.id === this.boat_id);
    this.form = this.formBuilder.group({
      name: [this.current_boat?.name, [Validators.required]],
      description: [this.current_boat?.description, [Validators.required]]

    });
  }

  /**
   * 
   */
  public resetCurrentBoat() {
    this.boat_id = 0;
    this.current_boat = new Boat();
    this.form = this.formBuilder.group({
      name: [this.current_boat?.name, [Validators.required]],
      description: [this.current_boat?.description, [Validators.required]]

    });
    this.submitted = false;
  }

  /**
   * 
   */
  refreshBoats() {
    if (this.boats && this.boats.length > 0) {
      this.boatsPaginate = this.boats
        .map((Boat, i) => ({ id: i + 1, ...Boat }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }

  /**
   * 
   * @param filedName 
   */
  diplayError(filedName: string) {
    return this.submitted && this.form.get(filedName)?.hasError('required') ? 'is-invalid' : '';
  }

  /**
   * 
   * @param event 
   */
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boats, event.previousIndex, event.currentIndex);

  }

  drop(event: Event) {
    alert(event)
    if (this.isDragDrop(event)) {
      moveItemInArray(this.boats, event.previousIndex, event.currentIndex);

    }
  }



  isDragDrop(object: any): object is CdkDragDrop<string[]> {
    return 'previousIndex' in object;
  }

  /**
  * 
  */
  private fetchData() {
    this.boatService.getAll().subscribe({
      next: data => {
        this.boats = data;
        if (this.boats) {
          this.boatsPaginate = this.boats;
          this.collectionSize = this.boats.length;
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

