import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../shared/services/event.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent {
  data!: any[];
  constructor(
    private dataService: EventService,
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,

  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataService.getData(id).subscribe((data) => {
      this.data = data;
    });
    const snackbarData = localStorage.getItem('snackbarData');
      if (snackbarData) {
        // Display snackbar
        this._snackBar.open(JSON.parse(snackbarData).message, JSON.parse(snackbarData).action, {
          duration: JSON.parse(snackbarData).duration
        });
        
        // Remove snackbar data from localStorage
        localStorage.removeItem('snackbarData');
      }
  }

  onDelete(id: number) {
    // Make a DELETE request to your backend API to delete the event
    this.http
      .delete(`http://localhost:3000/api/del-event/${id}`)
      .subscribe((response) => {
        this.data = this.data.filter(event => event.id !== id);
      });
      window.location.reload();
    localStorage.setItem('snackbarData', JSON.stringify({
      message: 'Event Deleted',
      action: 'OK',
      duration: 5 * 1000 //seconds*1000
    }));
  }
}
