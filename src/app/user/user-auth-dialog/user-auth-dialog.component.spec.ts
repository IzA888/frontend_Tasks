import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthDialogComponent } from './user-auth-dialog.component';

describe('UserAuthDialogComponent', () => {
  let component: UserAuthDialogComponent;
  let fixture: ComponentFixture<UserAuthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuthDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
