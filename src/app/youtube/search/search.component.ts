import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string>();

  searchForm = this.formBuilder.group({
    search: [''],
    filter: [''],
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.searchForm.controls.search.valueChanges.pipe(
        debounceTime(300),
        filter(query => query.length > 2),
        startWith(this.searchForm.controls.search.value),
      ).subscribe(query => this.search.emit(query)),

      this.searchForm.controls.filter.valueChanges.pipe(
        startWith(this.searchForm.controls.filter.value),
      ).subscribe(query => this.filter.emit(query))
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
