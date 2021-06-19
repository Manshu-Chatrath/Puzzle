import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RulesService {
constructor(private http: HttpClient) {}
  public getinfo() {
    return this.http.get('https://puzzlebackend.herokuapp.com/info')
} 
public personalinfo(obj: any)
{
  return this.http.post('https://puzzlebackend.herokuapp.com/save',obj);
}
}