import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { vi } from 'vitest';
import { ApiService } from '../../core/api.service';
import { ToastService } from '../../core/toast.service';
import { RefundApprovalComponent } from './refund-approval.component';

describe('RefundApprovalComponent', () => {
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
        {
          id: 'refund-1',
          order_id: 'order-1',
          seller_name: 'Seller A',
          amount_cents: 25001,
          reason: 'damaged item',
          status: 'pending',
          requires_admin_approval: true,
          created_at: new Date().toISOString(),
        },
      ],
    });
    apiPost.mockResolvedValue({});

    await TestBed.configureTestingModule({
      imports: [RefundApprovalComponent, NoopAnimationsModule],
      providers: [
        { provide: ApiService, useValue: { get: apiGet, post: apiPost } },
        { provide: ToastService, useValue: { success: toastSuccess, error: toastError } },
      ],
    }).compileComponents();
  });

  it('loads refunds on init', async () => {
    const fixture = TestBed.createComponent(RefundApprovalComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    expect(apiGet).toHaveBeenCalledWith('/api/admin/refunds');
    expect(component.items().length).toBe(1);
  });

  it('requires decision note before approve/reject', async () => {
    const fixture = TestBed.createComponent(RefundApprovalComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    await component.decide(component.items()[0], true);

    expect(apiPost).not.toHaveBeenCalled();
    expect(toastError).toHaveBeenCalledWith('A decision note is required.');
  });

  it('posts approval decision and refreshes list', async () => {
    const fixture = TestBed.createComponent(RefundApprovalComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    const item = component.items()[0];
    component.notes[item.id] = 'Approved by admin';
    await component.decide(item, true);

    expect(apiPost).toHaveBeenCalledWith('/api/refunds/refund-1/approve', { approve: true, note: 'Approved by admin' });
    expect(toastSuccess).toHaveBeenCalledWith('Refund approved');
  });
});
