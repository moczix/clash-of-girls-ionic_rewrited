import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";


@Injectable()
export class AuthService {

  googleToken: string;

  constructor(private http: HttpClient) {
  }

  isSigned(): boolean {
    return localStorage.getItem('signed-in') === "true"
  }

  setSigned(status: boolean) {
    localStorage.setItem("signed-in", status ? "true" : "false");
  }

  isAuth(idToken: string): Observable<{ status: boolean }> {
    return this.http.get<{ status: boolean }>(`/auth/is-auth/${idToken}`);
  }

  createAccount(username: string, language: string, country: string): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(`/auth/user`, {idToken: this.googleToken, username, language, country})
  }

}
