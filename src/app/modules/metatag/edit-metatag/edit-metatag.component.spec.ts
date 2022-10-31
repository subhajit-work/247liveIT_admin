import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMetatagComponent } from './edit-metatag.component';

describe('EditMetatagComponent', () => {
  let component: EditMetatagComponent;
  let fixture: ComponentFixture<EditMetatagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMetatagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMetatagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
