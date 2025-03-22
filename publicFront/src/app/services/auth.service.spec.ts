import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const mockResponse = { message: 'Registration successful' };
    const firstname = 'John';
    const lastname = 'Doe';
    const email = 'john.doe@example.com';
    const password = 'password123';

    service.register(firstname, lastname, email, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:9090/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ firstname, lastname, email, password });
    req.flush(mockResponse);
  });

  it('should login a user', () => {
    const mockResponse = { token: 'fake-jwt-token' };
    const email = 'john.doe@example.com';
    const password = 'password123';

    service.login(email, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:9090/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });
    req.flush(mockResponse);
  });
});
