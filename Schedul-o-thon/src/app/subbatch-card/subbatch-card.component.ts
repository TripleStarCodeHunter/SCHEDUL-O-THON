import { Component,OnInit,ChangeDetectorRef,Inject } from '@angular/core';
import { SubbatchService } from '../shared/services/subbatch.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subbatch-card',
  templateUrl: './subbatch-card.component.html',
  styleUrls: ['./subbatch-card.component.scss']
})
export class SubbatchCardComponent {
  data !: any[];
  // d=[
  //   {sub_batch_name:"Java",size:20,location:"Mysuru", start_date:1-1-2023},
  //   {sub_batch_name:"Python",size:20,location:"Mysuru", start_date:1-1-2023},
  //   {sub_batch_name:"Big Data",size:20,location:"Mysuru", start_date:1-1-2023},
  //   {sub_batch_name:"Cloud Computing",size:20,location:"Mysuru", start_date:1-1-2023},
  //   {sub_batch_name:"C programming",size:20,location:"Mysuru", start_date:1-1-2023},
  //   {sub_batch_name:"Angular",size:20,location:"Mysuru", start_date:1-1-2023}
  // ];
  constructor(private dataService: SubbatchService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    private route:ActivatedRoute,private http:HttpClient,private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('fbatch_id');
  this.dataService.getData(id)
    .subscribe(data => {
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

  onDelete(subbatchId: number) {
    // Make a DELETE request to your backend API to delete the subbatch
    this.http.delete(`/api/del-sub/${subbatchId}`).subscribe(() => {
      // Remove the deleted subbatch from the data array
      this.data = this.data.filter(subbatch => subbatch.sub_batch_id !== subbatchId);
    });
    window.location.reload();
    localStorage.setItem('snackbarData', JSON.stringify({
      message: 'Subbatch Deleted',
      action: 'OK',
      duration: 5 * 1000 //seconds*1000
    }));
  }
}
