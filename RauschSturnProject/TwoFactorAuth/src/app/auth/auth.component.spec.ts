import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { AuthComponent } from './auth.component';
import {HttpClientModule} from '@angular/common/http';
import { By } from '@angular/platform-browser';


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  const testForm = <NgForm>{
    value: {
        code: "123456",
        
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [HttpClientModule ,FormsModule],
      providers: [AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  

  });

  it('show show errorValue',() =>{
    expect(component.errorMessage).toBe('');
  
  })

  it('should verify button  click', () => {
    spyOn(component, 'onSubmit');
     let el = fixture.debugElement.query(By.css('.btnColor ')).nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalled();
});

it('should Cancel button  click', () => {
  spyOn(component, 'resetForm');
   let el = fixture.debugElement.query(By.css('.cancel ')).nativeElement.click();
  expect(component.resetForm).toHaveBeenCalled();
});

  it('show submit button',() =>{
    component.onSubmit(testForm);
    expect(component.submitCode).toBeTruthy();

  })

  it('Test submit code',() =>{
    component.submitCode(testForm);
    expect(component.service.postAuth(testForm.value)).toBeTruthy();
  })
 
  
  
});
