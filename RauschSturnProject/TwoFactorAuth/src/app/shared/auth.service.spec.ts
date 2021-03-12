import { TestBed,inject } from '@angular/core/testing';
import {HttpClientTestingModule,HttpTestingController} from "@angular/common/http/testing";
import { Auth } from './auth.model';
import { AuthService } from './auth.service';

describe("AuthService", () => {
    let httpTestingController: HttpTestingController;
    let authService: AuthService;
    let baseUrl = "https://localhost:44318/api/Auth";
    let auth: Auth;
   
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
   
      httpTestingController = TestBed.get(HttpTestingController);
      auth = {
        code: "123456",
        };
    });
   
    beforeEach(inject(
      [AuthService],
      (service: AuthService) => {
        authService = service;
      }
    ));

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });

    it("should call POST API to send code", () => {
        authService.postAuth(auth).subscribe();
        let req = httpTestingController.expectOne({ method: "POST", url: baseUrl });
        expect(req.request.body).toEqual(auth);
      });
  });