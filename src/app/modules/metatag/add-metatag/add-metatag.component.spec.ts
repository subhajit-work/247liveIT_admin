import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMetatagComponent } from './add-metatag.component';

describe('AddMetatagComponent', () => {
  let component: AddMetatagComponent;
  let fixture: ComponentFixture<AddMetatagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMetatagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMetatagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
