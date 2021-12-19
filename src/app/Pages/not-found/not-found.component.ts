import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  currentId!:number
  msg:string ='The page you are looking does not exist or other error occurred'

  constructor(private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => this.currentId = params['id'])
  }

}
