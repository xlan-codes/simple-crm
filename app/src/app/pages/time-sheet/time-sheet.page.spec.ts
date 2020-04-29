import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeSheetPage } from './time-sheet.page';

describe('TimeSheetPage', () => {
  let component: TimeSheetPage;
  let fixture: ComponentFixture<TimeSheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
