import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportarPagoComponent } from './reportar-pago.component';

describe('ReportarPagoComponent', () => {
  let component: ReportarPagoComponent;
  let fixture: ComponentFixture<ReportarPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportarPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
