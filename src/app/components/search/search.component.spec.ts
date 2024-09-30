import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { SearchComponent } from "./search.component"

describe('SearchComponent',()=>{
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  beforeEach(async()=>{
    await
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SearchComponent],
    }).compileComponents();
  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should emit value after debounceTime',fakeAsync(()=>{
    const emitSpy = jest.spyOn(component.searchChange,'emit');
    component.searchControl.setValue('test');
    tick(300);
    expect(emitSpy).toHaveBeenCalledWith('test');
  }));
  it('should not emit value before debounceTime',fakeAsync(()=>{
    const emitSpy = jest.spyOn(component.searchChange,'emit');
    component.searchControl.setValue('test');
    tick(200);
    expect(emitSpy).not.toHaveBeenCalled();
    tick(100);
    expect(emitSpy).toHaveBeenCalledWith('test');
  }))
})
