import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit after change of search field', fakeAsync(() => {
    const component = fixture.componentInstance;
    spyOn(component.search, 'emit');

    const nativeElement = fixture.nativeElement;
    const inputEl = nativeElement.querySelectorAll('input')[0];
    inputEl.value = 'cat';
    inputEl.dispatchEvent(new Event('input'));

    tick(300); // simulate debounce
    fixture.detectChanges();
    expect(component.search.emit).toHaveBeenCalled();
  }));

  it('should emit after change of filter field', fakeAsync(() => {
    const component = fixture.componentInstance;
    spyOn(component.filter, 'emit');

    const nativeElement = fixture.nativeElement;
    const inputEl = nativeElement.querySelectorAll('input')[1];
    inputEl.value = 'cat';
    inputEl.dispatchEvent(new Event('input'));

    tick(300); // simulate debounce
    fixture.detectChanges();
    expect(component.filter.emit).toHaveBeenCalled();
  }));
});
