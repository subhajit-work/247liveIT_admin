import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetatagComponent } from './metatag.component';

describe('MetatagComponent', () => {
  let component: MetatagComponent;
  let fixture: ComponentFixture<MetatagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetatagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetatagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
