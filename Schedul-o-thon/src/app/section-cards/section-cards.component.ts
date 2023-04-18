import { Component,OnInit,ChangeDetectorRef,Inject } from '@angular/core';
import { SectionDataService } from '../shared/services/section-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-section-cards',
  templateUrl: './section-cards.component.html',
  styleUrls: ['./section-cards.component.scss']
})
export class SectionCardsComponent {
  data !: any[];
  // d=[
  //   {section_name:"2022 Aug Java A",strength:30,track:"Java",classroom:"Mysuru-Aug-2022-A",schedule:"link here",section_id:"A"},
  //   {section_name:"2022 Aug Java B",strength:30,track:"Java",classroom:"Mysuru-Aug-2022-B",schedule:"link here",section_id:"B"},
  //   {section_name:"2022 Aug Java A",strength:30,track:"Java",classroom:"Mysuru-Aug-2022-C",schedule:"link here",section_id:"C"},
  // ];

  constructor(private dataService: SectionDataService, 
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    private route:ActivatedRoute,
    private http:HttpClient,private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('sub_batch_id');
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
  onDelete(sectionId: number) {
    // Make a DELETE request to your backend API to delete the subbatch
    this.http.delete(`/api/del-section/${sectionId}`).subscribe(() => {
      // Remove the deleted subbatch from the data array
      this.data = this.data.filter(section => section.id !== sectionId);
    });
    window.location.reload();
    localStorage.setItem('snackbarData', JSON.stringify({
      message: 'Section Deleted',
      action: 'OK',
      duration: 5 * 1000 //seconds*1000
    }));
  }
}
