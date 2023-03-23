// import { Component,OnInit } from '@angular/core';
// import { DataService } from '../shared/services/data-service.service';
// import { ActivatedRoute} from '@angular/router';
// @Component({
//   selector: 'app-batch-card',
//   templateUrl: './batch-card.component.html',
//   styleUrls: ['./batch-card.component.scss']
// })
// export class BatchCardComponent {
//   data !: any[];
//   message:String;
//   // d=[
//   //   {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-08-18"},
//   //   {batch_name:"2022 May - Data Analytics and Data Science",subbatch_count:10,batch_size:180,location:"Noida",start_date:"2022-05-18"},
//   //   {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-01-18"},
//   //   {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-01-18"},
//   //   {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-01-18"}
//   // ];

//   constructor(private dataService: DataService,private route:ActivatedRoute) { 
//     this.message="batch deleted";
//   }

//   ngOnInit() {
//     const id = this.route.snapshot.paramMap.get('batch_id');
//     console.log(id);
//     this.dataService.getData()
//       .subscribe(data => {
//         this.data = data;
//       });
//   }

//   deletebatch(): void {
    
//     this.dataService.deletebatch(parseInt(this.route.snapshot.paramMap.get('batch_id')||""))
//       .subscribe(
//         response => {
//           this.message = response;
//         },
//         error => {
//           console.error(error);
//         }
//       );
//   }
// } 

import { Component,OnInit } from '@angular/core';
import { DataService } from '../shared/services/data-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-batch-card',
  templateUrl: './batch-card.component.html',
  styleUrls: ['./batch-card.component.scss']
})
export class BatchCardComponent {
  data !: any[];
  message: string;
  // d=[
  //   {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-08-18"},
  //   {batch_name:"2022 May - Data Analytics and Data Science",subbatch_count:10,batch_size:180,location:"Noida",start_date:"2022-05-18"},
  //   {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-01-18"},
  //   {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-01-18"},
  //   {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-01-18"}
  // ];

  constructor(private dataService: DataService,private route:ActivatedRoute) {
    this.message = "batch deleted"
   }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('batch_id');
    console.log(id);
    
    this.dataService.getData()
      .subscribe(data => {
        this.data = data;
      });
  }

  deletebatch(): void {

 console.log(this.route.snapshot.paramMap.get('batch_id'))
    this.dataService.deletebatch(parseInt(this.route.snapshot.paramMap.get('batch_id')!))
      .subscribe(
        response => {
          this.message = response;
        },
        error => {
          console.error(error);
        }
      );
  }

} 