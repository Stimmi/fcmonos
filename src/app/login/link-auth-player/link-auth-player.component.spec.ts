import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAuthPlayerComponent } from './link-auth-player.component';

describe('LinkAuthPlayerComponent', () => {
  let component: LinkAuthPlayerComponent;
  let fixture: ComponentFixture<LinkAuthPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkAuthPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkAuthPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
