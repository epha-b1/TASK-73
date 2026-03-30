import { TestBed } from '@angular/core/testing';
import { convertToParamMap } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { vi } from 'vitest';
import { ApiService } from '../../core/api.service';
import { ToastService } from '../../core/toast.service';
import { PaymentCaptureComponent } from './payment-capture.component';

describe('PaymentCaptureComponent', () => {
  const apiGet = vi.fn();
  const apiPost = vi.fn();
  const toastSuccess = vi.fn();
  const toastError = vi.fn();

  beforeEach(async () => {
    apiGet.mockReset();
    apiPost.mockReset();
    toastSuccess.mockReset();
    toastError.mockReset();

    apiGet.mockResolvedValue({
      items: [
        { id: 'order-1', listingTitle: 'Apples', totalCents: 2200, status: 'placed' },
        { id: 'order-2', listingTitle: 'Honey', totalCents: 1450, status: 'placed' },
      ],
    });
    apiPost.mockResolvedValue({});

    await TestBed.configureTestingModule({
      imports: [PaymentCaptureComponent, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap({ orderId: 'order-2' }) } } },
        { provide: ApiService, useValue: { get: apiGet, post: apiPost } },
        { provide: ToastService, useValue: { success: toastSuccess, error: toastError } },
      ],
    }).compileComponents();
  });

  it('loads placed orders and picks query-selected order', async () => {
    const fixture = TestBed.createComponent(PaymentCaptureComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    expect(apiGet).toHaveBeenCalledWith('/api/orders?status=placed');
    expect(component.orders().length).toBe(2);
    expect(component.form.controls.orderId.value).toBe('order-2');
    expect(component.form.controls.amountCents.value).toBe(1450);
  });

  it('captures payment and shows success toast', async () => {
    const fixture = TestBed.createComponent(PaymentCaptureComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    component.form.patchValue({ orderId: 'order-1', amountCents: 2200, tenderType: 'cash', transactionKey: 'txn-abc' });
    await component.submit();

    expect(apiPost).toHaveBeenCalledWith('/api/payments/capture', {
      orderId: 'order-1',
      amountCents: 2200,
      tenderType: 'cash',
      transactionKey: 'txn-abc',
    });
    expect(toastSuccess).toHaveBeenCalledWith('Payment captured');
    expect(component.error()).toBeNull();
  });

  it('sets error when capture fails', async () => {
    const fixture = TestBed.createComponent(PaymentCaptureComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    apiPost.mockRejectedValueOnce({ error: { message: 'Capture denied' } });
    component.form.patchValue({ orderId: 'order-1', amountCents: 2200, tenderType: 'cash', transactionKey: 'txn-fail' });
    await component.submit();

    expect(component.error()).toBe('Capture denied');
    expect(toastError).toHaveBeenCalledWith('Capture denied');
  });
});
