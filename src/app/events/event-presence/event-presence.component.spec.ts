import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPresenceComponent } from './event-presence.component';

describe('EventPresenceComponent', () => {
  let component: EventPresenceComponent;
  let fixture: ComponentFixture<EventPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
