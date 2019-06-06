import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipstricksComponent } from './tipstricks.component';

describe('TipstricksComponent', () => {
  let component: TipstricksComponent;
  let fixture: ComponentFixture<TipstricksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipstricksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipstricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
