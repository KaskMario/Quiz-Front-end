import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavequizComponent } from './savequiz.component';

describe('SavequizComponent', () => {
  let component: SavequizComponent;
  let fixture: ComponentFixture<SavequizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavequizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavequizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
