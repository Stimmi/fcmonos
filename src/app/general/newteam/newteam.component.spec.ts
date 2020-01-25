import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewteamComponent } from './newteam.component';

describe('NewteamComponent', () => {
  let component: NewteamComponent;
  let fixture: ComponentFixture<NewteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
