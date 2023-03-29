import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { SubbatchService } from '../shared/services/subbatch.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  constructor(private dataService: SubbatchService,private route:ActivatedRoute,private http:HttpClient,private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('fbatch_id');
  this.dataService.getData(id)
    .subscribe(data => {
      this.data = data;
    });
      
  }
  onDelete(subbatchId: number) {
    // Make a DELETE request to your backend API to delete the subbatch
    this.http.delete(`/api/del-sub/${subbatchId}`).subscribe(() => {
      // Remove the deleted subbatch from the data array
      this.data = this.data.filter(subbatch => subbatch.sub_batch_id !== subbatchId);
    });
    console.log("HELLO")
    window.location.reload();

  }
}
